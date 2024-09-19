import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  message: null,
  error: null,
};

export const User = createSlice({
  name: "Garvit Jain",
  initialState,
  reducers: {
    isLoginRequest: (state, action) => {
      (state.isAuthenticated = false), (state.loading = true);
    },
    isLoginSuccess: (state, action) => {
      (state.isAuthenticated = true),
        (state.user = action.payload.user),
        (state.loading = false),
        (state.message = "User Login Successfully");
    },
    isLoginFail: (state, action) => {
      (state.isAuthenticated = false),
        (state.loading = false),
        (state.error = action.payload.message);
    },
    isUserRequest: (state, action) => {
      (state.isAuthenticated = false), (state.loading = true);
    },
    isUserSuccess: (state, action) => {
      (state.isAuthenticated = true),
        (state.user = action.payload.userModel),
        (state.loading = false);
    },
    isUserFail: (state, action) => {
      (state.isAuthenticated = false), (state.loading = false);
    },
    isRequest: (state, action) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      (state.loading = false), (state.message = action.payload.message),
      state.isAuthenticated = false
    },
    getBillSuccess:(state, action)=>{
        state.loading = false, 
        state.message = action.payload.message,
        state.bill = action.payload.bill
    },
    getBillIDSuccess:(state, action)=>{
        state.loading = false, 
        state.message = action.payload.message,
        state.billData = action.payload.bill
    },
    isSuccess: (state, action) => {
      (state.loading = false), (state.message = action.payload.message);
    },
    isError: (state, action) => {
      (state.loading = false), (state.error = action.payload.message);
    },
    clearMessage: (state, action) => {
      state.message = null;
    },
    clearError: (state, action) => {
      state.error = null;
    },
  },
});

export const {
  isLoginFail,
  isLoginRequest,
  isLoginSuccess,
  isUserFail,
  isUserRequest,
  isUserSuccess,
  clearError,
  clearMessage,
  isError,
  isRequest,
  isSuccess,
  logoutSuccess,
  getBillSuccess,
  getBillIDSuccess
} = User.actions;
export default User.reducer;
