import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoggedInHeader from "../components/headers/PrimaryHeader/LoggedInHeader/LoggedInHeader";

const HomeRootPage = () => {

  const location = useLocation();
  const route = location.pathname;

  if (route !== '/' && route !== '/login' && route !== '/signup'){
    
    return (
      <>  
          <LoggedInHeader />
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