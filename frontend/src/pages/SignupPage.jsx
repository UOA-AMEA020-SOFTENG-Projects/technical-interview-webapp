import React from "react";
import { redirect, json } from "react-router-dom";
import SignUpForm from "../components/forms/SignUpForm/SignUpForm";
import { deserializeUserDetails } from "../utils/parseJWT";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

const SignupPage = () => {
  return <SignUpForm />;
};

export default SignupPage;

export const action = async ({ request, params }) => {
  const loginData = Object.fromEntries(await request.formData());

  // check the password that the user enters for these two fields match before making request
  if (loginData.password !== loginData["confirm-password"]) {
    return { errors: "Password and Confirm Password do not match.", code: 401 };
  }

  // create request body object to submit and make the post request
  const requestData = {
    username: loginData.username,
    password: loginData.password,
  };

  const response = await fetch(`${BaseURL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    if (response.status === 400) {
      const errdata = await response.json();

      return {
        errors: errdata.message,
        code: 400,
      };
    }

    return json(
      { message: "Something went wrong with registering a new account." },
      { status: 500 }
    );
  }

  // set the auth token and redirect the user to the dashboard page (so user does not have to login)
  const resData = await response.json();

  const token = resData.accessToken;

  localStorage.setItem("authToken", token);

  // when the user creates a new account it is their first time logging in so redirect to the questionnaire page
  return redirect("/home/dashboard");
};
