import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import Protected from "./Protected";
import PageLayout from "../layout/PageLayout2";
import UserDashboardPage from "../components/UserDashboardMainSection";
import UserDashboardPage2 from "../components/UserDashboardPage2";
// import SignUpForm from "./components/signup";
// import LoginForm from "./components/login";

const Router = () => {
  // const [tab, setTab] = useState("varieties");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Protected setIsAdmin={1} />}>
          <Route element={<PageLayout />}>
            <Route index element={<UserDashboardPage2 />} />
          </Route>
        </Route>
        <Route path="/tp" element={<UserDashboardPage2 />} />
        {/* 
				<Route path='/login' element={<LoginForm></LoginForm>} />
				<Route path='/signup' element={<SignUpForm></SignUpForm>} /> */}
        <Route path="*" element={<h1>/404</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
