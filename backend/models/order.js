import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  orderItems: {
    name: {
      type: String,
    },
    depcity: {
      type: String,
    },
    depdate: {
      type: String,
    },
    distcity: {
      type: String,
    },
    bseatePrice: {
      type: Number,
    },
    eseatPrice: {
      type: Number,
    },
    eqty: {
      type: Number,
    },
    bqty: {
      type: Number,
    },
    eprice: {
      type: Number,
    },
    bprice: {
      type: Number,
    },
    pid: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Traincollection",
    },
  },

  price: {
    type: Number,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
