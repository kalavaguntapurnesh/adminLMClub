import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";

const EstoreUsersList = () => {
    const { aToken, backendUrl } = useContext(AdminContext)
    const [estoreUsers, setEstoreUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllEstoreUsers = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                backendUrl + "/api/admin/all-estore-users",
                {},
                { headers: { aToken } }
            );
            console.log("The estore users are : ", data.estoreUsers);

            if (data.success) {
                setEstoreUsers(data.estoreUsers);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const verifyEstoreUser = async (estoreUserId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/admin/verify-estore-user",
                { estoreUserId },
                { headers: { aToken } }
            );

            if (data.success) {
                toast.success("User Verified Successfully");
                getAllEstoreUsers(); // Refresh the list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getAllEstoreUsers();
    }, []);

    return (
        <div className="pt-2">
            <div className="relative">
                <div className="w-full">
                    <div className="w-full mx-auto max-w-[1400px]">
                        <div className="p-4">
                            <div className="space-y-2 w-[100%] px-4">
                                <p className="lg:text-3xl text-2xl font-bold lg:text-start text-center">
                                    <span className="text-green-500">E-Store</span> Users List
                                </p>
                            </div>

                            {loading ? (
                                <p>Loading...</p>
                            ) : estoreUsers.length === 0 ? (
                                <p>No E-Store users found.</p>
                            ) : (
                                <div className="px-4 ">
                                    <div className="overflow-x-auto md:w-full">
                                        <table className="lg:w-full border border-gray-100 mt-5 ">
                                            <thead>
                                                <tr className="bg-green-400">
                                                    <th className="border border-gray-300 px-4 py-2">Name</th>
                                                    <th className="border border-gray-300 px-4 py-2">Email</th>
                                                    <th className="border border-gray-300 px-4 py-2">Phone</th>
                                                    <th className="border border-gray-300 px-4 py-2">Message</th>
                                                    <th className="border border-gray-300 px-4 py-2">Redeem Points</th>
                                                    <th className="border border-gray-300 px-4 py-2">Status</th>
                                                    <th className="border border-gray-300 px-4 py-2">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {estoreUsers.map((user) => (
                                                    <tr key={user._id} className="hover:bg-gray-100">
                                                        <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">{user.firstName} {user.lastName}</td>
                                                        <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">{user.email}</td>
                                                        <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">{user.phoneNumber}</td>
                                                        <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">{user.message}</td>
                                                        <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">{user.points}</td>
                                                        <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                                                            {user.isVerifiedByAdmin ? (
                                                                <span className="text-green-600 font-semibold">Verified</span>
                                                            ) : (
                                                                <span className="text-red-600 font-semibold">Not Verified</span>
                                                            )}
                                                        </td>
                                                        <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                                                            {!user.isVerifiedByAdmin && (
                                                                <button
                                                                    onClick={() => verifyEstoreUser(user._id)}
                                                                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                                                                >
                                                                    Verify
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )


};

export default EstoreUsersList;