import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "http";
import Container, { Service } from "typedi";
import CommentService from "../service/comment.service";

@Service()
class CommentController {
  commentService = Container.get(CommentService);

  createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (res.locals.user === null) {
        throw new Error("잘못된 토큰입니다");
      }
      console.log("check");
      const { id } = res.locals.user;
      const { content, postId } = req.body;
      if (!content || !postId) {
        throw new Error("댓글 생성에 실패했습니다");
      }
      const newComment = await this.commentService.createComment(
        content,
        postId,
        id
      );
      res.status(201).json(newComment);
    } catch (err) {
      next(err);
    }
  };

  updatedComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (res.locals.user === null) {
        throw new Error("잘못된 토큰입니다");
      }
      const { id } = res.locals.user;
      const { content, commentId } = req.body;
      if (!content || !commentId) {
        throw new Error("입력값을 확인해 주세요");
      }
      await this.commentService.updatedComment(content, commentId, id);
      res.status(201).json({ success: true, message: "댓글이 수정되었습니다" });
    } catch (err) {
      next(err);
    }
  };

  deleteCommentByPostWriter = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (res.locals.user === null) {
        throw new Error("잘못된 토큰입니다");
      }
      const { id } = res.locals.user;
      const { commentId, postId } = req.body;
      if (!commentId && !postId) {
        throw new Error("입력값을 확인해 주세요");
      }
      const result = await this.commentService.deleteCommentByPostWriter(
        commentId,
        id,
        postId
      );
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default CommentController;
