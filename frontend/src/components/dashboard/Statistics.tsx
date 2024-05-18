import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const BaseURL = import.meta.env.VITE_API_BASE_URL as string;

const Statistics = () => {
  const [completedData, setCompletedData] = useState([]);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchCompletedData = async () => {
      const response = await fetch(`${BaseURL}/user/completed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data, 40);
      setCompletedData(data);
    };

    fetchCompletedData();
  }, [token]);

  return (
    <>
      <Typography
        variant="subtitle1"
        textAlign="left"
        borderBottom="4px solid #8BC48A"
        paddingBottom={1}
        marginBottom={4}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            backgroundColor: "#8BC48A",
          }}
        />
        Your Statistics
      </Typography>

      <div
        style={{
          height: "70vh",
          overflowY: "scroll",
          scrollbarWidth: "none",
        }}
      >
        Stats go here
      </div>
    </>
  );
};

export default Statistics;
