import { configureStore } from "@reduxjs/toolkit";

import accentReducer from "./UI/Accent/accentSlice";
import postReducer from "./UI/Post/postSlice";
import modalReducer from "./UI/Modal/modalSlice";
const store = configureStore({
  reducer: {
    accent: accentReducer,
    post: postReducer,
    modal: modalReducer,
  },
});

export default store;
