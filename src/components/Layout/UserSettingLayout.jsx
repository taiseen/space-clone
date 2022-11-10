import React from "react";
import { Outlet } from "react-router-dom";
import UserSettings from "../UserSettings/UserSettings";

const UserSettingLayout = () => {
  return (
    <div>
      <UserSettings />
      <div className="bg-[#F8F9F9] ml-[325px] ">{<Outlet />}</div>
    </div>
  );
};

export default UserSettingLayout;
