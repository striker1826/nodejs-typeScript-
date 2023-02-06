import PostRepository from "../repository/post.repository";

class PostService {
  constructor(private postRepository: PostRepository) {}

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
    const updatedPost = await this.postRepository.updatedPost(
      postId,
      title,
      content,
      userId
    );

    return updatedPost;
  };

  deletePost = async (postId: number, userId: number) => {
    await this.postRepository.deletePost(postId, userId);
    return;
  };
}

export default PostService;
