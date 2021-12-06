import path from "path";

import actionBase from "../middleware/actionBase";

export const indexAction = actionBase((req, res, next) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});
