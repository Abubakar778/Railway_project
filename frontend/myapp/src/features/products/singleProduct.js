import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  item: {},
  error: null,
};

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.item = {};
      state.error = null;
    },
    setItem: (state, { payload }) => {
      state.loading = false;
      state.item = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.item = {};
      state.error = payload;
    },
  },
});

const { setLoading, setError, setItem } = singleProductSlice.actions;
export const singleProductSelector = (state) => state.singleProduct;
export default singleProductSlice.reducer;

export const fetchSingleData = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(`/api/train/${id}`);
    dispatch(setItem(data));
  } catch (err) {
    dispatch(setError(err.responce.message.data));
  }
};
