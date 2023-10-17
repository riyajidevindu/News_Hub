import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useContext, useState } from "react"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"


const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const {setUser}=useContext(UserContext)
  const navigate=useNavigate()

  const handleLogin=async()=>{
    try{
      const res=await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true})
      // console.log(res.data)
      setUser(res.data)
      navigate("/")

    }
    catch(err){
      setError(true)
      console.log(err)

    }

  }
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center ">
      <div className="flex items-center justify-between px-6 md:px-10 py-6 ">
        <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-600">
          <Link to="/">NewsHub</Link>
        </h1>
        <h3>
          <Link to="/register" className="text-indigo-600">
            Register
          </Link>
        </h3>
      </div>
      <div className="flex justify-center items-center h-[80vh]">
        <div className="bg-white rounded-lg p-8 shadow-md w-[80%] md:w-[35%]">
          <h1 className="text-2xl md:text-3xl font-bold text-left mb-6">
            Log in to your account
          </h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-indigo-300 outline-none rounded-md mb-4"
            type="text"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-indigo-300 outline-none rounded-md mb-4"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-3 text-lg font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Log in
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2">Something went wrong</p>
          )}
          <div className="mt-4 flex justify-center items-center space-x-3">
            <p>New here?</p>
            <p className="text-indigo-600 hover:underline">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    </>
    
  )
}

export default Login