import {ErrorRequestHandler} from "express";

const exceptionHandler: ErrorRequestHandler = (err, req, res, next) => {
  const formattedMessage = `Exception thrown: ${err.message}`;

  console.error(formattedMessage);
  res.internalServerError(formattedMessage);
}

export default exceptionHandler;
