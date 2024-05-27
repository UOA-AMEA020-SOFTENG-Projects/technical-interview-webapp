import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./LoggedInHeader.module.css";
import { Avatar, IconButton, Typography } from "@mui/material";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";

interface Props {
  username: string;
}

const LoggedInHeader = ({ username }: Props) => {
  const navigate = useNavigate();

  const signoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoSearch}>
        <div>
          <Link to={`/home/dashboard`} style={{ textDecoration: "none" }}>
            <Typography style={{ color: "black" }} variant="body1">
              <span style={{ fontWeight: "bold" }}>ALGO</span> CHAMP
            </Typography>
          </Link>
        </div>
      </div>

      <div className={styles.userInfo}>
        <IconButton aria-label="help">
          <HelpOutlineRoundedIcon />
        </IconButton>
        <IconButton aria-label="notification">
          <NotificationsNoneRoundedIcon />
        </IconButton>
        <Typography fontSize={"0.75rem"} variant="overline">
          {username}
        </Typography>
        <IconButton aria-label="sign-out" onClick={signoutHandler}>
          <Avatar>A</Avatar>
        </IconButton>
      </div>
    </header>
  );
};

export default LoggedInHeader;
