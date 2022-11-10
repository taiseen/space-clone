import { SpaceLogoLock, SpaceLogo } from "../../assets/icons";
import { useStyleContext } from "../../context/StyleContext";
import { HiOutlineUser, HiMenuAlt1 } from "react-icons/hi";
import { navLinks } from "../../constant/data";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import { TbFilter } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Setting from "./Setting";
import Members from "./Members";
import Filter from "./Filter";
import AddOn from "./AddOn";


const NavBar = ({ selectedSpaceId }) => {

  const { margin } = useStyleContext();
  const { allSpaces } = useSelector(state => state.space);
  const lastActiveLink = JSON.parse(localStorage.getItem('activeLink'));

  const [linkClick, setLinkClick] = useState(lastActiveLink || navLinks[0]?.name);
  const [currentSelectedSpace, setCurrentSelectedSpace] = useState({})
  const [sidePanel, setSidePanel] = useState(false);
  const [navIcons, setNavIcons] = useState("");

  // at refreshing time, persistence selected Link  
  localStorage.setItem('activeLink', JSON.stringify(linkClick));

  const handleSidePanel = (name) => {
    setSidePanel(true);
    setNavIcons(name);
  };

  useEffect(() => {
    const tempSpace = allSpaces?.find(({ _id }) => _id === selectedSpaceId);

    if (tempSpace) {
      setCurrentSelectedSpace(tempSpace);
    } else {
      // when space deleting... by default select it... 
      setCurrentSelectedSpace(allSpaces[0]);
    }

  }, [selectedSpaceId, allSpaces]);


  const activeLink = "mr-8 py-4 font-bold text-teal-400";
  const normalLink = "mr-8 py-4 font-bold text-gray-300 hover:text-gray-600 hover:underline";


  return (
    <header
      className={`${margin ? "ml-[325px]" : "ml-[50px]"} 
      fixed top-0 left-0 right-0 bg-white px-8 py-2 flex items-center justify-between border-b border-gray-300`}
    >
      {/* 🟨🟨🟨 Left Side */}
      <div className="flex items-center gap-5">
        <div className="w-12 h-12">
          {/* <img src={asserts.haySpace} alt="logo" /> */}

          {currentSelectedSpace?.privacy?.includes("private") ? (
            <SpaceLogoLock color={currentSelectedSpace?.color || "#57BEC7"} className="w-12 h-12" />
          ) : (
            <SpaceLogo color={currentSelectedSpace?.color || "#57BEC7"} className="w-12 h-12" />
          )}
        </div>

        <div div="true">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold" style={{ color: currentSelectedSpace?.color }}>
              {
                currentSelectedSpace &&
                currentSelectedSpace?.name
              }
            </h2>
            <p className="text-[12px] text-gray-300 font-light">
              Project purpose...
            </p>
          </div>

          <nav>
            {navLinks.map(({ name, path }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setLinkClick(name)}
                className={name === linkClick ? activeLink : normalLink}
                style={name === linkClick ? { color: currentSelectedSpace?.color } : { color: '#cbd5e0' }}
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* 🟨🟨🟨 Right Side */}
      <div className="flex items-center justify-center text-gray-400">
        {/* <div className="p-2 cursor-pointer duration-300 rounded-lg hover:bg-gray-100 hover:text-teal-400 ">
          <FiVideo className="text-xl font-bold" />
        </div> */}

        {linkClick === "/" && (
          <div className="p-2 cursor-pointer duration-300 rounded-lg hover:bg-gray-100 hover:text-teal-400 ">
            <HiMenuAlt1 className="text-xl font-bold" />
          </div>
        )}

        {/* <div
          className={`${linkClick === "/" ? "hidden" : "block"} ${linkClick === "timeline" ? "hidden" : "block"
            } p-2 cursor-pointer duration-300 rounded-lg hover:bg-gray-100 hover:text-teal-400`}
        >
          <FiSearch className="text-xl font-bold" />
        </div> */}

        <div
          className={`${linkClick === "kanban" ? "block" : "hidden"
            } p-2 cursor-pointer duration-300 rounded-lg hover:bg-gray-100 hover:text-teal-400`}
        >
          <FaPlus className="text-xl font-bold" />
        </div>

        {linkClick === "Board" && (
          <div
            onClick={() => handleSidePanel("filter")}
            className="p-2 cursor-pointer duration-300 rounded-lg hover:bg-gray-100 hover:text-teal-400"
          >
            <TbFilter className="text-xl font-bold" />
          </div>
        )}

        {/* {linkClick === "Chat" && ( */}
        <div
          className="flex p-2 cursor-pointer duration-300 rounded-lg hover:bg-gray-100 hover:text-teal-400 "
          onClick={() => handleSidePanel("add-member")}
        >
          <HiOutlineUser className="text-xl font-bold" />
        </div>
        {/* )} */}

        <div
          onClick={() => handleSidePanel("setting")}
          className="p-2 cursor-pointer duration-300 rounded-lg hover:bg-gray-100 hover:text-teal-400 "
        >
          <FiSettings className="text-xl font-bold" />
        </div>

        {/* <div
          onClick={() => handleSidePanel("add-on")}
          className="p-2 cursor-pointer duration-300 rounded-lg hover:bg-gray-100 hover:text-teal-400 "
        >
          <HiOutlinePuzzle className="text-xl font-bold" />
        </div> */}
      </div>

      {sidePanel && (
        <div className="fixed border right-0 top-[66px] h-full w-[310px]   bg-gray-100 p-1">
          <div
            className="flex justify-end cursor-pointer text-lg hover:text-teal-500"
            onClick={() => setSidePanel(false)}
          >
            <IoIosClose />
          </div>
          {/* members */}
          {navIcons === "filter" ? (
            <div className="h-full overflow-y-auto">
              <Filter />
            </div>
          ) : navIcons === "setting" ? (
            <div className="h-full overflow-y-auto">
              <Setting />
            </div>
          ) : navIcons === "add-member" ? (
            <div className="h-full overflow-y-auto">
              <Members />
            </div>
          ) : (
            <div className="h-full overflow-y-auto">
              <AddOn />
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default NavBar;
