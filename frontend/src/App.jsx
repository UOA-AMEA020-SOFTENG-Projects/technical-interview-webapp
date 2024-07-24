import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import RootPage from "./pages/RootPage.jsx";
import HomeRootPage from "./pages/HomeRootPage.jsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.tsx";
import { loader as problemLoader } from "./pages/ProblemPage.jsx";
import { action as signupAction } from "./pages/SignupPage.jsx";
import { loader as usernameLoader } from "./pages/HomeRootPage.jsx";
import { action as loginAction } from "./pages/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <LoginPage />, action: loginAction },
      { path: "signup", element: <SignupPage />, action: signupAction },
      {
        path: "home",
        element: <HomeRootPage />,
        loader: usernameLoader,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "problem/:problemId",
            element: <ProblemPage />,
            loader: problemLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
