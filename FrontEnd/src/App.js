import { useState } from "react";

function FormGroup({ type, name, display_name, inputValue, onChangeFunction }) {
  return (
    <>
      <label className='block font-medium' htmlFor={name}>
        {display_name}
        <input
          className='border-2 ml-2'
          type={type}
          name={name}
          id={name}
          value={inputValue}
          onChange={onChangeFunction}></input>
      </label>
    </>
  );
}
function SignUpForm({ user, updateUser }) {
  return (
    <div className='flex flex-col items-center'>
      <h2 className='block font-bold text-2xl mb-4'>Sign Up</h2>
      <form className=''>
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
function App() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
  });

  const updateUser = (e) => {
    let name = e.target.name;
    let value = e.target.value;
  
    console.log(name);
    console.log(value);
    setUser({ ...user, [name]: value });
  };

  return <SignUpForm user={user} updateUser={updateUser}></SignUpForm>;
}

export default App;
