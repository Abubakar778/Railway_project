import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loginRegistor } from "./loginSlice";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const registorSlice = createSlice({
  name: "registor",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    setSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    },
    setReset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

const { setError, setLoading, setSuccess, setReset } = registorSlice.actions;
export const registorSelector = (state) => state.registor;
export default registorSlice.reducer;

export const registorUser =
  (name, email, password, confirmpassword) => async (dispatch, getState) => {
    try {
      dispatch(setLoading());
      const { data } = await axios.post("/auth/registor", {
        name,
        email,
        password,
        confirmpassword,
      });
      dispatch(setSuccess());
      dispatch(loginRegistor(data));
    } catch (err) {
      dispatch(setError(err.response.data.message));
    }
  };

export const resetRegistor = (dispatch) => {
  dispatch(setReset());
};
