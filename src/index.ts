import express from "express";
import "./Config/";
import user from "./Routers/user.routes";
import bodyParser from "body-parser";
import errorHandler from "./Middlewares/errorHandler.middleware";
const app = express();
import dotenv from "dotenv";
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

app.use("/api/v1/user", user);

app.use("/", errorHandler);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
