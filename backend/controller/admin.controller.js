import Traincollection from "../models/train.js";
import Citycollection from "../models/city.js";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

// type :get
// status : private (admin only)
// this is for getting all users

export const getAllUser = asyncHandler(async (req, res) => {
  const trains = await User.find({});
  if (trains) {
    res.json(trains);
  } else {
    res.statusCode(404);
    throw new Error("no user exist");
  }
});

// type : get
// status : public
// des : this is for getting the single record by id

export const getSingleuser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const findedTrain = await User.findById(id);
  if (findedTrain) {
    res.json(findedTrain);
  } else {
    res.status(401);
    throw new Error("no user found");
  }
});

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

// type :post
// status : private (admin only)
// this is for adding new train in array

export const addTrain = asyncHandler(async (req, res) => {
  const c = req.body;
  const addedtrain = new Traincollection(c);
  const savedtrain = await addedtrain.save();
  if (savedtrain) {
    res.json(savedtrain).status(201);
  } else {
    throw new Error("no added");
  }
});

// type : put
// status : private admin only
// des : this is for updating the train record

export const updateTrain = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let train = await Traincollection.findById(id);
  const {
    name,
    depcity,
    deptime,
    depdate,
    depday,
    destcity,
    desttime,
    destdate,
    destday,
    eclassseats,
    eclassprice,
    bclassseats,
    bclassprice,
    detail,
  } = req.body;

  (train.name = name),
    (train.depcity = depcity),
    (train.deptime = deptime),
    (train.depdate = depdate),
    (train.depday = depday),
    (train.destcity = destcity),
    (train.desttime = desttime),
    (train.destdate = destdate),
    (train.destday = destday),
    (train.eclassseats = eclassseats),
    (train.eclassprice = eclassprice),
    (train.bclassseats = bclassseats),
    (train.bclassprice = bclassprice),
    (train.detail = detail);

  const savedtrain = await train.save();
  if (savedtrain) {
    res.json({ message: "updated successfuly" });
  } else {
    res.statusCode(404);
    throw new Error("not updated");
  }
});

// type : delete
// status : private admin only
// des : this is for deleting the train record

export const deleteTrain = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const finded = await Traincollection.findById(id);
  const deleted = await finded.deleteOne();
  if (deleted) {
    res.json(deleted);
  } else {
    throw new Error("no deleted");
  }
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>City>>>>>>>>>>>>>>

// type : post
// stauts : private admin only
// dec : add city

export const addCity = asyncHandler(async (req, res) => {
  const c = req.body;
  const addedtrain = new Citycollection(c);
  const savedtrain = await addedtrain.save();
  if (savedtrain) {
    res.json(savedtrain).statusCode(201);
  } else {
    res.statusCode(500);
    throw new Error("city is not added");
  }
});

// type : put
// stauts : admin only
// dec : update city

export const updateCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let train = await Citycollection.findById(id);
  const { name } = req.body;

  train.name = name;

  const savedtrain = await train.save();
  if (savedtrain) {
    res.json({ message: "updated successfuly" });
    res.statusCode(201);
  } else {
    res.statusCode(500);
    throw new Error("no updated");
  }
});

// type : delete
// stauts : admin only
// dec : delete city

export const deleteCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const finded = await Citycollection.findById(id);
  const deleted = await finded.deleteOne();
  if (deleted) {
    res.json(deleted).status(204);
  } else {
    res.statusCode(500);
    throw new Error("not deleted");
  }
});

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
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
