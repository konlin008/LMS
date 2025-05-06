import express from "express";
import dotenv from "dotenv";
import connectDb from "./db.js";
import mediaRouter from "./routes/media.route.js";
import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import purchaseRouter from "./routes/purchaseCourse.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = 8080;
dotenv.config({});
connectDb();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: `http://localhost:5173`,
    credentials: true,
  })
);

app.use("/api/v1/media", mediaRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/purchase", purchaseRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
