import React from "react";
import { Container, Card } from "react-bootstrap";
import styles from "./TopicContent.module.css";


const TopicContent = ({ content, topicName }) => {
    return (
        <Container className={styles.container}>
            <Card className={styles.card}>
                <h1 className={`text-center ${styles.heading}`}>{topicName}</h1>
                <Card.Body>
                    <Card.Text>{content.primaryDescription}</Card.Text>
                    {content.secondaryDescription && <Card.Text>{content.secondaryDescription}</Card.Text>}
                    <div className={styles.video} style={{ marginTop: "2.5rem", marginBottom: "3.5rem" }}>
                        <iframe className="embed-responsive-item" src={content.videoURL} title="YouTube video player" allowFullScreen></iframe>
                    </div>
                    <h5 className="mt-4">Code example:</h5>
                    <div className={styles.codeContainer}>
                        <pre>
                            <code className={styles.code}>
                                {content.code}
                            </code>
                        </pre>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default TopicContent;
