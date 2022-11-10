import React, { useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  archive_workspace,
  get_workspace_data,
  leave_workspace,
} from "../../api/workSpace";
import images from "../../assets";
import { BiDotsVertical } from "react-icons/bi";
import {
  addWorkSpace,
  setSelectedWorkSpaceId,
} from "../../store/slice/workspace";
import Dropdown from "../Dropdown";
import Button from "../Button";
import ModalWorkSpaceCreate from "../Sidebar/ModalWorkSpaceCreate";
import { toast } from "react-toastify";

const ManageWorkspace = () => {
  const [extraExpandBox, setExtraExpandBox] = useState(true);
  const [createWorkSpaceModal, setCreateWorkSpaceModal] = useState(false);
  const dispatch = useDispatch();
  const { workspaces, selectedWorkspace } = useSelector(
    (state) => state.workspace
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await get_workspace_data();
      dispatch(addWorkSpace(data.workspaces));
      dispatch(setSelectedWorkSpaceId(data.workspaces[0]?._id));
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateWorkSpace = () => {
    setCreateWorkSpaceModal(false);
    fetchData();
  };

  const leaveWorkspace = async(id) => {
    try {
      await leave_workspace(id);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.issue?.message);
      console.log(error);
    }
  };

  const archiveWorkspace = async(id) => {
    try {
      await archive_workspace(id);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.issue?.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen  w-[820px] p-5 space-y-4 h-screen">
        <div className="text-[#7088A1] text-lg font-bold flex ">
          <AiOutlineSetting className="my-auto mr-2" />
          <h6>Manage Workspaces</h6>
        </div>

        <div className="bg-white p-4">
          <div className="flex justify-end">
            <button
              onClick={() => setCreateWorkSpaceModal(true)}
              className="py-2.5 text-white rounded-md px-6 text-sm bg-[#C595C6] "
            >
              Add a new workspace
            </button>
          </div>

          <div className="space-y-3.5">
            <h6 className="flex text-[#BAC4CF]">
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
              Active workspaces
            </h6>

            {extraExpandBox &&
              workspaces?.map((item) => (
                <div className="flex align-middle justify-between">
                  <div className="flex">
                    <img
                      src={item.logo || images.logo}
                      alt=""
                      className="w-10 h-10 border rounded-md"
                    />
                    <h6 className="my-auto pl-2 text-sm text-gray-700">
                      {item.name}
                    </h6>
                  </div>
                  <div className="my-auto">
                    <Dropdown
                      width={150}
                      button={<BiDotsVertical />}
                      menu={({ closePopup }) => (
                        <>
                          <Button
                            onClick={() => {
                              leaveWorkspace(item._id);
                              closePopup();
                            }}
                            block
                            text
                          >
                            Leave
                          </Button>
                          <Button
                            onClick={() => {
                              archiveWorkspace(item._id);
                              closePopup();
                            }}
                            block
                            text
                          >
                            Archive
                          </Button>
                        </>
                      )}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {createWorkSpaceModal && (
        <ModalWorkSpaceCreate setNewWorkSpace={onCreateWorkSpace} />
      )}
    </>
  );
};

export default ManageWorkspace;
