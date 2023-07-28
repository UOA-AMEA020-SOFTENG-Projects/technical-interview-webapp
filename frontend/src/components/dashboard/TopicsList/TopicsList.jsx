import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Modal, Button, ListGroup } from "react-bootstrap";
import { PieChart, Pie, Cell } from "recharts";
import styles from "./TopicsList.module.css";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

const TopicsList = ({ topics }) => {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("authToken");
  const [currentTopic, setCurrentTopic] = useState(null);
  const [topicsProgress, setTopicsProgress] = useState({});
  const [problemStatuses, setProblemStatuses] = useState({});
  const [recommendedStatuses, setRecommendedStatuses] = useState({});
  const [completedData, setCompletedData] = useState([]);
  const [recommendedProblems, setRecommendedProblems] = useState([]);

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
      const response = await fetch(`${BaseURL}/user/completed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data, 40);
      setCompletedData(data);
    };

    fetchCompletedData();
  }, [token]);

  useEffect(() => {
    const fetchRecommendedProblems = async () => {
      const response = await fetch(
        `${BaseURL}/user/recommended-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setRecommendedProblems(data);
    };

    fetchRecommendedProblems();
  }, [token]);

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
      const response = await fetch(
        `${BaseURL}/topic/${topicId}/progress`,
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

  return (
    <>
      <h1 style={{ marginTop: "20vh" }}>
        <b>Dashboard</b>
      </h1>
      <Container
        className="d-flex align-items-center min-vw-100"
        style={{ marginLeft: "30rem", marginBottom: "5rem" }}
      >
        <Row className="g-4 w-200">
          <Col xs={12} md={6}>
            <Row xs={1} md={2} className="g-4 w-200">
              {topics.map((topic, index) => (
                <Col key={index}>
                  <Card
                    className={styles[`card-bg-${(index % 4) + 1}`]}
                    style={{
                      borderRadius: "5px",
                      padding: "30px 50px",
                    }}
                    onClick={() => handleShow(topic)}
                  >
                    <Card.Body>
                      <Card.Title>{topic.title}</Card.Title>
                      <Card.Text>
                        Length:
                        {topic.length === "short" ? (
                          <Badge bg="success" style={{ marginLeft: "0.4rem" }}>
                            Short
                          </Badge>
                        ) : topic.length === "medium" ? (
                          <Badge
                            bg="warning"
                            text="dark"
                            style={{ marginLeft: "0.4rem" }}
                          >
                            Medium
                          </Badge>
                        ) : (
                          <Badge bg="danger" style={{ marginLeft: "0.4rem" }}>
                            Long
                          </Badge>
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
          </Col>
          <Col
            xs={12}
            md={6}
            className="d-flex flex-column align-items-center w-25"
          >
            <div>
              <h3>
                <b>Problems attempted by you</b>
              </h3>
            </div>
            <PieChart width={700} height={500} style={{ marginLeft: "7rem" }}>
              <Pie
                dataKey="problems"
                isAnimationActive={true}
                data={completedData}
                outerRadius={150}
                fill="#8884d8"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {completedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? "#1d0320" : "#380e0e"}
                  />
                ))}
              </Pie>
            </PieChart>
            <div
              style={{
                marginTop: "2rem",
                overflow: "auto",
                maxHeight: "24.0rem",
                height: "24.0rem",
                width: "30rem",
                padding: "15px 5px", 
                border: "1px solid", 
                borderRadius: "5px", 
                backgroundColor: "darkgray", 
                marginLeft: "5rem", 
              }}
            >
              <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
                <b>Recommended Problems</b>
              </h3>
              <ListGroup>
                {recommendedProblems.length !== 0 ? recommendedProblems.map((problem, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    onClick={() => navigate(`/home/problem/${problem._id}`)}
                    style={{ backgroundColor: "#5A5A5A", color: "white"}}
                  >
                    {problem.title}
                  </ListGroup.Item>
                )) : <p style={{ textDecoration: "underline", textAlign: "center", paddingTop: "10px"}}>No more problems specifically recommended for you. Please work on other problems.</p>}
              </ListGroup>
            </div>
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
                navigateContentHandler(currentTopic._id, currentTopic.title)
              }
            >
              Content
            </Button>
            <p
              style={{ textAlign: "center", color: "white", marginTop: "2rem" }}
            >
              <b>Problems</b>
            </p>
            {currentTopic?.problems.length > 0 ? (
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
    </>
  );
};

export default TopicsList;
