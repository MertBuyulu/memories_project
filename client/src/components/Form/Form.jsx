import React from "react";
import { useState } from "react";
import FileBase64 from "react-file-base64";

// styles
import useStyles from "./form.styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

// redux
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/posts/index";

const Form = () => {
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(createPost(postData));
    // clear the form after submission
    clearForm();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setPostData({ ...postData, [name]: value });
  };

  const clearForm = () => {
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
        <Typography variant="h6">Create a Memory</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={handleChange}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={handleChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
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
