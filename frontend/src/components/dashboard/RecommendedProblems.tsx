import { useEffect, useMemo, useState } from "react";
import Stack from "@mui/material/Stack";
import ProblemElement from "./Problem";
import { Typography } from "@mui/material";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

interface Problem {
  _id: string;
  title: string;
}

const RecommendedProblems = () => {
  const [recommendedProblems, setRecommendedProblems] = useState<Problem[]>([]);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchRecommendedProblems = async () => {
      const response = await fetch(`${BaseURL}/user/recommended-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setRecommendedProblems(data);
    };

    fetchRecommendedProblems();
  }, [token]);

  const recommendedProblemItems = useMemo(() => {
    return recommendedProblems.length ? (
      recommendedProblems.map((problem, index) => (
        <ProblemElement key={index} problem={problem} />
      ))
    ) : (
      <Typography variant="caption">
        No problems specifically recommended for you. Please work on other
        problems.
      </Typography>
    );
  }, [recommendedProblems]);

  return (
    <>
      <Typography
        variant="subtitle1"
        textAlign="left"
        borderBottom="4px solid #FFA500"
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
            backgroundColor: "#FFA500",
          }}
        />
        Ai Recommendations
      </Typography>

      <div
        style={{
          height: "70vh",
          overflowY: "scroll",
          scrollbarWidth: "none",
        }}
      >
        <Stack spacing={2}>{recommendedProblemItems}</Stack>
      </div>
    </>
  );
};

export default RecommendedProblems;
