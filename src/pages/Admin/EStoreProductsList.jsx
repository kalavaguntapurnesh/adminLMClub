// EstoreProductsList.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";

const EstoreProductsList = () => {
    const { aToken, backendUrl } = useContext(AdminContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    

    const getAllProducts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                backendUrl + "/api/admin/all-estore-products",
                {},
                { headers: { aToken } }
            );

            if (data.success) {
                setProducts(data.estoreProducts);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const verifyProduct = async (productId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/admin/verify-estore-product",
                { productId },
                { headers: { aToken } }
            );
            if (data.success) {
                toast.success("Product Verified Successfully!");
                getAllProducts();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div className="pt-2">
            <div className="relative">
                <div className="w-full">
                    <div className="w-full mx-auto max-w-[1400px]">
                        <div className="p-4">
                            <div className="space-y-2 w-[100%] px-4">
                                <p className="lg:text-3xl text-2xl font-bold lg:text-start text-center">
                                    <span className="text-green-500">E-Store</span> Products List
                                </p>
                            </div>
                            {loading ? (
                                <p>Loading...</p>
                            ) : products.length === 0 ? (
                                <p>No products found.</p>
                            ) : (
                                <div className="p-4">
                                    <div className="overflow-x-auto md:w-full">
                                        <table className="w-full border border-gray-200">
                                            <thead>
                                                <tr className="bg-green-400">
                                                    <th className="border border-gray-300 px-4 py-2">Image</th>
                                                    <th className="border border-gray-300 px-4 py-2">Name</th>
                                                    <th className="border border-gray-300 px-4 py-2">Description</th>
                                                    <th className="border border-gray-300 px-4 py-2">Category</th>
                                                    <th className="border border-gray-300 px-4 py-2">Seller</th>
                                                    <th className="border border-gray-300 px-4 py-2">Status</th>
                                                    <th className="border border-gray-300 px-4 py-2">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map((p) => (
                                                    <tr key={p._id} className="hover:bg-gray-100">
                                                        <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                                                            <img src={p.productImage} alt="Product" className="w-12 h-12 object-cover mx-auto" />
                                                        </td>
                                                        <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">{p.productName}</td>
                                                        <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">{p.productDescription}</td>
                                                        <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">{p.productCategory}</td>
                                                        <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">{p.userId?.firstName} {p.userId?.lastName}</td>
                                                        <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                                                            {p.isProductVerifiedByAdmin ? (
                                                                <span className="text-green-600 font-semibold">Verified</span>
                                                            ) : (
                                                                <span className="text-red-600 font-semibold">Not Verified</span>
                                                            )}
                                                        </td>
                                                        <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                                                            {!p.isProductVerifiedByAdmin && (
                                                                <button
                                                                    onClick={() => verifyProduct(p._id)}
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
    );
};

export default EstoreProductsList;