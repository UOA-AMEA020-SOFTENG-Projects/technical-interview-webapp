import React from "react";
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import styles from "./QuestionnaireForm.module.css";

const QuestionnaireForm = ({ questions }) => {

    console.log(questions[0].image, 7);


  return (
    <Container className={styles.container} style={{ marginTop: "30vh" }}>
      <Row>
        <Col className="d-flex justify-content-center">
          <div className={styles.formContainer}>
            <h2 className="text-center"><b>Questionnaire</b></h2>
            <Form>
              {questions.map((question, index) => (
                <Card className={`mb-4 ${styles.customCard}`} key={index}>
                  <Card.Body className={styles.cardBody}>
                    <Card.Text className={styles.cardText}>
                      {question.questionContent}
                    </Card.Text>
                    <div className={styles.cardContent}>
                      <div className={styles.responsesContainer}>
                        {question.responses.map((response, i) => (
                          <Form.Check 
                            custom
                            type="radio"
                            id={`${question._id}-${i}`}
                            label={response}
                            name={`group-${question._id}`}
                            key={i}
                            className={styles.customCheck}
                            style={{ marginBottom: "1rem"}}
                          />
                        ))}
                      </div>
                      {question.image && 
                        <Card.Img variant="bottom" src={`http://localhost:3000/${question.image}`} alt={question.questionContent} className={styles.cardImage} />
                      }
                    </div>
                  </Card.Body>
                </Card>
              ))}
              <Button variant="primary" type="submit" className={styles.customButton}>Submit</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionnaireForm;
