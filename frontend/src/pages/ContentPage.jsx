import React from "react";
import { useLoaderData, redirect, json } from 'react-router-dom';
import TopicContent from "../components/content/TopicContent/TopicContent";

const ContentPage = () => {

  const data = useLoaderData();

  console.log(data,9)

  return (
    <div>
        <TopicContent content={data.content} topicName={data.topicName} />
    </div>
  );
};

export default ContentPage;

/**
 * function loader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");
  return searchProducts(searchTerm);
}
 */

export const loader = async ({ request, params }) => {

  // getting hte topic name through query param: 
  const url = new URL(request.url);
  const topicName = url.searchParams.get("title");
  
  const topicId = params.topicId;

  const response = await fetch('http://localhost:3000/topic/' + topicId + "/content");

  if (!response.ok) {
      const err = await response.json();

      return json({ message: err.message }, { status: 500 });
  } else {
      const content = await response.json();

      console.log("content for topic: " + content);

      return {
        content, 
        topicName
      };
  }
}