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
    <div>
      <Link to='/new' className='text-white'>
        Create New Post
      </Link>

      <div className='grid grid-cols-3 gap-3'>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
