import toast from 'react-hot-toast';

import { usePosts } from '../context/postContext';

export function PostCard({ post }) {
  const { deletePost } = usePosts();

  const handleDelete = (id) => {
    toast.custom(
      (t) => (
        <div
          className={`bg-zinc-700 px-4 py-2 shadow-md rounded-md ${
            !t.visible ? 'animate-pulse' : ''
          }`}
        >
          <p className='text-white'>
            Do you want to delete <strong>{id}</strong> ?
          </p>
          <div className='flex items-center justify-center mt-2 gap-2'>
            <button
              className='bg-zinc-800 hover:bg-red-600 px-2 py-1 rounded-md text-white text-xs'
              onClick={async () => {
                await deletePost(id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button
              className='bg-zinc-800 hover:bg-zinc-600 px-2 py-1 rounded-md text-white text-xs'
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
    <article className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black hover:bg-zinc-700'>
      <div className='px-4 py-7'>
        <header className='flex items-center justify-between mb-3'>
          <h3 className='text-xl font-semibold'>{post.title}</h3>
          <button
            className='bg-zinc-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm'
            onClick={() => handleDelete(post._id)}
          >
            Delete
          </button>
        </header>
        <p>{post.description}</p>
      </div>
    </article>
  );
}
