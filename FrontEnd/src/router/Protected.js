import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
// import API from "../OldComponents/api";
// import { getUserProfile } from "../urls";

const Protected = ({ user, setUser, setIsAdmin }) => {
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     } else {
//       API({
//         ...getUserProfile,
//         params: {
//           user_id: localStorage.getItem("userId")
//             ? localStorage.getItem("userId")
//             : "",
//         },
//         onSuccess: (res) => {
//           setUser(res.data.data);
//           const isAdmin =
//             "is_Admin" in res.data.data ? res.data.data["is_Admin"] : false;
//           localStorage.setItem("isAdmin", isAdmin);
//           // setIsAdmin(isAdmin)
//         },
//       });
//     }
//   }, []);

  return (
    <>
      <Outlet></Outlet>{" "}
    </>
  );
};

export default Protected;
