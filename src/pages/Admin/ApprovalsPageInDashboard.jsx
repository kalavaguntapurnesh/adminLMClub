import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import eye from "../../assets/Eye.svg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/LMDarkLogo.webp";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const ApprovalsPageInDashboard = () => {

const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
const [filter, setFilter] = useState("pending");

// useEffect(() => {
//   const fetchPosts = async () => {
//     try {
//       const response = await fetch("${backendURL}/api/beehive/fetch-all-post-approval-statuses"); 
//       const data = await response.json();
//       setPosts(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       setLoading(false);
//     }
//   };

//   fetchPosts();
// }, []);

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${backendURL}/api/beehive/fetch-all-post-approval-statuses`);
      const data = await response.json();
      
      // Optimize by making two requests per post in parallel
      const enrichedPosts = await Promise.all(
        data.map(async (post) => {
          try {
            const [statusRes, postedByRes] = await Promise.all([
              fetch(`${backendURL}/api/beehive/fetch-approval-status/${post._id}`).then((res) => res.json()),
              axios.get(`${backendURL}/api/beehive/each-post-username/${post._id}`),
            ]);

            return {
              ...post,
              status: statusRes.status,
              postedBy: `${postedByRes.data.firstName} ${postedByRes.data.lastName}`,
            };
          } catch (error) {
            console.error("Error fetching details:", error);
            return post; // Return original post to avoid breaking map
          }
        })
      );

      setPosts(enrichedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, []);

// Memoize filtered data to prevent re-calculating on every render
const filteredData = useMemo(() => {
  const approvals = posts.filter((post) => post.isAdminApproved && post.status === "Approved");
  const rejected = posts.filter((post) => !post.isAdminApproved && post.status === "Rejected");
  const pending = posts.filter((post) => !post.isAdminApproved && post.status === "Pending");
  const filteredPending = pending.filter((post) => new Date(post.createdAt) > new Date("2025-03-27"));

  return filter === "pending" ? filteredPending : filter === "approved" ? approvals : rejected;
}, [posts, filter]);


const [selectedPost, setSelectedPost] = useState(null);
const [showModal, setShowModal] = useState(false);
const openModal = (post) => {
  
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
    
  };
console.log(selectedPost);


  
  const [approveModel, setApproveModel] = useState(false);
  const [approvePostId, setApprovePostId] = useState(null);

   const handleApproveClick = async(post)=> {
      setApprovePostId(post._id);
      setApproveModel(true);
  }
  const cancelApproveClick = async() => {
    setApproveModel(false);
  }
console.log("approvePostId : ", approvePostId); 

  
  const handleApprovePost = async (postId) => {
    try {
        const response = await fetch(`${backendURL}/api/beehive/update-post-admin-approval/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isAdminApproved: true,
                status:"Approved"
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to approve post");
        }

        const updatedPost = await response.json();
        console.log("Post approved successfully:", updatedPost);
        setApproveModel(false);
        window.location.reload();
    } catch (error) {
        console.error("Error approving post:", error);
    }
};

