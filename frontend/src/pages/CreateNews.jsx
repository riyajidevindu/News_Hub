/* eslint-disable no-unused-vars */
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { useContext, useState } from "react";
import { UserContext } from '../context/UserContext';
import { URL } from '../url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateNews = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const deleteCategory = (i) => {
    let updatedCategories = [...categories];
    updatedCategories.splice(i, 1);
    setCategories(updatedCategories);
  }

  const addCategory = () => {
    let updatedCategories = [...categories];
    updatedCategories.push(category);
    setCategory("");
    setCategories(updatedCategories);
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    const news = {
      title,
      description,
      username: user.username,
      userId: user._id,
      categories: categories,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      news.photo = filename;

      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post(URL + "/api/newss/create", news, { withCredentials: true });
      navigate("/newss/news/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />
      <div className="px-6 md:px-60 mt-8 mb-8">
        <h1 className="font-bold text-2xl md:text-3xl mt-8">Create a News</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter news title" className="px-4 py-2 outline-none rounded-md" />
          <label className="block text-gray-600">Choose an image:</label>
          <input onChange={(e) => setFile(e.target.files[0])} type="file" className="px-4 rounded-md" />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Enter news category" className="px-4 py-2 outline-none rounded-md" />
              <div onClick={addCategory} className="bg-black text-white px-4 py-2 font-semibold rounded-md cursor-pointer">Add</div>
            </div>
            <div className="flex px-4 mt-3">
              {categories?.map((c, i) => (
                <div key={i} className="flex justify-center items-center space-x-2 bg-gray-200 px-2 py-1 rounded-md">
                  <p className="text-gray-600">{c}</p>
                  <button onClick={() => deleteCategory(i)} className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"><ImCross /></button>
                </div>
              ))}
            </div>
          </div>
          <textarea onChange={(e) => setDescription(e.target.value)} rows={10} className="px-4 py-2 outline-none rounded-md" placeholder="Enter news description." />
          <button onClick={handleCreate} className="bg-black w-full md:w-1/5 mx-auto text-white font-semibold px-4 py-2  md:text-xl text-lg rounded-md">Publish</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default CreateNews;
