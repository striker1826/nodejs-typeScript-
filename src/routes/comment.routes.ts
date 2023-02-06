import express, { Router } from "express";
import { auth_middleware } from "../middleware/auth_middleware";
import CommentController from "../controller/comment.controller";
import Container from "typedi";

const router: Router = express.Router();
const commentController = Container.get(CommentController);

router.post("/", auth_middleware, commentController.createComment);
router.patch("/:commentId", auth_middleware, commentController.updatedComment);
router.delete(
  "/",
  auth_middleware,
  commentController.deleteCommentByPostWriter
);

export default router;
