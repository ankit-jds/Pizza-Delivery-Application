import React from "react";
import { useState } from "react";
import FormGroup from "./formgroup";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  // state for signup form
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
  });

  // updateUser updates the state whenever user changes the input values.
  const updateUser = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    console.log(name);
    console.log(value);
    setUser({ ...user, [name]: value });
  };

  // Postdata is function to send the the signup details to the backend.
  const PostData = async (e) => {
    e.preventDefault();
    let navigate = useNavigate();

    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      address,
    } = user;

    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        confirm_password,
        address,
      }),
    });

    const data = await res.json();
    const status = res.status;

    console.log(data, status);
    if (status === 201 || !data) {
      console.log("Successful Registration....");
      window.alert("Successful Registration....");

      // navigate to login Page....
      navigate("/login");

      console.log("href to login page....");
    } else {
      console.error("Invalid Registration....");
      console.log(data.message);

      window.alert(data.message);
      // Error 406 is not acceptable error.
      if (status === 406) {
        let errors = JSON.parse(data.message);
        console.log(errors);
        for (let index = 0; index < errors.length; index++) {
          const error = errors[index];
          window.alert(error.msg);
        }
      }
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <h2 className='block font-bold text-2xl mb-4'>Sign Up</h2>
      <form method='POST' className='' onSubmit={PostData}>
        <FormGroup
          type='text'
          name='first_name'
          display_name='First Name'
          inputValue={user.first_name}
          onChangeFunction={updateUser}></FormGroup>
        <FormGroup
          type='text'
          name='last_name'
          display_name='Last Name'
          inputValue={user.last_name}
          onChangeFunction={updateUser}></FormGroup>
        <FormGroup
          type='text'
          name='email'
          display_name='Email'
          inputValue={user.email}
          onChangeFunction={updateUser}></FormGroup>
        <FormGroup
          type='password'
          name='password'
          display_name='Password'
          inputValue={user.password}
          onChangeFunction={updateUser}></FormGroup>
        <FormGroup
          type='password'
          name='confirm_password'
          display_name='Confirm Password'
          inputValue={user.confirm_password}
          onChangeFunction={updateUser}></FormGroup>
        <FormGroup
          type='text'
          name='address'
          display_name='Address'
          inputValue={user.address}
          onChangeFunction={updateUser}></FormGroup>
        <button
          className='px-2 py-1 border-2 font-medium rounded-xl mt-4'
          type='submit'>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
