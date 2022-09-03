import { useState, createContext, useContext, useEffect } from 'react';

import {
  createPostRequest,
  deletePostRequest,
  getPostsRequest,
} from '../api/posts';

const postContext = createContext();

export const usePosts = () => {
  const context = useContext(postContext);
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await getPostsRequest();
    setPosts(res.data.data);
  };

  const createPost = async (post) => {
    const res = await createPostRequest(post);
    setPosts((oldPosts) => [...oldPosts, { ...res.data.data }]);
  };

  const deletePost = async (postId) => {
    const res = await deletePostRequest(postId);
    if (res.status === 204)
      setPosts((oldPosts) =>
        oldPosts.filter((oldPost) => oldPost._id !== postId)
      );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <postContext.Provider
      value={{
        posts,
        getPosts,
        createPost,
        deletePost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
