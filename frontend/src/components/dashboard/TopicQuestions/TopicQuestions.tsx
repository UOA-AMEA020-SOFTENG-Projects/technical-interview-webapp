import { Button, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "../TopicsList/TopicsList.module.css";

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
  show: boolean;
  handleClose: () => void;
  currentTopic: Topic | null;
  problemStatuses: Record<string, boolean>;
  recommendedStatuses: Record<string, boolean>;
}

const TopicQuestions = ({
  show,
  handleClose,
  currentTopic,
  problemStatuses,
  recommendedStatuses,
}: Props) => {
  const navigate = useNavigate();

  const navigateContentHandler = (
    topicId: string | undefined,
    title: string | undefined
  ) => {
    navigate(`/home/content/${topicId}?title=${title}`);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{ backgroundColor: "#8FAC51", textAlign: "center" }}>
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
        <p style={{ textAlign: "center", color: "white", marginTop: "2rem" }}>
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
  );
};

export default TopicQuestions;
