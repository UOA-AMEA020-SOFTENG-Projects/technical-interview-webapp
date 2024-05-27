import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/primarylogo.png";
import styles from "./PrimaryHeader.module.css";

const PrimaryHeader = () => {
  const location = useLocation();
  const route = location.pathname;

  // Check if the route is '/', '/login', or '/signup'
  if (route === "/" || route === "/login" || route === "/signup") {
    return (
      <header className={styles.header}>
        <div>
          <img src={logo} alt="Logo" className={styles.logo}></img>
        </div>
      </header>
    );
  }
};

export default PrimaryHeader;
