import express, { NextFunction, Request, Response } from "express";
import "./Utils/connection";
import user from "./Routers/user.routes";
import CustomError from "./Utils/CustomError";
import bodyParser from "body-parser";
const app = express();
import dotenv from "dotenv";
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const port = 3000;

app.use("/api/v1/user", user);

app.use(
  "/",
  (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).send({
      message: err.message || "Server Error",
    });
  }
);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
