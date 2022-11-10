import React, { useEffect } from "react";
import { AiOutlineInfoCircle, AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  add_space_members,
  get_space_members,
  leave_space,
} from "../../api/space";
import { Loader } from "../Loader";
import Avatar from "../Avatar";
import Button from "../Button";
import users from "../../constant/users";
import { toast } from "react-toastify";
import { get_workspace_member } from "../../api/workSpace";
import ConfirmModal from "../ConfirmModal";

const Members = () => {
  const [members, setMembers] = React.useState();
  const [allMembers, setAllMembers] = React.useState();
  const [addMemberModal, setAddMemberModal] = React.useState(false);
  const [addingMember, setAddingMember] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [leavingLoader, setLeavingLoader] = React.useState(false);
  const [leavingModal, setLeavingModal] = React.useState(false);
  const { selectedSpace } = useSelector((state) => state.space);
  const { selectedWorkspace } = useSelector((state) => state.workspace);
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    getSpaceMember();
    getWorkspaceMember();
  }, []);

  const getWorkspaceMember = async () => {
    try {
      setLoading(true);
      const { data } = await get_workspace_member(selectedWorkspace);
      setAllMembers(data.teamMembers);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getSpaceMember = async () => {
    try {
      setLoading(true);
      const { data } = await get_space_members(selectedSpace);
      setMembers(data.members);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const addMember = (id) => async () => {
    try {
      setAddingMember(id);
      await add_space_members(selectedSpace, id);
      toggleModal();
      getSpaceMember();
      setAddingMember("");
    } catch (error) {
      toast.error(error.message, { autoClose: 1000 });
      setAddingMember("");
      console.log(error);
    }
  };
  const leaveSpace = async () => {
    try {
      setLeavingLoader(true);
      await leave_space(selectedSpace);
      setLeavingLoader(false);
    } catch (error) {
      toast.error(error.message, { autoClose: 1000 });
      setLeavingLoader(false);
      console.log(error);
    }
  };
  const toggleModal = () => {
    setAddMemberModal((prev) => !prev);
  };
  const isLoading = (id) => id === addingMember;
  const searchMembers = allMembers?.filter((member) => {
    return member.fullName.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <>
      <section className="p-2 overflow-y-auto">
        <div className="flex justify-between">
          <div className="flex text-teal-600 text-sm">
            <AiOutlineUser className="my-auto" />{" "}
            <span className="my-auto pl-2">Members</span>
          </div>

          <div
            onClick={toggleModal}
            className="p-2 duration-300 cursor-pointer text-gray-400 hover:bg-gray-200 rounded-md hover:text-teal-600"
          >
            <h6 className="text-sm">
              {addMemberModal ? "Cancel" : "Add Member"}
            </h6>
          </div>
        </div>

        {addMemberModal ? (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Search member"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full input-style rounded-full border-[3px] outline-none	border-gray-300 text-slate-600 py-2	px-4"
            />
            <div className="bg-white mt-2 first-letter:mt-2 p-2">
              {loading ? (
                <Loader />
              ) : (
                searchMembers?.map((item) => (
                  <div
                    className="flex flex-row align-middle py-1 cursor-pointer"
                    key={item._id}
                  >
                    <div className="my-auto">
                      <Avatar user={item} />
                    </div>
                    <h6 className="text-sm text-sky-900 pl-4 my-auto">
                      {item.fullName}
                    </h6>
                    <Button
                      loading={isLoading(item._id)}
                      onClick={addMember(item._id)}
                      sm
                      className="ml-auto my-auto mt-0"
                      text
                    >
                      Add Member
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white mt-2 first-letter:mt-2 p-2">
              {loading ? (
                <Loader />
              ) : (
                members?.map((item) => (
                  <div
                    className="flex py-2 hover:bg-slate-50 cursor-pointer"
                    key={item._id}
                  >
                    <div className="my-auto">
                      <Avatar user={item} />
                    </div>
                    <div className="pl-4 ">
                      <h6 className="text-sm text-sky-900">{item.fullName}</h6>
                      <p className="text-xs text-gray-400">{item.role}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Button
              onClick={() => setLeavingModal(true)}
              loading={leavingLoader}
            >
              Leave space
            </Button>
          </>
        )}

        {/* <div className="flex justify-between mt-4">
      <div className="flex ml-2 text-sm">
        <span className="my-auto pr-1 text-teal-600">Quest</span>
        <AiOutlineInfoCircle className="my-auto text-gray-400" />
      </div>

      <div className="p-2 duration-300 cursor-pointer text-gray-400 hover:bg-gray-200 rounded-md hover:text-teal-600">
        <h6 className="text-sm ">Add quest</h6>
      </div>
    </div> */}
      </section>
      <ConfirmModal
        title="Leave space"
        description="Are you sure you want to leave space?"
        isVisible={leavingModal}
        setVisibility={setLeavingModal}
        api={() => leave_space(selectedSpace)}
        onComplete={leaveSpace}
      />
    </>
  );
};

export default Members;
