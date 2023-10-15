import {Route,Routes} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NewsDetails from "./pages/NewsDetails"
import CreateNews from "./pages/CreateNews"
import EditNews from "./pages/EditNews"
import Profile from "./pages/Profile"
import {  UserContextProvider } from './context/UserContext'
import MyNews from "./pages/MyNews"



const App = () => {
  return (
    
   <UserContextProvider>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/write" element={<CreateNews/>}/>
        <Route exact path="/newss/news/:id" element={<NewsDetails/>}/>
        <Route exact path="/edit/:id" element={<EditNews/>}/>
        <Route exact path="/profile/:id" element={<Profile/>}/>
        <Route exact path="/mynews/:id" element={<MyNews/>}/>

      </Routes>
   </UserContextProvider>   
        
    
  )
}

export default App
