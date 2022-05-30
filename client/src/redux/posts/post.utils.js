import { createAsyncThunk } from "@reduxjs/toolkit";
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

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, post }) => {
    try {
      const response = await api.updatePost(id, post);
      // return the updated post
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  try {
    const response = await api.deletePost(id);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
