import {
  NextFunction,
  Request,
  Response
} from "express";

export const uploadAction = (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file as Express.Multer.File;
  
    //
    // This is where you would send the file to Azure Blob Storage, store it in a
    // FILESTREAM, et cetera
    //

    // Uncomment this line to delete the file stored in the temporary disk folder
    // used by multer
    // await fsPromises.unlink(file.path);
    
    res.status(201).json({
      success: true,
      file: {
        originalName: file.originalname,
        size: file.size
      }
    });
  } catch (error: any) {
    next(error);
  }
}
