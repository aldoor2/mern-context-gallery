import { useState, createContext, useContext, useEffect } from 'react';

import { createPostRequest, getPostsRequest } from '../api/posts';

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

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <postContext.Provider
      value={{
        posts,
        getPosts,
        createPost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
