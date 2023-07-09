import React from "react";
import { Outlet, useLocation, useLoaderData, redirect, json } from "react-router-dom";
import LoggedInHeader from "../components/headers/PrimaryHeader/LoggedInHeader/LoggedInHeader";

const HomeRootPage = () => {
  const data = useLoaderData();
  const location = useLocation();
  const route = location.pathname;

  console.log(data, 10);

  if (route !== '/' && route !== '/login' && route !== '/signup'){
    
    return (
      <>  
          <LoggedInHeader username={data.username} />
          <main>
              <Outlet />
          </main>
      </>
    );  
  }

  return (
    <>
        <main>
            <Outlet />
        </main>
    </>
  );
};

export default HomeRootPage;

export const loader = async ({ request, params }) => {

  const token = localStorage.getItem('authToken');

  const response = await fetch('http://localhost:3000/user/profile', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token
    }
  });

  if (!response.ok) {
     
      if (response.status === 401 || response.status === 403){
          return redirect("/");
      } 

      return json({ message: "User does not exist." }, { status: 500 });
  } 

  const user = await response.json();

  return user;
}