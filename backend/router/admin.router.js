import {
  getAllUser,
  updateTrain,
  deleteTrain,
  addTrain,
  addCity,
} from "../controller/admin.controller.js";
import { getAllOrders } from "../controller/order.controller.js";
import {
  authAuthentication,
  adminAuthentication,
} from "../middleware/authHandler.js";

import express from "express";
const adminRouter = express.Router();
adminRouter.get("/user", authAuthentication, adminAuthentication, getAllUser);

adminRouter.get(
  "/order",
  authAuthentication,
  adminAuthentication,
  getAllOrders
);
adminRouter.post(
  "/train/create",
  authAuthentication,
  adminAuthentication,
  addTrain
);
adminRouter.post("/city", authAuthentication, adminAuthentication, addCity);
adminRouter.put(
  "/train/:id",
  authAuthentication,
  adminAuthentication,
  updateTrain
);
adminRouter.delete(
  "/train/:id",
  authAuthentication,
  adminAuthentication,
  deleteTrain
);

export default adminRouter;
