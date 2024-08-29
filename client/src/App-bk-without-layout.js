import './App.css';
//import {RouterProvider, createBrowserRouter} from "react-router-dom";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom"; // Added Navigate

import User from './components/getuser/User';
import Add from './components/adduser/Add';
import Edit from './components/updateuser/Edit';
import View from './components/viewuser/View';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Layout from './components/common/Layout';

// Function to get cookie value by name
/* const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  console.log(" getCookie = ", document.cookie);
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}; */

// Function to check if the user is authenticated (using cookies OR localStorage)
const isAuthenticated = () => {
  console.log(" isAuthenticated = ", localStorage.getItem('token'));
  return !!localStorage.getItem('token'); // token is stored in localStorage
  //return !!getCookie('token'); // Check if the 'token' cookie exists
};

// Private Route Component
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};


function App() {

  const route = createBrowserRouter([
    {
      path:"/",
      element: <Login/>,
    },
    {
      path:"/signup",
      element: <Signup/>,
    },
   // {
     // path:"/user",
      /* element: <User/>, Public /Non-Protected route */
     // element: <PrivateRoute element={<User />} />, // Protected route
    //},

    {
      path: "/user",
      element: <Layout />, // Use Layout that contains Header
      children: [
        {
          path: "/user",
          element: <User />, // This will be rendered inside the Layout
        },
      ],
    },


    {
      path:"/add",
      /* element: <Add/>, */
      element: <PrivateRoute element={<Add />} />, // Protected route
    },
    {
      path:"/edit/:id",
      /* element: <Edit/>, */
      element: <PrivateRoute element={<Edit />} />, // Protected route
    },
    {
      path:"/view/:id",
      /* element: <View/>, */
      element: <PrivateRoute element={<View />} />, // Protected route
    },
  ])

  return (
    <div className="App">
       <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
