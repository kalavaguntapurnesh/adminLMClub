import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import Logo from "../assets/LMDarkLogo.webp";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Admin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          navigate("/admin-dashboard");
          toast.success("Logged In Succesfully!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center bg-[#f0f1f3]"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[360px] md:min-w-[430px] border border-gray-200  bg-white rounded text-sm text-black">
        <div className="flex justify-start items-center w-[100%] mb-3">
          <img src={Logo} alt="logo" className="w-16 h-16" />
        </div>

        <p className="text-2xl font-bold m-auto w-[100%] mb-3">
          <span className="text-[#22c55e]">{state}</span> Login
        </p>

        <div className="w-full pb-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-bold text-colorThree "
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className=" border border-gray-300 text-gray-900 sm:text-sm rounded focus:outline-green-300 block w-full p-2.5 "
            type="email"
            required
          />
        </div>

        <div className="w-full pb-2">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-bold text-colorThree "
          >
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className=" border border-gray-300 text-gray-900 sm:text-sm rounded focus:outline-green-300 block w-full p-2.5 "
            type="password"
            required
          />
        </div>

        <div className="flex items-center justify-between w-[100%]">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required=""
              ></input>
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="remember" className="text-black  ">
                Keep me signed in
              </label>
            </div>
          </div>
          <a href="/forgotPassword" className="text-sm hover:underline">
            Forgot password?
          </a>
        </div>

        <button className="w-full text-white bg-green-500 text-base transition ease-in-out duration-1000 focus:outline-none font-semibold rounded px-5 py-2.5 text-center cursor-pointer hover:bg-white hover:text-green-500 hover:border-green-500 border mt-3">
          Login
        </button>
        {/* {state === "Admin" ? (
          <p className="cursor-pointer">
            Doctor Login{" "}
            <span
              className="text-[#5f6fff] underline"
              onClick={() => setState("Doctor")}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p className="cursor-pointer">
            Admin Login?{" "}
            <span
              className="text-[#5f6fff] underline"
              onClick={() => setState("Admin")}
            >
              Click Here
            </span>
          </p>
        )} */}
      </div>
    </form>
  );
};

export default Login;
