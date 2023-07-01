import { Express } from 'express';
import {
  getSearchResultByTextController,
  postLinksController,
  registerController,
  signInController,
} from '../config/controllers';

export const routes = (app: Express) => {
  app.get('/healthcheck', (req, res) =>
    res.status(200).json({ message: 'Routers are working.' })
  );

  app.post('/api/links', postLinksController);

  app.get('/api/textsearch', getSearchResultByTextController);

  app.post('/api/register', registerController);

  app.post('/api/sign-in', signInController);
};
