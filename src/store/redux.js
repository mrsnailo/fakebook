import { configureStore } from "@reduxjs/toolkit";

import accentReducer from "./UI/Accent/accentSlice";

const store = configureStore({
  reducer: {
    accent: accentReducer,
  },
});

export default store;
