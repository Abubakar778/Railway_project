import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  items: [],
  error: null,
};

const filterCitySlice = createSlice({
  name: "filterCity",
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
    setError: (state, { payload }) => {
      state.loading = false;
      state.items = [];
      state.error = payload;
    },
  },
});

const { setError, setLoading, setItems } = filterCitySlice.actions;
export const filterCitySelector = (state) => state.filterCity;
export default filterCitySlice.reducer;

export const fetchdataCityFilter = (dept, dest) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(
      `/api/train/filter?dept=${dept}&dist=${dest}`
    );
    dispatch(setItems(data));
    console.log(data);
  } catch (error) {
    dispatch(setError(error.message));
  }
};
