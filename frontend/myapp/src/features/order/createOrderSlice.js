import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetShoppingCart } from "../cart/cartSlice";

const initialState = {
  loading: true,
  orderid: {},
  error: null,
  success: false,
};

const createOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.orderid = {};
      state.error = null;
      state.success = false;
    },
    setorder: (state, { payload }) => {
      state.loading = false;
      state.orderid = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.orderid = {};
      state.error = payload;
      state.success = false;
    },
    setsuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
  },
});

const { setLoading, setError, setorder, setsuccess } = createOrderSlice.actions;
export const createOrderSelector = (state) => state.createOrder;
export default createOrderSlice.reducer;

export const createSingleOrder =
  (orderCreate) => async (dispatch, getState) => {
    const { token } = getState().login.userInfo;
    const config = {
      headers: {
        authentication: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    try {
      dispatch(setLoading());
      const { data } = await axios.post(`/order/create`, orderCreate, config);

      dispatch(setorder(data));
      dispatch(setsuccess());
    } catch (err) {
      dispatch(setError(err.responce.message.data));
    }
  };
