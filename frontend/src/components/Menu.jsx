import { useContext} from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../url"
import { Link, useNavigate } from "react-router-dom"

const Menu = () => {
  const {user}=useContext(UserContext)
  const {setUser}=useContext(UserContext)
  const navigate=useNavigate()

  const handleLogout=async()=>{
    try{
      const res=await axios.get(URL+"/api/auth/logout",{withCredentials:true})
      console.log(res)
      setUser(null)
      navigate("/login")
  
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="bg-black w-[200px] z-10 md:right-48 flex flex-col items-start absolute top-12 right-6 rounded-md p-4 space-y-4">
  {!user && (
    <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
      <Link to="/login" className="transition duration-300 ease-in-out transform hover:scale-105">Login</Link>
    </h3>
  )}
  {!user && (
    <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
      <Link to="/register" className="transition duration-300 ease-in-out transform hover:scale-105">Register</Link>
    </h3>
  )}
  {user && (
    <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
      <Link to={"/profile/" + user._id} className="transition duration-300 ease-in-out transform hover:scale-105">Profile</Link>
    </h3>
  )}
  {user && (
    <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
      <Link to="/write" className="transition duration-300 ease-in-out transform hover:scale-105">Write</Link>
    </h3>
  )}
  {user && (
    <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
      <Link to={"/mynews/" + user._id} className="transition duration-300 ease-in-out transform hover:scale-105">My News</Link>
    </h3>
  )}
  {user && (
    <h3
      onClick={handleLogout}
      className="text-white text-sm hover:text-gray-500 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
    >
      Logout
    </h3>
  )}
</div>

  )
}

export default Menu
