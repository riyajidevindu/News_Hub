/* eslint-disable react/prop-types */
import { IMAGEFOLDER } from "../url";

const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex mt-8 space-x-4 bg-white rounded-lg p-4 shadow-md">
      {/* Left - Image */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={IMAGEFOLDER + post.photo} alt={post.title} className="h-full w-full object-cover rounded-lg" />
      </div>
      {/* Right - Content */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl text-gray-800">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between space-x-4 md:mb-4">
          <p className="text-gray-600">@{post.username}</p>
          <div className="flex space-x-2 text-gray-600">
            <p>{new Date(post.updatedAt).toDateString()}</p>
            <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 break-words md:text-lg">
          {post.description.slice(0, 200)}{" "}
          <span className="text-blue-500 cursor-pointer hover:underline">...Read more</span>
        </p>
      </div>
    </div>
  );
}

export default HomePosts;
