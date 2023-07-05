import React from "react";
import { Outlet } from "react-router-dom";
import { home, setting, app, logout } from "../images";
import NavIcon from "../components/NavIcon";

const PageLayout = () => {
  // This is side navbar common for both admin and user dashboard.
  return (
    <>
      <div
        className="grid grid-cols-12 gap-6 h-screen pt-6 bg-[#FAF9FB] bg-[#f5f2f7] overflow-hidden"
        
      >
        <div
          id="navbar"
          className=" col-span-1  text-center text-lg font-bold flex flex-col items-center p-4 pt-0"
        >
          <NavIcon src={home} active={true} />
          <NavIcon src={app} />
          <NavIcon src={setting} />
          <NavIcon src={setting} />
          <NavIcon src={logout} className={"mt-auto"} />
        </div>
        <Outlet />
        {/* <div className="bg-pink-400 col-span-8">03</div>
      <div className="bg-pink-400 col-span-3">02</div> */}
      </div>
    </>
  );
};

export default PageLayout;
