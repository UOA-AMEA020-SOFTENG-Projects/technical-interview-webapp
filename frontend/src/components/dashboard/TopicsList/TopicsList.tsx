import React, { useState, useEffect, useMemo } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Modal, Button, ListGroup } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "./TopicsList.module.css";
import { Box, CardHeader, Typography } from "@mui/material";
import RecommendedProblems from "../RecommendedProblems/RecommendedProblems";
import Statistics from "../Statistics/Statistics";

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

const TopicsList = ({ topics }) => {
  const [show, setShow] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [topicsProgress, setTopicsProgress] = useState({});
  const [problemStatuses, setProblemStatuses] = useState({});
  const [recommendedStatuses, setRecommendedStatuses] = useState({});

  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleShow = async (topic) => {
    setCurrentTopic(topic);
    const recommendedStatuses = await fetchRecommendationStatuses(
      topic.problems
    );
    setRecommendedStatuses(recommendedStatuses);
    setShow(true);
  };

  const fetchRecommendationStatuses = async (problems) => {
    const statuses = {};
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

  const navigateContentHandler = (topicId, title) => {
    navigate(`/home/content/${topicId}?title=${title}`);
  };

  useEffect(() => {
    const fetchProgress = async (topicId) => {
      const response = await fetch(`${BaseURL}/topic/${topicId}/progress`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data.progress, 31);
      return data.progress;
    };

    topics.forEach(async (topic) => {
      const progress = await fetchProgress(topic._id);
      setTopicsProgress((prev) => ({ ...prev, [topic._id]: progress }));
    });
  }, [topics, token]);

  useEffect(() => {
    const fetchProblemStatuses = async () => {
      const statuses = {};
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
      <Col key={index}>
        <Card
          style={{
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleShow(topic)}
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
              }}
              variant="determinate"
              value={topicsProgress[topic._id]}
            />
          </CardContent>
        </Card>
      </Col>
    ));
  }, [topics]);

  return (
    <div className={styles.megaContainer}>
      <Container
        className={`d-flex align-items-center min-vw-100 mt-5 mb-5 ${styles.containerPadding}`}
      >
        <Row className="g-4">
          <Typography variant="h3"> Welcome Back</Typography>
          <Col xs={12} md={6}>
            <Row xs={1} md={2} className="g-4">
              {topicListItems}
            </Row>
          </Col>
          <Col xs={12} md={6} className="d-flex flex-column align-items-center">
            <Statistics />
            <RecommendedProblems />
          </Col>
        </Row>

        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className={styles.modalClass}
        >
          <Modal.Body
            style={{ backgroundColor: "#8FAC51", textAlign: "center" }}
          >
            <Modal.Title
              style={{
                textAlign: "center",
                color: "white",
                fontSize: "1.75em",
              }}
            >
              <b>{currentTopic?.title}</b>
            </Modal.Title>
            <Button
              variant="outline-light"
              style={{ color: "white", marginTop: "1rem" }}
              className="mb-3"
              onClick={() =>
                navigateContentHandler(currentTopic?._id, currentTopic?.title)
              }
            >
              Content
            </Button>
            <p
              style={{ textAlign: "center", color: "white", marginTop: "2rem" }}
            >
              <b>Problems</b>
            </p>
            {currentTopic?.problems.length ? (
              currentTopic.problems.map((problem, i) => (
                <div key={i} className={styles["problem-container"]}>
                  <div className={styles["problem-details"]}>
                    <Form.Check
                      type="checkbox"
                      checked={problemStatuses[problem._id] ?? false}
                      disabled
                      style={{ marginRight: "10px" }}
                    />
                    <Link to={`/home/problem/${problem._id}`}>
                      <p style={{ marginBottom: "0px", fontSize: "1.25em" }}>
                        {problem.title}
                      </p>
                    </Link>
                  </div>
                  {recommendedStatuses[problem._id] && (
                    <p
                      style={{
                        color: "#960000",
                        fontWeight: "bold",
                        marginBottom: "0px",
                        fontSize: "1em",
                      }}
                    >
                      Recommended for You
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p style={{ color: "white" }}>
                No problems available for this topic.
              </p>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default TopicsList;
