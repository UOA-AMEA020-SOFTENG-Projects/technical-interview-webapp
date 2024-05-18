import { useState, useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
        <Card key={i} variant="outlined">
          <Link to={`/home/problem/${problem._id}`}>
            <p style={{ fontSize: "1.25em" }}>{problem.title}</p>
          </Link>
        </Card>
      ))
    ) : (
      <p style={{ color: "white" }}>No problems available for this topic.</p>
    );
  }, [currentTopic]);

  return (
    <Stack spacing={2}>
      {showTopics ? (
        topicListItems
      ) : (
        <>
          <button onClick={handleShowTopicList}>back</button>
          {currentTopicQuestionItems}
        </>
      )}
    </Stack>
  );
};

export default TopicsList;
