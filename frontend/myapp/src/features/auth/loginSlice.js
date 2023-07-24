import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetShoppingCart } from "../cart/cartSlice";
let userFromStorage = null;
try {
  userFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
} catch (error) {
  userFromStorage = null;
}

const initialState = {
  loading: false,
  userInfo: userFromStorage,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.userInfo = null;
    },
    setUser: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.userInfo = null;
      state.error = payload;
    },
    setLogout: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
    },
  },
});

const { setError, setLoading, setUser, setLogout } = loginSlice.actions;
export const loginSelector = (state) => state.login;
export default loginSlice.reducer;

export const loginUser = (email, password) => async (dispatch, getState) => {
  try {
    dispatch(setLoading);
    const { data } = await axios.post("/auth/login", {
      email,
      password,
    });
    dispatch(setUser(data));
    localStorage.setItem("userInfo", JSON.stringify(getState().login.userInfo));
  } catch (err) {
    let error =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(setError(error));
  }
};

export const loginRegistor = (info) => (dispatch, getState) => {
  dispatch(setUser(info));
  localStorage.setItem("userInfo", JSON.stringify(getState().login.userInfo));
};

export const logoutUser = (dispatch) => {
  dispatch(setLogout());
  localStorage.clear();
  dispatch(resetShoppingCart);
};
