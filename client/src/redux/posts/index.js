import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../api/utils";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    const response = await api.fetchPosts();
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const createPost = createAsyncThunk("posts/createPost", async (post) => {
  try {
    const response = await api.createPost(post);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const INITIAL_STATE = { posts: [], status: "idle", error: null };

const postsSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // update posts
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = [...state.posts, action.payload];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
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
