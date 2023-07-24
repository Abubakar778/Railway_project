import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const itemFromStorage = localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItem"))
  : {};

const initialState = {
  loading: false,
  storageItem: itemFromStorage,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      state.loading = false;
      state.storageItem = payload;

      state.error = null;
    },

    setError: (state, { payload }) => {
      state.storageItem = {};
      state.loading = false;
      state.error = payload;
    },
    resetCart: (state) => {
      state.loading = false;
      state.storageItem = null;
      state.error = null;
    },
    setloading: (state) => {
      state.loading = true;
      state.storageItem = {};
      state.error = null;
    },
  },
});

const { addToCart, setError, resetCart } = cartSlice.actions;
export const cartSelector = (state) => state.cart;
export default cartSlice.reducer;

export const addCartItem =
  (id, bclassqty, eclassqty) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/api/train/${id}`);
      let ItemBeAdded = {
        name: data.name,
        depcity: data.depcity,
        depdate: data.depdate,
        distcity: data.destcity,
        bseatPrice: data.bclassprice,
        eseatPrice: data.eclassprice,
        pid: data._id,
        eqty: Number(eclassqty),
        bqty: Number(bclassqty),
        eprice: data.eclassprice * eclassqty,
        bprice: data.bclassprice * bclassqty,
      };

      dispatch(addToCart(ItemBeAdded));
      localStorage.setItem(
        "cartItem",
        JSON.stringify(getState().cart.storageItem)
      );
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

export const resetShoppingCart = (dispatch) => {
  localStorage.removeItem("cartItem");
  dispatch(resetCart());
};
