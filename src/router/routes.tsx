// src/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../Component/home/HomePage";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/LoginPage";
import AboutUs from "../Pages/AboutUs";
import UserProfile from "../Pages/Userprofile";
import Signup from "../Pages/Signup";
import Contact from "../Pages/Contract";
import AddClinic from "../Pages/AddClinic";
import NotFound from "../Pages/NotFound";
import Admin from "../Pages/Admin/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "contract",
        element: <Contact />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "addclinic",
        element: <AddClinic />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);
