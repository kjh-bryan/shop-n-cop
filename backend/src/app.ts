import express from 'express';
import http from 'http';
import { config } from './config';
import { routes } from './router';
import { logger } from './utils/logger';

const app = express();

app.listen(config.server.port, async () => {
  logger.info(`Server is running at http://localhost:${config.server.port}`);
  routes(app);
});
