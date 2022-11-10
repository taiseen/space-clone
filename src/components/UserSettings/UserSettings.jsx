import { AiOutlineArrowLeft, AiOutlineSetting } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BsTag } from "react-icons/bs";
import { BiWrench } from "react-icons/bi";
import images from "../../assets";
import { useUserInfoContext } from "../../context/UserInfoContext";
import Dropdown from "../../components/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { get_workspace_data } from "../../api/workSpace";
import {
  addWorkSpace,
  setSelectedWorkSpaceId,
} from "../../store/slice/workspace";
import { useEffect } from "react";

const UserSettings = () => {
  const { loginUserInfo } = useUserInfoContext();
  const dispatch = useDispatch();
  const { workspaces, selectedWorkspace } = useSelector(
    (state) => state.workspace
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await get_workspace_data();
        dispatch(addWorkSpace(data.workspaces));
        dispatch(setSelectedWorkSpaceId(data.workspaces[0]?._id));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const select = (e) => {
    dispatch(setSelectedWorkSpaceId(e));
  };

  const getSelectedSpace = () => {
    const selectedSpace = workspaces?.find((e) => e._id === selectedWorkspace);
    return selectedSpace;
  };

  return (
    <section className="w-[325px] text-sm fixed top-0 bottom-0 text-[#9FB4C3] bg-[#23313F] rounded-r-lg p-3">
      <Link
        to="/settings"
        className="text-white mt-4 font-bold flex bg-[#253443] p-1.5 rounded-sm border-b-2 border-[#2d4154]"
      >
        <div className="w-11 h-11 rounded-full overflow-hidden">
          <img
            src={
              loginUserInfo.avatar ||
              "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
        </div>
        <h6 className="my-auto  pl-6">Profile Settings</h6>
      </Link>

      <Link
        to="/settings/manage-workspace"
        className=" font-bold mt-3 flex w-full hover:bg-[#253443] p-2 rounded-sm border-b-2 border-[#2d4154]"
      >
        Manage Workspaces
      </Link>

      <Link
        to="/settings/developer"
        className="font-bold mt-3 flex w-full hover:bg-[#253443] p-2 rounded-sm "
      >
        Developer Console
      </Link>

      <div className="border-b-2 border-[#293C4F] ">
        <Dropdown
          width={280}
          button={
            <div className=" font-bold mt-3 flex w-full  bg-[#293C4F] p-2.5 rounded-md ">
              <div className="w-12 h-12 rounded-md overflow-hidden">
                <img src={getSelectedSpace()?.logo || images.logo} alt="" />
              </div>
              <div className="flex-1 flex justify-between hover:text-white">
                <h6 className="my-auto pl-3">{getSelectedSpace()?.name}</h6>
                <IoIosArrowDown className="my-auto" />
              </div>
            </div>
          }
          menu={({ closePopup }) => (
            <div className="max-h-[300px] overflow-auto m-[-10px] p-1">
              {workspaces?.map((item) => (
                <>
                  <div
                    onClick={() => {
                      select(item._id);
                      closePopup();
                    }}
                    className="cursor-pointer font-bold flex w-full p-2.5 rounded-md hover:bg-slate-100"
                  >
                    <div className="flex h-12 align-middle justify-center rounded-md">
                      <img src={item.logo || images.logo} alt="" />
                      <h6 className="my-auto ml-3">{item.name}</h6>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </div>
          )}
        />

        <div className="m-4 space-y-1.5 ">
          <Link
            to="/settings/workspace-settings"
            className="flex p-2.5 rounded-md hover:bg-[#293C4F]"
          >
            <BiWrench className="my-auto mr-2" /> <h6> Workspace settings</h6>
          </Link>
          <Link
            to="/settings/preferences"
            className="flex p-2.5 rounded-md hover:bg-[#293C4F]"
          >
            <AiOutlineSetting className="my-auto mr-2" /> <h6> Preferences</h6>
          </Link>

          <Link
            to="/settings/tags"
            className="flex p-2.5 rounded-md hover:bg-[#293C4F]"
          >
            <BsTag className="my-auto mr-2" /> <h6> Tags</h6>
          </Link>

          <div className="flex p-2.5 rounded-md hover:bg-[#293C4F] line-through">
            <FiShoppingBag className="my-auto mr-2" /> <h6> Preferences</h6>
          </div>
        </div>
      </div>

      <Link
        to="/projects"
        className="flex px-2 py-3 hover:bg-[#293C4F] rounded-lg text-white"
      >
        <AiOutlineArrowLeft className="my-auto text-lg mr-2" />
        <span>Back to the universe</span>
      </Link>
    </section>
  );
};

export default UserSettings;
