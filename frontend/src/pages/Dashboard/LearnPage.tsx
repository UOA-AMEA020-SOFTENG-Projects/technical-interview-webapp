import { Topic } from "@/types";
import React, { useMemo } from "react";
import TopicElement from "../../components/dashboard/Topic";

interface Props {
  topics: Topic[];
}

const LearnPage = ({ topics }: Props) => {
  const topicListItems = useMemo(() => {
    return topics.map((topic, index) => (
      <TopicElement
        topic={topic}
        delay={index * 0.02}
        key={index}
        cardcolor="#f5f5f5"
        handleClick={() => console.log("navigate to content")}
      />
    ));
  }, [topics]);

  return <div className="learn-page-cont">{topicListItems}</div>;
};

export default LearnPage;
