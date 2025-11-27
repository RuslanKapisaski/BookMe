import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectToDb } from "./config/db.js";

const app = express();
connectToDb();

const port = 3030;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.write("Works");
  res.end();
});

app.listen(3030, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
