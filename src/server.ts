import path from "path";

import cons from "consolidate";
import express, {
  Application,
  Request,
  Response,
  NextFunction
} from "express";

const app: Application = express();

// Consolidate used here instead of express-handlebars because of a bug related
// to this: https://stackoverflow.com/a/70010359
app.engine("handlebars", cons.handlebars);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "../views"));

app.use(express.static(path.resolve(__dirname, "../public")));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello");
});

app.get("/home", (req: Request, res: Response, next: NextFunction) => {
  res.render("index");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
