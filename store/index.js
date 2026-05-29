// ======================================================
// File: store/index.js
// Description: Redux Store
// ======================================================

import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./filterSlice";

const store = configureStore({
  reducer: {
    filters: filterReducer,
  },
});

export default store;
