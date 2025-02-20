import React from "react";
import bronze from "../../assets/bronze.jpg";
import silver from "../../assets/silver.jpg";
import gold from "../../assets/gold.jpg";
import platinum from "../../assets/platinum.jpg";
import edit from "../../assets/Edit.svg";
import eye from "../../assets/Eye.svg";

const Plans = () => {
  return (
    <div className="pt-8">
      <div className="relative">
        <div className="w-full">
          <div className="w-full mx-auto max-w-[1400px] ">
            <div className="p-4 w-[100%] ">
              <div className="space-y-2 w-[100%] px-4">
                <p className="lg:text-3xl text-2xl font-bold">
                  <span className="text-green-500">Current</span> Plans
                </p>
              </div>

              <div className="px-4 w-[100%] ">
                <table className="w-[100%] border border-gray-100 mt-5">
                  <thead className="">
                    <tr className="bg-green-400">
                      <th className="border font-bold border-gray-300 px-4 py-2">
                        Plan Logo
                      </th>
                      <th className="border font-bold border-gray-300 px-4 py-2">
                        Plan Name
                      </th>

                      <th className="border font-bold border-gray-300 px-4 py-2">
                        Widgets
                      </th>

                      <th className="border font-bold border-gray-300 px-4 py-2">
                        Monthly Price
                      </th>

                      <th className="border font-bold border-gray-300 px-4 py-2">
                        Widget Status
                      </th>

                      <th className="border font-bold border-gray-300 px-4 py-2">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                        <img
                          src={platinum}
                          alt="platinum"
                          className="w-16 h-16"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        PLATINUM
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        $14.99
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex flex-row gap-4">
                          <p>Grow</p>
                          <p>Broadcast</p>
                          <p>Beehive</p>
                        </div>
                      </td>

                      {/* <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        {item.phoneNumber}
                      </td> */}
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <label className="relative inline-flex items-center cursor-pointer ">
                          <input
                            type="checkbox"
                            // checked={item.available}
                            // onChange={() => changeAvailability(item._id)}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:after:translate-x-5 peer-checked:after:bg-white peer-checked:bg-green-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                      </td>

                      <td className="flex flex-row gap-4 border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex justify-center items-center w-8 h-8 border-2 border-green-400 bg-green-500 rounded cursor-pointer">
                          <img src={edit} alt="edit" className="w-5 h-5" />
                        </div>

                        <div className="flex justify-center items-center w-8 h-8 border-2 border-green-400 bg-green-500 rounded cursor-pointer">
                          <img src={eye} alt="edit" className="w-5 h-5" />
                        </div>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                        <img src={gold} alt="platinum" className="w-16 h-16" />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        GOLD
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        $11.99
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex flex-row gap-4">
                          <p>Grow</p>
                          <p>Broadcast</p>
                          <p>Beehive</p>
                        </div>
                      </td>

                      {/* <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        {item.phoneNumber}
                      </td> */}
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            // checked={item.available}
                            // onChange={() => changeAvailability(item._id)}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:after:translate-x-5 peer-checked:after:bg-white peer-checked:bg-green-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                      </td>

                      <td className="flex flex-row gap-4 border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex justify-center items-center w-8 h-8 border-2 border-green-400 bg-green-500 rounded cursor-pointer">
                          <img src={edit} alt="edit" className="w-5 h-5" />
                        </div>

                        <div className="flex justify-center items-center w-8 h-8 border-2 border-green-400 bg-green-500 rounded cursor-pointer">
                          <img src={eye} alt="edit" className="w-5 h-5" />
                        </div>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                        <img
                          src={silver}
                          alt="platinum"
                          className="w-16 h-16"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        SILVER
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        $8.99
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex flex-row gap-4">
                          <p>Grow</p>
                          <p>Broadcast</p>
                          <p>Beehive</p>
                        </div>
                      </td>

                      {/* <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        {item.phoneNumber}
                      </td> */}
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            // checked={item.available}
                            // onChange={() => changeAvailability(item._id)}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:after:translate-x-5 peer-checked:after:bg-white peer-checked:bg-green-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                      </td>

                      <td className="flex flex-row gap-4 border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex justify-center items-center w-8 h-8 border-2 border-green-400 bg-green-500 rounded cursor-pointer">
                          <img src={edit} alt="edit" className="w-5 h-5" />
                        </div>

                        <div className="flex justify-center items-center w-8 h-8 border-2 border-green-400 bg-green-500 rounded cursor-pointer">
                          <img src={eye} alt="edit" className="w-5 h-5" />
                        </div>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                        <img
                          src={bronze}
                          alt="platinum"
                          className="w-16 h-16"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        BRONZE
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        $5.99
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex flex-row gap-4">
                          <p>Grow</p>
                          <p>Broadcast</p>
                          <p>Beehive</p>
                        </div>
                      </td>

                      {/* <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        {item.phoneNumber}
                      </td> */}
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            // checked={item.available}
                            // onChange={() => changeAvailability(item._id)}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:after:translate-x-5 peer-checked:after:bg-white peer-checked:bg-green-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                      </td>

                      <td className="flex flex-row gap-4 border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex justify-center items-center w-8 h-8 border-2 border-green-400 bg-green-500 rounded cursor-pointer">
                          <img src={edit} alt="edit" className="w-5 h-5" />
                        </div>

                        <div className="flex justify-center items-center w-8 h-8 border-2 border-green-400 bg-green-500 rounded cursor-pointer">
                          <img src={eye} alt="edit" className="w-5 h-5" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
