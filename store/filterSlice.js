import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  priceMin: "",
  priceMax: "",
  type: "",
  location: "",
  areaMin: "",
  areaMax: "",
  sort: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
