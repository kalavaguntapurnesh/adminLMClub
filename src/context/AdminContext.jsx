import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const [adminEmail, setAdminEmail] = useState("");

  const [users, setUsers] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllUsers = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );

      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAdminProfile = async () => {
    try {
      console.log("Getting the admin profile in frontend");
      const { data } = await axios.get(
        backendUrl + "/api/admin/get-admin-profile"
      );
      if (data.success) {
        setAdminEmail(data.email);
        console.log("Admin email is : ", data.email);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    users,
    getAllUsers,
    changeAvailability,
    getAdminProfile,
    adminEmail,
    setAdminEmail
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
