import { configureStore } from "@reduxjs/toolkit";

import accentReducer from "./UI/Accent/accentSlice";
import postReducer from "./UI/Post/postSlice";
const store = configureStore({
  reducer: {
    accent: accentReducer,
    post: postReducer,
  },
});

export default store;
