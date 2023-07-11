import { Storage } from '@google-cloud/storage';

import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { ResponseMessages } from '../constants';
import { format } from 'util';
import { logger } from '../utils';

const projectId = 'atlas-hackathon-390302';
const keyFileName = '/etc/secrets/googleCloudKey.json';

const storage = new Storage({
  projectId,
  keyFilename: keyFileName,
});

const bucket = storage.bucket('shop-n-cop'); // To be defined

export const uploadingFileController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info('[uploadingFileController] called');
    try {
      if (!req.file) {
        logger.info('[uploadingFileController] No file from req.file');
        res.status(400).json({ message: ResponseMessages.UPLOAD_IMAGE_FAIL });
        return;
      } else {
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
          resumable: false,
        });

        blobStream.on('error', (err) => {
          logger.error('[uploadingFileController] [blobSteam] [onError] ');
          logger.error(err.message);
          res.status(500).json({ message: err.message });
          return;
        });

        blobStream.on('finish', async (data: any) => {
          logger.info('[uploadingFileController] [bloblSteam] [onFinish] ');
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          );

          try {
            if (req.file && req.file.originalname) {
              await bucket.file(req.file?.originalname).makePublic();
            }
          } catch {
            logger.info(
              '[uploadingFileController] [bloblSteam] [onFinish] Failed to make image public, uploaded successfully'
            );
            res.status(500).json({
              message:
                ResponseMessages.UPLOADED_SUCCESSFULLY_PUBLIC_ACCESS_DENIED,
              data: {
                fileName: req.file?.originalname,
                url: publicUrl,
              },
            });
            return;
          }
          logger.info(
            '[uploadingFileController] [bloblSteam] [onFinish] Uploaded image to Google Cloud Successfully'
          );

          res.status(200).json({
            message: ResponseMessages.UPLOADED_SUCCESSFULLY,
            data: {
              fileName: req.file?.originalname,
              url: publicUrl,
            },
          });
        });

        blobStream.end(req.file.buffer);
        return;
      }
    } catch (err: any) {
      logger.error('[uploadingFileController] Exception occured');
      logger.error(err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        logger.error('[uploadingFileController] [Limit File Size] error');
        res.status(500).json({ message: ResponseMessages.FILE_SIZE_EXCEEDED });
        return;
      }

      res.status(500).send({
        message: ResponseMessages.COULD_NOT_UPLOAD,
      });
      return;
    }
  }
);
