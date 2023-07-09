import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
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
import { loader as topicsLoader } from "./pages/DashboardPage.jsx";
import { loader as problemLoader } from "./pages/ProblemPage.jsx";
import { loader as contentLoader } from "./pages/ContentPage.jsx";

const router = createBrowserRouter([
  {path: "/", element: <RootPage />, errorElement: <ErrorPage />, children: [
    { index: true, element: <LandingPage /> },
    { path: "login", element: <LoginPage /> },
    { path: "signup", element: <SignupPage /> },
    { path: 'home', element: <HomeRootPage />, children: [
      { path: "dashboard", element: <DashboardPage />, loader: topicsLoader },
      { path: "content/:topicId", element: <ContentPage />, loader: contentLoader },
      { path: "problem/:problemId", element: <ProblemPage />, loader: problemLoader },
    ]},
  ]},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
