import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
}));

const BaseURL = import.meta.env.VITE_API_BASE_URL;

interface Problem {
  _id: string;
  title: string;
}

const RecommendedProblems = () => {
  const [recommendedProblems, setRecommendedProblems] = useState<Problem[]>([]);

  const navigate = useNavigate();

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
        <Item
          onClick={() => navigate(`/home/problem/${problem._id}`)}
          key={index}
        >
          {problem.title}
        </Item>
      ))
    ) : (
      <p
        style={{
          textDecoration: "underline",
          textAlign: "center",
          paddingTop: "10px",
        }}
      >
        No more problems specifically recommended for you. Please work on other
        problems.
      </p>
    );
  }, [recommendedProblems]);

  return (
    <div
      className="overflow-auto rounded p-3 bg-light text-light"
      style={{
        width: "60%",
      }}
    >
      <Typography variant="h6" textAlign="center" color="black">
        Recommended Problems
      </Typography>
      <Stack spacing={1}>{recommendedProblemItems}</Stack>
    </div>
  );
};

export default RecommendedProblems;