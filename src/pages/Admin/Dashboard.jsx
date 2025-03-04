import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FaUsers } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import CountUp from "react-countup";
import { MdSecurity } from "react-icons/md";
import bronze from "../../assets/bronze.jpg";
import silver from "../../assets/silver.jpg";
import gold from "../../assets/gold.jpg";
import platinum from "../../assets/platinum.jpg";
import Free from "../../assets/Free.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {
    users,
    aToken,
    getAllUsers,
    // changeAvailability
  } = useContext(AdminContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (aToken) {
      getAllUsers();
    }
  }, [aToken]);

  const values2 = [
    {
      icon: platinum,
      Title: "PLATINUM",
      price: "$14.99/month",
      renewal: "Registration / Renewal $0",
      // description:
      //   "Grow program allows you to earn redeemable points and milestones simply by inviting others to join our community.",
      link: "/grow",
    },

    {
      icon: gold,
      Title: "GOLD",
      price: "$11.99/month",
      renewal: "Registration / Renewal $0",
      // description:
      //   "Beehive allows you to start earning redeemable points by sharing deals, coupons, and information you've discovered. ",
      link: "/beehive",
    },
    {
      icon: silver,
      Title: "SILVER",
      price: "$8.99/month",
      renewal: "Registration / Renewal $0",
      // description:
      //   "Unlock Broadcast to start earning points by sharing promotions from local businesses on your social media will earn points.",
      link: "/broadcast",
    },
    {
      icon: bronze,
      Title: "BRONZE",
      price: "$5.99/month",
      renewal: "Registration / Renewal $0",
      // description:
      //   "Activate E-Store and we will share a percentage of our profits with you because you are helping our brand to grow.",
      link: "/estore",
    },
    {
      icon: Free,
      Title: "FREE",
      price: "$0.00/month",
      renewal: "Registration / Renewal $0",
      // description:
      //   "Activate E-Store and we will share a percentage of our profits with you because you are helping our brand to grow.",
      link: "/estore",
    },
  ];

  return (
    <div className="pt-2">
      <div className="relative">
        <div className="w-full">
          <div className="w-full mx-auto max-w-[1800px]">
            <div className="p-4">
              <div className="space-y-2 w-[100%] px-4">
                <p className="lg:text-3xl text-2xl font-bold lg:text-start text-center">
                  <span className="text-green-500">Admin</span> Dashboard
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-5 grid-cols-2 gap-4 pt-8">
                <a
                  href="/users-list"
                  className="flex md:justify-start justify-center w-[200px] h-[160px]"
                >
                  <div className="w-full bg-white border border-gray-200 rounded p-6">
                    <div className="space-y-2">
                      <div className="flex flex-row justify-between">
                        <div className="flex md:justify-start justify-center items-center">
                          <FaUsers className="text-green-500 w-6 h-6" />
                        </div>

                        <div className="flex md:justify-start justify-center items-center">
                          <h1 className="uppercase text-slate-800 font-bold text-center lg:text-start">
                            users
                          </h1>
                        </div>
                      </div>
                      <div className="pt-8 flex md:justify-start justify-center  items-center text-green-500 font-bold text-3xl lg:text-start text-center ">
                        <CountUp start={0} end={15000} duration={5} />
                      </div>
                    </div>
                  </div>
                </a>

                <a
                  href="/widgets"
                  className="flex md:justify-start justify-center w-[200px] h-[160px]"
                >
                  <div className="w-full bg-white border border-gray-200 rounded p-6">
                    <div className="space-y-2">
                      <div className="flex flex-row justify-between">
                        <div className="flex md:justify-start justify-center items-center">
                          <FaList className="text-green-500 w-6 h-6" />
                        </div>

                        <div className="flex md:justify-start justify-center items-center">
                          <h1 className="uppercase text-slate-800 font-bold text-center lg:text-start">
                            widgets
                          </h1>
                        </div>
                      </div>

                      <div className="pt-8 flex md:justify-start justify-center  items-center text-green-500 font-bold text-3xl lg:text-start text-center ">
                        <CountUp start={0} end={5} duration={5} />
                      </div>
                    </div>
                  </div>
                </a>

                <div className="flex md:justify-start justify-center w-[200px] h-[160px]">
                  <div className="w-full bg-white border border-gray-200 rounded p-6">
                    <div className="space-y-2">
                      <div className="flex flex-row justify-between">
                        <div className="flex md:justify-start justify-center items-center">
                          <IoNotifications className="text-green-500 w-6 h-6" />
                        </div>

                        <div className="flex md:justify-start justify-center items-center">
                          <h1 className="uppercase text-slate-800 font-bold text-center lg:text-start">
                            alerts
                          </h1>
                        </div>
                      </div>
                      <div className="pt-8 flex md:justify-start justify-center  items-center text-green-500 font-bold text-3xl lg:text-start text-center ">
                        <CountUp start={0} end={137} duration={5} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex md:justify-start justify-center w-[200px] h-[160px]">
                  <div className="w-full bg-white border border-gray-200 rounded p-6">
                    <div className="space-y-2">
                      <div className="flex flex-row justify-between">
                        <div className="flex md:justify-start justify-center items-center">
                          <MdSecurity className="text-green-500 w-6 h-6" />
                        </div>

                        <div className="flex md:justify-start justify-center items-center">
                          <h1 className="uppercase text-slate-800 font-bold text-center lg:text-start">
                            approvals
                          </h1>
                        </div>
                      </div>
                      <div className="pt-8 flex md:justify-start justify-center  items-center text-green-500 font-bold text-3xl lg:text-start text-center ">
                        <CountUp start={0} end={9471} duration={5} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex md:justify-start justify-center w-[200px] h-[160px]">
                  <div className="w-full bg-white border border-gray-200 rounded p-6">
                    <div className="space-y-2">
                      <div className="flex flex-row justify-between">
                        <div className="flex md:justify-start justify-center items-center">
                          <BiSolidCategory className="text-green-500 w-6 h-6" />
                        </div>

                        <div className="flex md:justify-start justify-center items-center">
                          <h1 className="uppercase text-slate-800 font-bold text-center lg:text-start">
                            unverified
                          </h1>
                        </div>
                      </div>
                      <div className="pt-8 flex md:justify-start justify-center  items-center text-green-500 font-bold text-3xl lg:text-start text-center ">
                        <CountUp start={0} end={5529} duration={5} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 pt-8">
                {values2.map((value, index) => (
                  <div
                    onClick={() => navigate("/plans")}
                    key={index}
                    className="flex md:justify-start justify-center cursor-pointer"
                  >
                    <div className="w-full bg-white border border-gray-200 rounded p-6">
                      <div className="space-y-2">
                        <div className="flex justify-center items-center">
                          <img
                            src={value.icon}
                            alt="about_one"
                            className="w-[80px] h-[80px]"
                          />
                        </div>

                        <div className="flex justify-center items-center">
                          <h1 className="text-xl text-slate-800 font-bold text-center">
                            {value.Title}
                          </h1>
                        </div>
                        <div className="flex md:justify-start justify-center  items-center text-gray-600 lg:text-start text-center text-[14px] leading-[22px]">
                          <p>{value.description}</p>
                        </div>

                        <div className="flex items-center mb-16 flex-col text-sm text-slate-800">
                          <p>Grow</p>
                          <p>Broadcast</p>
                          <p>Beehive</p>
                        </div>

                        <div className="w-[100%]">
                          <div className="border-[0.05px] border-slate-400"></div>
                        </div>

                        <div className=" flex flex-col items-center justify-center">
                          <p className="text-xl text-slate-800 font-bold text-center">
                            {value.price}
                          </p>
                          <p className="text-xs text-slate-800">
                            {value.renewal}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
