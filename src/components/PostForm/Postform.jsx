import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import service from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import imageCompression from "browser-image-compression";

function Postform({ post = {} }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for form submission
  const [message, setMessage] = useState(null); // State for success message
  const userData = useSelector((state) => state.auth.userData);

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      status: post?.status || "",
      content: post?.content || "",
    },
  });

  const watchedFieldValue = watch("title");

  useEffect(() => {
    function slugTransform(value) {
      const transformedValue = value.replace(/[,\s]+/g, "-").toLowerCase();
      setValue("slug", transformedValue, { shouldValidate: true });
    }
    if (watchedFieldValue) {
      slugTransform(watchedFieldValue);
    }
  }, [watchedFieldValue, setValue]);

  const generateHash = (value) => {
    const urlSafeHash = CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
    return urlSafeHash.substring(0, 35);
  };

  const formSubmit = async (data) => {
    try {
      setIsSubmitting(true); // Set submitting state
      if (data) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        const compressedBlob = await imageCompression(data.image[0], options);

        const convertToJPEG = async (blob) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
              canvas.toBlob(
                (blob) => resolve(blob),
                "image/jpeg",
                0.8
              );
            };
            img.onerror = (err) => reject(err);
            img.src = URL.createObjectURL(blob);
          });
        };

        const jpegBlob = await convertToJPEG(compressedBlob);
        const jpegFile = new File([jpegBlob], "image.jpg", { type: "image/jpeg" });

        const file = await service.uploadFile(jpegFile);

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const titleHash = generateHash(data.title);
          const userId = userData ? userData.$id : null;

          const createdPost = await service.createPost({
            ...data,
            userId,
            titleHash,
          });

          if (createdPost) {
            setMessage("Post created successfully! Redirecting...");
            setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
          }
        }
      }
    } catch (error) {
      setError("Failed to create the post. Please try again.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div
      className="postting max-w-3xl mx-auto px-5 py-8 bg-white shadow-lg rounded-lg mt-[10vh] sm:h-[105vh] md:h-[95vh] h-auto pt-[6vh]"
      style={{ height: "100vh" }}
    >
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 text-red-600 p-4 mb-6 rounded-md">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {message && (
        <div className="bg-green-50 border-l-4 border-green-400 text-green-600 p-4 mb-6 rounded-md">
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      <div
        className="text-center mb-10"
        style={{ position: "relative", bottom: "2vh" }}
      >
        <h1 className="text-4xl font-bold text-gray-800">Create Your Blog Post</h1>
        <p className="text-lg text-gray-600">Share your thoughts and ideas with the world!</p>
      </div>

      <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter the title of your post"
            required
            {...register("title", { required: true })}
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-semibold text-gray-700"
          >
            Featured Image
          </label>
          <input
            type="file"
            id="image"
            className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            accept="image/*"
            required
            {...register("image", { required: true })}
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-semibold text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Write the content of your post..."
            rows="8"
            required
            {...register("content", { required: true })}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting} // Disable button during submission
            className={`px-6 py-3 text-sm font-medium rounded-lg shadow ${
              isSubmitting
                ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"} {/* Dynamic button text */}
          </button>
        </div>
      </form>
    </div>
  );
}

Postform.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    status: PropTypes.string,
    content: PropTypes.string,
  }),
};

export default Postform;
