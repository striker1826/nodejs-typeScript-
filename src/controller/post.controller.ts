import { NextFunction, Request, Response } from "express";
import PostService from "../service/post.service";

class PostController {
  constructor(private postService: PostService) {}

  createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, content, disclosure } = req.body;
      const { id } = res.locals.user;
      if (!title || !content || !disclosure) {
        throw new Error("입력값을 확인해 주세요");
      }

      const newPost = await this.postService.createPost(
        title,
        content,
        disclosure,
        id
      );
      res.status(201).json({
        status: 201,
        success: true,
        message: "게시글 생성 성공",
        newPost,
      });
    } catch (err) {
      next(err);
    }
  };

  findByPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postService.findByPosts();
      res
        .status(200)
        .json({ success: true, message: "공개 게시글 전체 조회 성공", posts });
    } catch (err) {
      next(err);
    }
  };

  updatedPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;
      if (!postId || !title || !content) {
        throw new Error("입력값을 확인해 주세요");
      }
      const { id } = res.locals.user;
      await this.postService.updatedPost(Number(postId), title, content, id);
      res
        .status(201)
        .json({ success: true, message: "게시글 수정에 성공했습니다" });
    } catch (err) {
      next(err);
    }
  };

  deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;
      if (!postId) {
        throw new Error("입력값을 확인해 주세요");
      }
      const { id } = res.locals.user;
      await this.postService.deletePost(Number(postId), id);
      res
        .status(201)
        .json({ success: true, message: "게시글이 삭제되었습니다" });
    } catch (err) {
      next(err);
    }
  };
}

export default PostController;
