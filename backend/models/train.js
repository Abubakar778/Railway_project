import mongoose from "mongoose";

const trainSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    depcity: {
      type: String,
    },
    deptime: {
      type: String,
    },
    depdate: {
      type: Date,
    },
    depday: {
      type: String,
    },
    destcity: {
      type: String,
    },
    desttime: {
      type: String,
    },
    destdate: {
      type: Date,
    },
    destday: {
      type: String,
    },
    eclassseats: {
      type: Number,
    },
    eclassprice: {
      type: Number,
    },
    bclassseats: {
      type: Number,
    },
    bclassprice: {
      type: Number,
    },
    detail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Traincollection = mongoose.model("Traincollection", trainSchema);
export default Traincollection;
