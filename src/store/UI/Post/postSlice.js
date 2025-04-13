import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  postbackgrounds: [
    "theme-sunset",
    "theme-ocean",
    "theme-forest",
    "theme-dusk",
    "theme-candy",
  ],
  activeBackground: "white",
  draftPost: {
    content: "",
    background: "white",
    activeAudience: "public",
    feeling: null,
    activity: null,
    location: null,
  },
};
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.activeBackground = action.payload;
      state.draftPost.background = action.payload; // Sync with activeBackground
    },
    setContent: (state, action) => {
      state.draftPost.content = action.payload;
    },
    setFeeling: (state, action) => {
      state.draftPost.feeling = action.payload;
    },

    setLocation: (state, action) => {
      state.draftPost.location = action.payload;
    },
    setAudience: (state, action) => {
      state.draftPost.activeAudience = action.payload;
    },
    setActivity: (state, action) => {
      state.draftPost.activity = action.payload;
    },
    clearDraft: (state) => {
      state.draftPost = {
        content: "",
        background: state.activeBackground,
        feeling: null,
        tags: [],
        location: null,
      };
    },
    savePost: (state, action) => {
      state.posts.push(action.payload);
      state.draftPost = {
        content: "",
        background: state.activeBackground,
        feeling: null,
        tags: [],
        location: null,
      };
    },
  },
});

export const {
  setActive,
  setContent,
  setFeeling,
  addTag,
  removeTag,
  setLocation,
  setAudience,
  setActivity,
  clearDraft,
  savePost,
} = postSlice.actions;

export default postSlice.reducer;
