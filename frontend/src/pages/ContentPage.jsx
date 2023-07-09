import React from "react";
import { useLoaderData, redirect, json } from 'react-router-dom';
import TopicContent from "../components/content/TopicContent/TopicContent";

const ContentPage = () => {

  const content = useLoaderData();

  return (
    <div>
        <TopicContent content={content} />
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
  const searchTerm = url.searchParams.get("q");
  
  const topicId = params.topicId;

  const response = await fetch('http://localhost:3000/topic/' + topicId + "/content");

  if (!response.ok) {
      const err = await response.json();

      return json({ message: err.message }, { status: 500 });
  } else {
      const data = await response.json();

      console.log("content for topic: " + data);

      return data;
  }
}