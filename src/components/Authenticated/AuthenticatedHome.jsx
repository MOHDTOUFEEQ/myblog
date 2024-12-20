import { useEffect, useState } from "react";
import service from "../../appwrite/config";
import Postcard from "./Postcard";
import { Link } from "react-router-dom";

function AuthenticatedHome() {
  const [posts, setPosts] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Fetch posts
    service.getPosts().then((post) => {
      if (post) {
        setPosts(post.documents);
      }
    });

    // Handle responsive layout
    const handleResize = () => {
      const isLarge = window.matchMedia("(min-width: 1024px)").matches;
      setIsLargeScreen(isLarge);
    };

    // Check screen size on initial render
    handleResize();

    // Listen to resize events
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-wrap px-5 overflow-x-hidden mt-10">
      {isLargeScreen ? (


        <div className="min-h-screen  flex flex-wrap  gap-10 px-5 overflow-x-hidden">
            {posts.map((val) => (
              <div key={val.id} className="w-full  md:w-1/2 lg:w-1/3 xl:w-1/4 mb-10">
                   <Link to={`/homeview/${val.$id}`}>
                    <Postcard post={val} />
                   </Link>
                </div>
            ))}
         </div>
      ) : (

        posts.map((val) => (
          <div key={val.id} className="w-full ">
            <Link to={`/homeview/${val.$id}`}>
              <Postcard post={val} />
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default AuthenticatedHome;
