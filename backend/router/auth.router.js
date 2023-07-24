import express from "express";
import { Login, Registor } from "../controller/auth.controller.js";

const authRouter = express.Router();
authRouter.post("/login", Login);
authRouter.post("/registor", Registor);

export default authRouter;
