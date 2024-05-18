import React, { useState, useEffect, useMemo } from "react";
import { Col } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography } from "@mui/material";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

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
  const [show, setShow] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [topicsProgress, setTopicsProgress] = useState<Record<string, number>>(
    {}
  );
  const [problemStatuses, setProblemStatuses] = useState<
    Record<string, boolean>
  >({});
  const [recommendedStatuses, setRecommendedStatuses] = useState<
    Record<string, boolean>
  >({});

  const token = localStorage.getItem("authToken");

  const handleClose = () => setShow(false);

  const handleShow = async (topic: Topic) => {
    setCurrentTopic(topic);
    const recommendedStatuses = await fetchRecommendationStatuses(
      topic.problems
    );
    setRecommendedStatuses(recommendedStatuses);
    setShow(true);
  };

  const fetchRecommendationStatuses = async (problems: Problem[]) => {
    const statuses: Record<string, boolean> = {};
    for (let problem of problems) {
      const response = await fetch(
        `${BaseURL}/problem/${problem._id}/recommended`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      statuses[problem._id] = data.isRecommended;
    }
    return statuses;
  };

  useEffect(() => {
    const fetchProgress = async (topicId: string) => {
      const response = await fetch(`${BaseURL}/topic/${topicId}/progress`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data.progress;
    };

    topics.forEach(async (topic) => {
      const progress = await fetchProgress(topic._id);
      setTopicsProgress((prev) => ({ ...prev, [topic._id]: progress }));
    });
  }, [topics, token]);

  useEffect(() => {
    const fetchProblemStatuses = async () => {
      const statuses: Record<string, boolean> = {};
      for (let problem of currentTopic?.problems || []) {
        const response = await fetch(
          `${BaseURL}/problem/${problem._id}/status`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        statuses[problem._id] = data.completed;
      }
      setProblemStatuses(statuses);
    };

    fetchProblemStatuses();
  }, [show, token, currentTopic]);

  const topicListItems = useMemo(() => {
    return topics.map((topic, index) => (
      <Card
        style={{
          borderRadius: "10px",
          cursor: "pointer",
        }}
        onClick={() => handleShow(topic)}
        key={index}
      >
        <CardContent>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="div">
              {topic.title}
            </Typography>
            <p>{`${topicsProgress[topic._id]}%`}</p>
          </Box>

          <LinearProgress
            style={{
              padding: "0.5em 0",
              borderRadius: "5px",
              backgroundColor: "transparent",
              border: "1px solid black",
            }}
            variant="determinate"
            value={topicsProgress[topic._id]}
          />
        </CardContent>
      </Card>
    ));
  }, [topics]);

  return <div>{topicListItems}</div>;
};

export default TopicsList;
