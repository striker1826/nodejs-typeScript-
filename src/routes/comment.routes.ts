import express, { Router } from "express";
import { auth_middleware } from "../middleware/auth_middleware";
import CommentController from "../controller/comment.controller";
import CommentService from "../service/comment.service";
import CommentRepository from "../repository/comment.repository";
import PostRepository from "../repository/post.repository";

const router: Router = express.Router();
const commentRepository = new CommentRepository();
const postRepository = new PostRepository();
const commentService = new CommentService(commentRepository, postRepository);
const commentController = new CommentController(commentService);

router.post("/", auth_middleware, commentController.createComment);
router.patch("/:commentId", auth_middleware, commentController.updatedComment);
router.delete(
  "/",
  auth_middleware,
  commentController.deleteCommentByPostWriter
);

export default router;
