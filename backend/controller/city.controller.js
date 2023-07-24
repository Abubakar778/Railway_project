import Citycollection from "../models/city.js";
import asyncHandler from "express-async-handler";

// type : get
// stauts : public
// dec : get all the city

export const getAllCities = asyncHandler(async (req, res) => {
  const trains = await Citycollection.find({});
  if (trains) {
    res.json(trains);
  } else {
    res.statusCode(404);
    throw new Error("no city found");
  }
});

// type : get
// stauts : public
// dec : get single the city

export const getSingleCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const findedTrain = await Citycollection.findById(id);
  if (findedTrain) {
    res.json(findedTrain);
  } else {
    res.statusCode(404);
    throw new Error("no city found");
  }
});
