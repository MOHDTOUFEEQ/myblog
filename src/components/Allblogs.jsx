import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import service from '../appwrite/config';
import Postcard from './Authenticated/Postcard';
import { Link } from 'react-router-dom';

function Allblogs() {
    const userid = useSelector((state) => state.auth.userData);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetching() {
            try {
                const post = await service.getPostsForCurrentUser(userid.$id);
                if (post) {
                    setPosts(post.documents);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetching();
    }, [userid]); // Add userid as a dependency

    return (
        <div>
            {posts.length > 0 ? (
                <div className="flex flex-wrap gap-4 md:gap-8 lg:gap-12 xl:gap-16">
                    {posts.map((e) => (
                        <Link
                            key={e.$id}
                            to={`/all-Blog/${e.$id}`}
                            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4"
                        >
                            <Postcard post={e} />
                        </Link>
                    ))}
                </div>
            ) : (
                <h1 className='h-screen text-center pt-10 text-4xl '>No posts</h1>
            )}
        </div>
    );
}

export default Allblogs;
