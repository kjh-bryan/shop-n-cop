import express from 'express';
import http from 'http';
import { config } from './config';
import { routes } from './router';

const app = express();

app.listen(config.server.port, async () => {
  console.log(`Server is running at http://localhost:${config.server.port}`);
  routes(app);
});
