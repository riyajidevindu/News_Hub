import { Link ,useNavigate, useLocation } from "react-router-dom"
import {BsSearch} from "react-icons/bs"
import {FaBars} from "react-icons/fa"
import { useContext,useState } from "react"
import Menu from "./Menu"
import { UserContext } from "../context/UserContext"

const Navbar = () => {

  const [prompt,setPrompt]=useState("")
  const[menu,setMenu]=useState(false)
  const navigate=useNavigate()
  const path=useLocation().pathname

  const showMenu=()=>{
    setMenu(!menu)
  }

  const {user}=useContext(UserContext)
  return (    

    <div className="bg-indigo-600 p-4 md:px-20">
      <div className="flex items-center justify-between px-6 md:px-[120px] py-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white"><Link to="/">NewsHub</Link></h1>
        {path==="/" && <div className="flex justify-center items-center space-x-0">
          <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))}  className="cursor-pointer px-4 text-2xl text-white"><BsSearch/></p>
          <input onChange={(e)=>setPrompt(e.target.value)} className="outline-none  px-4 py-1" placeholder="Search for News" type="text"/>
        </div> }
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
          {user? <h3 className="text-white"><Link to="write">Write</Link></h3>:<h3 className="text-white"><Link to="/login">Login</Link></h3>}
          {user? <div onClick={showMenu}>
            <p className="cursor-pointer relative"><FaBars/></p>
            {menu && <Menu/>}
            </div>:<h3 className="text-white"><Link to="/register">Register</Link></h3>}
        </div>
        <div onClick={showMenu} className="md:hidden text-lg">
          <p className="cursor-pointer relative"><FaBars/></p>
          {menu && <Menu/>}
        </div>
    </div>
  </div>
  )
}

export default Navbar
