import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { MongoDBConnection } from '../mongodb/mongodb-connection';
import { config } from '../config/config';
import type { GoogleLensParameters, GoogleShoppingParameters } from 'serpapi';
import asyncHandler from 'express-async-handler';
import { ResponseMessages } from '../constants';
import { ObjectId } from 'mongodb';

const SerpApi = require('google-search-results-nodejs');

export const postLinksController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = MongoDBConnection.getClient();
      if (!client) {
        logger.error('Cannot get mongoDBClient');
        res.status(503).json({ message: ResponseMessages.MONGODB_CLIENT_FAIL });
        return;
      }

      await MongoDBConnection.connect();
      const db = await client.db('authentication');
      const linkCollections = await db.collection('links');
      const link = req.body;
      const result = await linkCollections.insertOne(link);
      if (result) {
        res
          .status(200)
          .json({ message: ResponseMessages.SUCCESS, data: { ...result } });
      } else {
        res
          .status(503)
          .json({ message: ResponseMessages.ERROR_INSERTING_RECORD });
      }
    } catch (e) {
      logger.error(e);
      res.status(503).json({ message: ResponseMessages.BAD_REQUEST });
    } finally {
      await MongoDBConnection.closeConnection();
    }
  }
);

export const getLinksController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = MongoDBConnection.getClient();
      if (!client) {
        logger.error('Cannot get mongoDBClient');
        res.status(503).json({ message: ResponseMessages.MONGODB_CLIENT_FAIL });
        return;
      }
      await MongoDBConnection.connect();
      const db = await client.db('authentication');
      const email = req.query.email;
      const linkCollections = db.collection('links');
      const allLinksCursor = linkCollections.find({
        userEmail: email,
      });

      const allLinks = await allLinksCursor.toArray();

      if (!allLinks) {
        res.status(200).json({
          message: ResponseMessages.NO_LINK,
          data: {},
        });
      } else {
        res.status(200).json({
          message: ResponseMessages.SUCCESS,
          data: { ...allLinks },
        });
      }
    } catch (e) {
      logger.error(e);
      res.status(503).json({ message: ResponseMessages.BAD_REQUEST });
    } finally {
      await MongoDBConnection.closeConnection();
    }
  }
);

export const updateLinkController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = MongoDBConnection.getClient();
      if (!client) {
        logger.error('Cannot get mongoDBClient');
        res.status(503).json({ message: ResponseMessages.MONGODB_CLIENT_FAIL });
        return;
      }
      await MongoDBConnection.connect();
      const db = await client.db('authentication');

      const { newDate } = req.body;
      const payload = req.query;
      const { id } = payload as any;
      const filter = { _id: new ObjectId(id) };
      const update = { $set: { createdAt: newDate } };

      const linkCollections = db.collection('links');
      const updateLink = await linkCollections.findOneAndUpdate(filter, update);

      if (!updateLink) {
        res.status(503).json({
          message: ResponseMessages.FAILED_UPDATE_LINK,
          data: {},
        });
      } else {
        res.status(200).json({
          message: ResponseMessages.SUCCESS,
          data: updateLink.value,
        });
      }
    } catch (e) {
      logger.error(e);
      res.status(503).json({ message: ResponseMessages.BAD_REQUEST });
    } finally {
      await MongoDBConnection.closeConnection();
    }
  }
);

export const getSearchResultController = asyncHandler(
  async (req: Request, res: Response) => {
    const { serpapiApiKey } = config.server;
    const payload = req.query;
    const { type, imageURL, query } = payload as any;

    const search = new SerpApi.GoogleSearch(serpapiApiKey);
    if (type === 'IMAGE') {
      const params = {
        engine: 'google_lens',
        url: imageURL,
      } satisfies GoogleLensParameters;
      try {
        let response;
        const callback = (data: any) => {
          response = data;
        };
        await new Promise((resolve) => {
          search.json(params, (data) => {
            callback(data);
            resolve();
          });
        });
        if (response) {
          res.status(200).json({
            message: ResponseMessages.SUCCESS,
            data: {
              ...response?.visual_matches,
            },
          });
        } else {
          res.status(503).json({ message: ResponseMessages.FETCH_ERROR });
        }
      } catch (e) {
        logger.error(e);
        res.status(503).json({ message: ResponseMessages.BAD_REQUEST });
      }
    } else {
      const params = {
        engine: 'google_shopping',
        google_domain: 'google.com.sg',
        q: query,
        hl: 'en',
        gl: 'sg',
        location: 'Singapore',
        device: 'mobile',
      } satisfies GoogleShoppingParameters;
      try {
        let response;
        const callback = (data: any) => {
          response = data;
        };
        await new Promise((resolve) => {
          search.json(params, (data) => {
            callback(data);
            resolve();
          });
        });
        if (response) {
          res.status(200).json({
            message: ResponseMessages.SUCCESS,
            data: response.shopping_results,
          });
        } else {
          res.status(503).json({ message: ResponseMessages.FETCH_ERROR });
        }
      } catch (e) {
        logger.error(e);
        res.status(503).json({ message: ResponseMessages.BAD_REQUEST });
      }
    }
  }
);