const handleRejectPost = async(postId)=>{
  try {
    const response = await fetch(`${backendURL}/api/beehive/update-post-admin-approval/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            isAdminApproved: false,
            status:"Rejected"
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to approve post");
    }

    const updatedPost = await response.json();
    console.log("Post rejected successfully:", updatedPost);
    setApproveModel(false);
    window.location.reload();
} catch (error) {
    console.error("Error rejecting post:", error);
}
}

// State and Handlers
const [currentViewIndex, setCurrentViewIndex] = useState({});

const handlePrev = (postId) => {
  setCurrentViewIndex((prevIndexes) => ({
    ...prevIndexes,
    [postId]: Math.max((prevIndexes[postId] || 0) - 1, 0),
  }));
};

const handleNext = (postId, imagesLength) => {
  setCurrentViewIndex((prevIndexes) => ({
    ...prevIndexes,
    [postId]: Math.min((prevIndexes[postId] || 0) + 1, imagesLength - 1),
  }));
};

  
const [currentIndex, setCurrentIndex] = useState(0);
useEffect(()=>{
    setCurrentIndex(0);
},[selectedPost])


  return (
    <div className="pt-2">
        <div className="relative">
            <div className="w-full">
                <div className="max-w-[1200px] w-full mx-auto h-auto lg:px-35 px-4">
                    <div className="p-4">
                        <div className="space-y-2 w-full mx-auto px-4 flex flex-col items-center justify-center">
                            <div className="flex justify-between  gap-3 text-center mt-4 items-center w-full ">
                                <p className="lg:text-3xl text-2xl font-bold lg:text-start text-center">
                                    <span className="text-green-500">User Approvals</span> History
                                </p>
                                <div className="flex space-x-4 mb-4">
                                <button 
                                className={`px-4 py-2 rounded ${filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"} cursor-pointer` } 
                                onClick={() => setFilter("pending")}
                                >
                                Pending
                                </button>
                                <button 
                                className={`px-4 py-2 rounded ${filter === "approved" ? "bg-green-500 text-white" : "bg-gray-200"} cursor-pointer`} 
                                onClick={() => setFilter("approved")}
                                >
                                Approved
                                </button>
                                <button 
                                className={`px-4 py-2 rounded ${filter === "rejected" ? "bg-red-500 text-white" : "bg-gray-200"} cursor-pointer`} 
                                onClick={() => setFilter("rejected")}
                                >
                                Rejected
                                </button>
                            </div>
                            </div>

                            <div className="flex flex-col justify-center  gap-3 text-center mt-4 items-center w-full ">
                                <p className="lg:text-3xl text-2xl font-bold lg:text-start text-center">
                                    <span className="text-green-500"> {filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase()} </span> Approvals
                                </p>    

                                <div className="overflow-x-auto mt-5 lg:px-20 px-1">
                                    <table className="lg:w-full border border-gray-100">
                                    <thead>
                                        <tr className="bg-green-400">
                                        <th className="border border-gray-300 px-4 py-2">Category</th>
                                        <th className="border border-gray-300 px-4 py-2">Post Name/Event Name</th>
                                        <th className="border border-gray-300 px-4 py-2">Picture/Videos</th>
                                        <th className="border border-gray-300 px-4 py-2">View More Details</th>
                                        <th className="border border-gray-300 px-4 py-2">Posted By</th>
                                        <th className="border border-gray-300 px-4 py-2">Status</th>
                                        {filter === "pending" ? (<th className="border border-gray-300 px-4 py-2">Approve</th>):""}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.length > 0  ? (
                                        filteredData.map((post, index) => (
                                            <tr key={index} className="hover:bg-gray-100">
                                            <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                                            {post.category}
                                            </td>
                                            <td className="border text-center border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                                                
                                                <span onClick={()=>openModal(post)} className='cursor-pointer hover:underline hover:text-blue-600'> {post.postName || post.eventName} </span>
                                            </td>
                                            <td className="border text-center border-gray-300 px-4 py-2">
                                              
                                                {/* <p>Images/Videos:</p> */}
                                                {Array.isArray(post.image) && post.image.length > 0 ? (
                                                  <div className="relative">
                                                {post.image && post.image[currentViewIndex[post._id] || 0].includes("video") ? (  // ✅ Check if it's a video
                                                    <video 
                                                    controls 
                                                    muted 
                                                    preload="metadata"
                                                    className="w-[150px] mx-auto h-[75px] object-cover"
                                                    onClick={() =>
                                                      openMediaModal({ type: "video", src: post.image[currentViewIndex[post._id] || 0] })
                                                    }                                                    >
                                                    <source src={post.image[currentViewIndex[post._id] || 0]} type="video/mp4" />
                                                      Your browser does not support the video tag.
                                                    </video>
                                                ) : (
                                                  <img
                                                  src={post.image[currentViewIndex[post._id] || 0]}
                                                  alt="Post"
                                                  className="w-[150px] mx-auto h-[75px] object-cover cursor-pointer"
                                                  onClick={() =>
                                                    openMediaModal({ type: "image", src: post.image[currentViewIndex[post._id] || 0] })
                                                  }
                                                />
                                              )}
                                                {/* Left Arrow - Disabled if first image */}
                                                <button
                                                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded ${
                                                    (currentViewIndex[post._id] || 0) === 0 ? "opacity-50 cursor-not-allowed" : ""
                                                  }`}
                                                  onClick={() => handlePrev(post._id)}
                                                  disabled={(currentViewIndex[post._id] || 0) === 0}
                                                >
                                                  {"<"}
                                                </button>

                                                {/* Right Arrow - Disabled if last image */}
                                                <button
                                                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded ${
                                                    (currentViewIndex[post._id] || 0) === post.image.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                                                  }`}
                                                  onClick={() => handleNext(post._id, post.image.length)}
                                                  disabled={(currentViewIndex[post._id] || 0) === post.image.length - 1}
                                                >
                                                  {">"}
                                                </button>
                                                </div>
                                                ) : (
                                                <p>No Media</p>
                                                )}



                                            </td>
                                            <td className="border text-center border-gray-300 px-4 py-2">
                                                <button
                                                onClick={() => openModal(post)}
                                                className="text-green-500 hover:text-green-700 cursor-pointer "
                                                >
                                                <img src={eye} alt="edit" className="w-10 h-10" />
                                                </button>
                                            </td>
                                            <td className="border text-center px-4 py-2">{post.postedBy || "Unknown"}</td>
                                            <td className="border text-center px-4 py-2">{post.status || "N/A"}</td>
                                            {filter === "pending" ? (<td className="border text-center px-4 py-2">
                                                <button
                                                    onClick={() => handleApproveClick(post)}
                                                    className={`text-white rounded-lg cursor-pointer p-3 bg-green-600 text-white`}
                                                    // disabled={status === "Approved" || status === "Rejected"}
                                                >
                                                    Approve
                                                </button>
                                            </td>):""}
                                            </tr>
                                        ))
                                        ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4">
                                            No posts found
                                            </td>
                                        </tr>
                                        )}
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-center text-xs mt-6 mb-4">
            <p>© 2025, Laoe Maom. All Rights Reserved.</p>
        </div>

                 
            {/* Modal to show full details of selected post */}
            {showModal && selectedPost && selectedPost.category === 'Events' && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded shadow w-[90%] sm:w-[600px] z-20">
                    <div className="flex flex-row justify-between items-center">
                      <img src={Logo} alt="logo" className="w-[52px] h-auto" />
                      <h2 className="text-lg font-semibold">Post Details</h2>
                      <IoIosClose onClick={closeModal} className="w-8 h-8 cursor-pointer" />
                    </div>
                    <div className="border-b border-gray-200 pt-2"></div>
        
                    <div className="grid grid-cols-2 gap-6 pt-8 text-gray-600">
                      {/* <p>Post Name:</p>
                      <p className="font-light">{selectedPost.postName}</p> */}
                      <p>Event Name:</p>
                      <p className="font-light">{selectedPost.eventName}</p>
                      <p>Category:</p>
                      <p className="font-light">{selectedPost.category}</p>
                      {/* <p>Images/Videos:</p>
                      <p className="font-light "> {selectedPost.image ? (
                                      <img src={selectedPost.image} alt="Post" className="w-[75px] h-[75px] object-cover" />
                                    ) : (
                                      'No Image'
                                    )} </p> */}
        
        <p>Images/Videos:</p>
              {
              selectedPost.image && selectedPost.image.length > 0 ? (
                <div className="relative">
                  {/* Display Current Media */}
                  {selectedPost.image[currentIndex].includes("video") ? (
                    <video
                      controls
                      className="w-[150px] h-[150px] mx-auto object-cover cursor-pointer"
                      onClick={() => openMediaModal({ type: "video", src: selectedPost.image[currentIndex] })}
                    >
                      <source src={selectedPost.image[currentIndex]} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={selectedPost.image[currentIndex]}
                      alt="Post"
                      className="w-[150px] h-[150px] mx-auto object-cover cursor-pointer"
                      onClick={() => openMediaModal({ type: "image", src: selectedPost.image[currentIndex] })}
                    />
                  )}

                  {/* Left Arrow - Disabled if first image */}
                  <button
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded ${
                      currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={currentIndex === 0}
                  >
                    {"<"}
                  </button>

                  {/* Right Arrow - Disabled if last image */}
                  <button
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded ${
                      currentIndex === selectedPost.image.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, selectedPost.image.length - 1))}
                    disabled={currentIndex === selectedPost.image.length - 1}
                  >
                    {">"}
                  </button>
                </div>
              ) : (
                <p>No Media</p>
              )}

                      {/* <p className="font-light">{selectedPost.image}</p> */}
                      <p>Event Start Date:</p>
                      <p className="font-light">{selectedPost.eventStartDate.slice(0, 10) || 'N/A'} & {selectedPost.eventStartTime || 'N/A'} </p>
                      {/* <p>Event Start Time:</p>
                      <p className="font-light">{selectedPost.eventStartTime || 'N/A'}</p> */}
                      <p>Event End Date:</p>
                      <p className="font-light">{selectedPost.eventEndDate.slice(0, 10) || 'N/A'} & {selectedPost.eventEndTime || 'N/A'}</p>
                      {/* <p>Event End Time:</p>
                      <p className="font-light">{selectedPost.eventEndTime || 'N/A'}</p> */}
                      <p>Company Name:</p>
                      <p className="font-light">{selectedPost.companyName}</p>
                      <p>Description:</p>
                      <p className="font-light">{selectedPost.description}</p>
                      <p>Location:</p>
                      <p className="font-light">{selectedPost.location}</p>
                      
                    </div>
        
                    {/* <div className='flex items-center gap-[50px] p-6 '>
                        <div className="flex justify-center items-center">
                          <img
                            src={likedPosts[selectedPost?._id] ? liked : like} 
                            alt="like"
                            className={`w-[35px] h-[35px] cursor-pointer ${likedPosts[selectedPost?._id] ? 'bg-red-700' : ''}`}
                            onClick={() => incrementLike(selectedPost?._id)} 
                          />
                        </div>
        
                        <div className="flex justify-center items-center">
                          <img
                            src={share}
                            alt="share"
                            className="w-[35px] h-[35px] cursor-pointer "
                            onClick={() => incrementShare(selectedPost._id)}
                          />
                        </div>
                        <div className="flex justify-center items-center">
                          <img
                            src={savedPosts[selectedPost?._id] ? saved : save}
                            alt="save"
                            className="w-[35px] h-[35px] cursor-pointer"
                            onClick={() => toggleSave(selectedPost?._id)}  
                          />
                        </div>
                    </div> */}
        
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={closeModal}
                        className="bg-green-400 text-white px-12 py-2 rounded hover:bg-green-600"
                      >
                        Close
                      </button>
                    </div>
                    <div className="text-center text-xs mt-6 mb-4">
                      <p>© 2025, Laoe Maom. All Rights Reserved.</p>
                    </div>
                  </div>
                </div>
              )}
        
            {showModal && selectedPost && selectedPost.category === 'Coupons/Discount' && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded shadow w-[90%] sm:w-[600px] z-20">
                    <div className="flex flex-row justify-between items-center">
                      <img src={Logo} alt="logo" className="w-[52px] h-auto" />
                      <h2 className="text-lg font-semibold">Post Details</h2>
                      <IoIosClose onClick={closeModal} className="w-8 h-8 cursor-pointer" />
                    </div>
                    <div className="border-b border-gray-200 pt-2"></div>
        
                    <div className="grid grid-cols-2 gap-6 pt-8 text-gray-600">
                      <p>Post Name:</p>
                      <p className="font-light">{selectedPost.postName}</p>
                      <p>Category:</p>
                      <p className="font-light">{selectedPost.category}</p>
                      {/* <p>Images/Videos:</p>
                      <p className="font-light "> {selectedPost.image ? (
                         <img src={selectedPost.image} alt="Post" className="w-[75px] h-[75px] object-cover" />
                       ) : (
                         'No Image'
                       )} </p> */}
        
        <p>Images/Videos:</p>
              {
              selectedPost.image && selectedPost.image.length > 0 ? (
                <div className="relative">
                  {/* Display Current Media */}
                  {selectedPost.image[currentIndex].includes("video") ? (
                    <video
                      controls
                      className="w-[150px] h-[150px] mx-auto object-cover cursor-pointer"
                      onClick={() => openMediaModal({ type: "video", src: selectedPost.image[currentIndex] })}
                    >
                      <source src={selectedPost.image[currentIndex]} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={selectedPost.image[currentIndex]}
                      alt="Post"
                      className="w-[150px] h-[150px] mx-auto object-cover cursor-pointer"
                      onClick={() => openMediaModal({ type: "image", src: selectedPost.image[currentIndex] })}
                    />
                  )}

                  {/* Left Arrow - Disabled if first image */}
                  <button
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded ${
                      currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={currentIndex === 0}
                  >
                    {"<"}
                  </button>

                  {/* Right Arrow - Disabled if last image */}
                  <button
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded ${
                      currentIndex === selectedPost.image.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, selectedPost.image.length - 1))}
                    disabled={currentIndex === selectedPost.image.length - 1}
                  >
                    {">"}
                  </button>
                </div>
              ) : (
                <p>No Media</p>
              )}

                      <p>Description:</p>
                      <p className="font-light">{selectedPost.description}</p>
                      <p>Coupon Code:</p>
                      <p className="font-light">{selectedPost.couponCode || 'N/A'}</p>
                      <p>Valid Upto:</p>
                      <p className="font-light">{selectedPost.validUpto.slice(0, 10) || 'N/A'}</p>
                      <p>Location:</p>
                      <p className="font-light">{selectedPost.location}</p>
                      
                    </div>
        
                    {/* <div className='flex items-center gap-[50px] p-6 '>
                        <div className="flex justify-center items-center">
                          <img
                            src={likedPosts[selectedPost._id] ? liked : like} 
                            alt="like"
                            className={`w-[35px] h-[35px] cursor-pointer ${likedPosts[selectedPost._id] ? 'bg-red-700' : ''}`}
                            onClick={() => incrementLike(selectedPost._id)}t
                          />
                        </div>
                        <div className="flex justify-center items-center">
                          <img
                            src={share}
                            alt="share"
                            className="w-[35px] h-[35px] cursor-pointer"
                            onClick={() => incrementShare(selectedPost._id)}
                          />
                        </div>
                        <div className="flex justify-center items-center">
                          <img
                            src={savedPosts[selectedPost?._id] ? saved : save}
                            alt="save"
                            className="w-[35px] h-[35px] cursor-pointer"
                            onClick={() => toggleSave(selectedPost?._id)}  
                          />
                        </div>
                    </div> */}
        
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={closeModal}
                        className="bg-green-400 text-white px-12 py-2 rounded hover:bg-green-600"
                      >
                        Close
                      </button>
                    </div>
                    <div className="text-center text-xs mt-6 mb-4">
                      <p>© 2025, Laoe Maom. All Rights Reserved.</p>
                    </div>
                  </div>
                </div>
              )}
        
              {showModal && selectedPost && (selectedPost.category === 'Dining' || selectedPost.category === 'Emergency Information' || selectedPost.category === 'Product' ) && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded shadow w-[90%] sm:w-[600px] z-20">
                    <div className="flex flex-row justify-between items-center">
                      <img src={Logo} alt="logo" className="w-[52px] h-auto" />
                      <h2 className="text-lg font-semibold">Post Details</h2>
                      <IoIosClose onClick={closeModal} className="w-8 h-8 cursor-pointer" />
                    </div>
                    <div className="border-b border-gray-200 pt-2"></div>
        
                    <div className="grid grid-cols-2 gap-6 pt-8 text-gray-600">
                      <p>Post Name:</p>
                      <p className="font-light">{selectedPost.postName}</p>
                      <p>Category:</p>
                      <p className="font-light">{selectedPost.category}</p>
                      
                      <p>Images/Videos:</p>
              {
              selectedPost.image && selectedPost.image.length > 0 ? (
                <div className="relative">
                  {/* Display Current Media */}
                  {selectedPost.image[currentIndex].includes("video") ? (
                    <video
                      controls
                      className="w-[150px] h-[150px] mx-auto object-cover cursor-pointer"
                      onClick={() => openMediaModal({ type: "video", src: selectedPost.image[currentIndex] })}
                    >
                      <source src={selectedPost.image[currentIndex]} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={selectedPost.image[currentIndex]}
                      alt="Post"
                      className="w-[150px] h-[150px] mx-auto object-cover cursor-pointer"
                      onClick={() => openMediaModal({ type: "image", src: selectedPost.image[currentIndex] })}
                    />
                  )}

                  {/* Left Arrow - Disabled if first image */}
                  <button
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded ${
                      currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={currentIndex === 0}
                  >
                    {"<"}
                  </button>

                  {/* Right Arrow - Disabled if last image */}
                  <button
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded ${
                      currentIndex === selectedPost.image.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, selectedPost.image.length - 1))}
                    disabled={currentIndex === selectedPost.image.length - 1}
                  >
                    {">"}
                  </button>
                </div>
              ) : (
                <p>No Media</p>
              )}

                      <p>Description:</p>
                      <p className="font-light">{selectedPost.description}</p>
                      <p>Location:</p>
                      <p className="font-light">{selectedPost.location}</p>
                      
                     </div>
        
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={closeModal}
                        className="bg-green-400 text-white px-12 py-2 rounded hover:bg-green-600"
                      >
                        Close
                      </button>
                    </div>
        
        
                    <div className="text-center text-xs mt-6 mb-4">
                      <p>© 2025, Laoe Maom. All Rights Reserved.</p>
                    </div>
                  </div>
                </div>
              )}


{approveModel  && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-[90%] sm:w-[600px] z-20">
            <div className="flex flex-row justify-between items-center">
              <img src={Logo} alt="logo" className="w-[52px] h-auto" />
              <h2 className="text-lg font-semibold">Approve post </h2>
              <IoIosClose onClick={cancelApproveClick} className="w-8 h-8 cursor-pointer" />
            </div>
            <div className="border-b border-gray-200 pt-2"></div>

            <div className="grid grid-cols-2 gap-6 pt-8 text-gray-600">
                <button
                  onClick={()=>handleRejectPost(approvePostId)}
                  className="bg-red-400 text-white px-12 py-2 rounded hover:bg-red-600  cursor-pointer"
                >
                  Reject
                </button>

                <button
                  onClick={() => handleApprovePost(approvePostId)}
                  className="bg-green-400 text-white px-12 py-2 rounded hover:bg-green-600 cursor-pointer"
                >    
                  Approve
                </button>
           </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={cancelApproveClick}
                className="bg-blue-400 text-white px-12 py-2 rounded hover:bg-blue-600  cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="text-center text-xs mt-6 mb-4">
              <p>© 2025, Laoe Maom. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ApprovalsPageInDashboard