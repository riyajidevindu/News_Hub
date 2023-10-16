import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import Comment from '../components/Comment';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { URL, IMAGEFOLDER } from '../url';
import { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { UserContext } from "../context/UserContext"

const NewsDetails = () => {
  const newsId = useParams().id;
  const [news, setNews] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchNews = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + '/api/newss/' + newsId);
      setNews(res.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  const handleDeleteNews = async () => {
    try {
      const res = await axios.delete(URL + '/api/newss/' + newsId, { withCredentials: true });
      console.log(res.data);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [newsId]);

  const fetchNewsComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + '/api/comments/news/' + newsId);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNewsComments();
  }, [newsId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + '/api/comments/create',
        {
          comment: comment,
          author: user.username,
          newsId: newsId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=' bg-gray-100'>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-6 md:px-[200px] mt-8 mb-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-extrabold md:mb-2 mb-1 md:text-3xl text-gray-800">
              {news.title}
            </h1>
            {user?._id === news.userId && (
              <div className="flex text-2xl items-center ml-10 justify-center space-x-4">
                <p className="cursor-pointer" onClick={() => navigate('/edit/' + newsId)}>
                  <BiEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDeleteNews}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex mb-2 mt-8 text-m font-semibold text-gray-500 items-center justify-between space-x-4 md:mb-4">
            <p>@{news.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(news.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(news.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <img src={IMAGEFOLDER + news.photo} alt="" className="h-full w-full object-cover rounded-lg" />
          <p className="text-sm text-gray-700 break-words mt-5 md:text-lg">{news.description}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {news.categories?.map((c, i) => (
                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} news={news} />
            ))}
          </div>
          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment"
              className="md:w-[80%] outline-none px-4 mt-4 md:mt-0"
            />
            <button
              onClick={postComment}
              className="bg-black w-full md:w-1/5 mx-auto text-white font-semibold px-4 py-2  md:text-xl text-lg rounded-md"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default NewsDetails;
