import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Problem {
  _id: string;
  title: string;
}

const Problem = ({ problem }: { problem: Problem }) => {
  return (
    <Link
      to={`/home/problem/${problem._id}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        variant="outlined"
        style={{ borderWidth: 0, padding: "0.7em 1em", borderRadius: 10 }}
      >
        <Typography variant="subtitle1" fontWeight="600" textAlign="left">
          {problem.title}
        </Typography>
      </Card>
    </Link>
  );
};

export default Problem;
