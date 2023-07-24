import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  order: {},
  error: null,
};

const singleOrderSlice = createSlice({
  name: "singleOrder",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.order = {};
      state.error = null;
    },
    setorder: (state, { payload }) => {
      state.loading = false;
      state.order = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.order = {};
      state.error = payload;
    },
  },
});

const { setLoading, setError, setorder } = singleOrderSlice.actions;
export const singleOrderSelector = (state) => state.singleOrder;
export default singleOrderSlice.reducer;

export const fetchSingleOrder = (id) => async (dispatch, getState) => {
  const { token } = getState().login.userInfo;
  const config = {
    headers: {
      authentication: `Bearer ${token}`,
      "content-type": "application/json",
    },
  };
  try {
    dispatch(setLoading());
    const { data } = await axios.get(`/order/${id}`, config);
    dispatch(setorder(data));
  } catch (err) {
    dispatch(setError(err.message));
  }
};
