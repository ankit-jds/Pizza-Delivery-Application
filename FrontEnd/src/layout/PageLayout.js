import React from "react";
import { Outlet } from "react-router-dom";
import { home, setting, app, logout } from "../images";

const NavIcon = ({ src, className, style, active = false }) => {
  return (
    <div
      className={
        "flex items-center justify-center cursor-pointer " +
        (active ? "bg-pizza-yellow w-16 h-16  rounded-full " : " ") +
        (className ? className : " ")
      }
    >
      <img
        src={src}
        className={
          "w-8 m-6 hover:drop-shadow-lg hover:scale-105 transition-all "
        }
        style={style}
      />
    </div>
  );
};

const PageLayout = () => {
  return (
    <>
      <div className="flex flex-row h-screen">
        <div
          id="navbar"
          className="w-24 border-2 border-black text-center text-lg font-bold flex flex-col items-center p-4"
        >
          <NavIcon src={home} active={true} />
          <NavIcon src={app} />
          <NavIcon src={setting} />
          <NavIcon src={logout} className={"mt-auto"} />
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default PageLayout;
