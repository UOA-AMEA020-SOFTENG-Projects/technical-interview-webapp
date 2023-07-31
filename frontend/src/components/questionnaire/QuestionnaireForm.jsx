import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import styles from "./QuestionnaireForm.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

const QuestionnaireForm = ({ questions }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [key, setKey] = useState(0); // new state to trigger unselect radio buttons
  const [shouldSubmit, setShouldSubmit] = useState(false); // add this state

  useEffect(() => {
    setKey(Math.random()); // changes key to trigger re-rendering of the Form.Check
  }, [currentQuestionIndex]);

  const handleResponseChange = (questionId, selectedResponse) => {
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find(
        (answer) => answer.questionId === questionId
      );
      if (existingAnswer) {
        return prevAnswers.map((answer) =>
          answer.questionId === questionId
            ? { ...answer, selectedResponse }
            : answer
        );
      } else {
        return [...prevAnswers, { questionId, selectedResponse }];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if shouldSubmit is false, do nothing
    if (!shouldSubmit) return;

    // Check that all questions have been answered
    if (answers.length < questions.length) {
      console.log(47);

      toast.error("Please answer all questions before submitting.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }

    console.log(answers, 26);

    const response = await fetch(`${BaseURL}/question/submit-answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(answers),
    });

    if (!response.ok) {
      console.log(70);

      toast.error("Error submitting your answers. Please try again.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }

    console.log(78);
    toast.success("Answers submitted successfully!", {
      position: toast.POSITION.BOTTOM_CENTER,
    });

    // redirect the user to the dashboard
    navigate("/home/dashboard");
  };

  const handleNext = () => {
    setShouldSubmit(false); // set shouldSubmit to false
    setCurrentQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
  };

  const handlePrev = () => {
    setShouldSubmit(false); // set shouldSubmit to false
    setCurrentQuestionIndex((prevQuestionIndex) => prevQuestionIndex - 1);
  };

  const handleButtonClick = () => {
    setShouldSubmit(true); // set shouldSubmit to true when the 'Submit' button is clicked
  };

  const question = questions[currentQuestionIndex];

  return (
    <>
      <Container style={{ paddingTop: "100px" }} className={styles.container}>
        <Row>
          <Col>
            <div className={styles.formContainer}>
              <Form onSubmit={handleSubmit} key={key}>
                <Card className={`mb-4 ${styles.customCard}`}>
                  <Card.Body className={styles.cardBody}>
                    <Card.Text className={styles.cardText} style={{ marginBottom: "5rem"}}>
                      <h2 className={styles.desc} style={{ marginBottom: "1.5rem"}}>
                        <b>Questionnaire</b>
                      </h2>
                      <p className={styles.desc}>
                        Please answer the following questions to the best of
                        your ability so that we can customize the learning
                        material to your needs.
                      </p>
                    </Card.Text>
                    <Card.Text style={{ fontSize: "1.5em" }}>
                      <b>Q). {question.questionContent}</b>
                    </Card.Text>
                    {question.image && (
                      <Card.Img
                        variant="bottom"
                        src={`${BaseURL}/${question.image}`}
                        alt={question.questionContent}
                        className={styles.cardImage}
                      />
                    )}
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
                          style={{ marginBottom: "1rem" }}
                          onChange={() =>
                            handleResponseChange(question._id, response)
                          }
                        />
                      ))}
                    </div>
                  </Card.Body>
                </Card>
                <Button
                  variant="secondary"
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  style={{ marginBottom: "0.5rem" }}
                >
                  Previous
                </Button>
                {currentQuestionIndex < questions.length - 1 ? (
                  <Button variant="primary" type="button" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleButtonClick}
                    className={styles.customButton}
                  >
                    Submit
                  </Button>
                )}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default QuestionnaireForm;
