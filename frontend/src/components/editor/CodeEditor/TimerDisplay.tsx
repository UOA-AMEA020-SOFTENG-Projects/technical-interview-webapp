import React from "react";
import {
  Button,
  ButtonGroup,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import styles from "./CodeEditor.module.css";
import SpeedIcon from "@mui/icons-material/Speed";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface TimerDisplayProps {
  setIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setTimeSpent: React.Dispatch<React.SetStateAction<number>>;
  timeSpent: number;
  isTimerRunning: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  setIsTimerRunning,
  setTimeSpent,
  timeSpent,
  isTimerRunning,
}) => {
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeSpent((prevTime: number) => prevTime + 1);
      }, 1000);
    } else if (!isTimerRunning && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, setTimeSpent]);

  const startTimer = () => setIsTimerRunning(true);
  const pauseTimer = () => setIsTimerRunning(false);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeSpent(0);
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Paper elevation={0} className={styles.timerDisplayContainer}>
      <ButtonGroup variant="contained" size="small">
        <Tooltip title="Start Timer">
          <IconButton onClick={startTimer} disabled={isTimerRunning}>
            <PlayArrowIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Pause Timer">
          <IconButton onClick={pauseTimer} disabled={!isTimerRunning}>
            <PauseIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset Timer">
          <IconButton onClick={resetTimer}>
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
      <SpeedIcon />
      <Typography>{formatTime(timeSpent)}</Typography>
    </Paper>
  );
};

export default TimerDisplay;
