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
    logger.info('[postLinksController] called');
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
      logger.info('[postLinksController] link from req.body :', link);
      const result = await linkCollections.insertOne(link);
      if (result) {
        logger.info('[postLinksController] result success :', result);
        res
          .status(200)
          .json({ message: ResponseMessages.SUCCESS, data: { ...result } });
      } else {
        logger.info('[postLinksController] Error inserting links :');
        res
          .status(503)
          .json({ message: ResponseMessages.ERROR_INSERTING_RECORD });
      }
    } catch (e) {
      logger.error('[postLinksController] Exception occured :');
      logger.error(e);
      res.status(503).json({ message: ResponseMessages.BAD_REQUEST });
    } finally {
      await MongoDBConnection.closeConnection();
    }
  }
);

export const getLinksController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info('[getLinksController] called');
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

      logger.info('[getLinksController] : Email from query :', email);
      const linkCollections = db.collection('links');
      const allLinksCursor = linkCollections.find({
        userEmail: email,
      });

      const allLinks = await allLinksCursor.toArray();

      if (!allLinks) {
        logger.info('[getLinksController] : No Links');
        res.status(200).json({
          message: ResponseMessages.NO_LINK,
          data: {},
        });
      } else {
        logger.info('[getLinksController] : Success : ', allLinks);
        res.status(200).json({
          message: ResponseMessages.SUCCESS,
          data: { ...allLinks },
        });
      }
    } catch (e) {
      logger.error('[getLinksController] : Exception');
      logger.error(e);
      res.status(503).json({ message: ResponseMessages.BAD_REQUEST });
    } finally {
      await MongoDBConnection.closeConnection();
    }
  }
);

export const updateLinkController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info('[updateLinkController] called :');
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
      logger.info('[updateLinkController] id from payload :', id);

      const linkCollections = db.collection('links');
      const updateLink = await linkCollections.findOneAndUpdate(filter, update);

      if (!updateLink) {
        logger.info('[updateLinkController] Failed to update link:');
        res.status(503).json({
          message: ResponseMessages.FAILED_UPDATE_LINK,
          data: {},
        });
      } else {
        logger.info(
          '[updateLinkController] Update link successful ',
          updateLink
        );
        res.status(200).json({
          message: ResponseMessages.SUCCESS,
          data: updateLink.value,
        });
      }
    } catch (e) {
      logger.error('[updateLinkController] Exception occured');
      logger.error(e);
      res.status(503).json({ message: ResponseMessages.BAD_REQUEST });
    } finally {
      await MongoDBConnection.closeConnection();
    }
  }
);

export const getSearchResultController = asyncHandler(
  async (req: Request, res: Response) => {
    logger.info('[getSearchResultController] called');
    const { serpapiApiKey } = config.server;
    const payload = req.query;
    const { type, imageURL, query } = payload as any;
    logger.info('[getSearchResultController] payload :', payload);

    const search = new SerpApi.GoogleSearch(serpapiApiKey);
    if (type === 'IMAGE') {
      logger.info('[getSearchResultController] type is IMAGE');
      const params = {
        engine: 'google_lens',
        url: imageURL,
      };
      try {
        let response;
        const callback = (data: any) => {
          response = data;
        };
        await new Promise((resolve) => {
          search.json(params, (data: any) => {
            callback(data);
            resolve();
          });
        });
        if (response) {
          logger.info(
            '[getSearchResultController] [IMAGE] Success data from SerpApi'
          );
          res.status(200).json({
            message: ResponseMessages.SUCCESS,
            data: {
              ...response?.visual_matches,
            },
          });
        } else {
          logger.info(
            '[getSearchResultController] [IMAGE] Fetch error from SerpApi'
          );
          res.status(503).json({ message: ResponseMessages.FETCH_ERROR });
        }
      } catch (e) {
        logger.error('[getSearchResultController] [IMAGE] Exception occured');
        logger.error(e);
        res.status(503).json({ message: ResponseMessages.BAD_REQUEST });
      }
    } else {
      logger.info('[getSearchResultController] type is QUERY');
      const params = {
        engine: 'google_shopping',
        google_domain: 'google.com.sg',
        q: query,
        hl: 'en',
        gl: 'sg',
        location: 'Singapore',
        device: 'mobile',
      };
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
          logger.info(
            '[getSearchResultController] [QUERY] Success data from SerpApi'
          );
          res.status(200).json({
            message: ResponseMessages.SUCCESS,
            data: response.shopping_results,
          });
        } else {
          logger.info(
            '[getSearchResultController] [QUERY] Error fetching from SerpApi'
          );

          res.status(503).json({ message: ResponseMessages.FETCH_ERROR });
        }
      } catch (e) {
        logger.error('[getSearchResultController] [QUERY] Exception occured');
        logger.error(e);
        res.status(503).json({ message: ResponseMessages.BAD_REQUEST });
      }
    }
  }
);
