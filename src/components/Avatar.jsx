import React from "react";

const Avatar = ({user}) => {
  return !user.img ? (
    <div className="w-7 h-7 border-teal-400	border-4 rounded-full bg-slate-700 relative	">
      <h6 className="text-xs absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white">
        {user.fullName?.slice(0, 1)}
      </h6>
    </div>
  ) : (
    <div className="w-7 h-7 border-slate-700	border-4 rounded-full  relative	">
      <img src={user.img} alt="user" className="rounded-full" />
    </div>
  );
};

export default Avatar;
