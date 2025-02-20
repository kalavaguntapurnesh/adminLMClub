import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

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

      <div className="px-4 w-[100%] pt-8">
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
            // onChange={(e) =>
            //   setUserData((prev) => ({
            //     ...prev,
            //     addressLaneTwo: e.target.value,
            //   }))
            // }
            value={adminEmail}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
