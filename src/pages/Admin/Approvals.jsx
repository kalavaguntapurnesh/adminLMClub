import React from 'react'
import edit from "../../assets/Edit.svg";
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import eye from "../../assets/Eye.svg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Logo from "../../assets/LMDarkLogo.webp";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Approvals = () => {
    const {postId} = useParams();
    console.log(postId);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const categories = ['Coupons/Discount', 'Events', 'Dining', 'Emergency Information', 'Product'];
  
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    // Fetch data from API
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/beehive/fetch-post-details/${postId}`);
        setPosts(response.data);
        // setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    useEffect(() => {
      if (postId) fetchPosts();
  }, [postId]);
  
  
  console.log(posts);


  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchUsername = async () => {
          try {
              const response = await axios.get(`${backendURL}/api/beehive/each-post-username/${postId}`);
              setUsername(response.data.firstName + " " + response.data.lastName); 

          } catch (err) {
              setError('Failed to fetch username');
          } finally {
              setLoading(false);
          }
      };

      fetchUsername();
  }, [postId]);

  console.log("user name: ", username);
  

  
  
    // Filter posts based on search, category, and date
    // const filteredPosts = posts.filter((post) => {
    //   const postName = post.postName ? post.postName.toLowerCase() : '';
    //   const eventName = post.eventName ? post.eventName.toLowerCase() : '';
    //   const category = post.category ? post.category.toLowerCase() : '';
    //   const query = search.toLowerCase();
    
    //   const postDate = post.eventStartDate ? post.eventStartDate.slice(0, 10) : ''; 
      
    //   console.log('Post Date:', postDate); // For debugging
    
    //   // Normalize the frontend selected dates (strip time to only date)
    //   const selectedStart = selectedStartDate ? selectedStartDate.slice(0, 10) : null;
    //   const selectedEnd = selectedEndDate ? selectedEndDate.slice(0, 10) : null;
    
    //   // Check if postDate is within the selected date range
    //   const isDateMatch = (selectedStart && selectedEnd)
    //     ? (postDate >= selectedStart && postDate <= selectedEnd) 
    //     : true; 
    
    //   return (
    //     (postName.includes(query) || eventName.includes(query) || category.includes(query)) &&
    //     (category.includes(selectedCategory.toLowerCase()) || !selectedCategory) &&
    //     isDateMatch
    //   );
    // });
    
    // Pagination logic: slice the filteredPosts array
    // const indexOfLastPost = currentPage * rowsPerPage;
    // const indexOfFirstPost = indexOfLastPost - rowsPerPage;
    // const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
    const openModal = (post) => {
  
      setSelectedPost(post);
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
      setSelectedPost(null);
      
    };

    console.log("selectedPost :", selectedPost);

  const [approveModel, setApproveModel] = useState(false);
   const handleApproveClick = async()=> {
      setApproveModel(true);
  }
  const cancelApproveClick = async() => {
    setApproveModel(false);
  }



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
        fetchPosts();
        setApproveModel(false);
    } catch (error) {
        console.error("Error approving post:", error);
    }
};

const handleRejectPost = async()=>{
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
    fetchPosts();
    setApproveModel(false);
} catch (error) {
    console.error("Error rejecting post:", error);
}
}


const [status, setStatus] = useState("");

useEffect(() => {
  const fetchStatus = async () => {
    try {
      const response = await fetch(`${backendURL}/api/beehive/fetch-approval-status/${postId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch status");
      }
      const data = await response.json();
      setStatus(data.status);
      fetchPosts();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchStatus();
}, [postId]);




  return (
      <div className="pt-2">
          <div className="relative">
            <div className="w-full">
              <div className="w-full mx-auto max-w-[1200px] ">
                <div className="p-4 w-[100%] ">
                  <div className="space-y-2 w-[100%] px-4">
                    <p className="lg:text-3xl text-2xl font-bold">
                      <span className="text-green-500">User Post</span> Approvals 
                    </p>
                  </div>
    
           

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
                      <th className="border border-gray-300 px-4 py-2">Approved</th> 
                    </tr>
                  </thead>
                  <tbody>
                  {posts && posts.data ? (
                        <tr className="hover:bg-gray-100">
                          <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                            {posts?.data.category || "N/A"} 
                          </td>
                          <td className="border text-center border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                            <span onClick={()=>openModal(posts)} className='cursor-pointer hover:underline hover:text-blue-600'>
                              {posts?.data.postName || posts?.data.eventName || "N/A"}  
                            </span>
                          </td>
                          <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                            {/* {posts?.data.image}   */}
                            {posts?.data.image ? (
                              posts?.data.image.includes("video") ? (  // ✅ Check if it's a video
                                <video 
                                controls 
                                className="w-[150px] h-[150px] object-cover cursor-pointer"
                                onClick={() => openMediaModal({ type: "video", src: posts?.data.image })}
                                >
                                  <source src={posts?.data.image} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              ) : (
                                <img 
                                src={posts?.data.image || "N/A" } 
                                alt="Post" 
                                className="w-[75px] h-[75px] object-cover cursor-pointer" 
                                onClick={() => openMediaModal({ type: "image", src: posts?.data.image })}
                                />
                              )
                            ) : (
                              <p>No Media</p>
                            )}
                          </td>
                          <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                           <button
                              onClick={() => openModal(posts)}
                              className="text-green-500 hover:text-green-700 cursor-pointer"
                            >
                              <img src={eye} alt="edit" className="w-10 h-10" />
                            </button>
                          </td>
                          <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                          {username || "name"} 
                          </td>
                          <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                            {status}
                          </td>
                          <td className="border text-center border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                          <button
                            onClick={() => handleApproveClick()}
                            className={`text-white rounded-lg cursor-pointer p-3 ${
                              status === "Approved" || status === "Rejected" ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-800"
                            }`}
                            disabled={status === "Approved" || status === "Rejected"}
                          >
                            Approve
                          </button>

                          </td>
                        </tr>
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

          
    {/* Modal to show full details of selected post */}
    {showModal && selectedPost && selectedPost?.data.category === 'Events' && (
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
              <p className="font-light">{selectedPost?.data.postName}</p> */}
              <p>Event Name:</p>
              <p className="font-light">{selectedPost?.data.eventName}</p>
              <p>Category:</p>
              <p className="font-light">{selectedPost?.data.category}</p>
              {/* <p>Images/Videos:</p>
              <p className="font-light "> {selectedPost?.data.image ? (
                              <img src={selectedPost?.data.image} alt="Post" className="w-[75px] h-[75px] object-cover" />
                            ) : (
                              'No Image'
                            )} </p> */}

              <p>Images/Videos:</p>
                {selectedPost?.data.image ? (
                  selectedPost?.data.image.includes("video") ? (  // ✅ Check if it's a video
                    <video 
                    controls 
                    className="w-[150px] h-[150px] object-cover cursor-pointer"
                    onClick={() => openMediaModal({ type: "video", src: selectedPost?.data.image })}
                    >
                      <source src={selectedPost?.data.image} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img 
                    src={selectedPost?.data.image} 
                    alt="Post" 
                    className="w-[75px] h-[75px] object-cover cursor-pointer" 
                    onClick={() => openMediaModal({ type: "image", src: selectedPost?.data.image })}
                    />
                  )
                ) : (
                  <p>No Media</p>
                )}
              {/* <p className="font-light">{selectedPost?.data.image}</p> */}
              <p>Event Start Date:</p>
              <p className="font-light">{selectedPost?.data.eventStartDate.slice(0, 10) || 'N/A'} & {selectedPost?.data.eventStartTime || 'N/A'} </p>
              {/* <p>Event Start Time:</p>
              <p className="font-light">{selectedPost?.data.eventStartTime || 'N/A'}</p> */}
              <p>Event End Date:</p>
              <p className="font-light">{selectedPost?.data.eventEndDate.slice(0, 10) || 'N/A'} & {selectedPost?.data.eventEndTime || 'N/A'}</p>
              {/* <p>Event End Time:</p>
              <p className="font-light">{selectedPost?.data.eventEndTime || 'N/A'}</p> */}
              <p>Company Name:</p>
              <p className="font-light">{selectedPost?.data.companyName}</p>
              <p>Description:</p>
              <p className="font-light">{selectedPost?.data.description}</p>
              <p>Location:</p>
              <p className="font-light">{selectedPost?.data.location}</p>
              
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
                    onClick={() => incrementShare(selectedPost?.data._id)}
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

    {showModal && selectedPost && selectedPost?.data.category === 'Coupons/Discount' && (
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
              <p className="font-light">{selectedPost?.data.postName}</p>
              <p>Category:</p>
              <p className="font-light">{selectedPost?.data.category}</p>
              {/* <p>Images/Videos:</p>
              <p className="font-light "> {selectedPost?.data.image ? (
                 <img src={selectedPost?.data.image} alt="Post" className="w-[75px] h-[75px] object-cover" />
               ) : (
                 'No Image'
               )} </p> */}

              <p>Images/Videos:</p>
                {selectedPost?.data.image ? (
                  selectedPost?.data.image.includes("video") ? (  
                    <video 
                    controls 
                    className="w-[150px] h-[150px] object-cover cursor-pointer"
                    onClick={() => openMediaModal({ type: "video", src: selectedPost?.data.image })}
                    >
                      <source src={selectedPost?.data.image} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img 
                    src={selectedPost?.data.image} 
                    alt="Post" 
                    className="w-[75px] h-[75px] object-cover cursor-pointer" 
                    onClick={() => openMediaModal({ type: "image", src: selectedPost?.data.image })}
                    />
                  )
                ) : (
                  <p>No Media</p>
                )}
              <p>Description:</p>
              <p className="font-light">{selectedPost?.data.description}</p>
              <p>Coupon Code:</p>
              <p className="font-light">{selectedPost?.data.couponCode || 'N/A'}</p>
              <p>Valid Upto:</p>
              <p className="font-light">{selectedPost?.data.validUpto.slice(0, 10) || 'N/A'}</p>
              <p>Location:</p>
              <p className="font-light">{selectedPost?.data.location}</p>
              
            </div>

            {/* <div className='flex items-center gap-[50px] p-6 '>
                <div className="flex justify-center items-center">
                  <img
                    src={likedPosts[selectedPost?.data._id] ? liked : like} 
                    alt="like"
                    className={`w-[35px] h-[35px] cursor-pointer ${likedPosts[selectedPost?.data._id] ? 'bg-red-700' : ''}`}
                    onClick={() => incrementLike(selectedPost?.data._id)}t
                  />
                </div>
                <div className="flex justify-center items-center">
                  <img
                    src={share}
                    alt="share"
                    className="w-[35px] h-[35px] cursor-pointer"
                    onClick={() => incrementShare(selectedPost?.data._id)}
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

      {showModal && selectedPost && (selectedPost?.data.category === 'Dining' || selectedPost?.data.category === 'Emergency Information' || selectedPost?.data.category === 'Product' ) && (
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
              <p className="font-light">{selectedPost?.data.postName}</p>
              <p>Category:</p>
              <p className="font-light">{selectedPost?.data.category}</p>
              {/* <p>Images/Videos:</p>
              <p className="font-light "> {selectedPost?.data.image ? (
                 <img src={selectedPost?.data.image} alt="Post" className="w-[75px] h-[75px] object-cover" />
               ) : (
                 'No Image'
               )} </p> */}

                <p>Images/Videos:</p>
                {selectedPost?.data.image ? (
                  selectedPost?.data.image.includes("video") ? (  
                    <video 
                    controls 
                    className="w-[150px] h-[150px] object-cover cursor-pointer"
                    onClick={() => openMediaModal({ type: "video", src: selectedPost?.data.image })}
                    >
                      <source src={selectedPost?.data.image} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img 
                    src={selectedPost?.data.image} 
                    alt="Post" 
                    className="w-[75px] h-[75px] object-cover cursor-pointer" 
                    onClick={() => openMediaModal({ type: "image", src: selectedPost?.data.image })}
                    />
                  )
                ) : (
                  <p>No Media</p>
                )}
              <p>Description:</p>
              <p className="font-light">{selectedPost?.data.description}</p>
              <p>Location:</p>
              <p className="font-light">{selectedPost?.data.location}</p>
              
             </div>

             {/* <div className='flex items-center gap-[50px] p-6 '>
                <div className="flex justify-center items-center">
                  <img
                    src={likedPosts[selectedPost?.data._id] ? liked : like} 
                    alt="like"
                    className={`w-[35px] h-[35px] cursor-pointer ${likedPosts[selectedPost?.data._id] ? 'bg-red-700' : ''}`}
                    onClick={() => incrementLike(selectedPost?.data._id)}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <img
                    src={share}
                    alt="share"
                    className="w-[35px] h-[35px] cursor-pointer "
                    onClick={() => incrementShare(selectedPost?.data._id)}
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
                  onClick={handleRejectPost}
                  className="bg-red-400 text-white px-12 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>

                <button
                  onClick={() => handleApprovePost(posts?.data?._id)}
                  className="bg-green-400 text-white px-12 py-2 rounded hover:bg-green-600"
                >
                  Approve
                </button>
           </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={cancelApproveClick}
                className="bg-blue-400 text-white px-12 py-2 rounded hover:bg-blue-600"
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

export default Approvals