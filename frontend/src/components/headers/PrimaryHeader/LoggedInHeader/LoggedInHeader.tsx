import React, { useCallback, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./LoggedInHeader.module.css";
import {
  Avatar,
  Box,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import HelpCarousel from "../../../dashboard/HelpCarousel";

interface Props {
  username: string;
}

const LoggedInHeader = ({ username }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const navigate = useNavigate();

  const signoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoSearch}>
        <div>
          <Tooltip title="Go Home">
            <Link to={`/home/dashboard`} style={{ textDecoration: "none" }}>
              <Typography style={{ color: "black" }} variant="body1">
                <span style={{ fontWeight: "bold" }}>ALGO</span> CHAMP
              </Typography>
            </Link>
          </Tooltip>
        </div>
      </div>

      <div className={styles.userInfo}>
        <Tooltip title="Help">
          <IconButton aria-label="help" onClick={handleOpen}>
            <HelpOutlineRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton aria-label="logout" onClick={signoutHandler}>
            <LogoutRoundedIcon />
          </IconButton>
        </Tooltip>
        <Typography fontSize={"0.75rem"} variant="overline">
          {username}
        </Typography>
        <Avatar>A</Avatar>
      </div>

      <HelpCarousel handleClose={handleClose} open={open} />
    </header>
  );
};

export default LoggedInHeader;
