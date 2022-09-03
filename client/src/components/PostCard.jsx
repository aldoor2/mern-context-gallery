import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { usePosts } from '../context/postContext';

export function PostCard({ post }) {
  const { deletePost } = usePosts();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    toast.custom(
      (t) => (
        <div
          className={`bg-zinc-700 px-4 py-2 shadow-md rounded-md text-white ${
            !t.visible ? 'animate-pulse' : ''
          }`}
        >
          <p>
            Do you want to delete <strong>{id}</strong> ?
          </p>
          <div className='flex items-center justify-center mt-2 gap-2'>
            <button
              className='bg-zinc-800 hover:bg-red-600 px-2 py-1 rounded-md text-xs'
              onClick={async () => {
                await deletePost(id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button
              className='bg-zinc-800 hover:bg-zinc-600 px-2 py-1 rounded-md text-xs'
              onClick={() => toast.dismiss(t.id)}
            >
              Cencel
            </button>
          </div>
        </div>
      ),
      {
        id,
      }
    );
  };

  return (
    <article
      className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black hover:bg-zinc-700 hover:cursor-pointer'
      onClick={() => navigate(`/posts/${post._id}`)}
    >
      <div className='px-4 py-7'>
        <header className='flex items-center justify-between mb-3'>
          <h3 className='text-xl font-semibold'>{post.title}</h3>
          <button
            className='bg-zinc-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm'
            onClick={(e) => {
              handleDelete(post._id);
              e.stopPropagation();
            }}
          >
            Delete
          </button>
        </header>
        <p className='w-full'>{post.description}</p>
      </div>
      {Boolean(post.image) && (
        <img
          src={post.image.url}
          alt={post.title}
          className='w-full h-64 object-cover'
        />
      )}
    </article>
  );
}
