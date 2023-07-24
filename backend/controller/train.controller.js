import Traincollection from "../models/train.js";
import asyncHandler from "express-async-handler";

// type : get
// status : public
// des : this is for getting all the trains

export const getAllTrains = asyncHandler(async (req, res) => {
  const trains = await Traincollection.find({});
  if (trains) {
    res.json(trains);
  } else {
    res.statusCode(404);
    throw new Error("no product exist");
  }
});

// type : get
// status : public
// des : this is for getting the single record by id

export const getSingletrain = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const findedTrain = await Traincollection.findById(id);
  if (findedTrain) {
    res.json(findedTrain);
  } else {
    res.status(401);
    throw new Error("no train found");
  }
});

// type : get
// status : public
// des : this is for the getting of trains info on the base of dest and dept

export const filterTrain = asyncHandler(async (req, res) => {
  try {
    const dept = req.query.dept;
    const dist = req.query.dist;
    const filterArray = await Traincollection.find({
      depcity: dept,
      destcity: dist,
    });
    if (filterArray.length >= 1) {
      res.json(filterArray);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.statusCode = 404;
    throw new Error(error.message);
  }
});

export const updateSeats = async (id, bqty, eqty) => {
  const finded = await Traincollection.findById(id);
  if (finded) {
    finded.eclassseats = finded.eclassseats - eqty;
    finded.bclassseats = finded.bclassseats - bqty;
    const updated = await finded.save();
  }
};
