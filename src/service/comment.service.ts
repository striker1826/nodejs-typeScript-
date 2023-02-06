import Container, { Service } from "typedi";
import CommentRepository from "../repository/comment.repository";
import PostRepository from "../repository/post.repository";

@Service()
class CommentService {
  commentRepository = Container.get(CommentRepository);
  postRepository = Container.get(PostRepository);
  createComment = async (content: string, postId: number, userId: number) => {
    const newComment = await this.commentRepository.createComment(
      content,
      postId,
      userId
    );
    return newComment;
  };

  updatedComment = async (
    content: string,
    commentId: number,
    userId: number
  ) => {
    const comment = await this.commentRepository.findCommentByCommentId(
      commentId
    );
    if (!comment) {
      throw new Error("존재하지 않는 댓글 입니다");
    }

    if (comment.userId !== userId) {
      throw new Error("수정 권한이 없습니다");
    }

    const updatedComment = await this.commentRepository.updatedComment(
      content,
      commentId,
      userId
    );
    return updatedComment;
  };

  deleteCommentByPostWriter = async (
    commentId: number,
    userId: number,
    postId: number
  ) => {
    const post = await this.postRepository.findOnePostByPostId(postId);
    const comment = await this.commentRepository.findCommentByCommentId(
      commentId
    );
    if (!post) {
      throw new Error("존재하지 않는 게시글 입니다");
    }

    if (!comment) {
      throw new Error("존재하지 않는 댓글 입니다");
    }

    if (post.userId === userId) {
      await this.commentRepository.deleteComment(commentId);
    } else if (comment.userId === userId) {
      await this.commentRepository.deleteComment(commentId);
    } else {
      throw new Error("삭제 권한이 없습니다");
    }
    return;
  };
}

export default CommentService;
