 import express from "express";
 import { config } from "dotenv";
 import cookie from "cookie-parser";
 import cors from "cors";
import cookieParser from "cookie-parser";

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
app.use(express.urlencoded());