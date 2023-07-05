import React from "react";
import { Link } from "react-router-dom";

const NavIcon = ({ src, className, style, active = false }) => {
  return (
    <div
      className={
        "flex items-center justify-center cursor-pointer " +
        (active ? "bg-pizza-yellow w-16 h-16  rounded-full " : " ") +
        (className ? className : " ")
      }
      onClick={()=>{
        
      }}
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

export default NavIcon;
