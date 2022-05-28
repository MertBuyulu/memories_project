import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { startTransition } from "react";

import * as api from "../../api/utils";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    const response = await api.fetchPosts();
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const INITIAL_STATE = { posts: [], isLoading: false, error: null };

const postsSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  reducers: {
    create(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        // update posts
        state.posts = action.payLoad;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// selectors
export const selectPosts = (state) => state.posts;
export const selectPostsStatus = (state) => state.isLoading;
export const selectPostsError = (state) => state.error;

export const { create } = postsSlice.actions;
export default postsSlice.reducer;
