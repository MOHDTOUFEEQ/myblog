import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Postcard from "./Authenticated/Postcard";
import { Link } from "react-router-dom";
import service from "../appwrite/config";

function Allblogs() {
  const userid = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Dummy data for testing
    // const dummyPosts = [
    //   { $id: "1", title: "Blog One", content: "This is the first blog." },
    //   { $id: "2", title: "Blog Two", content: "This is the second blog." },
    // ];

    // Use dummy data instead of fetching for now
    // setPosts(dummyPosts);

    // Actual fetching logic (commented out for testing)
    async function fetching() {
      try {
        const post = await service.getPostsForCurrentUser(userid.$id);
        if (post) {
          setPosts(post.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetching();
  }, [userid]);

  return (
    <div className="min-h-screen mt-10vh px-5" style={{marginTop:"10vh"}}>
      {posts.length > 0 ? (
        <div className="flex flex-wrap gap-4 md:gap-8 lg:gap-12 xl:gap-16">
          {posts.map((post) => (
            <Link
              key={post.$id}
              to={`/all-Blog/${post.$id}`}
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4"
            >
              <Postcard post={post} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">No Blogs Posted Yet</h1>
          <p className="text-lg text-gray-600 mb-6">
            Start sharing your thoughts and ideas by creating your first blog!
          </p>
          <Link
            to="/create-post"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Create Blog
          </Link>
        </div>
      )}
    </div>
  );
}

export default Allblogs;
