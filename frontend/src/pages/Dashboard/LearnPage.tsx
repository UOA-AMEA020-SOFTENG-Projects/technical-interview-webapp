import { Topic } from "@/types";
import React, { useCallback, useMemo, useState } from "react";
import TopicElement from "../../components/dashboard/Topic";
import TopicContent from "../../components/content/TopicContent/TopicContent";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface Props {
  topics: Topic[];
}

const LearnPage = ({ topics }: Props) => {
  const [showContent, setShowContent] = useState(false);
  const [currentTopic, setCurrentTopic] = useState({
    contentId: "",
    topicName: "",
  });

  const handleTopicCardClick = (topic: Topic) => {
    setCurrentTopic({ contentId: topic.content, topicName: topic.title });
    setShowContent(true);
  };

  const toggleShowContent = useCallback(() => {
    setShowContent((prev) => !prev);
  }, []);

  const topicListItems = useMemo(() => {
    return topics.map((topic, index) => (
      <TopicElement
        topic={topic}
        delay={index * 0.02}
        key={index}
        cardcolor="#f5f5f5"
        handleClick={handleTopicCardClick}
      />
    ));
  }, [topics]);

  return (
    <div className="learn-page-cont">
      {showContent ? (
        <>
          <IconButton size="small" onClick={toggleShowContent}>
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
          <Typography variant="h4">{currentTopic.topicName}</Typography>
          <TopicContent contentId={currentTopic.contentId} />
        </>
      ) : (
        topicListItems
      )}
    </div>
  );
};

export default LearnPage;
