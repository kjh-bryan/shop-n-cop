import { Express } from 'express';
import {
  getLinksController,
  getSearchResultController,
  postLinksController,
  registerController,
  signInController,
  updateLinkController,
  uploadingFileController,
} from '../controllers';
import { processFile, validateToken } from '../middleware';

export const routes = (app: Express) => {
  app.get('/healthcheck', (req, res) =>
    res.status(200).json({ message: 'Routers are working.' })
  );

  app.post('/api/link', validateToken, postLinksController);

  app.get('/api/link', validateToken, getLinksController);

  app.put('/api/link', validateToken, updateLinkController);

  app.get('/api/search', validateToken, getSearchResultController);

  app.post('/api/register', registerController);

  app.post('/api/sign-in/', signInController);

  app.post('/api/upload', processFile, validateToken, uploadingFileController);
};
