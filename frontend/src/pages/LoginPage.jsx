import React from "react";
import { json, redirect } from "react-router-dom";
import SignInForm from "../components/forms/SignInForm/SignInForm";


const BaseURL = import.meta.env.VITE_API_BASE_URL;

const LoginPage = () => {
  return (
    <div>
      <SignInForm />
    </div>
  );
};

export default LoginPage;

export const action = async ({ request, params }) => {
  const loginData = Object.fromEntries(await request.formData());

  // create request body object to submit and make the post request
  const requestData = {
    username: loginData.username,
    password: loginData.password,
  };

  const response = await fetch(`${BaseURL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 400) {
      const errdata = await response.json();

      return {
        errors: errdata.message,
        code: response.status,
      };
    }

    return json(
      { message: "Something went wrong with logging in." },
      { status: 500 }
    );
  }



  // set the auth token and redirect the user to the dashboard page
  const resData = await response.json();

  const token = resData.accessToken;

  localStorage.setItem('userName', requestData.username)
  localStorage.setItem("authToken", token);

  return redirect("/home/dashboard");
};
