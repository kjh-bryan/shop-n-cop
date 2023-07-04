import { Express } from 'express';
import {
  getLinksController,
  getSearchResultController,
  postLinksController,
  registerController,
  signInController,
  uploadingFileController,
} from '../controllers';
import Multer from 'multer';
import { processFile } from '../middleware';

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});

export const routes = (app: Express) => {
  app.get('/healthcheck', (req, res) =>
    res.status(200).json({ message: 'Routers are working.' })
  );

  app.post('/api/link', postLinksController);

  app.get('/api/link', getLinksController);

  app.get('/api/search', getSearchResultController);

  app.post('/api/register', registerController);

  app.get('/api/sign-in/:email', signInController);

  app.post('/api/upload', processFile, uploadingFileController);
};
