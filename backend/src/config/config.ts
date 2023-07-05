import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 9090;

export const config = {
  server: {
    port: SERVER_PORT,
    apiVersion: process.env.APIVERSION,
    serpapiApiKey: process.env.SERPAPI_API_KEY,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  },
};
