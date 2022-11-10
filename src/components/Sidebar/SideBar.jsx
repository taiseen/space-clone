import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CloseMenuBtn,
  DotsDouble,
  Eye,
  OpenMenuBtn,
  OverWatch,
  Plus,
  Search,
  SMS,
  SpaceLogo,
  SpaceLogoLock,
  Task,
} from "../../assets/icons";
import {
  UserSettingsDropDown,
  NotificationBell,
  NotificationSMS,
  ModalWorkSpaceCreate,
  ModalSpaceCreate,
  ModalSearchSpace,
} from ".";
import {
  addWorkSpace,
  setSelectedWorkSpaceId,
} from "../../store/slice/workspace";
import {
  addSpace,
  setSelectedSpaceId,
  setSelectedSpaceObject,
} from "../../store/slice/space";
import { get_space_data, get_workspace_data } from "../../api/workSpace";
import { useStyleContext } from "../../context/StyleContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import asserts from "../../assets";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";


const SideBar = () => {

  const dispatch = useDispatch();
  const { margin, setMargin } = useStyleContext();
  const [newWorkSpace, setNewWorkSpace] = useState(false);
  const [createSpaceModal, setCreateSpaceModal] = useState(false);
  const [spaceSearchModal, setSpaceSearchModal] = useState(false);
  const [userNotificationSMS, setUserNotificationSMS] = useState(false);
  const [userNotificationBell, setUserNotificationBell] = useState(false);
  const [userMenu, setUserMenu] = useState({ isOpen: false, sideBar: false });

  // For Work-Spaces
  const { workspaces, selectedWorkspace } = useSelector(state => state.workspace);

  // For All Space
  const { selectedSpace, allSpaces } = useSelector(state => state.space);

  // get user img from user info, which store at local storage...
  const userImg = JSON.parse(localStorage.getItem("userInfo"))?.avatar;


  // re-render for Work-Space
  useEffect(() => {
    // 🟨🟨🟨 GET request for Work-Spaces data...
    const getWorkSpaceData = async () => {
      try {
        const { data } = await get_workspace_data();

        // get all Work-Space data & send into redux store...
        dispatch(addWorkSpace(data.workspaces));

        // by default select 1st Work-Space ID
        dispatch(setSelectedWorkSpaceId(data.workspaces[0]?._id));
      } catch (error) {
        console.log(error);
      }
    };

    // call this function...
    getWorkSpaceData();

    // when new work-space add, re-render this component...
  }, [dispatch, workspaces?.length]);


  // re-render for space's under specific workSpace
  useEffect(() => {
    // 🟨🟨🟨 GET request for all Spaces data...
    const getSpaceData = async () => {
      try {
        const { data } = await get_space_data(selectedWorkspace);

        // get all Space data
        dispatch(addSpace(data.spaces));

        // by default select 1st Space ID
        dispatch(setSelectedSpaceId(data.spaces[0]?._id));
        dispatch(setSelectedSpaceObject(data.spaces[0]));
      } catch (error) {
        console.log("space selection ==> ", error);
      }
    };

    // call this function...
    getSpaceData();

    // when id workSpace ID change,
    // re-fetch all space's under this specific workSpace ID...
  }, [dispatch, selectedWorkspace]);



  return (
    <>
      <section className={`fixed top-0 bottom-0 bg-gray-800 flex`}>
        {/* 🟨🟨🟨 always visible sidebar 🟨🟨🟨 */}
        <div className="flex flex-col items-center bg-[#293c4f] w-[50px] pt-2  ">
          {margin ? (
            <>
              <div className="space-y-1">
                {
                  // 🟨🟨🟨 all work-Space loop here...
                  workspaces?.map((workSpace) => (
                    <Tippy
                      key={workSpace?._id}
                      placement="right"
                      content={workSpace?.name}
                      className="bg-gray-600/70 text-[10px] w-40"
                    >
                      {/* if selected ==> bg-sideBarTextColor  |  hover:bg-[#4D6378]*/}
                      <div
                        className={`relative ml-1.5 mr-1 p-1.5 rounded-[5px] cursor-pointer duration-200 
                      ${selectedWorkspace === workSpace?._id
                            ? "before:content-[''] before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:bg-white before:w-[2px] before:h-5 before:rounded-md"
                            : ""
                          }`}
                        onClick={() =>
                          dispatch(setSelectedWorkSpaceId(workSpace?._id))
                        }
                      >
                        {workSpace.logo ? (
                          <img
                            src={workSpace.logo}
                            alt="searchIcon"
                            className="rounded-[4px]"
                          />
                        ) : (
                          <div
                            // onClick={() => setNewWorkShop(true)}
                            className="w-10 h-10 bg-[#1f2e3d] flex items-center justify-center cursor-pointer rounded-[5px] shadow-xl hover:bg-[#4D6378] text-gray-300 font-bold"
                          >
                            {workSpace.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </Tippy>
                  ))
                }
              </div>

              {/* ➕➕➕ Creating New Work-Space ➕➕➕ by opening Modal ➕➕➕ */}
              <div
                onClick={() => setNewWorkSpace(true)}
                className="w-10 h-10 mt-2 bg-[#1f2e3d] flex items-center justify-center cursor-pointer rounded-[5px] shadow-xl hover:bg-[#4D6378] group"
              >
                <Plus className="text-white duration-200 group-hover:text-purple-300 hover: " />
              </div>
            </>
          ) : (
            <>
              <OpenMenuBtn
                width={28}
                height={28}
                onClick={() => setMargin(true)}
                className="cursor-pointer text-gray-400 hover:text-gray-50"
              />

              {/* sidebar mene open command, but css disturb me :( */}
              {/* onClick={() => { setUserMenu((pre) => ({ isOpen: !pre.isOpen, sideBar: true })) }} */}

              <div className="mt-3 mb-2">
                <img
                  alt="userImage"
                  src={
                    userImg
                      ? userImg
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  className="w-6 h-6 rounded-full cursor-pointer"
                />
              </div>

              <div className="w-10 h-10 mt-2 rounded-md hover:bg-[#3a4b5e] cursor-pointer flex justify-center items-center">
                <Search />
              </div>

              <div className="w-10 h-10 mt-2 rounded-md hover:bg-[#3a4b5e] cursor-pointer flex justify-center items-center">
                <Task />
              </div>

              <div className="w-10 h-10 mt-2 rounded-md hover:bg-[#3a4b5e] cursor-pointer flex justify-center items-center">
                <OverWatch />
              </div>
            </>
          )}
        </div>

        {/* 🟨🟨🟨 toggling sidebar 🟨🟨🟨 */}
        <div
          className={`${!margin ? "hidden" : "w-[275px]"
            } bg-[#202F3E] duration-200`}
        >
          <div className="flex items-center justify-between bg-[#162432] pr-3 pl-5">
            <div className="flex items-center space-x-4 relative">
              <Dropdown
                position="bottom left"
                width={230}
                button={
                  <div className="mt-3 mb-2">
                    <img
                      alt="userImage"
                      src={
                        userImg
                          ? userImg
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      className="w-6 h-6 rounded-full cursor-pointer"
                    />
                  </div>
                }
                menu={() => (
                  <UserSettingsDropDown
                    userMenu={userMenu}
                    setUserMenu={setUserMenu}
                  />
                )}
              />
              <Dropdown
                position="bottom left"
                width={500}
                button={
                  <div className=" cursor-pointer flex justify-center items-center">
                    <SMS className="text-[#1F2E3D] hover:text-gray-200" />
                  </div>
                }
                menu={() => (
                  <NotificationSMS userNotificationSMS={userNotificationSMS} />
                )}
              />
              <Dropdown
                position="bottom left"
                width={450}
                button={
                  <div className=" cursor-pointer flex justify-center items-center">
                    <Bell className="text-[#1F2E3D] hover:text-gray-200" />
                  </div>
                }
                menu={() => (
                  <NotificationBell
                    userNotificationBell={userNotificationBell}
                  />
                )}
              />

              {/* <div
                className=" cursor-pointer flex justify-center items-center"
                onClick={() => {
                  setUserNotificationSMS((pre) => !pre);
                  setUserNotificationBell(false);
                  setUserMenu(false);
                }}
              >
                <SMS className="text-[#1F2E3D] hover:text-gray-200" />
              </div>

              <div
                className=" cursor-pointer flex justify-center items-center"
                onClick={() => {
                  setUserNotificationBell((pre) => !pre);
                  setUserNotificationSMS(false);
                  setUserMenu(false);
                }}
              ></div> */}
            </div>

            <p className="capitalize text-gray-500 text-sm">make real</p>

            <div
              className="cursor-pointer"
              onClick={() => {
                setMargin(false);
                setUserMenu(false);
                setUserNotificationBell(false);
                setUserNotificationSMS(false);
              }}
            >
              <CloseMenuBtn
                width={24}
                height={24}
                className="text-gray-400 hover:text-gray-50"
              />
            </div>
          </div>

          <div className="flex items-center w-full m-3 space-x-4">
            <div className="w-[60%] hover:bg-[#344453] duration-200 flex items-center space-x-3 p-2 mt-[2px] cursor-pointer rounded-lg mr-2 ">
              <Search />{" "}
              <p className="text-sideBarTextColor font-bold">Search...</p>
            </div>

            <div className="w-[20%] flex justify-between">
              <ArrowLeft className="cursor-pointer" />
              <ArrowRight className="cursor-pointer" />
            </div>
          </div>

          <div className="flex items-center px-2.5 py-1 m-2 hover:bg-[#344453] space-x-3 cursor-pointer rounded-lg">
            <Task />
            <p className="uppercase text-sideBarTextColor font-bold line-through text-sm">
              My Tasks
            </p>
          </div>
          <div className="flex items-center px-2.5 py-1 m-2 hover:bg-[#344453] space-x-3 cursor-pointer rounded-lg">
            <OverWatch />
            <p className="uppercase text-sideBarTextColor font-bold line-through text-sm">
              OverWatch
            </p>
          </div>

          <div className="overflow-y-auto h-full my-8">
            <div className="flex w-full items-center m-3 justify-between pr-4">
              {/* 🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎 */}
              <div
                className="hover:bg-[#344453] duration-200 flex items-center space-x-3 p-2 cursor-pointer rounded-lg mr-2 w-full active:bg-slate-900"
                onClick={() => setSpaceSearchModal(true)}
              >
                <p className="text-sideBarTextColor font-bold w-full text-sm">
                  YOUR SPACES
                </p>
                <Search />
              </div>

              <div
                className="flex items-center justify-center cursor-pointer p-2 hover:bg-[#344453] rounded-lg duration-200 active:bg-slate-900"
                onClick={() => setCreateSpaceModal(true)}
              >
                <Plus className="cursor-pointer text-gray-600 w-5 h-5 p-1 rounded-full bg-sideBarTextColor" />
              </div>
            </div>

            {/* 🟨🟨🟨 Folder Creation 🟨🟨🟨 */}
            {/* <div className="hover:bg-[#344453] duration-200 flex items-center p-2 cursor-pointer rounded-lg mr-2 ml-6 w-fit">
            <Folder className="text-[#3f5266] text-sm" />
            <p className="text-[#3f5266] font-bold ml-2 text-sm">
              Create Folder
            </p>
          </div> */}

            {/* 🟨🟨🟨 User Space Join List 🟨🟨🟨 */}
            <div className="my-0">
              {allSpaces?.map((space) => (
                <div
                  key={space._id}
                  className="flex pr-2 items-center group"
                  onClick={() => {
                    dispatch(setSelectedSpaceId(space._id));
                    dispatch(setSelectedSpaceObject(space));
                  }}
                >
                  <DotsDouble className="w-5 h-5 invisible group-hover:visible cursor-grab" />

                  <div
                    className={`w-full flex items-center px-2.5 py-2 mb-2 hover:bg-[#344453] space-x-3 cursor-pointer rounded-lg ${selectedSpace === space._id ? "bg-gray-600" : ""
                      } `}
                  // onClick={() => setSelectedSpaceName(space.name)}
                  >
                    {space.privacy.includes("private") ? (
                      <SpaceLogoLock color={space.color || "#57BEC7"} />
                    ) : (
                      <SpaceLogo color={space.color || "#57BEC7"} />
                    )}
                    <p className="text-sm text-sideBarTextColor font-bold">
                      {space.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex w-full items-center m-3 justify-between pr-4">
              <div className="hover:bg-[#344453] duration-200 flex items-center space-x-3 p-2 cursor-pointer rounded-lg mr-2 w-full ">
                <p className="text-sideBarTextColor font-bold w-full text-sm">
                  CHATS
                </p>{" "}
                <Search />
              </div>

              <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-[#344453] rounded-lg duration-200">
                <Plus className="cursor-pointer text-gray-600 w-5 h-5 p-1 rounded-full bg-sideBarTextColor active:bg-slate-900" />
              </div>
            </div>

            {/* 🟨🟨🟨 User Logo List 🟨🟨🟨 */}
            <div>
              <div className="flex items-center justify-between p-2.5 mr-2 ml-3.5 hover:bg-[#344453] cursor-pointer rounded-lg group">
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    className="w-6 h-6 rounded-full cursor-pointer ring-2 ring-green-400"
                    alt="userImage"
                  />
                  <p className="capitalize text-sideBarTextColor font-bold text-sm">
                    Mahbub
                  </p>
                </div>
                <Eye className="invisible group-hover:visible" />
              </div>

              <div className="flex items-center justify-between p-2.5 mr-2 ml-3.5 hover:bg-[#344453] cursor-pointer rounded-lg group">
                <div className="flex items-center space-x-4">
                  <img
                    src={asserts.defaultList}
                    className="w-6 h-6 rounded-full cursor-pointer ring-2 ring-green-400"
                    alt="userImage"
                  />
                  <p className="capitalize text-sideBarTextColor font-bold text-sm">
                    Hey Bot
                  </p>
                </div>
                <Eye className="invisible group-hover:visible" />
              </div>

              <div className="flex items-center justify-between p-2.5 mr-2 ml-3.5 hover:bg-[#344453] cursor-pointer rounded-lg group">
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    className="w-6 h-6 rounded-full cursor-pointer ring-2 ring-green-400"
                    alt="userImage"
                  />
                  <p className="capitalize text-sideBarTextColor font-bold text-sm">
                    Mitu
                  </p>
                </div>
                <Eye className="invisible group-hover:visible" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {
        // 🟨🟨🟨 ➕➕➕ Create New WorkSpace Modal Open / Popup 🟨🟨🟨
        newWorkSpace && (
          <ModalWorkSpaceCreate setNewWorkSpace={setNewWorkSpace} />
        )
      }

      {
        // 🟨🟨🟨 🔎🔎🔎 Space Searching Modal Open / Popup 🟨🟨🟨
        spaceSearchModal && (
          <ModalSearchSpace
            allSpace={allSpaces}
            setSpaceSearchModal={setSpaceSearchModal}
            setCreateSpaceModal={setCreateSpaceModal}
          />
        )
      }

      {
        // 🟨🟨🟨 ➕➕➕ Create Space Modal Open / Popup 🟨🟨🟨
        createSpaceModal && (
          <ModalSpaceCreate setCreateSpaceModal={setCreateSpaceModal} />
        )
      }
    </>
  );
};

export default SideBar;
