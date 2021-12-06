import path from "path";

import dotenv from "dotenv";
import express, {Application} from "express";
import morganBody from "morgan-body";
import multer, {Multer} from "multer";

import {indexAction} from "./controllers/home";
import {uploadAction} from "./controllers/upload";

import exceptionHandler from "./middleware/exceptionHandler";

dotenv.config();

const upload: Multer = multer({
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

app.use(exceptionHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started in ${process.env.NODE_ENV} on port ${PORT}`);
});
