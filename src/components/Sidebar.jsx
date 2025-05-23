import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
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

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="min-h-screen bg-white lg:block hidden">
      {aToken && (
        <ul className="text-[#515151] mt-5 ">
          <NavLink
            className={({ isActive }) =>
              `flex  items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer shadow my-[10px] mx-4 ${isActive ? "bg-[#f2f2f3] border-r-4 border-green-400" : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <BsGrid1X2Fill className="text-green-500 w-5 h-5" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex  items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer shadow my-[10px] mx-4 ${isActive ? "bg-[#f2f2f3] border-r-4 border-green-400" : ""
              }`
            }
            to={"/users-list"}
          >
            <FaUsers className="text-green-500 w-5 h-5" />

            <p>All Users</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex  items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer shadow my-[10px] mx-4 ${isActive ? "bg-[#f2f2f3] border-r-4 border-green-400" : ""
              }`
            }
            to={"/plans"}
          >
            <FaCalculator className="text-green-500 w-5 h-5" />
            <p>All Plans</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex  items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer shadow my-[10px] mx-4 ${isActive ? "bg-[#f2f2f3] border-r-4 border-green-400" : ""
              }`
            }
            to={"/widgets"}
          >
            <MdWidgets className="text-green-500 w-5 h-5" />
            <p>All Widgets</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex  items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer shadow my-[10px] mx-4 ${isActive ? "bg-[#f2f2f3] border-r-4 border-green-400" : ""
              }`
            }
            to={"/estore-dashboard"}
          >
            <IoMdSettings className="text-green-500 w-5 h-5" />
            <p>E-Store Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex  items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer shadow my-[10px] mx-4 ${isActive ? "bg-[#f2f2f3] border-r-4 border-green-400" : ""
              }`
            }
            to={"/email-templates"}
          >
            <SiMinutemailer className="text-green-500 w-5 h-5" />
            <p>Email Templates</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex  items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer shadow my-[10px] mx-4 ${isActive ? "bg-[#f2f2f3] border-r-4 border-green-400" : ""
              }`
            }
            to={"/estore-products-list"}
          >
            <MdCategory className="text-green-500 w-5 h-5" />
            <p>E-Store Products</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex  items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer shadow my-[10px] mx-4 ${isActive ? "bg-[#f2f2f3] border-r-4 border-green-400" : ""
              }`
            }
            to={"/user-approvals"}
          >
            <GrStatusGood className="text-green-500 w-5 h-5" />
            <p>Approvals</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex  items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer shadow my-[10px] mx-4 ${isActive ? "bg-[#f2f2f3] border-r-4 border-green-400" : ""
              }`
            }
            to={"/estore-users-list"}
          >
            <LuWaypoints className="text-green-500 w-5 h-5" />
            <p>E-Store Users</p>
          </NavLink>



          <NavLink
            className={({ isActive }) =>
              `flex  items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer shadow my-[10px] mx-4 ${isActive ? "bg-[#f2f2f3] border-r-4 border-green-400" : ""
              }`
            }
            to={"/admin-profile"}
          >
            <IoDocument className="text-green-500 w-5 h-5" />
            <p>Admin Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
