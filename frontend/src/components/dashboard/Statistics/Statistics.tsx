import React, { useEffect, useState } from "react";

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
      <div
        style={{
          height: "100px",
          width: "60%",
          border: "2px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Statistics
      </div>
    </>
  );
};

export default Statistics;
