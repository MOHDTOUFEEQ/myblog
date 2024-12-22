import PropTypes from 'prop-types'; // Import PropTypes
import service from '../../appwrite/config';
// import { Link } from 'react-router-dom';

function Postcard({ post }) {
  return (
    <>
    {/* <div className="relative h-80  overflow-hidden rounded-3xl border-2 px-6 border-black pl-2">
      <img
        src={service.getFilePreview(post.featuredImage)}
        alt="AirMax Pro"
        className="z-0 h-3/4 w-full rounded-2xl object-contain"
        />
      <div className="absolute bottom-4 left-4 text-left">
        <h1 className="text-lg font-semibold text-black">{post.title}</h1>

        <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-black">
          View Blog →
        </button>
      </div>
    </div> */}
    <div className="bg-gray-100 p-4" style={{display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'}}>
        <div className="bg-white border rounded-sm max-w-md">
        {/* <Link to={`/profile/${post.title}`}> */}

          <div className="flex items-center px-4 py-3">
           <div className="ml-3 ">
              <span className="text-sm font-semibold antialiased block leading-tight">{post.title}</span>
              {/* <span className="text-gray-600 text-xs block">{post.title}</span> */}
            </div>
          </div>
        {/* </Link> */}
          <div style={{ position: 'relative', overflow: 'hidden', maxHeight: '450px' }}>
            <img src={service.getFilePreview(post.featuredImage)} className="w-full h-full object-fit-contain" alt="Post Image" />
      
          </div>
          <div className="font-semibold text-sm mx-4 mt-2 mb-4">   View Blog →</div>
     
              
        </div>
      </div>

        </>

  );
}

// Add PropTypes validation
Postcard.propTypes = {
  post: PropTypes.shape({
    featuredImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Postcard;
