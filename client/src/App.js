import React from "react";
// hooks
import { useEffect } from "react";
// pre-built style components
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
// components
import Form from "./components/Form/form";
import Posts from "./components/Posts/posts";
// images
import memories from "./assets/memories.png";
// styles
import useStyles from "./app.styles";
// redux
import { useSelector, useDispatch } from "react-redux";
// redux actions
import { getPosts, selectPosts } from "./redux/posts";

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Container maxwidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
