import {NextFunction, Request, Response} from "express";

const actionBase = (action: (req: Request, res: Response, next: NextFunction) => void) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await Promise.resolve(action(req, res, next));
    } catch (err: any) {
      next(err);
    }
  }
}

export default actionBase;
