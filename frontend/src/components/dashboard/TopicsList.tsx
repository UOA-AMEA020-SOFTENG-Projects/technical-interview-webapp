import { useState, useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { IconButton, Stack, Typography } from "@mui/material";
import ProblemElement from "./Problem";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface Problem {
  _id: string;
  title: string;
}

interface Topic {
  _id: string;
  title: string;
  problems: Problem[];
}

interface Props {
  topics: Topic[];
}

const TopicsList = ({ topics }: Props) => {
  const [showTopics, setShowTopics] = useState(true);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);

  const handleShowTopicList = () => setShowTopics(true);

  const handleShowQuestionsList = (topic: Topic) => {
    setCurrentTopic(topic);
    setShowTopics(false);
  };

  const topicListItems = useMemo(() => {
    return topics.map((topic, index) => (
      <Card
        variant="outlined"
        style={{
          borderRadius: "10px",
          cursor: "pointer",
          borderWidth: 0,
        }}
        onClick={() => handleShowQuestionsList(topic)}
        key={index}
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
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem,
            ab!
          </Typography>
        </CardContent>
      </Card>
    ));
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
          height: "70vh",
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
