import express from "express";
import { getAllCities, getSingleCity } from "../controller/city.controller.js";

const cityRouter = express.Router();
cityRouter.route("/").get(getAllCities);
cityRouter.route("/:id").get(getSingleCity);

export default cityRouter;
