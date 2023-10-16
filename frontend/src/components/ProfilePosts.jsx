/* eslint-disable react/prop-types */
import { IMAGEFOLDER } from '../url';

const ProfilePosts = ({ p }) => {
  return (
    <div className="w-full flex mt-8 space-x-4 shadow-md p-4 bg-white rounded-lg">
      {/* Left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={IMAGEFOLDER + p.photo} alt="" className="h-full w-full object-cover rounded-lg" />
      </div>
      {/* Right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl md:text-2xl font-bold mb-2">{p.title}</h1>
        <div className="flex items-center justify-between mb-2 text-sm font-semibold text-gray-500">
          <p>@{p.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(p.updatedAt).toDateString()}</p>
            <p>{new Date(p.updatedAt).toLocaleTimeString()}</p>
          </div>
        </div>
        <p className="text-sm md:text-base">{p.description.slice(0, 200)} ...</p>
        <a
          href={`/news/details/${p._id}`}
          className="text-blue-600 hover:underline hover:text-blue-800 text-sm md:text-base mt-2"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default ProfilePosts;
