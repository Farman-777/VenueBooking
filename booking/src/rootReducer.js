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
    incrementVenue: (state) => {
      return { ...state, VenueLength: state.VenueLength + 1 };
    },
    removeVenue: (state) => {
      return { ...state, VenueLength: 1 };
    },
    incrementCater: (state) => {
      return { ...state, CaterLength: state.CaterLength + 1 };
    },
    removeCater: (state) => {
      return { ...state, CaterLength: 1 };
    },
    incrementDJ: (state) => {
      return { ...state, DJLength: state.DJLength + 1 };
    },
    removeDJ: (state) => {
      return { ...state, DJLength: 1 };
    },
    incrementPhotographer: (state) => {
      return { ...state, PhotographerLength: state.PhotographerLength + 1 };
    },
    removePhotographer: (state) => {
      return { ...state, PhotographerLength: 1 };
    },
  }
);
