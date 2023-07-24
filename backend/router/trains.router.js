import express from "express";
import {
  getAllTrains,
  getSingletrain,
  filterTrain,
} from "../controller/train.controller.js";

const trainRouter = express.Router();
trainRouter.get("/", getAllTrains);
trainRouter.get("/filter", filterTrain);
trainRouter.get("/:id", getSingletrain);

export default trainRouter;
