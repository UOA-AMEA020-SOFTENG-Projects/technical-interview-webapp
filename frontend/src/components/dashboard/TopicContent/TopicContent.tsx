import React, { useEffect, useState } from "react";
import styles from "./TopicContent.module.css";
import { Content } from "@/types";
import { Card, CardContent, Typography } from "@mui/material";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

interface Props {
  contentId: string;
}

const TopicContent = ({ contentId }: Props) => {
  const [content, setContent] = useState<Content>();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${BaseURL}/content/${contentId}`);

        if (!response.ok) {
          console.error("Could not fetch content: ", response.statusText);
          return;
        } else {
          const data = await response.json();
          setContent(data);
        }
      } catch (err) {
        console.error("Error while fetching: ", err);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className={styles.container}>
      <Card className={styles.card} variant="outlined">
        <CardContent>
          <Typography>
            {content?.primaryDescription}
            <br />
            <br />
            {content?.secondaryDescription}
          </Typography>
          <div className={styles.video}>
            <iframe
              className="embed-responsive-item"
              src={content?.videoURL}
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>
          <h5 className="mt-4">Code example:</h5>
          <div className={styles.codeContainer}>
            <pre>
              <code className={styles.code}>{content?.code}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopicContent;
