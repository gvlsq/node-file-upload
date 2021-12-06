import path from "path";

import {
  NextFunction,
  Request,
  Response
} from "express";

export const indexAction = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
  } catch (error: any) {
    next(error);
  }
}
