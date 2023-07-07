import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';

const TopicsList = ({ topics }) => {
  const [show, setShow] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (topic) => {
    setCurrentTopic(topic);
    setShow(true);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row xs={1} md={2} className="g-4 w-60">
        {topics.map((topic, index) => (
          <Col key={index}>
            <Card 
              className="h-100 text-white" 
              style={{ 
                  borderRadius: '5px', 
                  backgroundColor: '#8FAC51', 
                  padding: '20px'
              }}
              onClick={() => handleShow(topic)}
            >
              <Card.Body>
                <Card.Title>{topic.title}</Card.Title>
                <Card.Text>{`Length: ${topic.length}`}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentTopic?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" className="mb-3">Content</Button>
          {currentTopic?.problems.map((problem, i) => (
            <p key={i}>{problem.title}</p>
          ))}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TopicsList;
