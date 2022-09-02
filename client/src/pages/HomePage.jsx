import { VscEmptyWindow } from 'react-icons/vsc';

import { usePosts } from '../context/postContext';

export function HomePage() {
  const { posts } = usePosts();

  if (posts.length === 0)
    return (
      <div className='flex flex-col justify-center items-center'>
        <VscEmptyWindow className='w-48 h-48 text-white' />
        <h3 className='text-white text-2xl'>There are no posts</h3>
      </div>
    );

  return (
    <div className='text-white'>
      {posts.map((post) => (
        <div key={post._id}>{post.title}</div>
      ))}
    </div>
  );
}
