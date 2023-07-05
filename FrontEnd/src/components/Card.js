import React from "react";
import { thin_crust } from "../images/base";

const Card = ({
  id,
  label,
  price = "",
  selected,
  category,
  updateCustomPizza,
}) => {
  return (
    <div
      className={`text-base rounded-xl p-5 relative group cursor-pointer border-2 transition-colors flex justify-between gap-8 
      ${
        category === "toppings" && selected
          ? selected.includes(id)
            ? "bg-pizza-yellow border-pizza-yellow text-white"
            : "bg-white  hover:border-pizza-yellow"
          : selected === id
          ? "bg-pizza-yellow border-pizza-yellow text-white"
          : "bg-white  hover:border-pizza-yellow"
      } `}
      onClick={() => {
        if (category === "base") {
          // This has to be done to reset the size to regular if size is large and
          // base is changed to something other than new_hand_tossed
          updateCustomPizza((prev) => {
            if (
              (prev[category] === "new_hand_tossed" && prev.size === "large") ||
              id === "classic_hand_tossed"
            ) {
              return {
                ...prev,
                [category]: id,
                size: "regular",
              };
            } else {
              return {
                ...prev,
                [category]: id,
              };
            }
          });
        }

        if (category === "toppings") {
          updateCustomPizza((prev) => {
            let updatedCategory;
            if (category in prev && prev[category].includes(id)) {
              updatedCategory = prev[category].filter(
                (existingId) => existingId !== id
              );
            } else if (category in prev) {
              updatedCategory = [...prev[category], id];
            } else {
              updatedCategory = [id];
            }
            return {
              ...prev,
              [category]: updatedCategory,
            };
          });
        } else {
          updateCustomPizza((prev) => ({ ...prev, [category]: id }));
        }
      }}
    >
      {/* <img src={thin_crust} className=" " /> */}
      <div className=" ">{label}</div>
      {price && (
        <div className="">
          {" "}
          <span
            className={`font-bold transition-colors ${
              category === "toppings" && selected
                ? selected.includes(id)
                  ? "text-white"
                  : "text-pizza-yellow "
                : selected === id
                ? "text-white"
                : "text-pizza-yellow "
            }`}
            style={{ fontSize: "12px" }}
          >
            ₹
          </span>
          {price}
        </div>
      )}
    </div>
  );
};

export default Card;
