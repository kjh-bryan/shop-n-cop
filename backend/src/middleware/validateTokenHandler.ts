import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';
import { ResponseMessages } from '../constants';
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const validateToken = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');

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
      logger.info('logging decoded ');
      logger.info(decoded);
      (req as CustomRequest).token = decoded;

      next();
    } catch (err) {
      logger.error('Exception at validateToken');
      res
        .status(401)
        .json({ message: ResponseMessages.UNAUTHORIZED, data: {} });
    }
  }
);
