import React, { createContext, useState } from "react";
import { home, setting, app, logout, minus, plus, plus_black } from "../images";
import UserDashboardMainSection from "./UserDashboardMainSection";
import { thin_crust } from "../images/base";
import { pizza } from "../images/pizza";

export const UserDashboardContext = createContext();

const UserDashboardPage = () => {
  // Each item added to the cart will be updated into the backend
  // So whenever user comes back he/she can see his/her item in the cart.

  // provide edit item option on the cart and clear all.

  // Add filter for pure veg and rating 4.0+
  // veg non veg markers on pre defined pizzas
  // increase quantity in orders menu
  // refer zomato app for more...
  const [orders, setOrders] = useState([
    {
      price: 50230,
      quantity: 1,
      is_custom: true,
      options: "New Hand Tossed, Large, Panner, Fresh Tomato, Crsip Capsicum",
    },
    {
      price: 202,
      quantity: 40,
      is_custom: false,
      options: "New Hand Tossed, Regular",
      name: "Veg Extravaganza Pizza",
    },
    {
      price: 202,
      quantity: 40,
      is_custom: false,
      options: "New Hand Tossed, Regular",
      name: "Panner, Onion & Capsicum with Desi Makhani Sauce",
    },
    {
      price: 6023,
      quantity: 120,
      is_custom: true,
      options: "100% Wheat Thin Curst, Regular, Crsip Capsicum",
    },
  ]);
  return (
    <>
      <UserDashboardContext.Provider value={{ orders, setOrders }}>
        <div className=" col-span-8">
          <UserDashboardMainSection />
        </div>
        <div
          className=" col-span-3 text-base font-bold "
          style={{
            height: "calc( 100vh - 30px )",
            overflowY: "scroll",
          }}
        >
          <div className="h-[100px]"></div>
          <div className="text-lg">Order Menu</div>

          {orders.length !== 0
            ? orders.map((order, key) => {
                return (
                  <div
                    key={key}
                    className="bg-white mr-2 my-4 p-2 rounded-xl flex justify-between items-start "
                  >
                    <div className=" bg-emerald-200 p-2 mr-2 w-[50px] min-w-[50px] rounded-xl">
                      <img src={pizza} className="inline "></img>
                    </div>
                    <div>
                      <div className="text-base font-bold">
                        {order.is_custom ? "Custom Pizza" : order.name}
                      </div>
                      <div className="font-medium text-base">
                        <span
                          className="text-pizza-yellow font-bold"
                          style={{ fontSize: "12px" }}
                        >
                          ₹
                        </span>
                        {order.price}
                      </div>
                      <div
                        className="text-sm w-full max-w-[30ch] font-normal"
                        style={{
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          fontSize: "12px",
                        }}
                      >
                        {order.options}
                      </div>
                      <div className="text-sm text-pizza-yellow font-medium">
                        Edit{" "}
                      </div>
                    </div>
                    <div
                      className="ml-auto pl-1 text-right min-w-[75px]"
                      style={{}}
                    >
                      <div
                        className=" px-2 border border-pizza-yellow  rounded-md font-semibold flex justify-between"
                        style={{
                          backgroundColor: "rgba(251, 157, 0, 0.1)",
                          // backgroundColor: "#fee1b2",
                        }}
                      >
                        <img
                          key={key}
                          src={minus}
                          className="w-[10px] cursor-pointer"
                          onClick={(e) => {
                            setOrders((prev) => {
                              const newOrders = [...prev];
                              const updatedOrder = { ...newOrders[key] };
                              updatedOrder.quantity = updatedOrder.quantity - 1;
                              newOrders[key] = updatedOrder;
                              return newOrders;
                            });
                            e.stopPropagation();
                          }}
                        ></img>{" "}
                        {order.quantity}{" "}
                        <img
                          src={plus}
                          className="w-[10px] cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOrders((prev) => {
                              const newOrders = [...prev];
                              const updatedOrder = { ...newOrders[key] };
                              updatedOrder.quantity = updatedOrder.quantity + 1;
                              newOrders[key] = updatedOrder;
                              return newOrders;
                            });
                          }}
                        ></img>
                      </div>
                      <div className="font-bold ">
                        <span
                          className="text-pizza-yellow font-bold"
                          style={{ fontSize: "12px" }}
                        >
                          ₹
                        </span>
                        {order.price * order.quantity}
                      </div>
                    </div>
                  </div>
                );
              })
            : "No Items"}
        </div>
      </UserDashboardContext.Provider>
    </>
  );
};

export default UserDashboardPage;
