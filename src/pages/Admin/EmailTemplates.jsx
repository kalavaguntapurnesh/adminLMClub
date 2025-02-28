import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { MdEdit } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import Logo from "../../assets/LMDarkLogo.webp";

const EmailTemplates = () => {
  const { backendUrl, aToken } = useContext(AdminContext);

  const [emailName, setEmailName] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [editPlanData, setEditPlanData] = useState({
    emailName: "",
    emailBody: "",
    planAmount: "",
    widgets: [],
  });

  const [plans, setPlans] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [showPlanModal, setShowPlanModal] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("emailName", emailName);
    formData.append("emailBody", emailBody);

    // formData.forEach((value, key) => {
    //   console.log(`${key} : ${value}`);
    // });

    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-email",
        formData,
        { headers: { aToken, "Content-Type": "multipart/form-data" } }
      );

      console.log("Sending the response");

      if (data.success) {
        toast.success("Email Body added successfully");
        setModalIsOpen(false);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error here: ", error);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setEmailName("");
    setEmailBody("");
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await axios.get(backendUrl + "/api/admin/all-emails", {
          headers: { aToken },
        });
        setPlans(response.data.emails);
      } catch (error) {
        setError("Failed to fetch plans");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const openPlanModal = (plan) => {
    setSelectedPlan(plan);
    setShowPlanModal(true);
  };

  const closePlanModal = (user) => {
    setShowPlanModal(false);
    setSelectedPlan(null);
  };

  const openEditModal = (plan) => {
    setSelectedPlan(plan);
    setEditPlanData({
      emailName: plan.emailName,
      emailBody: plan.emailBody,
      planAmount: plan.planAmount,
      widgets: plan.widgets || [],
    });

    setEditMode(true);
  };

  const closeEditModal = () => {
    setEditMode(false);
    setSelectedPlan(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("The edited plan details are : ");
      console.log(selectedPlan._id);
      console.log(editPlanData.emailName);
      console.log(editPlanData.emailBody);
      console.log(selectedPlan.isActive);

      const response = await axios.put(
        backendUrl + "/api/admin/update-email",
        {
          emailId: selectedPlan._id,
          emailName: editPlanData.emailName,
          emailBody: editPlanData.emailBody,
          // isActive: selectedPlan.isActive,
        },
        { headers: { aToken } }
      );

      if (response.data.success) {
        toast.success("Plan Updated Successfully!");
        setPlans((plan) =>
          plan._id === selectedPlan._id ? response.data.updatedPlan : plan
        );
        closeEditModal();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating subscription plan");
    }
  };

  return (
    <div className="pt-2">
      <div className="relative">
        <div className="w-full">
          <div className="w-full mx-auto max-w-[1400px] ">
            <div className="p-4 w-[100%] ">
              <div className="flex flex-row items-center justify-between px-4">
                <div className="">
                  <p className="lg:text-3xl text-2xl font-bold">
                    <span className="text-green-500">Current</span> Plans
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => setModalIsOpen(true)}
                    className="bg-green-400 cursor-pointer text-white px-12 py-2 rounded"
                  >
                    Create a new plan
                  </button>
                </div>
              </div>

              {/* PLANS TABLE */}
              <div className="px-4 w-full mt-8">
                {loading ? (
                  <p>Loading plans...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <table className="w-full border border-gray-100">
                    <thead>
                      <tr className="bg-green-400">
                        <th className="border font-bold border-gray-300 px-4 py-2">
                          Name
                        </th>
                        <th className="border font-bold border-gray-300 px-4 py-2">
                          Description
                        </th>
                        <th className="border font-bold border-gray-300 px-4 py-2">
                          Status
                        </th>
                        <th className="border font-bold border-gray-300 px-4 py-2">
                          More Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {plans.map((plan) => (
                        <tr key={plan._id} className="hover:bg-gray-100">
                          <td className="border text-center  border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                            {plan.emailName}
                          </td>

                          <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                            {plan.emailBody}
                          </td>

                          <td className="border text-center border-gray-300 px-4 py-2 ">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={plan.emailStatus}
                                className="sr-only peer"
                              />
                              <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:after:translate-x-5 peer-checked:after:bg-white peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                            </label>
                          </td>
                          <td className="border text-center border-gray-300 px-4 py-2 text-zinc-600 text-sm align-middle h-full">
                            {/* <div className="flex justify-center items-center w-8 h-8 border-2 border-green-400 bg-green-500 rounded cursor-pointer">
                                 <img src={edit} alt="edit" className="w-5 h-5" />
                               </div> */}
                            <div className="flex gap-6 flex-row items-center justify-center">
                              <button
                                onClick={() => openPlanModal(plan)}
                                className="cursor-pointer"
                              >
                                <FaEye className="w-5 h-5" />
                              </button>
                              <button
                                className="cursor-pointer"
                                onClick={() => openEditModal(plan)}
                              >
                                <MdEdit className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {plans.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-4">
                            No Plans Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center lg:mx-0 mx-8">
          <div className="bg-white p-6 rounded shadow w-[600px] z-20">
            <div className="flex flex-row justify-between items-center">
              <img src={Logo} alt="logo" className="w-[52px] h-auto " />

              <h2 className="md:text-lg text-base font-semibold text-center">
                Create a new plan
              </h2>
              <IoIosClose
                onClick={() => setModalIsOpen(false)}
                className="md:w-8 md:h-8 w-6 h-6 cursor-pointer"
              />
            </div>

            <div className="border-b border-gray-200 pt-2"></div>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="mt-4">
              {/* <input
                   type="text"
                   className="border p-2 w-full mb-2"
                   onChange={handleChange}
                 /> */}

              <div className="w-[95%] flex justify-center items-start flex-col mb-2">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-bold text-colorThree "
                >
                  Plan Name
                </label>
                <input
                  type="text"
                  name="emailName"
                  id="emailName"
                  className=" border border-gray-300 text-gray-900 sm:text-sm rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500  block w-full p-3"
                  placeholder="Name of the plan"
                  required="true"
                  onChange={(e) => setEmailName(e.target.value)}
                ></input>
              </div>

              <div className="w-[95%] flex justify-center items-start flex-col mb-2">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-bold text-colorThree "
                >
                  Plan Description
                </label>
                <textarea
                  rows={4}
                  name="description"
                  placeholder="Description"
                  className=" border border-gray-300 text-gray-900 sm:text-sm rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500  block w-full p-2.5"
                  onChange={(e) => setEmailBody(e.target.value)}
                />
              </div>

              <div className="flex justify-center pt-12">
                <button
                  className="bg-green-400 transition ease-in-out duration-1000 cursor-pointer text-white md:px-16 px-12 md:py-2 py-[6px] rounded hover:bg-green-600 font-semibold text-sm"
                  type="submit"
                >
                  {loading ? "Creating..." : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPlanModal && selectedPlan && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center lg:mx-0 mx-8">
          <div className="bg-white p-6 rounded shadow w-[600px] z-20">
            <div className="flex flex-row justify-between items-center">
              <img src={Logo} alt="logo" className="w-[52px] h-auto" />

              <h2 className="md:text-lg text-base font-bold text-center">
                Plan Details
              </h2>

              <IoIosClose
                onClick={closePlanModal}
                className="md:w-8 md:h-8 w-6 h-6 cursor-pointer"
              />
            </div>

            <div className="border-b border-gray-200 pt-2"></div>

            <div className="grid grid-cols-2 gap-6 pt-8 text-gray-600 md:text-[16px] text-xs">
              <p>Plan Name:</p>
              <p className="font-light">{selectedPlan.emailName}</p>

              <p>Plan Description:</p>
              <p className="font-light">{selectedPlan.emailBody}</p>

              {/* <p>Active</p>
   
                 {selectedPlan.isActive ? (
                   <p className="font-light">Yes</p>
                 ) : (
                   <p className="font-light">No</p>
                 )} */}

              {/* <p>Plan Logo:</p>
                 <p></p> */}

              <p>Status:</p>

              <div>
                <div className="border text-sm text-center md:w-[120px] w-[100px] border-green-400 rounded-full px-8 md:py-2 py-[6px] text-green-400 font-semibold">
                  Active
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-6 ">
              <button
                onClick={closePlanModal}
                className="bg-green-400 transition ease-in-out duration-1000 cursor-pointer text-white md:px-16 px-12 md:py-2 py-[6px] rounded hover:bg-green-600"
              >
                Close
              </button>

              {/* <button
                   className="bg-green-400 transition ease-in-out duration-1000 cursor-pointer text-white md:px-16 px-12 md:py-2 py-[6px] rounded hover:bg-green-600 font-semibold text-sm"
                   type="submit"
                 >
                   Edit Plan
                 </button> */}
            </div>
          </div>
        </div>
      )}

      {editMode && selectedPlan && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-[600px]">
            <div className="flex justify-between items-center">
              <img src={Logo} alt="logo" className="w-[52px] h-auto" />
              <h2 className="md:text-lg text-base font-bold text-center">
                Edit Plan Details
              </h2>
              <IoIosClose
                onClick={closeEditModal}
                className="md:w-8 md:h-8 w-6 h-6 cursor-pointer"
              />
            </div>

            <div className="border-b border-gray-200 pt-2"></div>

            <form onSubmit={handleEditSubmit} className="mt-4">
              <div className="mb-2">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-bold text-colorThree "
                >
                  Email Name
                </label>
                <input
                  type="text"
                  value={editPlanData.emailName}
                  onChange={(e) =>
                    setEditPlanData({
                      ...editPlanData,
                      emailName: e.target.value,
                    })
                  }
                  placeholder="Plan Name"
                  className=" border border-gray-300 text-gray-900 sm:text-sm rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500  block w-full p-2.5"
                  required
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-bold text-colorThree "
                >
                  Email Description
                </label>

                <textarea
                  value={editPlanData.emailBody}
                  onChange={(e) =>
                    setEditPlanData({
                      ...editPlanData,
                      emailBody: e.target.value,
                    })
                  }
                  placeholder="Plan Description"
                  className=" border border-gray-300 text-gray-900 sm:text-sm rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500  block w-full p-2.5"
                  rows={10}
                ></textarea>
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-green-400 text-white px-12 py-2 mt-4 cursor-pointer rounded"
                >
                  Update Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplates;
