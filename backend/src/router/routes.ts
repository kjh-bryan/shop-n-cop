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
import { processFile } from '../middleware';

export const routes = (app: Express) => {
  app.get('/healthcheck', (req, res) =>
    res.status(200).json({ message: 'Routers are working.' })
  );

  app.post('/api/link', postLinksController);

  app.get('/api/link', getLinksController);

  app.put('/api/link', updateLinkController);

  app.get('/api/search', getSearchResultController);

  app.post('/api/register', registerController);

  app.get('/api/sign-in/:email', signInController);

  app.post('/api/upload', processFile, uploadingFileController);
};
