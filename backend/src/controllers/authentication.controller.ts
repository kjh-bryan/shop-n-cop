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

      const existingUser = await collection.findOne({
        email: payload.email,
      });

      if (existingUser) {
        res
          .status(200)
          .json({ message: ResponseMessages.USER_ALREADY_EXISTS, data: {} });
        return;
      }

      const p = await collection.insertOne(userDocument);
      if (p) {
        res.status(200).json({
          message: ResponseMessages.SUCCESS,
          data: { ...userDocument },
        });
      } else {
        res
          .status(503)
          .json({ message: ResponseMessages.ERROR_INSERTING_RECORD, data: {} });
      }
    } catch (error) {
      logger.error('[registerController]', error);
      next(error);
    } finally {
      await MongoDBConnection.closeConnection();
    }
  }
);

export const signInController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
      logger.info('in signInController');
      if (!userDoc) {
        logger.info('!userDock');
        res.status(200).json({
          message: ResponseMessages.INCORRECT_CREDENTIALS,
          data: {},
        });
        return;
      }

      logger.info('userDoc has something');
      if (userDoc && (await bcrypt.compare(password, userDoc.password))) {
        logger.info('userDoc exist and compare password');
        if (accessTokenSecret) {
          logger.info('in accessToken is legit');
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
          res.status(200).json({
            message: ResponseMessages.SUCCESS,
            data: { ...userDoc, token },
          });
          logger.info('after response success');
        } else {
          logger.info('in token is not legit');
          res.status(200).json({
            message: ResponseMessages.ERROR_LOGIN,
            data: {},
          });
          logger.info('after error login response message');
        }
      } else {
        logger.info('in wrong password man');
        res.status(200).json({
          message: ResponseMessages.INCORRECT_CREDENTIALS,
          data: {},
        });
        logger.info('after incorrect crendtial');
      }
    } catch (error) {
      logger.error('[signInController]', error);
      res.status(503).json({ message: ResponseMessages.BAD_REQUEST, data: {} });
      next(error);
    } finally {
      await MongoDBConnection.closeConnection();
    }
  }
);
