import React, { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/images/Logo-FUNDAPROTAN-white.png'
import useLogout from "../../Hooks/useLogout";
import { AuthContext } from "../../Context/AuthContext";
import './Navbar.css'

const Navbar = () => {
  const [hamburger, setHamburger] = useState(false);
  const { logout } = useLogout()

  const { authUser } = useContext(AuthContext)
  // console.log(authUser);

  const handleHamburger = () => {
    setHamburger(!hamburger);
  };



const links = (
  <>
    <li
       className="navLink"
    ><NavLink
      onClick={hamburger}
      to="/"
      style={({ isActive }) => ({
        color: isActive ? "#FFF455" : "#fff",
      })}
      >Home</NavLink>
    </li>
    {/* <li><NavLink
        onClick={hamburger}
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? "#fff" : "#fff",
          border: isActive ? '2px solid #FDDE55' : 'none',
          borderRadius: isActive ? '5px' : '',
          padding: isActive ? '5px 12px' : '',
          background: isActive ? "#1111111f" : "transparent",
        })}>About</NavLink>
      </li> */}
    <li className="navLink"><NavLink
      onClick={hamburger}
      to="/projects"
      style={({ isActive }) => ({
        color: isActive ? "#FFF455" : "#fff",
      })}>Projects</NavLink>
    </li>
    <li className="navLink"><NavLink
      onClick={hamburger}
      to="/blogs"
      style={({ isActive }) => ({
        color: isActive ? "#FFF455" : "#fff",
      })}>Blogs</NavLink>
    </li>

  </>
);
const handlePayment = async () => {
  try {
    const order = {
      orderItems: '',
      shippingInfo: ''
    }

    const res = await fetch('/api/donate/cheakout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    const data = await res.json();
    console.log(data);
    if (data.session.url) {
      window.location.href = data.session.url;
    }
  } catch (error) {
    console.log(error);
  }
};
return (
  <div>
    <nav className=" bg-[#007F73] ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Left side website name and logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="w-16" alt="" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            FUNDAPROTAN
          </span>
        </Link>

        {/* Right side Buttons */}
        <div className="flex lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">

          <Link to="/donate">
            <button
              onClick={handlePayment}
              type="button"
              className="text-[#ffff] font-medium hover:bg-green-600 bg-green-500 rounded-[50px]  focus:ring-4 focus:outline-none text-sm px-4 py-2 text-center mr-4 lg:block hidden"
            >
              Donate Now
            </button>
          </Link>

          {
            authUser && (authUser?.role == 'admin' || authUser?.role=== 'publisher')  && <div className={`md:block space-x-3 gap-4 hidden mr-3`}>
              <Link to="/admin/dashboard">
                <button
                  type="button"
                  className="text-[#fff] font-medium hover:bg-[#fcc41c] bg-[#FFA62F] rounded-[50px]  focus:ring-4 focus:outline-none text-sm px-4 py-2 text-center mr-4"
                >
                  Dashboard
                </button>
              </Link>
            </div>
          }

          {
            !authUser && <div className={`md:block space-x-3 gap-4 hidden`}>
              <Link to="/login">
                <button
                  type="button"
                  className="bg-[#F31559] hover:bg-[#fd4e14] text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Login
                </button>
              </Link>

              <Link to={"/register"}>
                <button
                  type="button"
                  className=" bg-[#ED5107] text-white hover:bg-[#ff6923] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center "
                >
                  Register
                </button>
              </Link>
            </div>
          }

          <div className={`flex items-center space-x-3 gap-2`}>
            {
              authUser && authUser?.role === "user" && <Link to='/my-profile' className="hidden md:flex">
                <button
                  type="button"
                  className=" text-[#fff] font-medium hover:bg-[#fcc41c] bg-[#FFA62F] rounded-[50px] focus:ring-4 focus:outline-none text-sm px-4 py-2 text-center"
                >
                  My Profile
                </button>
              </Link>
            }

            {
              authUser && <Link className="hidden md:flex" to="/login">
                <button
                  onClick={logout}
                  type="button"
                  className="text-[#fff] bg-[#F31559] hover:bg-[#fd4e14] rounded-[50px]  focus:ring-4 focus:outline-none font-medium text-sm px-4 py-2 text-center "
                >
                  Logout
                </button>
              </Link>
            }
          </div>

          {/* Hamburger button */}
          <button
            onClick={handleHamburger}
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg lg:hidden text-white "
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Middle Part */}
        <div
          className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 lg:p-0 mt-4 border lg:space-x-12 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 ">
            {links}
          </ul>
        </div>
      </div>

      {/* For Small device */}
      <div className={`lg:hidden fixed p-6 z-[99] duration-500 md:w-[50%] w-[60%] h-screen top-0 text-white bg-[#007F73] ${hamburger ? "right-0" : "right-[-350px] md:right-[-700px]"}`}>
        <button onClick={handleHamburger} className="text-2xl">
          <IoMdClose />
        </button>
        <ul className="font-semibold space-y-3 mt-6 ">{links}</ul>


        {
          !authUser && <div className={`md:hidden flex gap-4 mt-6`}>
            <Link onClick={handleHamburger} to="/login">
              <button
                type="button"
                className="bg-[#F31559] hover:bg-[#fd4e14] text-white  px-2 py-1 rounded-lg font-semibold"
              >
                Login
              </button>
            </Link>
            <Link onClick={handleHamburger} to="/register">
              <button
                type="button"
                className="bg-[#ED5107] text-white hover:bg-[#ff6923] px-2 py-1 rounded-lg font-semibold"
              >
                Register
              </button>
            </Link>
          </div>
        }

        {
          authUser && authUser.role == 'admin' && <div className={`mt-6`}>
            <Link to="/admin/dashboard">
              <button
                type="button"
                className="text-[#fff] font-medium hover:bg-[#fcc41c] bg-[#FFA62F] rounded-lg focus:ring-4 focus:outline-none text-sm px-4 py-2 text-center"
              >
                Dashboard
              </button>
            </Link>
          </div>
        }
        <Link to="/donate">
          <button
            type="button"
            className="text-[#fff] font-medium hover:bg-[#099c6b] bg-[#03C988] rounded-[50px]  focus:ring-4 focus:outline-none text-sm px-4 py-2 text-center mt-4 lg:hidden block"
          >
            Donate Now
          </button>
        </Link>

        {
          authUser && authUser?.role === "user" && <Link to='/my-profile'>
            <button
              type="button"
              className="mt-4 text-[#fff] font-medium hover:bg-[#fcc41c] bg-[#FFA62F] rounded-[50px] focus:ring-4 focus:outline-none text-sm px-4 py-2 text-center"
            >
              My Profile
            </button>
          </Link>
        }

        {
          authUser && <div className={`md:hidden flex gap-4 mt-4`}>
            <Link
              onClick={() => {
                handleHamburger();
                logout()
              }}
              to="/login"
            >
              <button
                type="button"
                className="text-[#fff] bg-[#F31559] hover:bg-[#fd4e14]  px-2 py-1 rounded-lg font-semibold"
              >
                Logout
              </button>
            </Link>
          </div>
        }

      </div>
    </nav>
  </div>
);
};

export default Navbar;
