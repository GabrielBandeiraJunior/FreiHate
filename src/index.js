import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import App from './App'

import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/app",
    element: <App/>,
  },
]);





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
