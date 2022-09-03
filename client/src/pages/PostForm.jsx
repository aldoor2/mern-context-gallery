import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import * as Yup from 'yup';

import { usePosts } from '../context/postContext';

const INITIAL_VALUES = {
  title: '',
  description: '',
};

export function PostForm() {
  const { createPost, getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState(INITIAL_VALUES);

  useEffect(() => {
    (async () => {
      if (params.id) {
        const data = await getPost(params.id);
        setPost(data);
      } else {
        setPost(INITIAL_VALUES);
      }
    })();
  }, [params.id]);

  return (
    <div className='flex items-center justify-center'>
      <div className='bg-zinc-800 p-10 shadow-md shadow-black w-96'>
        <header className='flex justify-between items-center py-4'>
          <h2 className='text-white font-bold text-xl'>
            {Boolean(params.id) ? 'Edit Post' : 'Create New Post'}
          </h2>
          <Link to='/' className='text-gray-400 hover:text-gray-300 text-sm'>
            Go back
          </Link>
        </header>

        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createPost(values);
            }

            navigate('/');
          }}
          enableReinitialize={true}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor='title'
                className='text-md block font-bold text-gray-400 py-1'
              >
                Title
              </label>
              <Field
                name='title'
                placeholder='Title'
                className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4'
              />
              <ErrorMessage
                component='p'
                className='text-red-400 text-sm'
                name='title'
              />

              <label
                htmlFor='description'
                className='text-md block font-bold text-gray-400 py-1'
              >
                Description
              </label>
              <Field
                component='textarea'
                name='description'
                placeholder='Description'
                className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4'
                rows={3}
              />
              <ErrorMessage
                component='p'
                className='text-red-400 text-sm'
                name='description'
              />

              <button
                type='submit'
                className='px-4 py-2 w-full text-white bg-indigo-600 hover:bg-indigo-500 rounded mt-2 focus:outline-none focus:bg-indigo-500 disabled:bg-indigo-400'
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
