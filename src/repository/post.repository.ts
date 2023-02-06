import { Service } from "typedi";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";

@Service()
class PostRepository {
  createPost = async (
    title: string,
    content: string,
    disclosure: boolean,
    userId: number
  ) => {
    const newPost = AppDataSource.getRepository(Post).create({
      title,
      content,
      disclosure,
      userId,
    });

    await AppDataSource.getRepository(Post).save(newPost);
    return newPost;
  };

  findByPosts = async () => {
    const posts = await AppDataSource.getRepository(Post).find({
      where: {
        disclosure: true,
      },
    });
    return posts;
  };

  findOnePostByPostId = async (postId: number) => {
    const post = await AppDataSource.getRepository(Post)
      .createQueryBuilder()
      .where("postId = :postId", { postId })
      .getOne();
    return post;
  };

  updatedPost = async (
    postId: number,
    title: string,
    content: string,
    userId: number
  ) => {
    console.log("여기...");
    const updatedPost = await AppDataSource.getRepository(Post)
      .createQueryBuilder()
      .update()
      .set({ title, content })
      .where("postId = :postId", { postId })
      .andWhere("userId = :userId", { userId })
      .execute();
  };

  deletePost = async (postId: number, userId: number) => {
    await AppDataSource.getRepository(Post)
      .createQueryBuilder()
      .delete()
      .where("postId = :postId", { postId })
      .andWhere("userId = :userId", { userId })
      .execute();

    return;
  };
}

export default PostRepository;
