import mongoose from "mongoose";

const citySchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Citycollection = mongoose.model("Citycollection", citySchema);
export default Citycollection;
