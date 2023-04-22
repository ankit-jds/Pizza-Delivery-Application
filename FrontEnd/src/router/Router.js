import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

import Protected from './Protected';
import PageLayout from '../layout/PageLayout';
import UserDashboardPage from '../components/UserDashboardPage';
// import SignUpForm from "./components/signup";
// import LoginForm from "./components/login";

const Router = () => {
  return (
    <BrowserRouter>
			<Routes>
				<Route path='/' element={<Protected setIsAdmin={1} />}>
					<Route element={<PageLayout />}>
            <Route index element={<UserDashboardPage></UserDashboardPage>} />
						
					</Route>
				</Route>
{/* 
				<Route path='/login' element={<LoginForm></LoginForm>} />
				<Route path='/signup' element={<SignUpForm></SignUpForm>} /> */}
				<Route path='*' element={<h1>/404</h1>} />
			</Routes>
		</BrowserRouter>
  )
}

export default Router
