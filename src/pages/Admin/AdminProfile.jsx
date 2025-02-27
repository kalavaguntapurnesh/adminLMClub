import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import adminIcon from "../../assets/adminIcon.png";

const AdminProfile = () => {
  const { aToken, getAdminProfile, adminEmail } = useContext(AdminContext);

  console.log("The admin mail in the admin profile page is : ", adminEmail);

  useEffect(() => {
    if (aToken) {
      getAdminProfile();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] ">
      <div className="space-y-2">
        <p className="lg:text-3xl text-2xl font-bold">
          <span className="text-green-500">Admin</span> Profile
        </p>
      </div>

      <div className="flex flex-col items-center">
        <label htmlFor="user-img">
          <img
            src={adminIcon}
            alt="User Profile"
            className="w-32 h-32 rounded-full"
          />
        </label>
        {/* <input
          type="file"
          id="user-img"
          hidden
          onChange={(e) => setUserImg(e.target.files[0])}
        /> */}
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        <div className="px-4 w-[100%] pt-5">
          <div className="w-[90%]">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-bold text-colorThree "
            >
              Email
            </label>
            <input
              type="text"
              name="addressLaneOne"
              id="addressLaneOne"
              className=" border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 bg-white focus:border-primary-600 block p-2.5 md:w-[360px] w-[100%]"
              required="true"
              value={adminEmail}
              disabled={true}
            ></input>
          </div>
        </div>

        <div className="px-4 w-[100%] pt-5">
          <div className="w-[90%]">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-bold text-colorThree "
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              className=" border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 bg-white focus:border-primary-600 block p-2.5 md:w-[360px] w-[100%]"
              required="true"
              value="Admin LM Club"
              disabled={true}
            ></input>
          </div>
        </div>

        <div className="px-4 w-[100%] pt-5">
          <div className="w-[90%]">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-bold text-colorThree "
            >
              Password
            </label>
            <input
              type="text"
              name="Password"
              id="Password"
              className=" border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 bg-white focus:border-primary-600 block p-2.5 md:w-[360px] w-[100%]"
              required="true"
              value="**********"
              disabled={true}
            ></input>
          </div>
        </div>

        <div className="px-4 w-[100%] pt-5">
          <div className="w-[90%]">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-bold text-colorThree "
            >
              Country
            </label>
            <input
              type="text"
              name="Password"
              id="Password"
              className=" border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 bg-white focus:border-primary-600 block p-2.5 md:w-[360px] w-[100%]"
              required="true"
              value="United States"
              disabled={true}
            ></input>
          </div>
        </div>

        <div className="px-4 w-[100%] pt-5">
          <div className="w-[90%]">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-bold text-colorThree "
            >
              State
            </label>
            <input
              type="text"
              name="Password"
              id="Password"
              className=" border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 bg-white focus:border-primary-600 block p-2.5 md:w-[360px] w-[100%]"
              required="true"
              value="Georgia"
              disabled={true}
            ></input>
          </div>
        </div>

        <div className="px-4 w-[100%] pt-5">
          <div className="w-[90%]">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-bold text-colorThree "
            >
              City
            </label>
            <input
              type="text"
              name="Password"
              id="Password"
              className=" border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 bg-white focus:border-primary-600 block p-2.5 md:w-[360px] w-[100%]"
              required="true"
              value="Atlanta"
              disabled={true}
            ></input>
          </div>
        </div>

        <div className="px-4 w-[100%] pt-5">
          <div className="w-[90%]">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-bold text-colorThree "
            >
              ZIP Code
            </label>
            <input
              type="text"
              name="Password"
              id="Password"
              className=" border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 bg-white focus:border-primary-600 block p-2.5 md:w-[360px] w-[100%]"
              required="true"
              value="30024"
              disabled={true}
            ></input>
          </div>
        </div>

        <div className="px-4 w-[100%] pt-5">
          <div className="w-[90%]">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-bold text-colorThree "
            >
              Phone Number
            </label>
            <input
              type="text"
              name="Password"
              id="Password"
              className=" border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 bg-white focus:border-primary-600 block p-2.5 md:w-[360px] w-[100%]"
              required="true"
              value="+1 (678) 200-4524"
              disabled={true}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
