import { useState, useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { IconButton, Skeleton, Stack, Typography } from "@mui/material";
import ProblemElement from "./Problem";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Topic } from "@/types";
import TopicElement from "./Topic";

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
`;

const TopicsList = ({ topics }: Props) => {
  const [showTopics, setShowTopics] = useState(true);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);

  const handleShowTopicList = () => setShowTopics(true);

  const handleShowQuestionsList = (topic: Topic) => {
    setCurrentTopic(topic);
    setShowTopics(false);
  };

  const topicListItems = useMemo(() => {
    return topics.length ? (
      topics.map((topic, index) => (
        <TopicElement
          key={index}
          topic={topic}
          delay={index * 0.075}
          handleClick={handleShowQuestionsList}
        />
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

  const currentTopicQuestionItems = useMemo(() => {
    return currentTopic?.problems ? (
      currentTopic.problems.map((problem, i) => (
        <ProblemElement key={i} problem={problem} />
      ))
    ) : (
      <p>No problems available for this topic.</p>
    );
  }, [currentTopic]);

  return (
    <>
      <Typography
        variant="subtitle1"
        textAlign="left"
        borderBottom="4px solid #5030E5"
        paddingBottom={1}
        marginBottom={4}
        display="flex"
        alignItems="center"
        gap={1}
      >
        {showTopics && (
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "#5030E5",
            }}
          />
        )}
        {showTopics ? (
          "Topics"
        ) : (
          <>
            <IconButton size="small" onClick={handleShowTopicList}>
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
            {currentTopic?.title}
          </>
        )}
      </Typography>

      <div
        style={{
          height: "65vh",
          overflowY: "scroll",
          scrollbarWidth: "none",
        }}
      >
        <Stack spacing={2}>
          {showTopics ? topicListItems : <>{currentTopicQuestionItems}</>}
        </Stack>
      </div>
    </>
  );
};

export default TopicsList;
