import React from "react";
import { AiOutlineSetting } from "react-icons/ai";

const Preferences = () => {
  return (
    <div className=" min-h-screen  w-[820px] p-5 space-y-4 h-screen ">
      <div className="text-[#7088A1] text-lg font-bold flex ">
        <AiOutlineSetting className="my-auto mr-2" />
        <h6>Preferences</h6>
      </div>

      <div className="h-full overflow-y-auto pb-8">
        <div className="bg-white p-3 rounded-md">
          <h6 className="text-[#7088A1] text-base font-bold">
            Get notified through…
          </h6>

          <div className=" flex">
            <label class="switch relative inline-block w-[30px] h-[10px] my-3">
              <input
                type="checkbox"
                className="opacity-0 w-0 h-0 toggle-checkbox"
              />
              <span class="slider round absolute cursor-pointer top-0 right-0 left-0 bottom-0 rounded-[4px] slider2"></span>
            </label>

            <div className="pl-3 my-2">
              <h6 className="my-auto  text-sm text-gray-800 pb-1">
                Show pop up notifications in a browser
              </h6>
              <p className="text-gray-400 text-sm">
                You will get a browser pop up notification when HeySpace is open
                on your computer’s browser.
              </p>
            </div>
          </div>

          <div className=" flex">
            <label class="switch relative inline-block w-[30px] h-[10px] my-3">
              <input
                type="checkbox"
                className="opacity-0 w-0 h-0 toggle-checkbox"
              />
              <span class="slider round absolute cursor-pointer top-0 right-0 left-0 bottom-0 rounded-[4px] slider2"></span>
            </label>

            <div className="pl-3 my-2">
              <h6 className="my-auto  text-sm text-gray-800 pb-1">
                Send email notifications
              </h6>
              <p className="text-gray-400 text-sm">
                You will receive an email notification when you're offline.
              </p>
            </div>
          </div>

          <div className=" flex">
            <label class="switch relative inline-block w-[30px] h-[10px] my-3">
              <input
                type="checkbox"
                className="opacity-0 w-0 h-0 toggle-checkbox"
              />
              <span class="slider round absolute cursor-pointer top-0 right-0 left-0 bottom-0 rounded-[4px] slider2"></span>
            </label>

            <div className="pl-3 my-2">
              <h6 className="my-auto  text-sm text-gray-800 pb-1">
                Sound notifications
              </h6>
              <p className="text-gray-400 text-sm">
                You will get a sound notification.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-md">
          <h6 className="text-[#7088A1] text-base font-bold">
            Chats retention
          </h6>
          <div className="py-3">
            <p className="text-gray-700">Number of visible chats</p>
            <p className="py-2 text-gray-400">
              Chats are visible on the left menu under the CHATS label
            </p>
            <input
              type="number"
              value="7"
              className="outline-none bg-gray-100 w-[80px] p-1 border rounded-md"
            />
          </div>

          <div className="py-3">
            <p className="text-gray-700">
              Number of days after which chats will be marked as inactive
            </p>
            <p className="py-2 text-gray-400">
              After this time the chats will be marked as inactive and will
              disappear from the menu
            </p>
            <input
              type="number"
              value="7"
              className="outline-none bg-gray-100 w-[80px] p-1 border rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
