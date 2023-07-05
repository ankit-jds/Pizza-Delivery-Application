import React, { useState } from "react";

// React Components
import CustomPizza from "./CustomPizza";
import PizzaVarieies from "./PizzaVarieies";

// Assets
import { search } from "../images";

const UserDashboardMainSection = () => {
  const [tab, setTab] = useState("varieties");

  return (
    <div className="text-lg font-bold">
      <div className="mx-8 mb-6 flex justify-between">
        <div style={{ fontSize: "22px" }}>Today Menu 😋</div>
        <div className="Search w-2/5">
          <div className="flex justify-between bg-white w-full p-3 rounded-full">
            <input
              className="appearance-none border-transparent focus:outline-none focus-visible:outline-none focus:ring-0"
              placeholder="Search by pizza name"
            ></input>
            <img
              className="inline"
              src={search}
              style={{
                height: "28px",
              }}
            ></img>
          </div>
        </div>
      </div>
      <div
        id="custom"
        className=""
        style={{
          height: "calc( 100vh - 100px )",
          overflowY: "scroll",
        }}
      >
        <div className="mx-8 mb-6">
          {/* <div className="rounded-3xl overflow-hidden relative cursor-pointer">
            <img className="w-full h-auto" src={customPizzaHeader}></img>
            <div class="absolute inset-0 bg-black opacity-50"></div>
            <div class="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div class="h-full w-full">
                <div class="flex flex-col justify-center items-end h-full pr-5 text-right text-white font-bold animate-fade-in">
                  <p class=" text-3xl ">
                    Customize Your Pizza: <br />
                  </p>
                  <p className="text-xl font-semibold">
                    Unleash Your Culinary Creativity!
                  </p>
                  <a
                    href="#"
                    class="mt-5 text-white bg-pizza-yellow hover:bg-opacity-75 py-2 px-4 rounded-full transition-colors duration-300"
                  >
                    Create Now
                  </a>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="mx-8 flex" style={{ transition: "5s" }}>
          <div
            id="varieties"
            className="p-1 px-3 cursor-pointer"
            style={{
              fontSize: "20px",
              // fontWeight: "normal",
              borderBottom:
                tab !== "varieties" ? "0px solid #747680" : "3px solid #fb9300",
              color: tab !== "varieties" ? "#747680" : "black",
            }}
            onClick={() => {
              setTab("varieties");
            }}
          >
            Pizza Varieties
          </div>
          <div
            id="custom"
            className="p-1 px-3 cursor-pointer"
            style={{
              fontSize: "20px",
              // fontWeight: "normal",
              borderBottom:
                tab !== "custom" ? "0px solid #747680" : "3px solid #fb9300",
              color: tab !== "custom" ? "#747680" : "black",
            }}
            onClick={() => {
              setTab("custom");
            }}
          >
            Custom Pizza
          </div>
        </div>
        {/* <div className="flex flex-wrap"> */}
        <div className="mx-8 pt-6">
          {tab === "varieties" ? <PizzaVarieies /> : <CustomPizza />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardMainSection;
