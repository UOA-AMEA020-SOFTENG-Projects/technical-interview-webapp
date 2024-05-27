import React from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Card, CardContent, Typography } from "@mui/material";
import { Topic as TopicType } from "@/types";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnimatedCard = styled(Card)<{ delay: number; cardcolor: string }>`
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${(props) => props.delay}s;
  opacity: 0;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.cardcolor};
  max-width: 400px;
`;

interface Props {
  delay?: number;
  topic: TopicType;
  cardcolor?: string;
  handleClick: (any: any) => void;
}

const Topic = ({
  delay = 0,
  topic,
  cardcolor = "white",
  handleClick,
}: Props) => {
  return (
    <AnimatedCard
      onClick={() => handleClick(topic)}
      variant="outlined"
      delay={delay}
      cardcolor={cardcolor}
    >
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
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, ab!
        </Typography>
      </CardContent>
    </AnimatedCard>
  );
};

export default Topic;
