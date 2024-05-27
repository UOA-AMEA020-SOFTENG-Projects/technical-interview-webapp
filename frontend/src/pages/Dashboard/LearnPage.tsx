import { Topic } from "@/types";
import React, { useMemo } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Card, CardContent, Skeleton, Typography } from "@mui/material";

interface Props {
  topics: Topic[];
}

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
  border-radius: 10px;
  cursor: pointer;
  border: none;
  background-color: #f5f5f5;
  max-width: 400px;
`;

const LearnPage = ({ topics }: Props) => {
  const topicListItems = useMemo(() => {
    return topics.length ? (
      topics.map((topic, index) => (
        <AnimatedCard variant="outlined" key={index} delay={index * 0.02}>
          <CardContent style={{ textAlign: "left", padding: "1em" }}>
            <Typography variant="subtitle1" fontWeight="600">
              {topic.title}
            </Typography>
            <Typography
              variant="body2"
              lineHeight="1.5"
              fontSize="0.8rem"
              fontWeight="300"
              color="#787486"
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem,
              ab!
            </Typography>
          </CardContent>
        </AnimatedCard>
      ))
    ) : (
      <>
        {Array.from({ length: 8 }).map((_, index) => (
          <Card
            key={index}
            variant="outlined"
            style={{
              borderRadius: "10px",
              borderWidth: 0,
            }}
          >
            <CardContent style={{ textAlign: "left", padding: "1em" }}>
              <Typography variant="subtitle1">
                <Skeleton animation="wave" />
              </Typography>
              <Typography variant="body2">
                <Skeleton animation="wave" />
              </Typography>
              <Typography variant="body2">
                <Skeleton animation="wave" />
              </Typography>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }, [topics]);

  return <div className="learn-page-cont">{topicListItems}</div>;
};

export default LearnPage;
