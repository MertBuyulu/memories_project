import React from "react";
import { useState, useEffect } from "react";
import FileBase64 from "react-file-base64";

// styles
import useStyles from "./form.styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

// redux
import { useSelector, useDispatch } from "react-redux";
import { selectPostById } from "../../redux/posts";
import { createPost, updatePost } from "../../redux/posts/post.utils";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) => selectPostById(state, currentId));
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentId) {
      dispatch(updatePost({ id: currentId, post: postData }));
    } else {
      dispatch(createPost(postData));
    }
    // clear the form after submission
    clearForm();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setPostData({ ...postData, [name]: value });
  };

  const clearForm = () => {
    setCurrentId(null);

    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={`${classes.root} ${classes.paper}`}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Edit" : "Create"} Your Memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="creator"
          fullWidth
          value={postData.creator}
          onChange={handleChange}
        />
        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          name="message"
          variant="outlined"
          label="message"
          fullWidth
          value={postData.message}
          onChange={handleChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={handleChange}
        />
        <div className={classes.fileInput}>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={clearForm}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
