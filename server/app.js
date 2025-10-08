import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./database/dbConnection.js";
import errorMiddleware from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";

export const app = express();
config({ path: "./config.env"});

app.use(
  cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true,
  })
);
//middleware in use
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/api/v1/user", userRouter);

connection();

app.use(errorMiddleware);