import {
  createOrder,
  payOrder,
  getSingleOrder,
} from "../controller/order.controller.js";
import express from "express";
import { authAuthentication } from "../middleware/authHandler.js";

const orderRouter = express.Router();
orderRouter.post("/create", authAuthentication, createOrder);
orderRouter.put("/payorder", authAuthentication, payOrder);
orderRouter.get("/:id", authAuthentication, getSingleOrder);

export default orderRouter;
