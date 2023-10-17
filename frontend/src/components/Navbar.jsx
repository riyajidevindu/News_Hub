import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [currentDateTime, setCurrentDateTime] = useState("");

  const showMenu = () => {
    setMenu(!menu);
  }

  const { user } = useContext(UserContext);

  useEffect(() => {
    // Update the current date and time every second
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-indigo-600 p-4 md:px-10">
      <div className="flex items-center justify-between px-6 md:px-[120px] py-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          <Link to="/">NewsHub</Link>
        </h1>
        {path === "/" && (
          <div className="flex justify-center items-center space-x-0">
            <p
              onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/"))}
              className="cursor-pointer px-4 text-2xl text-white"
            >
              <BsSearch />
            </p>
            <input
              onChange={(e) => setPrompt(e.target.value)}
              className="outline-none px-4 py-1 rounded-lg"
              placeholder="Search for News"
              type="text"
            />
          </div>
        )}
        <div className="hidden md:flex items-center justify-center space-x-4">
          <p className="text-white">{currentDateTime}</p>
          <h3 className="text-white">
            {user ? (
              <Link to="write" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 hover:text-white transition duration-300">
                Write
              </Link>
            ) : (
              <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 hover:text-white transition duration-300">
                Login
              </Link>
            )}
          </h3>
          <h3 className="text-white">
            {user ? (
              <div onClick={showMenu}>
                <p className="cursor-pointer relative">
                  <FaBars />
                </p>
                {menu && <Menu />}
              </div>
            ) : (
              <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 hover:text-white transition duration-300">
                Register
              </Link>
            )}
          </h3>
        </div>
        <div onClick={showMenu} className="md:hidden text-lg">
          <p className="cursor-pointer relative">
            <FaBars />
          </p>
          {menu && <Menu />}
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
