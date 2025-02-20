import React, { useContext, useState } from "react";
import { AdminContext } from "./../context/AdminContext";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/LMDarkLogo.webp";
import { BsSearch } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import dropIcon from "../assets/dropdown_icon.svg";
import { toast } from "react-toastify";
import { RiMenu3Fill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";
import { MdWidgets } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { LuWaypoints } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";
import { IoDocument } from "react-icons/io5";
import { SiMinutemailer } from "react-icons/si";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdownMobile, setOpenDropdownMobile] = useState(null);

  const logout = () => {
    toast.success("Logged out successfully!");
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };

  // Toggle dropdown and close others
  const toggleDropdown = (dropdown) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null); // close if the same dropdown is clicked
    } else {
      setOpenDropdown(dropdown); // open the clicked dropdown
    }
  };

  const toggleMobileDropdown = (dropdown) => {
    setOpenDropdownMobile((prev) => (prev === dropdown ? null : dropdown)); // Toggle the dropdown
  };

  return (
    <div className="flex justify-between items-center px-4 bg-white sm:px-10 py-3">
      <div className="flex items-center gap-2 text-xs ">
        <img className="w-14 h-14 cursor-pointer" src={Logo} alt="logo" />
      </div>

      <div className="md:block hidden">
        <div className="flex px-4 w-[500px] py-3 rounded-full border border-green-500 overflow-hidden max-w-md mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="16px"
            className="fill-green-500 mr-3 rotate-90"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
          <input
            type="email"
            placeholder="Search for a widget or user or plan"
            className="w-full outline-none bg-transparent text-gray-600 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div className="relative inline-flex w-fit">
          <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-red-500 p-1.5 text-xs"></div>
          <div className="flex items-center justify-center rounded-lg bg-green-400 px-2 py-2 text-center text-white shadow-lg dark:text-gray-200">
            <span className="[&>svg]:h-4 [&>svg]:w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {aToken && (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                className="w-8 rounded-full"
                alt="profile"
              />
              <img className="w-2.5 " src={dropIcon} alt="drop" />
              <div className="absolute top-0 right-0 pt-14 text-base text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={() => navigate("admin-profile")}
                    className="text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("my-appointments")}
                    className="text-black cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p onClick={logout} className="text-black cursor-pointer">
                    Logout
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={logout}
          className="bg-green-400 md:block hidden font-medium cursor-pointer text-white text-sm px-10 py-2 rounded-full"
        >
          Logout
        </button>

        <button
          className="md:hidden block"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <AiOutlineClose
              className={`w-5 h-5 ${isScrolled ? "text-black" : "text-black"}`}
            />
          ) : (
            <RiMenu3Fill
              className={`w-5 h-5 ${isScrolled ? "text-black" : "text-black"}`}
            />
          )}
        </button>

        <div
          className={
            !isMobileMenuOpen
              ? "lg:hidden fixed left-[-100%] h-[100%] ease-in-out duration-1000 "
              : "lg:hidden fixed left-0 top-0 w-[100%] h-[100%] bg-white ease-in-out duration-1000 rounded-b-lg z-10 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
          }
        >
          <div className="flex flex-row w-[100%] px-5 mt-6 justify-between items-center">
            <div className="w-[50%]">
              <img src={Logo} className="w-[65px] h-auto " alt="logo" />
            </div>
            <div className="mb-4 flex justify-end w-[50%]">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <AiOutlineClose className="w-[22px] h-[22px] text-black" />
              </button>
            </div>
          </div>

          <div className="p-4 mt-4 grid grid-cols-2">
            <a
              href="/admin-dashboard"
              className="flex items-center gap-3 py-3 px-3 cursor-pointer shadow my-[10px] mx-4 text-sm"
            >
              <BsGrid1X2Fill className="text-green-500 w-4 h-4" />
              <p>Dashboard</p>
            </a>

            <a
              className="flex  items-center gap-3 py-3 px-3 cursor-pointer shadow my-[10px] mx-4 text-sm"
              href="/users-list"
            >
              <FaUsers className="text-green-500 w-4 h-4" />

              <p>All Users</p>
            </a>

            <a
              className="flex  items-center gap-3 py-3 px-3 cursor-pointer shadow my-[10px] mx-4 text-sm"
              href="/plans"
            >
              <FaCalculator className="text-green-500 w-4 h-4" />
              <p>Plans</p>
            </a>

            <a
              className="flex  items-center gap-3 py-3 px-3 cursor-pointer shadow my-[10px] mx-4 text-sm"
              href="/widgets"
            >
              <MdWidgets className="text-green-500 w-4 h-4" />
              <p>Widgets</p>
            </a>

            <a
              className="flex  items-center gap-3 py-3 px-3 cursor-pointer shadow my-[10px] mx-4 text-sm"
              href="/category"
            >
              <MdCategory className="text-green-500 w-4 h-4" />
              <p>Category</p>
            </a>

            <a
              className="flex  items-center gap-3 py-3 px-3 cursor-pointer shadow my-[10px] mx-4 text-sm"
              href="/approvals"
            >
              <GrStatusGood className="text-green-500 w-4 h-4" />
              <p>Approvals</p>
            </a>

            <a
              className="flex  items-center gap-3 py-3 px-3 cursor-pointer shadow my-[10px] mx-4 text-sm"
              href="/reward-points"
            >
              <LuWaypoints className="text-green-500 w-4 h-4" />
              <p>Reward Points</p>
            </a>

            <a
              className="flex  items-center gap-3 py-3 px-3 cursor-pointer shadow my-[10px] mx-4 text-sm"
              href="/email-templates"
            >
              <SiMinutemailer className="text-green-500 w-4 h-4" />
              <p>Email Templates</p>
            </a>

            <a
              className="flex  items-center gap-3 py-3 px-3 cursor-pointer shadow my-[10px] mx-4 text-sm"
              href="/system-settings"
            >
              <IoMdSettings className="text-green-500 w-4 h-4" />
              <p>System Settings</p>
            </a>

            <a
              className="flex  items-center gap-3 py-3 px-3 cursor-pointer shadow my-[10px] mx-4 text-sm"
              href="/admin-profile"
            >
              <IoDocument className="text-green-500 w-4 h-4" />
              <p>Admin Profile</p>
            </a>
          </div>

          <div className="px-4 mt-10 w-[100%] flex justify-center items-center">
            <button
              onClick={logout}
              className="border-[1px] relative py-[10px] bg-trumpOne text-white rounded-full border-green-500 text-sm bg-green-500 flex justify-center items-center font-semibold overflow-hidden text-center w-[90%]"
            >
              <span className="relative z-10">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
