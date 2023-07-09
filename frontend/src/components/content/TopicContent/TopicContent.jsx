import React from "react";

const TopicContent = ({ content, topicName }) => {
  
    return (
    <>
        <div>
            <h1>{topicName}</h1>
        </div>
        <div>
            <p>{content.primaryDescription}</p>
        </div>
        {content.secondaryDescription && (<p>{content.secondaryDescription}</p>)}
        <div>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/1xhahDwbsN8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </>
    );
};

export default TopicContent;
