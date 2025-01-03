import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/config';

function ViewBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null); // State for deletion message
    const [isDeleting, setIsDeleting] = useState(false); // State to track deletion process

    useEffect(() => {
        setLoading(true);
        service.getPost(id)
            .then((curr_post) => {
                setPost(curr_post);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        setIsDeleting(true); // Set deletion in progress
        service.deletePost(id)
            .then(() => service.deleteFile(post.featuredImage))
            .then(() => {
                setMessage("Post has been deleted successfully!"); // Set the deletion message
                setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
            })
            .catch(() => {
                setMessage("Failed to delete the post. Please try again.");
                setIsDeleting(false); // Reset deletion state on error
            });
    };

    if (loading) {
        return <p className="text-center mt-8">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-8">Error: {error.message}</p>;
    }

    return (
        <div style={{ minHeight: '100vh' }}>
            <div
                className="max-w-2xl mx-auto my-8 p-6 bg-white shadow-md rounded-md"
                style={{ marginTop: '10vh', height: 'auto' }}
            >
                {message && ( // Conditionally render the message
                    <p
                        className={`text-center py-2 px-4 mb-4 ${
                            message.includes("successfully")
                                ? "bg-green-100 text-green-800 border-l-4 border-green-500"
                                : "bg-red-100 text-red-800 border-l-4 border-red-500"
                        } rounded-md`}
                    >
                        {message}
                    </p>
                )}
                <div>
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt="Featured"
                        className="w-full h-64 object-cover rounded-md mb-6"
                    />
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <div className="flex justify-end">
                        <Link
                            to={`/Edit/${id}`}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting} // Disable the button while deleting
                            className={`font-bold py-2 px-4 rounded ${
                                isDeleting
                                    ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                                    : "bg-red-500 hover:bg-red-700 text-white"
                            }`}
                        >
                            {isDeleting ? "Deleting..." : "Delete"} {/* Change button text */}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewBlog;
