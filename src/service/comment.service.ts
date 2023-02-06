import CommentRepository from "../repository/comment.repository";
import PostRepository from "../repository/post.repository";

class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private postRepository: PostRepository
  ) {}

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
    if (postId) {
      const post = await this.postRepository.findOnePostByPostId(postId);
      if (post.userId !== userId) {
        throw new Error("게시글 작성자가 아닙니다");
      }
      this.commentRepository.deleteByPostWriter(commentId);
      return;
    } else if (!postId) {
      const comment = await this.commentRepository.findCommentByCommentId(
        commentId
      );

      if (!comment) {
        throw new Error("존재하지 않는 댓글입니다");
      }

      if (comment.userId !== userId) {
        throw new Error("작성자만 삭제가 가능합니다");
      }

      this.commentRepository.deleteByCommentWriter(commentId, userId);
      return;
    }
  };
}

export default CommentService;
