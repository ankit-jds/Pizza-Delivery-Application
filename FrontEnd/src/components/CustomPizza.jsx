import React, { useState, useContext } from "react";
import { UserDashboardContext } from "./UserDashboardPage2";
import Card from "./Card";

const CustomPizza = () => {
  const { orders, setOrders } = useContext(UserDashboardContext);

  const [pizza, setPizza] = useState({
    base: "new_hand_tossed",
    size: "regular",
  });
  const data = {
    // fresh pan pizza 100% wheat thin crsut
    Base: [
      { id: "new_hand_tossed", name: "base", label: "New Hand Tossed" },
      { id: "cheese_burst", name: "base", label: "Cheese Burst" },
      { id: "classic_hand_tossed", name: "base", label: "Classic Hand Tossed" },
      { id: "fresh_pan_pizza", name: "base", label: "Fresh Pan Pizza" },
      { id: "wheat_thin_crust", name: "base", label: "Wheat Thin Curst" },
    ],
    Size: [
      {
        id: "regular",
        name: "sauce",
        label: "Regular",
        price: {
          new_hand_tossed: 329,
          cheese_burst: 424,
          classic_hand_tossed: 329,
          fresh_pan_pizza: 374,
          wheat_thin_crust: 374,
        },
      },
      {
        id: "medium",
        name: "sauce",
        label: "Medium",
        price: {
          new_hand_tossed: 609,
          cheese_burst: 728,
          fresh_pan_pizza: 664,
          wheat_thin_crust: 674,
        },
      },
      {
        id: "large",
        name: "sauce",
        label: "Large",
        price: { new_hand_tossed: 869 },
      },
    ],
    // Sauce: [
    //   { id: "tomato", name: "sauce", label: "Tomato" },
    //   { id: "pesto", name: "sauce", label: "Pesto" },
    //   { id: "marinara", name: "sauce", label: "Marinara" },
    //   { id: "hummus", name: "sauce", label: "Hummus" },
    //   { id: "chocolate", name: "sauce", label: "Chocolate" },
    // ],
    Toppings: [
      {
        id: "crisp_capsicum",
        name: "topping",
        label: "Crsip Capsicum",
        price: 35,
      },
      { id: "tomato", name: "topping", label: "Fresh Tomato", price: 35 },
      { id: "panner", name: "topping", label: "Panner", price: 35 },
      { id: "red_pepper", name: "topping", label: "Red Pepper", price: 35 },
      { id: "jalapeno", name: "topping", label: "Jalapeno", price: 35 },
      { id: "black_olive", name: "topping", label: "Black Olive", price: 35 },
      {
        id: "grilled_mushrooms",
        name: "topping",
        label: "Grilled Mushrooms",
        price: 35,
      },
      { id: "onions", name: "topping", label: "Onions", price: 35 },
      { id: "corn", name: "topping", label: "Corn", price: 35 },
      { id: "extra_cheese", name: "topping", label: "Extra Cheese", price: 50 },
    ],
  };
  let costing = Object.keys(pizza)
    .map((key) => {
      if (key === "size") {
        const selected_size = data[
          key.charAt(0).toUpperCase() + key.slice(1)
        ].find((obj) => obj.id === pizza.size);
        return selected_size ? selected_size.price[pizza.base] : 0;
      } else if (key === "toppings") {
        const selected_topping = data[
          key.charAt(0).toUpperCase() + key.slice(1)
        ].filter((obj) => pizza.toppings.includes(obj.id));
        // console.log(selected_topping);
        let pizza_size_adder =
          pizza.size === "medium" ? 30 : pizza.size === "large" ? 50 : 0;
        let total_toppings_price = selected_topping.reduce(
          (sum, topping) => sum + topping.price + pizza_size_adder,
          0
        );
        return total_toppings_price;
      } else {
        return 0;
      }
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return (
    <>
      {Object.keys(data).map((category, i) => {
        return (
          <div className="py-3" key={i}>
            <div className="mb-5" style={{ fontSize: "20px" }}>
              {category}
            </div>
            <div
              className="flex justify-start flex-wrap w-full gap-3"
              // style={{ overflowX: "scroll" }}
            >
              {data[category].map((variation, index) => {
                let price = "";
                if (
                  (category === "Size" &&
                    pizza.base !== "new_hand_tossed" &&
                    variation.id === "large") ||
                  (pizza.base === "classic_hand_tossed" &&
                    (variation.id === "large" || variation.id === "medium"))
                ) {
                  // console.log(variation);
                  return null;
                }
                if (category === "Size") {
                  price = variation.price[pizza.base];
                }
                if (category === "Toppings") {
                  price = variation.price;
                  if (pizza.size === "medium") {
                    price += 30;
                  }
                  if (pizza.size === "large") {
                    price += 50;
                  }
                }
                return (
                  <Card
                    key={`${category}_${index}`}
                    id={variation.id}
                    label={variation.label}
                    selected={pizza ? pizza[category.toLowerCase()] : ""}
                    category={category.toLowerCase()}
                    updateCustomPizza={setPizza}
                    price={price}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <button
        className="bg-pizza-yellow text-white text-base font-medium p-2 px-10 rounded-xl"
        onClick={() => {
          console.log(pizza, "your pizza order is taken,,,");
          setOrders((prev) => {
            function capitalizeAndJoinWords(str) {
              if (typeof str !== "string") {
                return "";
              }

              return str
                .split(" ")
                .map((word) => {
                  if (/^\d+%$/.test(word)) {
                    return word;
                  }
                  return word.charAt(0).toUpperCase() + word.slice(1);
                })
                .join(" ");
            }

            const base = capitalizeAndJoinWords(pizza.base.replace(/_/g, " "));
            const size = capitalizeAndJoinWords(pizza.size);
            const toppings = pizza.toppings
              .map((topping) =>
                capitalizeAndJoinWords(topping.replace(/_/g, " "))
              )
              .join(", ");

            return [
              ...prev,
              {
                price: costing,
                quantity: 1,
                is_custom: true,
                options: `${base}, ${size}, ${toppings}`,
              },
            ];
          });
          setPizza({
            base: "new_hand_tossed",
            size: "regular",
          });
        }}
      >
        Add Item ₹{costing}
      </button>
    </>
  );
};

export default CustomPizza;
