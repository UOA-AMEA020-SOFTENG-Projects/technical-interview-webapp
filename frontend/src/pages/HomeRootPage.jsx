import React from "react";
import { Outlet } from "react-router-dom";

const HomeRootPage = () => {

  return (
    <>
        <main>
            <Outlet />
        </main>
    </>
  );
};

export default HomeRootPage;