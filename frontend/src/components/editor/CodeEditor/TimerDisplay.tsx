import React from "react";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useEffect } from "react";

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
    <div>
      <Typography>{formatTime(timeSpent)}</Typography>
      <ButtonGroup variant="contained" size="small">
        <Button onClick={startTimer} disabled={isTimerRunning}>
          Play
        </Button>
        <Button onClick={pauseTimer} disabled={!isTimerRunning}>
          Pause
        </Button>
        <Button onClick={resetTimer}>Reset</Button>
      </ButtonGroup>
    </div>
  );
};

export default TimerDisplay;
