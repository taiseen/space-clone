import React from "react";
import { AiOutlineSetting } from "react-icons/ai";

const DeveloperConsole = () => {
  return (
    <div className="min-h-screen  w-[820px] p-5 space-y-4 h-screen">
      <div className="text-[#7088A1] text-lg font-bold flex ">
        <AiOutlineSetting className="my-auto mr-2" />
        <h6>Developer Console</h6>
      </div>

      <div className="bg-white p-4">
        <div className="flex justify-between">
          <h6 className="my-auto text-sm text-gray-500">My apps</h6>
          <button className="py-2.5 text-white rounded-md px-6 text-sm bg-[#C595C6] ">
            Add a new workspace
          </button>
        </div>

        <div className="py-5">
          <h6 className="flex text-[#BAC4CF]">
            You haven’t added any apps yet.
          </h6>
        </div>
      </div>
    </div>
  );
};

export default DeveloperConsole;
