import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const handleDragStart = (e) => e.preventDefault();

const PizzaCard = ({ pizza_image_path, pizza_name, pizza_price }) => {
  return (
    <>
      <div
        className='p-2 relative flex flex-col items-center w-52 m-4 shadow-md'
        id='pizza_card'>
        {/* <div className='absolute top-4 right-4'>🔥</div> */}
        <div id='image' className='w-full px-4'>
          <img
            src={pizza_image_path}
            className='border-1 border-black w-28 h-28 m-auto'></img>
        </div>
        <div className='w-full px-3 pt-1 pb-2'>
          <h1 className='font-bold'>{pizza_name}</h1>
          {/* <h1 className=''>⭐⭐⭐⭐⭐</h1> */}
          <h3 className=''>
            <span className='text-yellow-400 font-medium'>₹</span>
            <span className='font-bold'>{pizza_price}</span>
          </h3>
        </div>

        <div className='border border-red-600 absolute right-4 bottom-4'>
          <img src='./fontawesome/circle.svg' className='w-8 h-8' />
        </div>
      </div>
    </>
  );
};

const items = [
  <PizzaCard
    pizza_image_path={"./images/Corn_Cheese.jpg"}
    pizza_name={"Cheese N Corn"}
    pizza_price={599}
  />,
  <PizzaCard
    pizza_image_path={"./images/IndianTandooriPaneer.jpg"}
    pizza_name={"Indi Panner"}
    pizza_price={799}
  />,
  <PizzaCard
    pizza_image_path={"./images/Margherita.jpg"}
    pizza_name={"Margherita"}
    pizza_price={599}
  />,
  <PizzaCard
    pizza_image_path={"./images/Onion_capsicum.jpg"}
    pizza_name={"Fresh Veggie"}
    pizza_price={599}
  />,
  <PizzaCard
    pizza_image_path={"./images/Veg_Extravaganza.jpg"}
    pizza_name={"Veg Extravaganza"}
    pizza_price={599}
  />,
  <PizzaCard
    pizza_image_path={"./images/Veggie_paradise.jpg"}
    pizza_name={"Veggie Paradise"}
    pizza_price={599}
  />,
];

const Dashboard = () => {
  // A function to check if user is logged in or not.
  // this will be checked by the userid or token passed by App.js as prop to dashboard component.

  // if (user)=>then show him dashboard
  // else{navigate him to login page.}

  return (
    <>
      <div className='flex'>
        <div className='w-3/4' id='left_side'>
          <h1 className=''>Today Menu 😋</h1>
          <div id='image'>
            <img className='border-1 border-black w-1/2 h-40'></img>
          </div>
          <h1 className=''>Menu Category</h1>
          <div className='flex flex-wrap' id='pizza varities'>
            {items}
          </div>
          <CustomPizza />
          {/* <AliceCarousel
            mouseTracking
            items={items}
            autoPlay={false}
            animationDuration={800}
            infinite={false}
            autoWidth={"200px"}
          /> */}
        </div>
        <div className='w-1/2 border-2 border-red-600' id='right_side'>
          <RightSide />
        </div>
      </div>
    </>
  );
};

const RightSide = () => {
  return (
    <>
      <div>
        <div className='flex justify-end py-2 pr-8'>
          <div
            className='flex justify-center items-center border border-emerald-300 bg-slate-400 rounded-full w-8 h-8 mx-2'
            id='notification'>
            <img className='h-6 ' src='./fontawesome/notification.svg'></img>
          </div>
          <div
            className='border border-emerald-300 bg-slate-400 rounded-full w-8 h-8 mx-2'
            id='user_image'>
            <img src='./fontawesome/user.svg'></img>
          </div>
          <h1 className='text-base font-bold'>Jeremy</h1>
          <p className='pl-2'>🔽</p>
        </div>
        <div className='border border-black h-52 my-4'></div>
        <OrderList />
      </div>
    </>
  );
};

const OrderList = () => {
  return (
    <>
      <h1>Orders</h1>
    </>
  );
};

