import User from "../models/user.js";
import asyncHandler from "express-async-handler";

// path : /login
// statu : public

export const Login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("invalid password or email");
    }
    if (!(await user.PasswordValidation(password))) {
      throw new Error("invalid email or password");
    }
    res.json({
      _id: user._id,
      name: user.name,
      isadmin: user.isadmin,
      token: user.CreateToken(),
      expireIn: 30,
    });
  } catch (err) {
    return res.json({ message: err.message }, 400);
  }
});

// path : /registor
// status : public

export const Registor = asyncHandler(async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  try {
    if (password !== confirmpassword) {
      throw new Error("password did not match");
    }
    const findeduser = await User.findOne({ email });
    if (findeduser) {
      throw new Error("this email has already been taken");
    }
    const user = new User({
      name,
      email,
      password,
    });
    const createdUser = await user.save();
    res.json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isadmin: createdUser.isadmin,
      token: createdUser.CreateToken(),
    });
  } catch (err) {
    return res.json({ message: err.message }, 400);
  }
});
