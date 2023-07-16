import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import styles from "./TopicsList.module.css";

const TopicsList = ({ topics }) => {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("authToken");
  const [currentTopic, setCurrentTopic] = useState(null);
  const [topicsProgress, setTopicsProgress] = useState({});
  const [problemStatuses, setProblemStatuses] = useState({});

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = (topic) => {
    setCurrentTopic(topic);
    setShow(true);
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
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row xs={1} md={2} className="g-4 w-60">
        {topics.map((topic, index) => (
          <Col key={index}>
            <Card
              className="h-100 text-white"
              style={{
                borderRadius: "5px",
                backgroundColor: "#8FAC51",
                padding: "20px",
              }}
              onClick={() => handleShow(topic)}
            >
              <Card.Body>
                <Card.Title>{topic.title}</Card.Title>
                <Card.Text>{`Length: ${topic.length}`}</Card.Text>
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

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{currentTopic?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="primary"
            className="mb-3"
            onClick={() =>
              navigateContentHandler(currentTopic._id, currentTopic.title)
            }
          >
            Content
          </Button>
          {currentTopic?.problems.map((problem, i) => (
            <div key={i} className={styles["problem-container"]}>
              <Form.Check
                type="checkbox"
                checked={problemStatuses[problem._id]}
                disabled
                style={{ marginRight: "10px" }} // Add some margin to the right of the checkbox
              />
              <Link to={`/home/problem/${problem._id}`}>
                <p style={{ marginBottom: "0px", fontSize: "1.25em" }}>{problem.title}</p>{" "}
              </Link>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TopicsList;
