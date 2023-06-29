import { Express } from 'express';
import {
  getSearchResultByText,
  postLinks,
} from '../config/controllers/link.controller';

export const routes = (app: Express) => {
  app.get('/healthcheck', (req, res) =>
    res.status(200).json({ message: 'Routers are working.' })
  );

  app.post('/api/links', postLinks);

  app.get('/api/textsearch', getSearchResultByText);
};
