import { VscEmptyWindow } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

import { usePosts } from '../context/postContext';
import { PostCard } from '../components/PostCard';

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
      <header className='flex justify-between items-center py-4'>
        <h1 className='text-2xl text-gray-300 font-bold'>
          Post ({posts.length})
        </h1>
        <Link
          to='/new'
          className='px-3 py-2 text-sm rounded bg-indigo-600 hover:bg-indigo-500 focus:outline-none'
        >
          Create New Post
        </Link>
      </header>

      <div className='grid grid-cols-3 gap-3'>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
