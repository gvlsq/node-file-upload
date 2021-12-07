import path from "path";

import {
  NextFunction,
  Request,
  Response
} from "express";

import actionBase from "../middleware/actionBase";

export const indexAction = actionBase((req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});
