import {promises as fsPromises} from "fs";

import actionBase from "../middleware/actionBase";

import {HttpError, HttpStatusCode, hasImageMIMEType} from "../helpers/http";
import {isUndefined} from "../helpers/types";

export const uploadAction = actionBase(async (req, res, next) => {
  const file = <Express.Multer.File>req.file;

  if (isUndefined(file))
    throw new HttpError(HttpStatusCode.BadRequest, "A file must be provided for upload");

  if (!hasImageMIMEType(file.mimetype))
    throw new HttpError(HttpStatusCode.UnsupportedMediaType, `MIME type ${file.mimetype} is not supported for image uploads`);

  //
  // This is where you would send the file to Azure Blob Storage, store it in a
  // FILESTREAM, et cetera
  //

  // You can uncomment the line below to delete the file that Multer stored
  // in the temporary folder on disk
  // await fsPromises.unlink(file.path);
  
  res.status(201).json({
    success: true,
    file: {
      originalName: file.originalname,
      size: file.size
    }
  });
})
