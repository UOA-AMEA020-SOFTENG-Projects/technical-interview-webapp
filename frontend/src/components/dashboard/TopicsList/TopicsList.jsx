import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import { PieChart, Pie, Cell } from 'recharts';
import styles from "./TopicsList.module.css";

const TopicsList = ({ topics }) => {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("authToken");
  const [currentTopic, setCurrentTopic] = useState(null);
  const [topicsProgress, setTopicsProgress] = useState({});
  const [problemStatuses, setProblemStatuses] = useState({});
  const [recommendedStatuses, setRecommendedStatuses] = useState({});
  const [completedData, setCompletedData] = useState([]);

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

  useEffect(() => {
    const fetchCompletedData = async () => {
      const response = await fetch('http://localhost:3000/user/completed', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data,40);
      setCompletedData(data);
    };
  
    fetchCompletedData();
  }, [token]);
  

  const fetchRecommendationStatuses = async (problems) => {
    const statuses = {};
    for (let problem of problems) {
      const response = await fetch(
        `http://localhost:3000/problem/${problem._id}/recommended`,
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
      const response = await fetch(
        `http://localhost:3000/topic/${topicId}/progress`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
          `http://localhost:3000/problem/${problem._id}/status`,
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

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{ minWidth: "100rem", marginLeft: "5%", marginRight: "10%" }}>
      <Row xs={1} md={2} className="g-4 w-100">
        {topics.map((topic, index) => (
          <Col key={index}>
            <Card
              className={styles[`card-bg-${(index % 4) + 1}`]}
              style={{
                borderRadius: "5px",
                padding: "20px",
              }}
              onClick={() => handleShow(topic)}
            >
              <Card.Body>
                <Card.Title>{topic.title}</Card.Title>
                <Card.Text>
                  Length:
                  {topic.length === "short" ? (
                    <Badge bg="success" style={{ marginLeft: "0.4rem" }}>Short</Badge>
                  ) : topic.length === "medium" ? (
                    <Badge bg="warning" text="dark" style={{ marginLeft: "0.4rem" }}>
                      Medium
                    </Badge>
                  ) : (
                    <Badge bg="danger" style={{ marginLeft: "0.4rem" }}>Long</Badge>
                  )}
                </Card.Text>
  
                <Card.Text>{`Progress: ${
                  topicsProgress[topic._id]
                }%`}</Card.Text>
                <ProgressBar
                  animated
                  now={topicsProgress[topic._id]}
                  label={topicsProgress[topic._id]}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <PieChart width={500} height={500}>
        <Pie
          dataKey="problems"
          isAnimationActive={true}
          data={completedData}
          cx={300}
          cy={300}
          outerRadius={150}
          fill="#8884d8"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {completedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#3F51B5" : "#F44336"} />
          ))}
        </Pie>
      </PieChart>
  
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={styles.modalClass}
      >
        <Modal.Body style={{ backgroundColor: "#8FAC51", textAlign: "center" }}>
          <Modal.Title style={{ textAlign: "center", color: "white", fontSize: "1.75em" }}><b>{currentTopic?.title}</b></Modal.Title>
          <Button
            variant="outline-light"
            style={{ color: "white", marginTop: "1rem" }}
            className="mb-3"
            onClick={() =>
              navigateContentHandler(currentTopic._id, currentTopic.title)
            }
          >
            Content
          </Button>
          <p style={{ textAlign: "center", color: "white", marginTop: "2rem" }}><b>Problems</b></p>
          {currentTopic?.problems.length > 0 ? (
            currentTopic.problems.map((problem, i) => (
              <div key={i} className={styles["problem-container"]}>
                <div className={styles["problem-details"]}>
                  <Form.Check
                    type="checkbox"
                    checked={problemStatuses[problem._id]}
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
            <p style={{ color: "white" }}>No problems available for this topic.</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TopicsList;
