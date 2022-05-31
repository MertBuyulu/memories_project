import React, { useState } from "react";
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

import { useDispatch } from "react-redux";
// redux actions
import { getPosts } from "./redux/posts/post.utils";

const App = () => {
  const [currentId, setCurrentId] = useState(0);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

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
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
