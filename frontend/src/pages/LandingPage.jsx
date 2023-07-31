import React from "react";
import SecondaryHeader from "../components/headers/SecondaryHeader/SecondaryHeader";
import LandingBody from "../components/landing/LandingBody";

const LandingPage = () => {
  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <SecondaryHeader />
      <LandingBody />
    </div>
  );
};

export default LandingPage;
