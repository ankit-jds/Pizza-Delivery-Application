import React, { useContext } from "react";
import { UserDashboardContext } from "./UserDashboardPage2";
import { pizza } from "../images/pizza";
import { plus_white } from "../images";

const PizzaCard = ({ name, price }) => {
  const { orders, setOrders } = useContext(UserDashboardContext);
  return (
    <div className="col-span-1 pt-10 group">
      <div className="bg-white rounded-xl mt-16 p-5 ">
        {/* <img src={pizza} className="w-40 -translate-y-24" /> */}
        <div className="relative flex items-left justify-center">
          <img src={pizza} className="w-40 absolute -top-24" />
          <div className="inline bg-red-200 rounded-full p-1 absolute -top-24 -right-3 cursor-pointer transition-all hover:bg-red-300">
            🔥
          </div>
        </div>
        <div className="flex flex-col items-left justify-center">
          <div className="mt-20 text-base">{name}</div>
          <div className="flex items-center justify-between">
            <div>
              <div>⭐⭐⭐⭐⭐ </div>
              <div className="text-base">
                <span
                  className="text-pizza-yellow font-bold"
                  style={{ fontSize: "12px" }}
                >
                  ₹
                </span>{" "}
                {price}
              </div>
            </div>
            <div
              className="bg-pizza-yellow rounded-full w-10 h-10 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100"
              onClick={() => {
                console.log("pizza add krdo re...");

                setOrders((prev) => {
                  return [
                    ...prev,
                    {
                      name: name,
                      price: price,
                      quantity: 2,
                      is_custom: false,
                      options: `haha`,
                    },
                  ];
                });
              }}
            >
              <img src={plus_white} className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
