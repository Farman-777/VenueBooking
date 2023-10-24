import { createReducer } from "@reduxjs/toolkit";

export const rootReducer = createReducer(
  { isAuthenticated: false ,
    isAdmin:false,
    isAuthenticatedUser:false,
  },
  {
    loginAdmin: (state) => {
      state.isAuthenticated = true;
      state.isAdmin = true;
    },
    logoutAdmin: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
    loginUser: (state) => {
      state.isAuthenticatedUser = true;

    },
    logoutUser: (state) => {
      state.isAuthenticatedUser = false;
    },
   
  }
);
