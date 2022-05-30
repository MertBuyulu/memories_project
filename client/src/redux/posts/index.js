import { createSlice } from "@reduxjs/toolkit";

// reducer functions
import { getPosts, createPost, updatePost, deletePost } from "./post.utils";

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
      })
      .addCase(updatePost.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.filter((post) => post._id !== action.payload._id);
        console.log(state.posts);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// selectors
export const selectPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.isLoading;
export const selectPostsError = (state) => state.posts.error;

// retrieve the state of a specific post
export const selectPostById = (state, id) => {
  return id ? state.posts.posts.find((post) => post._id === id) : null;
};

export default postsSlice.reducer;
