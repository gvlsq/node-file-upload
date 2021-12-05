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

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
  } catch (error: any) {
    next(error);
  }
});
app.post("/upload", upload.single("file"), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file as Express.Multer.File;
  
    //
    // This is where you would send the file to Azure Blob Storage, store it in a
    // FILESTREAM, et cetera
    //

    // Uncomment this line to delete the file stored in the temporary disk folder
    // used by multer
    // await fsPromises.unlink(file.path);
    
    res.status(201).json({
      success: true,
      file: {
        originalName: file.originalname,
        size: file.size
      }
    });
  } catch (error: any) {
    next(error);
  }
});
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
