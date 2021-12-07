import {NextFunction, Request, Response} from "express";

type ExpressRequest = (req: Request, res: Response, next: NextFunction) => void;

const actionBase = (action: ExpressRequest) => {
  const curried: ExpressRequest = function (req, res, next) {
    try {
      Promise.resolve(action(req, res, next));
    } catch (error: any) {
      next(error);
    }
  }

  return curried;
}

export default actionBase;
