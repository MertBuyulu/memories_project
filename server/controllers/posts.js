import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({
      title,
      message,
      selectedFile,
      creator,
      tags,
    });
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.isValidObjectId(_id)) {
      return res.status(404).send("No post with given id");
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).send("No post with given id");
    }

    const deletedPost = await PostMessage.findByIdAndRemove(id);

    res.json(deletedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
