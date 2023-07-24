import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  user: [],
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.user = [];
    },
    setuser: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    },

    setError: (state, { payload }) => {
      state.loading = false;
      state.user = [];
      state.error = payload;
    },
  },
});

const { setError, setLoading, setuser } = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;

export const fetchuser = async (dispatch, getState) => {
  const { token } = getState().login.userInfo;
  const config = {
    headers: {
      authentication: `Bearer ${token}`,
      "content-type": "applicaiton/json",
    },
  };
  try {
    dispatch(setLoading());
    const { data } = await axios.get("/admin/user", config);
    dispatch(setuser(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
