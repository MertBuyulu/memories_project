import PostActionTypes from "./posts.types";

const INITIAL_STATE = {
  posts: [],
};

// NOTE: we need to return versions of our states so that our components know what to render
const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  }
};

export default postsReducer;
