import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/LMDarkLogo.webp";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { FaWallet } from "react-icons/fa6";
import { FaAward } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { IoStorefront } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { MdBorderColor } from "react-icons/md";
import { FaAnchor } from "react-icons/fa";
import { FaPlane } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const EStoreDashboard = () => {

    const { backendUrl, aToken } = useContext(AdminContext);

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    const [dashboardStats, setDashboardStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalStores: 0,
    });

    useEffect(() => {

        const fetchDashboardStats = async () => {
            try {
                const { data } = await axios.post(backendUrl + "/api/admin/estore-dashboard-stats", {}, { headers: { aToken } });

                if (data.success) {
                    setDashboardStats(data);
                }

            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch dashboard stats")

            }
        }

        const fetchTopProducts = async () => {
            try {
                const { data } = await axios.post(backendUrl + "/api/admin/all-estore-products", {},
                    { headers: { aToken } })
                if (data.success) {
                    setProducts(data.estoreProducts.slice(0, 5))
                }
            } catch (error) {
                toast.error('Failed to fetch products')
            }
        }

        fetchDashboardStats();
        fetchTopProducts();

    }, [])


    return (
        <div className="w-[100%]">
            <div className="relative">
                <div className="w-full">
                    <div className="w-full mx-auto max-w-[1400px] ">
                        <div className="p-4">
                            <div className="w-[100%] flex flex-col pt-2 gap-2 text-sm">
                                <div className="flex flex-row justify-between">
                                    <div className="space-y-2 px-4">
                                        <p className="lg:text-3xl text-xl font-bold">
                                            <span className="text-green-500">E-Store</span>{" "}
                                            Dashboard
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mx-auto h-auto flex flex-col items-center justify-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] text-center gap-4 bg-white p-6 rounded-lg mt-4 ">
                                <div className="pb-3 w-[100%]">


                                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 '>



                                        <div className="col-span-1 ">
                                            <div className="flex flex-row justify-between items-center bg-[#f2f2f2] rounded-xl p-4">
                                                <div className="flex flex-col text-start">
                                                    <p className='text-gray-600 font-medium text-sm'>Total Revenue</p>
                                                    <h1 className='font-medium text-2xl pt-[2px]'>$485.94</h1>
                                                </div>

                                                <div className="">
                                                    <div className='p-4 bg-gray-600 rounded-lg'>
                                                        <FaWallet className='text-white w-5 h-5' />
                                                    </div>

                                                </div>
                                            </div>


                                            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 pt-4'>

                                                <div onClick={() => navigate("/estore-products-list")} className="flex flex-row justify-between items-center bg-emerald-50 rounded-xl p-4 cursor-pointer">
                                                    <div className="flex flex-col text-start">
                                                        <p className='text-gray-600 font-medium text-sm'>All Products</p>
                                                        <h1 className='font-medium text-2xl pt-[2px]'>{dashboardStats.totalProducts}</h1>
                                                    </div>

                                                    <div className="">
                                                        <div className='p-4 bg-[#0da487] rounded-lg'>
                                                            <AiFillProduct className='text-white w-5 h-5' />
                                                        </div>

                                                    </div>
                                                </div>

                                                <div onClick={() => navigate("/estore-products-list")} className="flex flex-row justify-between items-center cursor-pointer bg-violet-50 rounded-xl p-4">
                                                    <div className="flex flex-col text-start">
                                                        <p className='text-gray-600 font-medium text-sm'>All Orders</p>
                                                        <h1 className='font-medium text-2xl pt-[2px]'>{dashboardStats.totalOrders}</h1>
                                                    </div>

                                                    <div className="">
                                                        <div className='p-4 bg-violet-500 rounded-lg'>
                                                            <FaAward className='text-white w-5 h-5' />
                                                        </div>

                                                    </div>
                                                </div>


                                            </div>


                                            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 pt-4'>

                                                <div onClick={() => navigate("/estore-products-list")} className="flex flex-row justify-between items-center bg-orange-50 rounded-xl p-4 cursor-pointer">
                                                    <div className="flex flex-col text-start">
                                                        <p className='text-gray-600 font-medium text-sm'>All Stores</p>
                                                        <h1 className='font-medium text-2xl pt-[2px]'>{dashboardStats.totalStores}</h1>
                                                    </div>

                                                    <div className="">
                                                        <div className='p-4 bg-[#e74c3c] rounded-lg'>
                                                            <IoStorefront className='text-white w-5 h-5' />
                                                        </div>

                                                    </div>
                                                </div>

                                                <div onClick={() => navigate("/estore-users-list")} className="flex flex-row justify-between items-center bg-yellow-50 rounded-xl p-4 cursor-pointer">
                                                    <div className="flex flex-col text-start">
                                                        <p className='text-gray-600 font-medium text-sm'>All Users</p>
                                                        <h1 className='font-medium text-2xl pt-[2px]'>{dashboardStats.totalUsers}</h1>
                                                    </div>

                                                    <div className="">
                                                        <div className='p-4 bg-[#f1c40f] rounded-lg'>
                                                            <FaUsers className='text-white w-5 h-5' />
                                                        </div>

                                                    </div>
                                                </div>


                                            </div>




                                        </div>

                                        <div className='col-span-2 bg-[#f2f2f2] rounded p-4'>

                                            <div className='flex flex-row justify-between pt-2'>
                                                <div className='font-bold text-2xl'>
                                                    <p>Order Status</p>
                                                </div>

                                                <div>
                                                    <select
                                                        className=" mb-4 w-[200px] p-[6px] border border-gray-300 rounded bg-white text-gray-700 focus:outline-none appearance-none pr-8"

                                                    >
                                                        <option value="Select">Select</option>
                                                        <option value="Today">Today</option>
                                                        <option value="Last Week">Last Week</option>
                                                        <option value="Last Month">Last Month</option>
                                                        <option value="This Year">This Year</option>
                                                        <option value="All Time">All Time</option>
                                                    </select>
                                                </div>



                                            </div>

                                            <div className='grid lg:grid-cols-3 grid-cols-2 gap-4 pt-4'>
                                                <div className="flex flex-row justify-between items-center bg-white rounded-xl p-4">

                                                    <div className="">
                                                        <div className='p-4 bg-lime-400 rounded-lg'>
                                                            <MdOutlinePendingActions className='text-white w-5 h-5' />
                                                        </div>

                                                    </div>
                                                    <div className="flex flex-col text-start">
                                                        <p className='text-gray-600 font-medium text-end text-sm'>Pending</p>
                                                        <h1 className='font-medium text-end text-2xl pt-[2px]'>46</h1>
                                                    </div>


                                                </div>

                                                <div className="flex flex-row justify-between items-center bg-white rounded-xl p-4">

                                                    <div className="">
                                                        <div className='p-4 bg-teal-400 rounded-lg'>
                                                            <FaAnchor className='text-white w-5 h-5' />
                                                        </div>

                                                    </div>
                                                    <div className="flex flex-col text-start">
                                                        <p className='text-gray-600 font-medium text-end text-sm'>Processing</p>
                                                        <h1 className='font-medium text-end text-2xl pt-[2px]'>1</h1>
                                                    </div>


                                                </div>


                                                <div className="flex flex-row justify-between items-center bg-white rounded-xl p-4">

                                                    <div className="">
                                                        <div className='p-4 bg-red-400 rounded-lg'>
                                                            <IoMdClose className='text-white w-5 h-5' />
                                                        </div>

                                                    </div>
                                                    <div className="flex flex-col text-start">
                                                        <p className='text-gray-600 text-end font-medium text-sm'>Cancelled</p>
                                                        <h1 className='font-medium text-end text-2xl pt-[2px]'>0</h1>
                                                    </div>


                                                </div>

                                                <div className="flex flex-row justify-between items-center bg-white rounded-xl p-4">

                                                    <div className="">
                                                        <div className='p-4 bg-purple-400 rounded-lg'>
                                                            <MdBorderColor className='text-white w-5 h-5' />
                                                        </div>

                                                    </div>
                                                    <div className="flex flex-col text-start">
                                                        <p className='text-gray-600 text-end font-medium text-sm'>Shipped</p>
                                                        <h1 className='font-medium text-2xl text-end pt-[2px]'>7</h1>
                                                    </div>


                                                </div>


                                                <div className="flex flex-row justify-between items-center bg-white rounded-xl p-4">

                                                    <div className="">
                                                        <div className='p-4 bg-fuchsia-400 rounded-lg'>
                                                            <TbTruckDelivery className='text-white w-5 h-5' />
                                                        </div>

                                                    </div>
                                                    <div className="flex flex-col text-start">
                                                        <p className='text-gray-600 text-end font-medium text-sm'>Delivery</p>
                                                        <h1 className='font-medium text-2xl text-end pt-[2px]'>5</h1>
                                                    </div>


                                                </div>


                                                <div className="flex flex-row justify-between items-center bg-white rounded-xl p-4">

                                                    <div className="">
                                                        <div className='p-4 bg-sky-400 rounded-lg'>
                                                            <FaPlane className='text-white w-5 h-5' />
                                                        </div>

                                                    </div>
                                                    <div className="flex flex-col text-start">
                                                        <p className='text-gray-600 text-end font-medium text-sm'>Out for Delivery</p>
                                                        <h1 className='font-medium text-2xl text-end pt-[2px]'>2</h1>
                                                    </div>


                                                </div>

                                            </div>




                                        </div>

                                    </div>

                                    <div className='grid grid-cols-1 gap-4 pt-4'>
                                        <div className="p-4 bg-[#f2f2f2] rounded-lg">


                                            <div className='flex flex-row justify-between pt-2'>
                                                <div className='font-bold text-2xl'>
                                                    <p>Product Stock Report</p>
                                                </div>

                                                <div>
                                                    <select
                                                        className=" mb-4 w-[200px] p-[6px] border border-gray-300 rounded bg-white text-gray-700 focus:outline-none appearance-none pr-8"

                                                    >
                                                        <option value="">Select</option>
                                                        <option value="Healthcare & Personal Care">Healthcare & Personal Care</option>
                                                        <option value="Fashion & Apparel">Fashion & Apparel</option>
                                                        <option value="Home & Kitchen">Home & Kitchen</option>
                                                        <option value="Electronic & Accessories">Electronic & Accessories</option>
                                                        <option value="Food & Beverages">Food & Beverages</option>
                                                        <option value="Gifts & Handicrafts">Gifts & Handicrafts</option>
                                                        <option value="Books & Stationery">Books & Stationery</option>
                                                        <option value="Toys, Kids & Baby">Toys, Kids & Baby</option>
                                                        <option value="Fitness & Wellness">Fitness & Wellness</option>
                                                        <option value="Miscellaneous">Miscellaneous</option>
                                                    </select>
                                                </div>



                                            </div>

                                            {products.length > 0 && (
                                                <div className="bg-white rounded-lg">
                                                    <div className="overflow-x-auto rounded-lg border border-white">
                                                        <table className="w-full text-sm text-center  rounded-lg">
                                                            <thead className="bg-[#f9f9f6] text-[#4a5568] border-[0.5px] shadow border-white">
                                                                <tr>
                                                                    <th className="p-2 ">Image</th>
                                                                    <th className="p-2 ">Name</th>
                                                                    <th className="p-2 ">Category</th>
                                                                    <th className="p-2 ">Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {products.map((product) => (
                                                                    <tr key={product._id} className="hover:bg-gray-100 ">
                                                                        <td className="p-2 flex justify-center items-center">
                                                                            <img src={product.productImage} alt="Product" className="w-10 h-10 object-cover rounded" />
                                                                        </td>
                                                                        <td className="p-2 ">{product.productName}</td>
                                                                        <td className="p-2 ">{product.productCategory}</td>
                                                                        <td className="p-2 ">
                                                                            {product.isProductVerifiedByAdmin ? (
                                                                                <span className="text-green-600 font-semibold">Verified</span>
                                                                            ) : (
                                                                                <span className="text-red-500 font-semibold">Not Verified</span>
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <div className="py-4 text-center">
                                                        <button
                                                            className="bg-white border border-green-400 text-green-400  px-4 py-1.5 rounded cursor-pointer text-sm"
                                                            onClick={() => navigate("/estore-products-list")}
                                                        >
                                                            View More
                                                        </button>
                                                    </div>
                                                </div>
                                            )}





                                        </div>

                                    </div>




                                </div>









                            </div>




                            <div className="text-center text-xs mt-3 mb-4">
                                <p>© 2025, Laoe Maom. All Rights Reserved.</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default EStoreDashboard