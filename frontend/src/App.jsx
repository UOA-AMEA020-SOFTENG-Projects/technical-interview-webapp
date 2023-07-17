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
import { action as signupAction } from "./pages/SignupPage.jsx";
import { loader as usernameLoader } from "./pages/HomeRootPage.jsx";
import { loader as questionsLoader } from "./pages/QuestionnairePage";
import { action as loginAction } from "./pages/LoginPage.jsx";
import QuestionnairePage from "./pages/QuestionnairePage";

const router = createBrowserRouter([
  {path: "/", element: <RootPage />, errorElement: <ErrorPage />, children: [
    { index: true, element: <LandingPage /> },
    { path: "login", element: <LoginPage />, action: loginAction },
    { path: "signup", element: <SignupPage />, action: signupAction },
    { path: 'home', element: <HomeRootPage />, loader: usernameLoader, children: [
      { path: "questionnaire", element: <QuestionnairePage />, loader: questionsLoader },
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
