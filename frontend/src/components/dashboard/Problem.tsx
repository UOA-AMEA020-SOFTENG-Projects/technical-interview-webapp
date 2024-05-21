import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Problem as ProblemType } from "@/types";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnimatedCard = styled(Card)`
  animation: ${fadeIn} 0.5s ease-out forwards;
  opacity: 0;
  border: none;
  padding: 0.7em 1em;
  border-radius: 10px;
`;

const Problem = ({ problem }: { problem: ProblemType }) => {
  return (
    <Link
      to={`/home/problem/${problem._id}`}
      style={{ textDecoration: "none" }}
    >
      <AnimatedCard variant="outlined">
        <Typography variant="subtitle1" fontWeight="600" textAlign="left">
          {problem.title}
        </Typography>
      </AnimatedCard>
    </Link>
  );
};

export default Problem;
