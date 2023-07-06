import React from "react";
import { Outlet } from 'react-router-dom'; 
import PrimaryHeader from "../components/headers/PrimaryHeader/PrimaryHeader";

const RootPage = () => {

    return (
        <>  
            <PrimaryHeader />
            <main> 
                <Outlet />
            </main>
        </>

    );
};

export default RootPage;