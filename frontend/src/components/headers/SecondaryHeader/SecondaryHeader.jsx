import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SecondaryHeader.module.css";

const SecondaryHeader = () => {
  const navigate = useNavigate();

  const signinHandler = () => {
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <p className={styles.message}>
        Be confident in your technical interview.
      </p>
      <button className={styles.button} onClick={signinHandler}>
        Sign In
      </button>
    </div>
  );
};

export default SecondaryHeader;
