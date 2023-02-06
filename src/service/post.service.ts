import Container, { Service } from "typedi";
import PostRepository from "../repository/post.repository";

@Service()
class PostService {
  postRepository = Container.get(PostRepository);

  createPost = async (
    title: string,
    content: string,
    disclosure: boolean,
    userId: number
  ) => {
    const newPost = await this.postRepository.createPost(
      title,
      content,
      disclosure,
      userId
    );
    return {
      postId: newPost.postId,
      title: newPost.title,
      content: newPost.content,
      userId: newPost.userId,
    };
  };

  findByPosts = async () => {
    const posts = await this.postRepository.findByPosts();
    return posts;
  };

  updatedPost = async (
    postId: number,
    title: string,
    content: string,
    userId: number
  ) => {
    const post = await this.postRepository.findOnePostByPostId(postId);
    if (!post) {
      throw new Error("존재하지 않는 게시글 입니다");
    }

    if (post.userId !== userId) {
      throw new Error("수정 권한이 없습니다");
    }
    const updatedPost = await this.postRepository.updatedPost(
      postId,
      title,
      content,
      userId
    );
    return updatedPost;
  };

  deletePost = async (postId: number, userId: number) => {
    const post = await this.postRepository.findOnePostByPostId(postId);
    if (!post) {
      throw new Error("존재하지 않는 게시글 입니다");
    }

    if (post.userId !== userId) {
      throw new Error("삭제 권한이 없습니다");
    }
    await this.postRepository.deletePost(postId, userId);
    return;
  };
}

export default PostService;
