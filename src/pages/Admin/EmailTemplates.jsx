import React, { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { MdEdit } from "react-icons/md";

const EmailTemplates = () => {
  const { backendUrl, aToken } = useContext(AdminContext);

  return (
    <div className="pt-2">
      <div className="relative">
        <div className="w-full">
          <div className="w-full mx-auto max-w-[1400px] ">
            <div className="p-4 w-[100%] ">
              <div className="space-y-2 w-[100%] px-4">
                <p className="lg:text-3xl text-2xl font-bold">
                  <span className="text-green-500">Email</span> Templates
                </p>
              </div>

              <div className="px-4 w-[100%] ">
                <table className="w-[100%] border border-gray-100 mt-5">
                  <thead className="">
                    <tr className="bg-green-400">
                      <th className="border font-bold border-gray-300 px-4 py-2">
                        Name
                      </th>
                      <th className="border font-bold border-gray-300 px-4 py-2">
                        Content
                      </th>

                      <th className="border font-bold border-gray-300 px-4 py-2">
                        Created Date
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
                      <td className="border border-gray-300 px-4 py-2 text-neutral-800 text-sm text-center">
                        Welcome Email
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        Welcome to LM Club. Dear user, we are thrilled to have
                        you join our community where you can explore, engage,
                        and enjoy a range of exclusive benefits tailored just
                        for you.Whether you're looking to promote your business,
                        discover deals, or connect with the community, LM Club
                        is here to enhance your experience.Your journey with us
                        is just beginning, and we look forward to seeing you
                        grow and thrive within the LM Club.Stay tuned for
                        updates and new features that will continually enhance
                        your experience.Warm regards,The LM Club Team © 2025 LM
                        Club. All rights reserved.
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm text-center">
                        <div className="flex flex-row gap-4">
                          <p>06-21-2024</p>
                        </div>
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={true}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:after:translate-x-5 peer-checked:after:bg-white peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                      </td>

                      <td className="border text-center border-gray-300 px-4 py-2 text-zinc-600 text-sm align-middle h-full">
                        <div className="flex justify-center items-center cursor-pointer">
                          <MdEdit className="w-5 h-5" />
                        </div>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-neutral-800 text-sm text-center">
                        Subscription Payment
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        Hello user, You have subscribed for the plan and it is
                        valid upto 28-08-2025. Regards, LM CLUB.
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm text-center">
                        <div className="flex flex-row gap-4">
                          <p>01-03-2025</p>
                        </div>
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={true}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:after:translate-x-5 peer-checked:after:bg-white peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                      </td>

                      <td className="border text-center border-gray-300 px-4 py-2 text-zinc-600 text-sm align-middle h-full">
                        <div className="flex justify-center items-center cursor-pointer">
                          <MdEdit className="w-5 h-5" />
                        </div>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-neutral-800 text-sm text-center">
                        Otp
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        Thanks for requesting an Otp for verification.. Hello{" "}
                        user, your OTP is 532678. Regards, LM CLUB.
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm text-center">
                        <div className="flex flex-row gap-4">
                          <p>06-21-2024</p>
                        </div>
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={true}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:after:translate-x-5 peer-checked:after:bg-white peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                      </td>

                      <td className="border text-center border-gray-300 px-4 py-2 text-zinc-600 text-sm align-middle h-full">
                        <div className="flex justify-center items-center cursor-pointer">
                          <MdEdit className="w-5 h-5" />
                        </div>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-neutral-800 text-sm text-center">
                        Broadcast Post
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm">
                        Hello user, we’re excited to share that has just posted
                        a new advertisement on the LM Club Broadcast!Head over
                        to the Broadcast widget in your LM Club app to explore
                        the details. Engage with the ad by sharing it on your
                        social media to maximize your rewards.Stay tuned for
                        more updates and keep enjoying the perks of our
                        community.Regards,The LM CLUB.
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-zinc-600 text-sm text-center">
                        <div className="flex flex-row gap-4">
                          <p>06-21-2024</p>
                        </div>
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={true}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:after:translate-x-5 peer-checked:after:bg-white peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                      </td>

                      <td className="border text-center border-gray-300 px-4 py-2 text-zinc-600 text-sm align-middle h-full">
                        <div className="flex justify-center items-center cursor-pointer">
                          <MdEdit className="w-5 h-5" />
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

export default EmailTemplates;
