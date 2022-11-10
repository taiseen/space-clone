import { Outlet } from "react-router-dom";
import { NavBar, SideBar } from "../";
// import SideBar from "../Sidebar/SideBar";

const Layout = ({selectedSpaceId}) => {
  return (
    <div>
      <Outlet />
      <NavBar selectedSpaceId={selectedSpaceId}/>
      <SideBar />
    </div>
  );
};

export default Layout;
