import User from "../models/user.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const authAuthentication = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authentication &&
    req.headers.authentication.startsWith("Bearer")
  ) {
    try {
      const [, token] = req.headers.authentication.split(" ");
      const { _id } = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(_id).select("-password");
      req.user = user;
      next();
    } catch (error) {
      res.statusCode = 401;
      throw new Error("invalid request");
    }
  } else {
    res.statusCode = 401;
    throw new Error("invalid request");
  }
});

export const adminAuthentication = asyncHandler((req, res, next) => {
  if (req.user && req.user.isadmin) {
    next();
  } else {
    res.statusCode = 403;
    throw new Error("Forbidden");
  }
});
