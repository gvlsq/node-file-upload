import {NextFunction, Request,Response} from "express";

declare global {
  namespace Express {
    interface Response {
      // 2XX
      ok: (o: object) => void
      created: (o: FileResponse) => void
      
      // 4XX
      badRequest: (message: string) => void
      unsupportedMediaType: (message: string) => void

      // 5XX
      internalServerError: (message: string) => void
    }
  }
}

export type FileResponse = {
  name: string;
  path: string;
  size: Number;
}

type JSONResponse = {
  success: boolean;
  data?: object | null;
  message?: string | null;
}

const responseHelpers = (req: Request, res: Response, next: NextFunction) => {
  let successResponse: JSONResponse = {
    success: true,
    data: null
  };
  let failureResponse: JSONResponse = {
    success: false,
    message: null
  };

  res.ok = (o: object) => {
    successResponse.data = o;
    res.status(200).json(successResponse);
  }
  res.created = (o: FileResponse) => {
    successResponse.data = {
      file: o
    };

    res.status(201).json(successResponse);
  }
  
  res.badRequest = (message: string) => {
    failureResponse.message = message;
    res.status(400).json(failureResponse);
  }
  res.unsupportedMediaType = (message: string) => {
    failureResponse.message = message;
    res.status(415).json(failureResponse);
  }

  res.internalServerError = (message: string) => {
    failureResponse.message = message;
    res.status(500).json(failureResponse);
  }

  next();
}

export default responseHelpers;
