import Dropdown from "../Dropdown";
import Button from "../Button";
import Input from "../Input";
import { WORKSPACE_ROLE } from "../../constant/enums";
import { AiOutlineSetting } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Loader } from "../Loader";
import {
  add_workspace_member,
  change_workspace_member_role,
  delete_workspace,
  get_single_workspace_data,
  get_workspace_member,
  update_workspace,
} from "../../api/workSpace";


const WorkspaceSettings = () => {

  const { selectedWorkspace } = useSelector(state => state.workspace);
  const [workspace, setWorkspace] = useState(selectedWorkspace);
  const [workspaceMembers, setWorkspaceMembers] = useState([]);
  const [changingRoll, setChangingRoll] = useState("");
  const [blocking, setBlocking] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [nameLoading, setNameLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [inviteLoader, setInviteLoader] = useState(false);
  const [deletingSpaceModal, setDeletingSpaceModal] = useState(false);

  useEffect(() => {
    getWorkspaceData();
    getWorkspaceMembers();
  }, [selectedWorkspace]);

  // get user img from user info, which store at local storage...
  const userImg = JSON.parse(localStorage.getItem("userInfo"))?.avatar;

  const getWorkspaceData = async () => {
    try {
      const { data } = await get_single_workspace_data(selectedWorkspace);
      setWorkspace(data.workspace);
    } catch (error) {
      console.log(error);
    }
  };

  const getWorkspaceMembers = async () => {
    try {
      const { data } = await get_workspace_member(selectedWorkspace);
      setWorkspaceMembers(data.teamMembers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setWorkspace({ ...workspace, [e.target.name]: e.target.value });
  };

  const sendInvite = async (e) => {
    try {
      setInviteLoader(true);
      await add_workspace_member(selectedWorkspace, userEmail);
      toast.success(`Invitation sent to ${userEmail}`, { autoClose: 1000 });
      setUserEmail("");
      setInviteLoader(false);
    } catch (error) {
      setInviteLoader(false);
      error?.message && toast.error(error.message, { autoClose: 1000 });
    }
  };

  const uploadName = async (e) => {
    try {
      setNameLoading(true);
      await update_workspace(workspace._id, workspace);
      setNameLoading(false);
      toast.success("Workspace name has been updated!", { autoClose: 1000 });
    } catch (error) {
      console.log(error);
      setNameLoading(false);
    }
  };

  const uploadLogo = async (e) => {
    console.log("upload logo");
    try {
      setImageLoading(true);
      const file = e.target.files[0];
      await update_workspace(workspace._id, { ...workspace, logo: file });
      getWorkspaceData();
      setImageLoading(false);
      toast.success("Workspace logo has been updated!", { autoClose: 1000 });
    } catch (error) {
      console.log(error);
      setImageLoading(false);
    }
  };

  const changeUserRoll = async (id, role) => {
    try {
      setChangingRoll(id);
      await change_workspace_member_role(selectedWorkspace, {
        id,
        role,
      });
      setChangingRoll("");
      getWorkspaceMembers();
    } catch (error) {
      toast.error(error.message, { autoClose: 1000 });
      setChangingRoll("");
    }
  };

  const blockUser = (id, roll) => async () => {
    try {
      setBlocking(id);
      await change_workspace_member_role(selectedWorkspace, {
        id,
        roll,
      });
      setBlocking("");
      getWorkspaceMembers();
    } catch (error) {
      setBlocking("");
    }
  };


  const handleDeletingSpace = async () => {
    try {
      const { data } = await delete_workspace(selectedWorkspace)
      toast.success(data.message, { autoClose: 1000 });
    } catch (error) {
      toast.error(error.workspaceId, { autoClose: 1000 });
    }
  }

  const isChangingRoll = (id) => id === changingRoll;
  const isBlockingUser = (id) => id === changingRoll;

  return (
    <div className="min-h-screen overflow-auto w-[820px] p-5 space-y-4 h-screen">
      <div className="text-[#7088A1] text-lg font-bold flex ">
        <AiOutlineSetting className="my-auto mr-2" />
        <h6>Workspace Settings</h6>
      </div>
      <div className="flex gap-4 mt-4">
        {/* user info */}
        <div className="w-[450px] bg-white rounded-md p-4">
          <h6 className="text-[#7088A1] pb-4 font-bold">Basic Settings</h6>
          <hr className="mb-5" />
          <Input
            title="Workspace Name"
            value={workspace?.name}
            name="name"
            onChange={handleInputChange}
            className="w-full"
          />
          <Button loading={nameLoading} onClick={uploadName} className="mt-5">
            Update Name
          </Button>
        </div>

        {/* user avatar */}
        <div className=" flex-1 bg-white rounded-md px-4 py-10">
          <div className="w-32 h-32 flex justify-center align-middle mx-auto rounded-full border overflow-hidden">
            {false ? (
              <Loader className="my-auto" />
            ) : (
              <img
                src={
                  workspace?.logo ||
                  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="user"
              />
            )}
          </div>

          <label htmlFor="fileInput">
            <Button loading={imageLoading} className="flex mx-auto">
              Update logo
            </Button>
          </label>
        </div>
      </div>
      <div className="flex-1 bg-white rounded-md p-4">
        <div>
          <div className="text-[#7088A1] font-bold flex">
            <h6>Invite or manage team mambers</h6>
          </div>
          <div className="flex align-middle mt-5">
            <Input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full"
            />
            <Button
              disabled={!userEmail}
              loading={inviteLoader}
              onClick={sendInvite}
              className="ml-3 mt-0"
            >
              Invite
            </Button>
          </div>
        </div>
        <hr className="my-5" />
        {workspaceMembers?.map((user, i) => (
          <>
            <div key={i} className="flex align-middle justify-between mt-4">
              <div className="flex items-center w-[150px]">
                <img
                  className="w-10 h-10 rounded-full border"
                  src={
                    userImg ||
                    "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt="user"
                />
                <div className="text-[#7088A1] text-xs font-bold flex flex-col justify-center ml-2">
                  <p>{user?.fullName}</p>
                  <p>{user?.email}</p>
                </div>
              </div>
              {user?.role !== "owner" ? (
                <>
                  <Dropdown
                    width={120}
                    button={
                      <Button
                        loading={isChangingRoll(user?._id)}
                        className="mt-0"
                        text
                      >
                        {user?.role}
                      </Button>
                    }
                    menu={({ closePopup }) =>
                      Object.values(WORKSPACE_ROLE)
                        .filter(
                          (role) =>
                            role.toLocaleLowerCase() !==
                            user?.role.toLocaleLowerCase()
                        )
                        .map((roll) => (
                          <Button
                            onClick={() => {
                              changeUserRoll(
                                user?._id,
                                roll.toLocaleLowerCase()
                              );
                              closePopup();
                            }}
                            className="mx-auto mt-0"
                            text
                          >
                            {roll}
                          </Button>
                        ))
                    }
                  />
                  <Button
                    loading={isBlockingUser(user?._id)}
                    onClick={blockUser(user?._id, "member")}
                    className="mt-0"
                    text
                  >
                    Remove
                  </Button>
                </>
              ) : (
                <div className="text-[#7088A1] font-bold space-y-2 text-center">
                  <h4 className="my-auto">
                    Workspace owner
                  </h4>
                  <h4 className="bg-gray-300 rounded-md px-2 py-1 text-red-400 hover:text-red-600 hover:bg-gray-400 duration-200 cursor-pointer"
                    onClick={() => setDeletingSpaceModal(true)}
                  >
                    Delete this space
                  </h4>

                  {
                    deletingSpaceModal &&
                    <div className="bg-black/70 fixed right-0 top-0 left-0 bottom-0 z-30 grid place-items-center" onClick={() => setDeletingSpaceModal(false)}>
                      <div className="bg-white p-8 rounded-md text-gray-800">
                        <h2 className="text-xl">Are you sure to delete this workspace?</h2>
                        <p className="text-sm text-red-500">By deleting you will lost all of your working data associated with this workspace.</p>
                        <div className="space-x-4 mt-4">

                          <button className="w-12 py-1 bg-red-400 hover:bg-red-500 rounded-md duration-200 hover:text-gray-900"
                            onClick={handleDeletingSpace}>
                            Yes
                          </button>

                          <button className="w-12 py-1 bg-green-400 hover:bg-green-500 rounded-md duration-200 hover:text-gray-900"
                            onClick={() => setDeletingSpaceModal(false)}
                          >No
                          </button>
                        </div>
                      </div>
                    </div>
                  }
                </div>

              )}
            </div>
            {user?.role === "owner" && <hr className="mt-3" />}
          </>
        ))}
      </div>
      <input
        className="hidden"
        id="fileInput"
        type="file"
        onChange={uploadLogo}
      />
    </div>
  );
};

export default WorkspaceSettings;
