import { VscEmptyWindow } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

import { usePosts } from '../context/postContext';

export function HomePage() {
  const { posts } = usePosts();

  if (posts.length === 0)
    return (
      <div className='flex flex-col justify-center items-center text-white'>
        <VscEmptyWindow className='w-48 h-48' />
        <h3 className=' text-2xl'>There are no posts</h3>
      </div>
    );

  return (
    <div className='text-white'>
      <Link to='/new'>Create New Post</Link>

      {posts.map((post) => (
        <div key={post._id}>{post.title}</div>
      ))}
    </div>
  );
}
