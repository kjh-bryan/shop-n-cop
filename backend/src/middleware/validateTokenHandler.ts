import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';
import { ResponseMessages } from '../constants';
import { logger } from '../utils/logger';
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const validateToken = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization =
        req.header('authorization') || req.header('Authorization');
      const token = authorization.replace('Bearer ', '');

      if (!token) {
        logger.error('token is undefined or null');
        res
          .status(401)
          .json({ message: ResponseMessages.UNAUTHORIZED, data: {} });
        return;
      }

      const decoded = jwt.verify(
        token,
        config.server.accessTokenSecret as string
      );
      (req as CustomRequest).token = decoded;

      next();
    } catch (err) {
      logger.error('Exception at validateToken');
      logger.error(err);
      logger.error(err.message);
      res
        .status(401)
        .json({ message: ResponseMessages.UNAUTHORIZED, data: {} });
    }
  }
);
