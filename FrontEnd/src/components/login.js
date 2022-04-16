import React from "react";
import { useState } from "react";
import FormGroup from "./formgroup";

function LoginForm() {
  // state for login page
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  // updateLoginCredentials updates the state whenever loginCredentials changes the input values.
  const updateLoginCredentials = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    console.log(name);
    console.log(value);
    setLoginCredentials({ ...loginCredentials, [name]: value });
  };

const Login=async(e)=>{
    e.preventDefault();

    const{email,password}=loginCredentials;

    const res=await fetch('/login',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            email,password
        })
    });

    const data=await res.json();
    const status=res.status;

    console.log(data,status);

}

  return (
    <div className='flex flex-col items-center'>
      <h2 className='block font-bold text-2xl mb-4'>Login</h2>
      <form method='POST' className='' onSubmit={Login}>
        <FormGroup
          type='text'
          name='email'
          display_name='Email'
          inputValue={loginCredentials.email}
          onChangeFunction={updateLoginCredentials}></FormGroup>
        <FormGroup
          type='password'
          name='password'
          display_name='Password'
          inputValue={loginCredentials.password}
          onChangeFunction={updateLoginCredentials}></FormGroup>
        <button
          className='px-2 py-1 border-2 font-medium rounded-xl mt-4'
          type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
