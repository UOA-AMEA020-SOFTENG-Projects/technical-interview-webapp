import { Box, Card, Chip, Grid, Skeleton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { RecommendedProblem as RecommendedProblemType } from "@/types";

const difficultyColors: { [key: string]: string[] } = {
  hard: ["#FF5151", "#FCE9E3"],
  easy: ["rgba(131, 194, 157, 0.3)", "#68B266"],
  medium: ["#FFA500", "#FFF2DA"],
};

const DifficultyTag = styled(Chip)<{ label: string }>`
  background-color: ${(props) => difficultyColors[props.label]};
  color: ${(props) => difficultyColors[props.label][1]};
  font-size: 0.7rem;
  text-transform: uppercase;
  border-radius: 4px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnimatedCard = styled(Card)<{ delay: number }>`
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${(props) => props.delay}s;
  opacity: 0;
  border: none;
  padding: 0.7em 1em;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 2em;
`;

interface Props {
  recProblem: RecommendedProblemType;
  loading?: boolean;
  delay?: number;
}

const Problem = ({ recProblem, loading = false, delay = 0 }: Props) => {
  const timeUntilReview = () => {
    const now = new Date();
    const reviewDate = new Date(recProblem.nextReviewDate);
    const diffTime = reviewDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Review Overdue";
    if (diffDays === 0) return "Review Today";
    if (diffDays === 1) return "Review Tomorrow";
    return `Review in ${diffDays} days`;
  };

  return (
    <Link
      to={`/home/problem/${recProblem.problem._id}`}
      style={{ textDecoration: "none" }}
    >
      {loading ? (
        <AnimatedCard
          variant="outlined"
          delay={0}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" style={{ width: "60%" }}>
            <Skeleton animation="wave" />
          </Typography>
          <Skeleton
            variant="rectangular"
            width={50}
            height={25}
            style={{ borderRadius: "5px" }}
          />
        </AnimatedCard>
      ) : (
        <AnimatedCard variant="outlined" delay={delay}>
          <Grid
            container
            spacing={2}
            direction="column"
            style={{ height: "100%" }}
          >
            <Grid item>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="600"
                  textAlign="left"
                >
                  {recProblem.problem.title}
                </Typography>
                <DifficultyTag
                  size="small"
                  label={recProblem.problem.difficulty}
                />
              </Box>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ textAlign: "left" }}
              >
                {timeUntilReview()}
              </Typography>
            </Grid>
          </Grid>
        </AnimatedCard>
      )}
    </Link>
  );
};

export default Problem;
