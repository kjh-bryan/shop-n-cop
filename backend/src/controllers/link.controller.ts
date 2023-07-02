import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { MongoDBConnection } from '../mongodb/mongodb-connection';
import { config } from '../config/config';
import type { GoogleLensParameters, GoogleShoppingParameters } from 'serpapi';
import { getJson } from 'serpapi';
import asyncHandler from 'express-async-handler';
import { ResponseMessages } from '../constants';

export const postLinksController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = MongoDBConnection.getClient();
      if (!client) {
        logger.error('Cannot get mongoDBClient');
        res.status(503).json({ message: ResponseMessages.MONGODB_CLIENT_FAIL });
        return;
      }
      const conn = await MongoDBConnection.connect();
      const db = client.db('test');

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

export const getSearchResultController = asyncHandler(
  async (req: Request, res: Response) => {
    const { serpapiApiKey } = config.server;
    const payload = req.query;
    const { type, imageURL, query } = payload as any;

    if (type === 'IMAGE') {
      const params = {
        api_key: serpapiApiKey,
        url: imageURL,
      } satisfies GoogleLensParameters;
      console.log('in image');
      console.log(params);
      try {
        const response = await getJson('google_lens', params);
        console.log(response);
        if (response) {
          res.status(200).json({
            message: ResponseMessages.SUCCESS,
            ...response.visual_matches,
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
        api_key: serpapiApiKey,
        google_domain: 'google.com.sg',
        q: query,
        hl: 'en',
        gl: 'sg',
        location: 'Singapore',
        device: 'mobile',
      } satisfies GoogleShoppingParameters;
      try {
        const response = await getJson('google_shopping', params);
        if (response) {
          res
            .status(200)
            .json({ message: ResponseMessages.SUCCESS, data: { ...response } });
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
