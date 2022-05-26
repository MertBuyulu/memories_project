import express from "express";
const router = express.Router();

// controllers
import { getPosts } from "../controllers/posts.js";

router.get("/", getPosts);

export default router;
