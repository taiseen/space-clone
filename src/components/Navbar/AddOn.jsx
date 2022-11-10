import React, { useState } from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineFileJpg } from "react-icons/ai";

const AddOn = () => {
  const [expandBox, setExpandBox] = useState(true);
  const [extraExpandBox, setExtraExpandBox] = useState(true);
  return (
    <section className="p-2 ">
      <div className="flex text-teal-600 text-sm">
        <HiOutlinePuzzle className="my-auto" />{" "}
        <span className="my-auto pl-2">Addons</span>
      </div>

      <div className="mt-2 bg-white p-3.5 rounded-md">
        <div className="flex justify-between text-gray-600">
          <h6>Action</h6>
          <div className="p-1 cursor-pointer hover:bg-slate-100 rounded-md hover:text-red-900 text-gray-400">
            {expandBox ? (
              <IoIosArrowUp
                className="my-auto"
                onClick={() => setExpandBox(false)}
              />
            ) : (
              <IoIosArrowDown
                className="my-auto"
                onClick={() => setExpandBox(true)}
              />
            )}
          </div>
        </div>

        {expandBox && (
          <div className="flex cursor-pointer my-4 p-2 hover:bg-gray-100 rounded-md hover:text-teal-600 text-gray-400">
            <AiOutlineFileJpg className="my-auto" />
            <h6 className="text-sm my-auto pl-2">Export to CSV</h6>
          </div>
        )}
      </div>

      <div className="mt-5 bg-white p-3.5 rounded-md">
        <div className="flex justify-between text-gray-600">
          <h6>HeySpace Extras</h6>
          <div className="p-1 cursor-pointer hover:bg-slate-100 rounded-md hover:text-red-900 text-gray-400">
            {extraExpandBox ? (
              <IoIosArrowUp
                className="my-auto"
                onClick={() => setExtraExpandBox(false)}
              />
            ) : (
              <IoIosArrowDown
                className="my-auto"
                onClick={() => setExtraExpandBox(true)}
              />
            )}
          </div>
        </div>

        {extraExpandBox && (
          <div>
            <div className=" my-4 py-2">
              <h6 className="text-sm text-gray-600 pb-1">Estimates</h6>
              <p className="text-sm text-gray-400">
                Estimate task to be on top your work hours.
              </p>

              <label className="switch relative inline-block w-[30px] h-[10px] 	my-3">
                <input
                  type="checkbox"
                  className="opacity-0 w-0 h-0 toggle-checkbox"
                />
                <span className="slider round absolute cursor-pointer top-0 right-0 left-0 bottom-0 rounded-[4px] "></span>
              </label>
            </div>

            <div className=" mb-4 py-2">
              <h6 className="text-sm text-gray-600 pb-1">Votes</h6>
              <p className="text-sm text-gray-400">
                Add this module to vote for cards.
              </p>

              <div className=" flex">
                <label className="switch relative inline-block w-[30px] h-[10px] 	my-3">
                  <input
                    type="checkbox"
                    className="opacity-0 w-0 h-0 toggle-checkbox"
                    checked
                  />
                  <span className="slider round absolute cursor-pointer top-0 right-0 left-0 bottom-0 rounded-[4px] "></span>
                </label>

                <h6 className="my-auto pl-3 text-xs text-gray-400">
                  Enabled for all spaces
                </h6>
              </div>
            </div>

            <div className=" mb-4 py-2">
              <h6 className="text-sm text-gray-600 pb-1">Recurring cards</h6>
              <p className="text-sm text-gray-400">
                Now make your cards recurrent with fully customized settings
              </p>

              <div className=" flex">
                <label className="switch relative inline-block w-[30px] h-[10px] 	my-3">
                  <input
                    type="checkbox"
                    className="opacity-0 w-0 h-0 toggle-checkbox"
                    checked
                  />
                  <span className="slider round absolute cursor-pointer top-0 right-0 left-0 bottom-0 rounded-[4px] "></span>
                </label>
              </div>
            </div>

            <div className=" mb-4 py-2">
              <h6 className="text-sm text-gray-600 pb-1">
                Work In Progress limit
              </h6>
              <p className="text-sm text-gray-400">
                WIP limit allows setting a limit of cards in the list on the
                board.
              </p>

              <div className=" flex">
                <label className="switch relative inline-block w-[30px] h-[10px] 	my-3">
                  <input
                    type="checkbox"
                    className="opacity-0 w-0 h-0 toggle-checkbox"
                    checked
                  />
                  <span className="slider round absolute cursor-pointer top-0 right-0 left-0 bottom-0 rounded-[4px] "></span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AddOn;
