import { Link,useNavigate} from "react-router-dom"
import Footer from '../components/Footer'
import {useState} from "react"
import axios from 'axios'
import {URL} from '../url'

const Register = () => {

  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState(false)

  const navigate = useNavigate()

  const handleRegister =async () =>{
    try{
      const res=await axios.post(URL+"/api/auth/register",{username,email,password})
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)
      setError(false)
      navigate("/login")
    }
    catch(err){
      setError(true)
      console.log(err)
    }
  }

  return (
   <>
     <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="flex items-center justify-between px-6 md:px-20 py-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-600">
          <Link to="/">NewsHub</Link>
        </h1>
        <p>
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
      <div className="flex justify-center items-center h-[80vh]">
        <div className="bg-white rounded-lg p-8 shadow-md w-[80%] md:w-[25%]">
          <h1 className="text-2xl md:text-3xl font-bold text-left mb-6">
            Create an account
          </h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border-2 border-indigo-300 outline-none rounded-md mb-4"
            type="text"
            placeholder="Enter your username"
          />
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
            onClick={handleRegister}
            className="w-full px-4 py-3 text-lg font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Register
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2">Something went wrong</p>
          )}
          <div className="mt-4 flex justify-center items-center space-x-3">
            <p>Already have an account?</p>
            <p className="text-indigo-600 hover:underline">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>  
   </>
  )
}

export default Register
