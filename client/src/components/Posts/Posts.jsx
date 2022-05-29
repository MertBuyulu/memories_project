import React from "react";
// components
import Post from "./Post/post";
// styles
import useStyles from "./posts.styles";
import { Grid, CircularProgress } from "@material-ui/core";
//redux
import { useSelector } from "react-redux";
import { selectPosts } from "../../redux/posts";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector(selectPosts);

  const classes = useStyles();
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
