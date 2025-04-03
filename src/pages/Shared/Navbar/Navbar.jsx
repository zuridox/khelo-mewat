import { useContext, useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import logo from "../../../assets/logo/logom.png";
import useReadingProgress from "../../../hooks/useReadingProgress";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import ActiveLink from "../../../components/ActiveLink/ActiveLink";
import useCart from "../../../hooks/useCart";
import { FiMoon, FiSun } from "react-icons/fi";

const Navbar = ({ isHomePage }) => {
  const { user, role, logOut, theme, setTheme } = useContext(AuthContext);
  const completion = useReadingProgress();
  const [navbarBg, setNavbarBg] = useState("transparent");
  const [cart] = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setNavbarBg(window.pageYOffset > 120 ? "solid" : "transparent");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navOptions = (
    <>
      <li>
        <ActiveLink to="/">Home</ActiveLink>
      </li>
      <li>
        <ActiveLink to="/games">Games</ActiveLink>
      </li>
      <li>
        <ActiveLink to="/aboutus">About Us</ActiveLink>
      </li>
      <li>
        <ActiveLink to="/contact">Contact Us</ActiveLink>
      </li>
      <li>
        <Link
          to="/adminlogin"
          className="bg-[#E87722] text-white px-3 py-1 rounded-md hover:bg-[#d66b1c] transition-colors duration-200"
        >
          Admin Login
        </Link>
      </li>
      {/* {user ? (
        <>
          <li><Link to="/dashboard">Dashboard</Link></li>
          {role === "Student" && (
            <li className="relative">
              <Link to="/dashboard/selectedclasses">
                <FaCartShopping className="text-xl text-[#E87722]" />
                <span className="bg-[#E87722] px-1.5 rounded-md text-white absolute -top-1 right-0">{cart?.length || 0}</span>
              </Link>
            </li>
          )}
          <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
            <img className="w-12 h-12 object-cover rounded-full border-2 border-[#E87722] mx-4" 
              src={user.photoURL || "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"} 
              alt="User avatar" />
          </div>
          <button onClick={() => logOut()} className="btn btn-sm bg-[#E87722] hover:bg-[#d66b1c] text-white rounded-md">Log Out</button>
        </>
      ) : (
        <>
          <li><Link to="/signin">Sign In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </>
      )} */}
    </>
  );

  return (
    <>
      <div
        className={`navbar top-0 transition-all ease-out duration-300 fixed z-50 py-3 px-4 md:px-8 ${
          !isHomePage
            ? "bg-white shadow-md"
            : navbarBg !== "transparent"
            ? "bg-white shadow-md"
            : "bg-transparent lg:py-4 py-5"
        }`}
      >
        {/* Mobile Logo - Left Side */}
        <div className="navbar-start md:hidden">
          <Link to="/">
            <img className="w-14" src={logo} alt="logo" />
          </Link>
        </div>

        {/* Desktop Logo */}
        <div className="navbar-start hidden md:flex">
          <Link to="/">
            <img
              className={`${
                navbarBg !== "transparent" || !isHomePage ? "w-20" : "w-28"
              } transition-all duration-300`}
              src={logo}
              alt="logo"
            />
          </Link>
        </div>

        {/* Mobile Menu - Right Side */}
        <div className="navbar-end md:hidden">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost bg-[#39A935] hover:bg-[#2d8a2d] text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#39A935] text-white rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden md:flex">
          <ul
            className={`menu menu-horizontal px-1 font-semibold ${
              navbarBg !== "transparent" || !isHomePage
                ? "text-gray-700"
                : "text-white"
            }`}
          >
            {navOptions}
          </ul>
        </div>

        {/* Progress Bar */}
        <span
          style={{ transform: `translateX(${completion - 100}%)` }}
          className="hidden md:block absolute bg-[#E87722] h-1 w-full bottom-0"
        />
      </div>
    </>
  );
};

export default Navbar;
