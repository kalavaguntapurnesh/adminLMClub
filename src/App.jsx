import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import UsersList from "./pages/Admin/UsersList";
import AdminProfile from "./pages/Admin/AdminProfile";
import Plans from "./pages/Admin/Plans";
import Widgets from "./pages/Admin/Widgets";
import EmailTemplates from "./pages/Admin/EmailTemplates";
import Approvals from "./pages/Admin/Approvals";
import ApprovalsPageInDashboard from "./pages/Admin/ApprovalsPageInDashboard";
function App() {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className="bg-[#f8f9fd]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard></Dashboard>} />
          <Route
            path="/all-appointments"
            element={<AllAppointments></AllAppointments>}
          />
          <Route path="/add-doctor" element={<AddDoctor></AddDoctor>} />
          <Route path="/users-list" element={<UsersList></UsersList>} />

          <Route path="/plans" element={<Plans></Plans>} />

          <Route path="/widgets" element={<Widgets></Widgets>} />

          <Route
            path="/email-templates"
            element={<EmailTemplates></EmailTemplates>}
          />

          <Route
            path="/admin-profile"
            element={<AdminProfile></AdminProfile>}
          />

          <Route
            path="/user-approvals/:postId"
            element={<Approvals/>}
          />
           <Route
            path="/user-approvals"
            element={<ApprovalsPageInDashboard/>}
          />
        </Routes>
      </div>
    </div>
  ) : (
    <>
    <Login />
    <ToastContainer />
      <Routes>
        <Route
          path="/user-approvals/:postId"
          element={<Approvals/>}
        />
      </Routes>
    </>
  );
}

export default App;
