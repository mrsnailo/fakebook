import { createSlice } from "@reduxjs/toolkit";
import accentData from "../../../Data/accents.json";

const accentOptions = Object.entries(accentData).map(([name, color]) => ({
  name,
  color,
}));

const initialState = {
  options: accentOptions,
  activeAccent: "#1877F2",
};

const accentSlice = createSlice({
  name: "accent",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.activeAccent = action.payload;
    },
  },
});

export const { setActive } = accentSlice.actions;

export default accentSlice.reducer;
