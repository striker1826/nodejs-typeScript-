import express, { Router } from "express";
import { auth_middleware } from "../middleware/auth_middleware";
import PostController from "../controller/post.controller";
import Container from "typedi";

const router: Router = express.Router();
const postController = Container.get(PostController);

router.post("/", auth_middleware, postController.createPost);
router.get("/", postController.findByPosts);
router.patch("/:postId", auth_middleware, postController.updatedPost);
router.delete("/:postId", auth_middleware, postController.deletePost);

export default router;
