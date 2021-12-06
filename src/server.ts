import fs, {
  promises as fsPromises
} from "fs";
import path from "path";

import dotenv from "dotenv";
import express, {
  Application,
  Request,
  Response,
  NextFunction
} from "express";
import morganBody from "morgan-body";
import multer from "multer";

import {
  indexAction
} from "./controllers/home";
import {
  uploadAction
} from "./controllers/upload";

dotenv.config();

const upload = multer({
  dest: "tmp/uploads/"
});

const app: Application = express();

morganBody(app, {
  logIP: false,
  logReqUserAgent: false,
  noColors: true,
  timezone: "Etc/UTC"
});

app.use(express.static(path.resolve(__dirname, "../public")));

app.get("/", indexAction);
app.post("/upload", upload.single("file"), uploadAction);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const formattedMessage = `Exception thrown: ${err.message}`;

  console.error(formattedMessage);

  res.status(500).json({
    success: false,
    message: formattedMessage
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started in ${process.env.NODE_ENV} on port ${PORT}`);
});
