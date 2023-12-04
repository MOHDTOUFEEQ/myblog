import React, { useEffect, useState } from 'react';
import service from '../../appwrite/config';
import Postcard from './Postcard';
import { Link } from 'react-router-dom';

function AuthenticatedHome() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts().then((post) => {
      if (post) {
        setPosts(post.documents);
      }
    });
  }, []);
  return (
    <>
      <h1>
          <div className="h-screen flex flex-wrap  gap-10 p-8">
            {posts.map((val) => (
                <div key={val.id} className="w-full  md:w-1/2 lg:w-1/3 xl:w-1/4 mb-10">
                   <Link to={`/homeview/${val.$id}`}>
                    <Postcard post={val} />
                   </Link>
                </div>
            ))}
         </div>
      </h1>
    </>
  );
}

export default AuthenticatedHome;
