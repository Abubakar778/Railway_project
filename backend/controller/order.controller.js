import Order from "../models/order.js";
import asyncHandler from "express-async-handler";
import { updateSeats } from "./train.controller.js";
import Stripe from "stripe";

export const getAllOrders = asyncHandler(async (req, res) => {
  const orderList = await Order.find().populate("user");
  if (req.user && req.user.isadmin) {
    res.json(orderList);
  } else {
    res.statusCode = 401;
    throw new Error("Invaid request");
  }
});

export const getSingleOrder = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const finded = await Order.findById(id).populate("user", "name email");
    if (!finded) {
      throw new Error("no order exist");
    }
    res.json(finded);
    res.statusCode = 200;
  } catch (error) {
    return res.json({ message: error.message });
  }
});

// export const getUserOrder = asyncHandler(async (req, res) => {
//   const user = req.user._id;
//   const order = await Order.find({ user });
//   res.json(order);
// });

export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, price } = req.body;

  const order = new Order({
    orderItems,
    price,
    user: req.user._id,
  });
  const donorder = await order.save();
  if (donorder) {
    // updating seats
    await updateSeats(
      donorder.orderItems.pid,
      donorder.orderItems.bqty,
      donorder.orderItems.eqty
    );
    return res.json({ _id: donorder._id });
  } else {
    res.statusCode = 401;
    throw new Error("order not created");
  }
});

export const payOrder = asyncHandler(async (req, res) => {
  const { token, amount } = req.body;
  const stripe = new Stripe(process.env.STRIP_KEY);

  try {
    await stripe.charges.create({
      source: token.id,
      amount,
      currency: "pkr",
    });
  } catch (err) {
    res.statusCode = 500;
    throw new Error(err.message);
  }
});
