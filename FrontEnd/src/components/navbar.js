import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to='/login'>Login</Link>
      <Link to='/Signup'>Signup</Link>
      <Link to='/'>HELLO</Link>
    </>
  );
};

export default Navbar;
