import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types'; // Import PropTypes
import service from '../../appwrite/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Postform({ post }) {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      status: post?.status || '',
      content: post?.content || '',
    },
  });

  const watchedFieldValue = watch('title');

  useEffect(() => {
    function slugTransform(value) {
      const transformedValue = value.replace(/[,\s]+/g, '-');
      setValue('slug', transformedValue, { required: true });
    }
    slugTransform(watchedFieldValue);
  }, [watchedFieldValue, setValue]);

  const formSubmit = async (data) => {
    try {
      if (data) {
        const file = await service.uploadFile(data.image[0]);
        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const userId = userData ? userData.$id : null;
          const post = await service.createPost({ ...data, userId });
          if (post) {
            navigate('/');
          }
        }
      }
    } catch (error) {
      setError(
        "Please don't use any commas, colons, or special characters in the title. Updates coming soon!",
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-1">
      <div className="bg-green-200 p-4 rounded-md mb-4">
        <p className="text-sm">
          ⚠️ Avoid special characters in the title for a smoother experience.
          Updates for more flexibility coming soon!
        </p>
      </div>
      <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 p-2 w-full border rounded-md"
            required
            {...register('title', { required: true })}
          />
        </div>
        <h4>
        {{error}}
        </h4>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="hidden text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            className="mt-1 p-2 w-full border rounded-md"
            {...register('slug', { required: false })}
            hidden
            disabled
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="hidden text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            className="mt-1 p-2 w-full border rounded-md"
            hidden
            {...register('status', { required: false })}
          >
            <option value="draft">Active</option>
            <option value="published">Deactive</option>
          </select>
        </div>

        {/* Image */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            id="image"
            className="mt-1 p-2 w-full border rounded-md"
            accept="image/*"
            required
            {...register('image', { required: true })}
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            className="mt-1 p-2 w-full border rounded-md"
            rows="8"
            required
            {...register('content', { required: true })}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

// Add PropTypes validation
Postform.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    status: PropTypes.string,
    content: PropTypes.string,
  }),
};

export default Postform;
