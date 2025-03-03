import express from "express";
import dotenv from "dotenv";
import connectDb from "./db.js";

dotenv.config({});
connectDb();
const app = express();

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