const Card = ({
  id,
  baseName,
  inputName,
  inputType,
  onClickFunction,
  checkedId,
}) => {
  // console.log(checkedId);
  let isChecked = checkedId === id;
  return (
    <>
      <label onClick={onClickFunction}>
        <div
          className={`${isChecked ? "bg-red-600" : "bg-cyan-500"
            } rounded-2xl m-2 py-2 px-4`}
          id={id}>
          {isChecked ? (
            <input
              type={inputType}
              name={inputName}
              id={id}
              className=''
              value={id}
              defaultChecked></input>
          ) : (
            // <div className='bg-cyan-500 rounded-2xl m-2 py-2 px-4' id={id}>
            <input
              type={inputType}
              name={inputName}
              id={id}
              className=''
              value={id}></input>
          )}
          <h1 className='font-semibold'>{baseName}</h1>
        </div>
      </label>
    </>
  );
};

const CustomPizza = () => {
  const [customPizza, setCustomPizza] = useState({
    base: "",
    sauce: "",
    cheese: "",
    veggies: [],
  });

  const updateCustomPizza = (e) => {
    e.preventDefault();
    let target = e.target;
    console.log(target, target.tagName);
    while (target.tagName !== "LABEL") {
      console.log(target, target.tagName);
      target = target.parentNode;
      console.log(target);
    }
    console.log(target);
    let inputElement = target.getElementsByTagName("INPUT")[0];

    let name = inputElement.name.toLowerCase();
    let value = inputElement.value;
    let id = inputElement.id;

    console.log(name, "NAME");
    console.log(value,"VALUE");
    console.log(id,"ID");
    if (inputElement.name === "Veggies") {
      console.log(inputElement);
      console.log(customPizza[name]);
      if (inputElement.checked) {
        console.log("ELSE....");
        let index = customPizza[name].indexOf(id);
        console.log(index);
        setCustomPizza({
          ...customPizza,[name]:
          [...customPizza[name].slice(0, index),
          ...customPizza[name].slice(index + 1, customPizza[name].length)]
        });

      } else {
        setCustomPizza({ ...customPizza, [name]: Array.from(new Set([...customPizza[name], id])) });
      }

    } else {
      console.log(inputElement.checked);
      setCustomPizza({ ...customPizza, [name]: id });
    }
  };

  const PizzaOptions = ({
    optionHeading,
    optionArray,
    inputType,
    onChangeFunction,
    checkedId,
  }) => {
    console.log(checkedId, optionHeading);
    let checked = checkedId;
    return (
      <>
        <div>
          <h1>{optionHeading}</h1>
          <div className='flex '>
            {optionArray.map((value, index) => {
              if (optionHeading === "Veggies") {
                console.log(checkedId, value);
                if (checkedId && checkedId.indexOf(value) !== -1) {
                  console.log("hurray huray....");
                  checked = value.split(" ").join("");
                }
              }
              return (
                <Card
                  key={index}
                  id={value.split(" ").join("")}
                  baseName={value}
                  inputName={optionHeading}
                  inputType={inputType}
                  onClickFunction={onChangeFunction}
                  checkedId={checked}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  };

  const base = [
    "Thin Crust",
    "Plain",
    "Gluten Free Crust",
    "Vegan Crust",
    "Thick Crust",
  ];

  const sauce = [
    "White Garlic Sauce",
    "Pesto Sauce",
    "Makhani Sauce",
    "Ketchup",
    "Peppery Red Sauce",
  ];

  const cheese = ["Mozzarella", "Pamesan", "Goat Cheese", "Ricotta", "Cheddar"];

  const veggies = [
    "Mushroom",
    "Olives",
    "Onion",
    "Panner",
    "Corn",
    "Capsicum",
    "Tomatoes",
  ];

  return (
    <>
      <h1>Make a Custom Pizza</h1>
      {/* Choose a Base from 5 options */}
      <div>
        {/* Base */}
        <PizzaOptions
          optionHeading={"Base"}
          optionArray={base}
          inputType={"radio"}
          onChangeFunction={updateCustomPizza}
          checkedId={customPizza.base}
        />

        {/* Sauce */}
        <PizzaOptions
          optionHeading={"Sauce"}
          optionArray={sauce}
          inputType={"radio"}
          onChangeFunction={updateCustomPizza}
          checkedId={customPizza.sauce}
        />

        {/* Cheese */}
        <PizzaOptions
          optionHeading={"Cheese"}
          optionArray={cheese}
          inputType={"radio"}
          onChangeFunction={updateCustomPizza}
          checkedId={customPizza.cheese}
        />

        {/* Veggies */}
        <PizzaOptions
          optionHeading={"Veggies"}
          optionArray={veggies}
          inputType={"checkbox"}
          onChangeFunction={updateCustomPizza}
          checkedId={customPizza.veggies}
        />
      </div>
    </>
  );
};
export default Dashboard;
