import { Box, Card, Chip, Grid, Skeleton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Problem as ProblemType } from "@/types";
import { useStatsigClient } from "@statsig/react-bindings";

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
  problem: ProblemType;
  loading?: boolean;
  delay?: number;
}

const Problem = ({ problem, loading = false, delay = 0 }: Props) => {
  const { client } = useStatsigClient();

  const timeUntilReview = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const reviewDate = problem.nextReviewDate
      ? new Date(problem.nextReviewDate)
      : null;

    if (!reviewDate) return;

    reviewDate.setHours(0, 0, 0, 0);

    const diffTime = reviewDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Review Overdue";
    if (diffDays === 0) return "Review Today";
    if (diffDays === 1) return "Review Tomorrow";
    return `Review in ${diffDays} days`;
  };

  const handleClickProblem = () => {
    client.logEvent("problem_clicked");
  };

  return (
    <Link
      onClick={handleClickProblem}
      to={`/home/problem/${problem._id}`}
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
                  {problem.title}
                </Typography>
                <DifficultyTag size="small" label={problem.difficulty} />
              </Box>
            </Grid>
            {problem.nextReviewDate && (
              <Grid item>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ textAlign: "left" }}
                >
                  {timeUntilReview()}
                </Typography>
              </Grid>
            )}
          </Grid>
        </AnimatedCard>
      )}
    </Link>
  );
};

export default Problem;
