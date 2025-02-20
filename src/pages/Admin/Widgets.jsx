import React from "react";
import beehive from "../../assets/beehive.webp";
import broadcast from "../../assets/broadcast.webp";
import enroll from "../../assets/enroll.webp";
import estore from "../../assets/estore.webp";
import network from "../../assets/network.webp";
import edit from "../../assets/Edit.svg";

const Widgets = () => {
  return (
    <div className="pt-8">
      <div className="relative">
        <div className="w-full">
          <div className="w-full mx-auto max-w-[1400px] ">
            <div className="p-4">
              <div className="space-y-2 w-[100%] px-4">
                <p className="lg:text-3xl text-2xl font-bold">
                  <span className="text-green-500">Current</span> Widgets
                </p>
              </div>

              <div className="px-4 w-[100%] ">
                <table className="w-[100%] border border-gray-100 mt-5">
                  <thead className="">
                    <tr className="bg-green-400">
                      <th className="border font-bold border-gray-300 px-4 py-2">
                        Icon
                      </th>
                      <th className="border font-bold border-gray-300 px-4 py-2">
                        Title
                      </th>

                      <th className="border font-bold border-gray-300 px-4 py-2">
                        Description
                      </th>

                      <th className="border font-bold border-gray-300 px-4 py-2">
                        Status
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
                          src={enroll}
                          alt="platinum"
                          className="w-16 h-16"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        GROW
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex flex-row gap-4">
                          <p>
                            User have the opportunity to earn reward points by
                            enrolling new members into our LM Club
                          </p>
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

                      <td className="flex border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex justify-center items-center w-8 h-8 border-2 border-green-400 bg-green-500 rounded cursor-pointer">
                          <img src={edit} alt="edit" className="w-5 h-5" />
                        </div>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                        <img
                          src={beehive}
                          alt="platinum"
                          className="w-16 h-16"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        BEEHIVE
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex flex-row gap-4">
                          <p>
                            With Beehive - User can earn reward points for
                            posting Beneficial information that helps othe...
                          </p>
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

                      <td className="flex border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex justify-center items-center w-8 h-8 border-2 border-green-400 bg-green-500 rounded cursor-pointer">
                          <img src={edit} alt="edit" className="w-5 h-5" />
                        </div>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                        <img
                          src={broadcast}
                          alt="platinum"
                          className="w-16 h-16"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        BROADCAST
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex flex-row gap-4">
                          <p>
                            Broadcast allows members to share local business ads
                            on their social media and earn rewar...
                          </p>
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

                      <td className="flex border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex justify-center items-center w-8 h-8 border-2 border-green-400 bg-green-500 rounded cursor-pointer">
                          <img src={edit} alt="edit" className="w-5 h-5" />
                        </div>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                        <img
                          src={network}
                          alt="platinum"
                          className="w-16 h-16"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        NETWORK
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex flex-row gap-4">
                          <p>
                            Provides interest-based groups where members can
                            collaborate and discuss specific topics.{" "}
                          </p>
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

                      <td className="flex border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex justify-center items-center w-8 h-8 border-2 border-green-400 bg-green-500 rounded cursor-pointer">
                          <img src={edit} alt="edit" className="w-5 h-5" />
                        </div>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-neutral-800 text-sm">
                        <img
                          src={estore}
                          alt="platinum"
                          className="w-16 h-16"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        ESTORE
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex flex-row gap-4">
                          <p>
                            Let your network know that shopping through your
                            link unlocks special savings...
                          </p>
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

                      <td className="flex border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        <div className="flex justify-center items-center w-8 h-8 border-2 border-green-400 bg-green-500 rounded cursor-pointer">
                          <img src={edit} alt="edit" className="w-5 h-5" />
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

export default Widgets;
