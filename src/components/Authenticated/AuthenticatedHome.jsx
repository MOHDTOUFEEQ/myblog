import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../../appwrite/config";
import Postcard from "./Postcard";
import { Link } from "react-router-dom";

function AuthenticatedHome() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const user = useSelector((state) => state.auth.userData); // Get user data from the Redux store
  
  useEffect(() => {
    // Fetch posts and set loading to false
    async function fetchPosts() {
      setLoading(true); // Start loading
      try {
        const post = await service.getPosts();
        if (post) {
          setPosts(post.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false); // End loading
    }

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-wrap overflow-x-hidden" style={{ marginTop: "10vh", paddingLeft:'0.25rem', paddingRight:'0.25rem' }}>
    {!user && (
  // If no user, show the sign-up message
  <div className="w-full text-center py-2 px-4 bg-blue-100 border border-blue-300 rounded-md shadow-md my-4">
    <p className="text-sm text-blue-800 inline-block">
      <span className="font-semibold">Sign up</span> to upload your blog and share with the community.{" "}
      <Link 
        to="/sign-up" 
        className="text-blue-600 hover:text-blue-800 font-medium">
        Create an Account
      </Link>
    </p>
  </div>
)}


      
      {loading ? (
        // Skeleton loader
        <div className="min-h-screen flex flex-wrap gap-10 px-5">
          {Array(6)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="w-full md:w-1/2 lg:w-1/3 xl:w-[28vw] mb-10 p-4"
              >
                <div className="h-40 bg-gray-300 animate-pulse rounded-md mb-4"></div>
                <div className="h-6 bg-gray-300 animate-pulse rounded-md mb-2"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded-md"></div>
              </div>
            ))}
        </div>
      ) : (
        // Render posts
        <div className="min-h-screen flex flex-wrap px-[0.75rem] overflow-x-hidden">
          {posts.map((val) => (
            <div key={val.$id} className="w-full md:w-[40vw] lg:w-[35vw] xl:w-[29vw] mb-10">
              <Link to={`/homeview/${val.$id}`}>
                <Postcard post={val} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AuthenticatedHome;
