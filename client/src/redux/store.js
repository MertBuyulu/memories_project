import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/index";

// middleware
import logger from "redux-logger";

const rootReducer = {
  posts: postsReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
