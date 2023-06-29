import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import { MongoDBConnection } from '../../mongodb/mongodb-connection';
import { config } from '../config';
import type { GoogleShoppingParameters } from 'serpapi';
import { getJson } from 'serpapi';

const client = MongoDBConnection.getClient();
const conn = client.connect();
const { serpapiApiKey } = config.server;

export const postLinks = async (req: Request, res: Response) => {
  try {
    const db = (await conn).db('test');

    const linkCollections = await db.collection('links');
    const link = req.body;
    const result = await linkCollections.insertOne(link);
    if (result) {
      res.status(200).json({ message: 'Success', data: { ...result } });
    } else {
      res.status(503).json({ message: 'Error inserting record' });
    }
  } catch (e) {
    logger.error(e);
    res.status(503).json({ message: 'BAD REQUEST' });
  }
};

export const getSearchResultByText = async (req: Request, res: Response) => {
  const payload = req.query;
  const { query } = payload as any;
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
      res.status(200).json({ message: 'Success', data: { ...response } });
    } else {
      res.status(503).json({ message: 'Error fetching result' });
    }
  } catch (e) {
    logger.error(e);
    res.status(503).json({ message: 'BAD REQUEST' });
  }
};
