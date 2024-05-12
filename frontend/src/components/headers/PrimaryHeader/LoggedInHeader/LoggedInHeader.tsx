import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../../../assets/primarylogo.png";
import styles from "./LoggedInHeader.module.css";
import { Button } from "@mui/material";

const LoggedInHeader = ({ username }) => {
  const navigate = useNavigate();

  const signoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div>
        <Link to={`/home/dashboard`}>
          <img src={logo} alt="Logo" className={styles.logo}></img>
        </Link>
      </div>
      <div className={styles.userInfo}>
        <span className={styles.username}>
          Logged in as <b>{username}</b>
        </span>
        <Button variant="contained" onClick={signoutHandler}>
          Sign Out
        </Button>
      </div>
    </header>
  );
};

export default LoggedInHeader;
