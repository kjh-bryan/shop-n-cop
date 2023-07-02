import { Express } from 'express';
import {
  getSearchResultByTextController,
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

  app.post('/api/links', postLinksController);

  app.get('/api/textsearch', getSearchResultByTextController);

  app.post('/api/register', registerController);

  app.get('/api/sign-in', signInController);

  app.post('/api/upload', processFile, uploadingFileController);
};
