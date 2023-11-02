import { createReducer } from "@reduxjs/toolkit";

export const rootReducer = createReducer(
  { isAuthenticated: false ,
    isAdmin:false,
    isAuthenticatedUser:false,
    VenueLength : 1, 
    CaterLength : 1, 
    DJLength : 1, 
    PhotographerLength : 1, 
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
    logoutUser: (state) => { state.isAuthenticatedUser = false; },
    incrementVenue : (state) => { state.VenueLength+=1; },
    removeVenue : (state) => { state.VenueLength = 1; } ,
    incrementCater : (state) => { state.CaterLength+=1; },
    removeCater : (state) => { state.CaterLength = 1; } ,
    incrementDJ : (state) => { state.DJLength+=1; },
    removeDJ : (state) => { state.DJLength = 1; } ,
    incrementPhotographer : (state) => { state.PhotographerLength+=1; },
    removePhotographer : (state) => { state.PhotographerLength = 1; } 
  }
);
 