import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import morgan from "morgan";
import trainRouter from "./router/trains.router.js";
import cityRouter from "./router/city.router.js";
import connectionDb from "./config/connectionDB.js";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import authRouter from "./router/auth.router.js";
import adminRouter from "./router/admin.router.js";
import orderRouter from "./router/order.router.js";

dotenv.config();
const app = express();

connectionDb();

app.use(morgan("common"));
app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.use("/uploads", express.static("uplaods"));

app.use("/api/train", trainRouter);
app.use("/city", cityRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/order", orderRouter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("*", (req, res) => {
  res.json({ message: "invalid request" });
  res.status(401);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    chalk.bgWhite.green.bold(
      `app is running in ${process.env.NODE_MODE} mode at port number ${port} `
    )
  );
});
