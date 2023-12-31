import express from 'express';
import cors from 'cors';
import { config } from './config';
import { routes } from './router';
import { logger } from './utils/logger';

const app = express();
app.use(cors({ origin: '*' }));

app.use(express.json());

app.listen(config.server.port, async () => {
  logger.info(`Server is running at http://localhost:${config.server.port}`);
  routes(app);
});
