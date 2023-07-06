import React from "react"; 
import logo from "../../../../assets/primarylogo.png";
import styles from "./LoggedInHeader.module.css";

const LoggedInHeader = () => {
    return (
        <header className={styles.header}>
            <div>
                <img src={logo} alt="Logo" className={styles.logo}></img>
            </div>
            <div className={styles.userInfo}>
                <span className={styles.username}>Logged in as <b>username</b></span>
                <button className={styles.signout}>Sign Out</button>
            </div>
        </header>
    );
}

export default LoggedInHeader;
