import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  cities: [],
  error: null,
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.cities = [];
    },
    setcities: (state, { payload }) => {
      state.loading = false;
      state.cities = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.cities = [];
      state.error = payload;
    },
  },
});

const { setError, setLoading, setcities } = citySlice.actions;
export const citySelector = (state) => state.city;
export default citySlice.reducer;

export const fetchcities = async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get("/city");
    dispatch(setcities(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
