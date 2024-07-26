import { useEffect, useMemo, useState } from "react";
import Stack from "@mui/material/Stack";
import ProblemElement from "./Problem";
import { Typography } from "@mui/material";
import { RecommendedProblem } from "@/types";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

const RecommendedProblems = () => {
  const [recommendedProblems, setRecommendedProblems] = useState<
    RecommendedProblem[]
  >(Array(5).fill([]));

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchRecommendedProblems = async () => {
      try {
        const response = await fetch(`${BaseURL}/user/recommended-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setRecommendedProblems(data);
        setLoading(false);
      } catch (err) {
        console.error("Could not fetch recommended problems: ", err);
      }
    };

    // Delay for skeletons
    const timer = setTimeout(() => {
      fetchRecommendedProblems();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const recommendedProblemItems = useMemo(() => {
    return recommendedProblems.length ? (
      recommendedProblems.map((recProblem, index) => {
        if (!recProblem || !recProblem.problem) {
          return null;
        }
        return (
          <ProblemElement
            key={index}
            delay={index * 0.075}
            recProblem={recProblem}
            loading={loading}
          />
        );
      })
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
