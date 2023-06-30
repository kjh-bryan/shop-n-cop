import { Storage } from '@google-cloud/storage';
import Multer from 'multer';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

const projectId = 'atlas-hackathon-390302';
const keyFileName = 'googleCloudKey.json';

const storage = new Storage({
    projectId,
    keyFilename: keyFileName,
});

const bucket = storage.bucket('shop-n-cop'); // To be defined

export const uploadingFileController = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log('Made it upload');
      try {
        if (req.file) {
          console.log('File found, trying to upload...')
          const blob = bucket.file(req.file.originalname);
          const blobStream = blob.createWriteStream();
  
          blobStream.on('finish', () => {
            res.status(200).send('Success');
          });
  
          blobStream.end(req.file.buffer);
        }
      } catch (error) {
        res.status(500).send('Error Uploading Images');
        console.log(error)
      }
    }
  );
  
  
