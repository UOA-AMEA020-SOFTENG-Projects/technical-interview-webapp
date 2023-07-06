import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ContentPage from "./pages/ContentPage.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import RootPage from "./pages/RootPage.jsx";
import HomeRootPage from "./pages/HomeRootPage.jsx";

const router = createBrowserRouter([
  {path: "/", element: <RootPage />, errorElement: <ErrorPage />, children: [
    { index: true, element: <LandingPage /> },
    { path: "login", element: <LoginPage /> },
    { path: "signup", element: <SignupPage /> },
    { path: 'home', element: <HomeRootPage />, children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "content/:topicId", element: <ContentPage /> },
      { path: "problem/:problemId", element: <ProblemPage /> },
    ]},
  ]},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
