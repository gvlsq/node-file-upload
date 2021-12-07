import {NextFunction, Request, Response} from "express";

type ExpressRequest = (req: Request, res: Response, next: NextFunction) => void;

const actionBase = (action: ExpressRequest) => {
  const curried: ExpressRequest = async function (req, res, next) {
    try {
      await Promise.resolve(action(req, res, next));
    } catch (err: any) {
      next(err);
    }
  }

  return curried;
}

export default actionBase;
