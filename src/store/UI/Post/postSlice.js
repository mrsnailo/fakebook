import { createSlice } from "@reduxjs/toolkit";
import pokemon from "../../../assets/images/backgrounds/post-background/pokemon.jpg";
import barcelona from "../../../assets/images/backgrounds/post-background/barcelona.jpg";
import nature from "../../../assets/images/backgrounds/post-background/nature.jpg";
import nezuko from "../../../assets/images/backgrounds/post-background/nezuko.jpg";
import sakura from "../../../assets/images/backgrounds/post-background/sakura.jpg";

const initialState = {
  posts: [],
  postbackgrounds: [
    {
      name: "pokemon",
      url: pokemon,
    },
    {
      name: "barcelona",
      url: barcelona,
    },
    {
      name: "nature",
      url: nature,
    },
    {
      name: "nezuko",
      url: nezuko,
    },
    {
      name: "sakura",
      url: sakura,
    },
  ],
  activeBackground: {},
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
    savePost: (state) => {
      state.posts.push(state.draftPost);
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
