import React from "react";
import PizzaCard from "./PizzaCard";

const PizzaVarieies = () => {
  const data = [
    {
      name: "Veg Extravaganza Pizza",
      price: 329,
      rating: 4.5,
      is_veg: true,
    },
    {
      name: "Golden Corn",
      price: 95,
      rating: 4,
      is_veg: true,
    },
    {
      name: "Indi Tandoori Paneer Pizza",
      price: 329,
      rating: 4,
      is_veg: true,
    },
    {
      name: "Non Veg Loaded Pizza",
      price: 179,
      rating: 4.5,
      is_veg: false,
    },
    {
      name: "Chicken Dominator Pizza",
      price: 389,
      rating: 4,
      is_veg: false,
    },
    {
      name: "Indi Chicken Tikka Pizza",
      price: 389,
      rating: 4.5,
      is_veg: false,
    },
    {
      name: "Non Veg Supreme Pizza",
      price: 389,
      rating: 4.5,
      is_veg: false,
    },
    {
      name: "Peppy Paneer Pizza",
      price: 289,
      rating: 4,
      is_veg: true,
    },
    {
      name: "Farmhouse Pizza",
      price: 289,
      rating: 4,
      is_veg: true,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-12 ">
      {data.map((pizza, key) => (
        <PizzaCard key={key} name={pizza.name} price={pizza.price} />
      ))}
    </div>
  );
};

export default PizzaVarieies;
