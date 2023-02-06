import express, { Router } from "express";
import { auth_middleware } from "../middleware/auth_middleware";
import PostController from "../controller/post.controller";
import PostService from "../service/post.service";
import PostRepository from "../repository/post.repository";

const router: Router = express.Router();
const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

router.post("/", auth_middleware, postController.createPost);
router.get("/", postController.findByPosts);
router.patch("/:postId", auth_middleware, postController.updatedPost);
router.delete("/:postId", auth_middleware, postController.deletePost);

export default router;
