import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import axios from "axios";
import { IMAGEFOLDER,URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from '../components/Loader';
import { UserContext } from "../context/UserContext";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/newss/" + search);
      setPosts(res.data.reverse());
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <div className="px-6 md:px-16 py-8">
        {loader ? (
          <div className="h-40vh flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          <>
          <div>
          <Carousel showArrows autoPlay showThumbs={false}>
            {posts.map((post) => (
              <div key={post._id}>
                <img className="object-cover rounded-lg text-sm"
                  src={IMAGEFOLDER + post.photo} // Use the URL of your news post images
                  alt={post.title}
                  style={{ maxWidth: '60%', maxHeight: '50%' }}
                />
              </div>
            ))}
          </Carousel>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post._id} to={user ? `/newss/news/${post._id}` : "/login"}>
                <HomePosts post={post} />
              </Link>
            ))}
          </div>
          </>
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
