// rootReducer.js
import { createReducer } from "@reduxjs/toolkit";

export const rootReducer = createReducer(
  {
    isAuthenticated: false,
    isAdmin: false,
    isAuthenticatedUser: false,
    VenueLength: 1,
    CaterLength: 1,
    DJLength: 1,
    PhotographerLength: 1,
    userID: "",
    userEmail: "",
  },
  {
    loginAdmin: (state) => {
      return { ...state, isAuthenticated: true, isAdmin: true };
    },
    logoutAdmin: (state) => {
      return { ...state, isAuthenticated: false, isAdmin: false };
    },
    loginUser: (state) => {
      return { ...state, isAuthenticatedUser: true };
    },
    logoutUser: (state) => {
      return { ...state, isAuthenticatedUser: false };
    },
    addUserID: (state, action) => {
      state.userID = action.payload;
    },
    removeUserID: (state) => {
      state.userID = "";
    },
  }
);
