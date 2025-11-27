import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectToDb } from "./config/db.js";
import router from "./routes.js";

const app = express();
connectToDb();

const port = 3030;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

app.listen(3030, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
