import {ErrorRequestHandler} from "express";

import {HttpError, HttpStatusCode} from "../helpers/http";

const exceptionHandler: ErrorRequestHandler = (err, req, res, next) => {
  let code: HttpStatusCode = HttpStatusCode.InternalServerError;
  if (err instanceof HttpError) code = err.code;

  res.status(code).json({
    success: false,
    error: err.message
  });
}

export default exceptionHandler;
