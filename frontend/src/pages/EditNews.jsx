import {useContext, useEffect,useState} from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import {ImCross} from "react-icons/im"
import axios from "axios"
import { URL } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"

const EditNews = () => {

  const newsId=useParams().id
  const {user}=useContext(UserContext)
  const navigate=useNavigate()
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [file,setFile]=useState(null)
  const [category,setCategory] = useState("") 
  const [categories,setCategories] = useState([])

  const fetchPost=async()=>{
    try{
      const res=await axios.get(URL+"/api/newss/"+newsId)
      setTitle(res.data.title)
      setDescription(res.data.description)
      setFile(res.data.photo)
      setCategories(res.data.categories)

    }
    catch(err){
      console.log(err)
    }
  }

  const handleUpdate=async(e)=>{
    e.preventDefault()
    const news={
      title,
      description,
      username:user.username,
      userId:user._id,
      categories:categories
    }

    if(file){
      const data=new FormData()
      const filename=Date.now()+file.name
      data.append("img",filename)
      data.append("file",file)
      news.photo=filename
      
      //image upload
      try{
        const imgUpload=await axios.post(URL+"/api/upload",data)
        // console.log(imgUpload.data)
      }
      catch(err){
        console.log(err)
      }
    }
    //post uplaod
    try{
      const res=await axios.put(URL+"/api/newss/"+newsId,news,{withCredentials:true})
      navigate("/newss/news/"+res.data._id)
      // console.log(res.data)

    }
    catch(err){
      console.log(err)
    }
  
  }

  useEffect(()=>{
    fetchPost()
  },[newsId])



  const deleteCategory = (i) => {
    let updatedCategories = [...categories]
    updatedCategories.splice(i)
    setCategories(updatedCategories)
  }

  const addCategory = () => {
    let updatedCategories = [...categories]
    updatedCategories.push(category)
    setCategory("")
    setCategories(updatedCategories)
  }



  return (
    <div className="bg-gray-200 min-h-screen">
    <Navbar />
    <div className="px-6 md:px-60 mt-8 mb-8">
      <h1 className="font-bold text-2xl md:text-3xl mt-8">Update a News</h1>
      <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
        <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder="Enter news title" className="px-4 py-2 outline-none rounded-md" />
        <label className="block text-gray-600">Choose an image:</label>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" className="px-4 rounded-md" />
        <div className="flex flex-col">
          <div className="flex items-center space-x-4 md:space-x-8">
            <input value={category} onChange={(e)=>setCategory(e.target.value)} type="text" placeholder="Enter news category" className="px-4 py-2 outline-none rounded-md" />
            <button onClick={addCategory} className="bg-black text-white px-4 py-2 font-semibold rounded-md cursor-pointer">Add</button>
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
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} rows={10} className="px-4 py-2 outline-none rounded-md" placeholder="Enter news description." />
        <button onClick={handleUpdate} className="bg-black w-full md:w-1/5 mx-auto text-white font-semibold px-4 py-2  md:text-xl text-lg rounded-md">Update</button>
      </form>
    </div>
    <Footer />
  </div>
   
  );
}


export default EditNews
