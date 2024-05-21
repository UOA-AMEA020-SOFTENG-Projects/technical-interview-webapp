import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

interface Problem {
  _id: string;
  title: string;
}

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
`;

const Problem = ({ problem }: { problem: Problem }) => {
  return (
    <Link
      to={`/home/problem/${problem._id}`}
      style={{ textDecoration: "none" }}
    >
      <AnimatedCard
        variant="outlined"
        style={{ borderWidth: 0, padding: "0.7em 1em", borderRadius: 10 }}
      >
        <Typography variant="subtitle1" fontWeight="600" textAlign="left">
          {problem.title}
        </Typography>
      </AnimatedCard>
    </Link>
  );
};

export default Problem;
