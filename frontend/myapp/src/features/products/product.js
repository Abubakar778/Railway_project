import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  items: [],
  error: null,
};

const productSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.items = [];
    },
    setItems: (state, { payload }) => {
      state.loading = false;
      state.items = payload;
      state.error = null;
    },
    removeItem: (state, { payload }) => {
      let productId = payload;
      state.items = state.items.filter((item) => item._id !== productId);
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.items = [];
      state.error = payload;
    },
  },
});

const { setError, setLoading, setItems, removeItem } = productSlice.actions;
export const productSliceSelector = (state) => state.productList;
export default productSlice.reducer;

export const fetchdata = async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get("/api/train/");
    dispatch(setItems(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteTrain = (id) => async (dispatch, getState) => {
  const { token } = getState().login.userInfo;
  const config = {
    headers: {
      authentication: `Bearer ${token}`,
      "content-type": "application/json",
    },
  };
  try {
    await axios.delete(`/admin/train/${id}`, config);
    dispatch(removeItem(id));
  } catch (err) {
    dispatch(err.message);
  }
};
