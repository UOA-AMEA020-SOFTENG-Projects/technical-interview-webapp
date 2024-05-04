import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

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
      {/* <PieChart
        width={600}
        height={200}
        style={{ marginTop: "20px", marginBottom: "80px" }}
      >
        {" "}
        <Pie
          dataKey="problems"
          isAnimationActive={true}
          data={completedData}
          outerRadius={100}
          fill="#8884d8"
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {completedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index % 2 === 0 ? "#1d0320" : "#380e0e"}
            />
          ))}
        </Pie>
      </PieChart> */}
    </>
  );
};

export default Statistics;
