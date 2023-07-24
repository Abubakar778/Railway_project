import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser } from "../auth/loginSlice";

const initialState = {
  loading: true,
  orders: [],
  error: null,
};

const orderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.orders = [];
    },
    setorders: (state, { payload }) => {
      state.loading = false;
      state.orders = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.orders = [];
      state.error = payload;
    },
  },
});

const { setError, setLoading, setorders } = orderListSlice.actions;
export const orderSliceSelector = (state) => state.orderList;
export default orderListSlice.reducer;

export const fetchorder = async (dispatch, getState) => {
  const { token } = getState().login.userInfo;
  const config = {
    headers: {
      authentication: `Bearer ${token}`,
      "content-type": "application/json",
    },
  };
  try {
    dispatch(setLoading());
    console.log("this is admin order slice");
    const { data } = await axios.get("/admin/order", config);
    dispatch(setorders(data));
  } catch (error) {
    dispatch(setError(error.message));
    if (error.responce && error.responce.statusCode == 401) {
      dispatch(logoutUser);
    }
  }
};
