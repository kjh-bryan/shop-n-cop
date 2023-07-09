import { MongoDBConnection } from '../mongodb/mongodb-connection';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { IUser, ICredentials } from '../types';
import { ResponseMessages } from '../constants';
import { sign, SignOptions } from 'jsonwebtoken';
import { config } from '../config';
import bcrypt from 'bcrypt';

const accessTokenSecret = config.server.accessTokenSecret;
export const registerController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info('[registerController] called');
    try {
      await MongoDBConnection.connect();
      const mongoDBClient = MongoDBConnection.getClient();
      if (!mongoDBClient) {
        logger.error('Cannot get mongoDBClient');
        res.status(200).json({ message: ResponseMessages.MONGODB_CLIENT_FAIL });
        return;
      }
      const payload = req.body;
      const dbName = 'authentication';
      const db = mongoDBClient.db(dbName);
      const collection = db.collection('users');
      const userDocument: IUser = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
      };
      logger.info('[registerController] [payload] ', payload);

      const existingUser = await collection.findOne({
        email: payload.email,
      });

      if (existingUser) {
        logger.info('[registerController] [existingUser] User already exist');

        res
          .status(200)
          .json({ message: ResponseMessages.USER_ALREADY_EXISTS, data: {} });
        return;
      }

      const p = await collection.insertOne(userDocument);
      if (p) {
        logger.info(
          '[registerController] [insertOne] Successfully creating a user'
        );
        res.status(200).json({
          message: ResponseMessages.SUCCESS,
          data: { ...userDocument },
        });
        logger.info(
          '[registerController] [insertOne] Successfully inserted a record'
        );
      } else {
        logger.info(
          '[registerController] [insertOne] Error in inserting record'
        );
        res
          .status(503)
          .json({ message: ResponseMessages.ERROR_INSERTING_RECORD, data: {} });
      }
    } catch (error) {
      logger.error('[registerController] Exception occured', error);
      next(error);
    } finally {
      await MongoDBConnection.closeConnection();
    }
  }
);

export const signInController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info('[signInController] called');
    try {
      const { email, password } = req.body;
      await MongoDBConnection.connect();
      const mongoDBClient = MongoDBConnection.getClient();
      if (!mongoDBClient) {
        logger.error('Cannot get mongoDBClient');
        res.status(503).json({ message: ResponseMessages.MONGODB_CLIENT_FAIL });
        return;
      }
      const dbName = 'authentication';
      const db = mongoDBClient.db(dbName);
      const collection = db.collection('users');
      const userDoc = await collection.findOne({
        email: email,
      });
      logger.info('[signInController] [req.body] ', req.body);
      if (!userDoc) {
        logger.info('[signInController] [!userDoc] Incorrect credentials');

        res.status(200).json({
          message: ResponseMessages.INCORRECT_CREDENTIALS,
          data: {},
        });
        return;
      }

      if (userDoc && (await bcrypt.compare(password, userDoc.password))) {
        logger.info(
          '[signInController] [userDoc] User existed and passed matched'
        );
        if (accessTokenSecret) {
          logger.info(
            '[signInController] [userDoc] [accessTokenSecret] accessTokenSecret is valid'
          );
          const token = sign(
            {
              user: {
                email,
              },
            },
            accessTokenSecret,
            {
              expiresIn: '1hr',
            }
          );
          userDoc.token = token;
          logger.info(
            '[signInController] [userDoc] [accessTokenSecret] Success returning userDoc ',
            userDoc
          );
          res.status(200).json({
            message: ResponseMessages.SUCCESS,
            data: { ...userDoc, token },
          });
          logger.info('after response success');
        } else {
          logger.info(
            '[signInController] [userDoc] [accessTokenSecret] accessTokenSecret is invalid ',
            userDoc
          );
          res.status(200).json({
            message: ResponseMessages.ERROR_LOGIN,
            data: {},
          });
          logger.info('after error login response message');
        }
      } else {
        logger.info(
          '[signInController] [userDoc] Invalid username or password ',
          userDoc
        );
        res.status(200).json({
          message: ResponseMessages.INCORRECT_CREDENTIALS,
          data: {},
        });
      }
    } catch (error) {
      logger.error('[signInController] Exception', error);
      res.status(503).json({ message: ResponseMessages.BAD_REQUEST, data: {} });
      next(error);
    } finally {
      await MongoDBConnection.closeConnection();
    }
  }
);
