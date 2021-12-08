import {promises as fsPromises} from "fs";

import {NextFunction, Request, Response} from "express";

import {File} from "../models/File";

import actionBase from "../middleware/actionBase";

import {isUndefined} from "../helpers/types";

export const uploadAction = actionBase(async (req: Request, res: Response, next: NextFunction) => {
  const file = req.file as Express.Multer.File;

  if (isUndefined(file))
    return res.badRequest("A file must be provided for upload");

  if (file.mimetype.substr(0, 6) != "image/")
    return res.unsupportedMediaType(`MIME type ${file.mimetype} is not supported for image uploads`);

  if (file.size > 64*1024*1024)
    return res.badRequest("Image uploads must be 64 MB or smaller in size");

  //
  // This is where you would send the file to Azure Blob Storage, store it in a
  // FILESTREAM, et cetera
  //

  // You can uncomment the line below to delete the file that Multer stored
  // in the temporary folder on disk
  // await fsPromises.unlink(file.path);

  const response: File = new File(file.originalname, file.path, file.size);

  res.created(response);
})
