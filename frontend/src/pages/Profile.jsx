import { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ProfilePosts from '../components/ProfilePosts';
import axios from 'axios';
import { IMAGEFOLDER, URL } from '../url';
import { UserContext } from '../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [newss, setNewss] = useState([]);
  const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + '/api/users/' + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(URL + '/api/users/' + user._id, { username, email }, { withCredentials: true });
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + '/api/users/' + user._id, { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserNewss = async () => {
    try {
      const res = await axios.get(URL + '/api/newss/user/' + user._id);
      setNewss(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  useEffect(() => {
    fetchUserNewss();
  }, [param]);

  return (
    <div className=' bg-gray-100'>
      <Navbar />
      <div className="min-h-[80vh]  px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-2xl font-bold mb-4">Your Posts:</h1>
          {newss?.map((p) => (
            <ProfilePosts key={p._id} p={p} />
          ))}
        </div>
        <div className="md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
          <div className="flex flex-col space-y-4 items-start">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="outline-none px-4 py-2 text-gray-700 bg-gray-100 rounded"
              placeholder="Your Username"
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none px-4 py-2 text-gray-700 bg-gray-100 rounded"
              placeholder="Your Email"
              type="email"
            />
            <div className="flex items-center space-x-4 mt-6">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
            {updated && <h3 className="text-green-500 text-sm text-center mt-4">User updated successfully!</h3>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
