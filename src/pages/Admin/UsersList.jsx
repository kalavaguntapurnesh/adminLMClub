import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import eye from "../../assets/Eye.svg";
import { IoIosClose } from "react-icons/io";
import Logo from "../../assets/LMDarkLogo.webp";
import { FaEye } from "react-icons/fa";

const UsersList = () => {
  const { users, aToken, getAllUsers, changeAvailability } =
    useContext(AdminContext);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (aToken) {
      getAllUsers();
    }
  }, [aToken]);

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = (user) => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const country = user.billingAddress.country.toLowerCase();
    const state = user.billingAddress.state.toLowerCase();
    const city = user.billingAddress.city.toLowerCase();
    const query = searchQuery.toLowerCase();

    return (
      fullName.includes(query) ||
      email.includes(query) ||
      country.includes(query) ||
      state.includes(query) ||
      city.includes(query)
    );
  });

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="pt-2">
      <div className="relative">
        <div className="w-full">
          <div className="w-full mx-auto max-w-[1400px]">
            <div className="p-4">
              <div className="space-y-2 w-[100%] px-4">
                <p className="lg:text-3xl text-2xl font-bold lg:text-start text-center">
                  <span className="text-green-500">Users</span> List
                </p>
              </div>

              <div className="flex justify-between items-center mt-4 px-4">
                <input
                  type="text"
                  name="search bar"
                  placeholder="Search by name or email or city or state or country"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex px-4 w-[500px] py-3 rounded border border-green-500 overflow-hidden max-w-md focus:outline-[#1a1a1a]"
                />

                <div>
                  <label className="text-gray-700 text-sm font-medium">
                    Users per page:{" "}
                  </label>
                  <select
                    className="border px-4 py-1.5 rounded"
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(parseInt(e.target.value));
                      setCurrentPage(1); // Reset to first page
                    }}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={40}>40</option>
                  </select>
                </div>
                {/* <div className="text-gray-700 text-sm">
                  Page {currentPage} of {totalPages}
                </div> */}
              </div>

              <div className="px-4 ">
                <div className="overflow-x-auto md:w-full">
                  <table className="lg:w-full border border-gray-100 mt-5 ">
                    <thead>
                      <tr className="bg-green-400">
                        <th className="border border-gray-300 px-4 py-2">
                          Full Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Country
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          State
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          City
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Email
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Selected Plan
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Active / Inactive
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          View Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                            {item.firstName} {item.lastName}
                          </td>
                          <td className="border text-center border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                            {item.billingAddress.country}
                          </td>
                          <td className="border text-center border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                            {item.billingAddress.state}
                          </td>
                          <td className="border text-center border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                            {item.billingAddress.city}
                          </td>
                          <td className="border text-center border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                            {item.email}
                          </td>
                          <td className="border text-center border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                            FREE
                          </td>
                          <td className="border text-center border-gray-300 px-4 py-2 ">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={true}
                                className="sr-only peer"
                              />
                              <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:after:translate-x-5 peer-checked:after:bg-white peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                            </label>
                          </td>
                          <td className="border text-center border-gray-300 px-4 py-2 text-zinc-600 text-sm align-middle h-full">
                            <div
                              onClick={() => openModal(item)}
                              className="flex justify-center items-center cursor-pointer "
                            >
                              <FaEye className="w-5 h-5" />
                              {/* <img src={eye} alt="edit" className="w-6 h-6" /> */}
                            </div>
                          </td>
                        </tr>
                      ))}

                      {currentUsers.length === 0 && (
                        <tr>
                          <td colSpan={8} className="text-center py-4">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination Navigation */}
              <div className="flex justify-between items-center mt-4 px-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={`px-6 py-1.5 rounded ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                  }`}
                >
                  Previous
                </button>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={`px-6 py-1.5 rounded ${
                    currentPage === totalPages
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center lg:mx-0 mx-8">
          <div className="bg-white p-6 rounded shadow w-[600px] z-20">
            <div className="flex flex-row justify-between items-center">
              <img src={Logo} alt="logo" className="w-[52px] h-auto " />

              <h2 className="md:text-lg text-base font-semibold text-center">
                User Details
              </h2>
              <IoIosClose
                onClick={closeModal}
                className="md:w-8 md:h-8 w-6 h-6 cursor-pointer"
              />
            </div>

            <div className="border-b border-gray-200 pt-2"></div>

            <div className="grid grid-cols-2 gap-6 pt-8 text-gray-600 md:text-[16px] text-xs">
              <p>First Name:</p>
              <p className="font-light">{selectedUser.firstName}</p>
              <p>Last Name:</p>
              <p className="font-light">{selectedUser.lastName}</p>
              <p>Email:</p>
              <p className="font-light">{selectedUser.email}</p>
              <p>Plan Choosen:</p>
              <p className="font-light">FREE</p>
              <p>Country:</p>
              <p className="font-light">
                {selectedUser.billingAddress.country}
              </p>
              <p>State:</p>
              <p className="font-light">{selectedUser.billingAddress.state}</p>
              <p>City:</p>
              <p className="font-light">{selectedUser.billingAddress.city}</p>
              <p>Phone Number:</p>
              <p className="font-light">
                {selectedUser.billingAddress.phoneNumber}{" "}
              </p>

              <p>Status:</p>

              <div>
                <div className="border text-sm text-center md:w-[120px] w-[100px] border-green-400 rounded-full px-4 md:py-2 py-[6px] text-green-400">
                  Verified
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6 ">
              <button
                onClick={closeModal}
                className="bg-green-400 transition ease-in-out duration-1000 cursor-pointer text-white md:px-16 px-12 md:py-2 py-[6px] rounded hover:bg-green-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
