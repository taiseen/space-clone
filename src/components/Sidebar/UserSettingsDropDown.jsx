import {
  Addons,
  Calendar,
  LogOut,
  Mobile,
  Settings,
  Smile,
  SpaceLogo,
  Subscription,
} from "../../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { userLogOut } from "../../hooks/useFetch";

const UserSettingsDropDown = ({ userMenu, setUserMenu }) => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await userLogOut();
    } catch (error) {
      console.log(error);
    }

    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <nav>
        <Link to="/projects" className="userSettings group line-through">
          <SpaceLogo className="text-[#B9C3CE] group-hover:text-purple-500" />
          <span>Show Workspace list</span>
        </Link>

        <Link to="/projects" className="userSettings group line-through">
          <Smile className="text-[#B9C3CE] group-hover:text-purple-500" />
          <span>Set your status</span>
        </Link>

        <div className="border-b border-gray-300 my-2"></div>

        <Link
          to="/settings"
          className="flex p-2 mt-[2px] space-x-2 items-center hover:bg-slate-200 cursor-pointer rounded-md text-gray-400 group text-sm"
        >
          <Settings className="text-[#B9C3CE]" />
          <span className="group-hover:text-purple-500">Settings</span>
        </Link>

        <Link to="/projects" className="userSettings group line-through">
          <Subscription className="text-[#B9C3CE]" />
          <span className="group-hover:text-purple-500">Subscription</span>
        </Link>

        <Link to="/projects" className="userSettings group line-through">
          <Calendar className="text-[#B9C3CE]" />
          <span className="group-hover:text-purple-500">Book a demo</span>
        </Link>

        <Link to="/projects" className="userSettings group line-through">
          <Addons className="text-[#B9C3CE]" />
          <span className="group-hover:text-purple-500">Addons</span>
        </Link>

        <Link to="/projects" className="userSettings group line-through">
          <Mobile className="text-[#B9C3CE]" />
          <span className="group-hover:text-purple-500">Apps</span>
        </Link>

        <div
          onClick={handleLogOut}
          className="flex p-2 mt-[2px] space-x-2 items-center hover:bg-slate-200 cursor-pointer rounded-md text-gray-400 group text-sm"
        >
          <LogOut className="text-[#B9C3CE]" />
          <span className="group-hover:text-purple-500">Log out</span>
        </div>
      </nav>
    </div>
  );
};

export default UserSettingsDropDown;
