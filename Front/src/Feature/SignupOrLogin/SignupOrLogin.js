import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LoginService from "../../services/LoginService";
import SignupService from "../../services/SignupService";

export const loginUser = createAsyncThunk(
  "signupOrLogin/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await LoginService(user);
      localStorage.setItem("auth", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signupUser = createAsyncThunk(
  "signupOrLogin/signupUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await SignupService(user);
      localStorage.setItem("auth", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const user = JSON.parse(localStorage.getItem("auth"));

const SignupOrLoginSlice = createSlice({
  name: "signupOrLogin",
  initialState: {
    user: user ? user : false,
    error: "",
    isSuccess: false,
  },
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("auth");
      state.user = false;
      state.error = "";
      state.isSuccess = false;
    },
    reset: (state) => {
      state.error = "";
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.user = { ...action.payload };
      state.isSuccess = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.error = payload.response.data.message;
    },
    [signupUser.fulfilled]: (state, action) => {
      state.user = { ...action.payload };
      state.isSuccess = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.error = payload.response.data.message;
    },
  },
});

export const { logOut, reset } = SignupOrLoginSlice.actions;

export default SignupOrLoginSlice.reducer;
