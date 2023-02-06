import { AppDataSource } from "../data-source";
import { Comment } from "../entity/Comment";
import { Post } from "../entity/Post";

class CommentRepository {
  createComment = async (content: string, postId: number, userId: number) => {
    console.log(userId);
    const newComment = await AppDataSource.getRepository(Comment).save({
      content,
      postId,
      userId,
    });
    return newComment;
  };

  updatedComment = async (
    content: string,
    commentId: number,
    userId: number
  ) => {
    const updatedComment = await AppDataSource.getRepository(Comment)
      .createQueryBuilder()
      .update()
      .set({ content })
      .where("commentId = :commentId", { commentId })
      .andWhere("userId = :userId", { userId })
      .execute();
    return updatedComment;
  };

  findCommentByCommentId = async (commentId: number) => {
    const comment = await AppDataSource.getRepository(Comment)
      .createQueryBuilder()
      .where("commentId = :commentId", { commentId })
      .getOne();
    return comment;
  };

  deleteComment = async (commentId: number) => {
    AppDataSource.getRepository(Comment)
      .createQueryBuilder()
      .delete()
      .where("commentId = :commentId", { commentId })
      .execute();
  };
}

export default CommentRepository;
