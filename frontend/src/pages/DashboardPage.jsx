import React from "react";
import { useLoaderData, redirect, json } from "react-router-dom";
import TopicsList from "../components/dashboard/TopicsList/TopicsList";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

const DashboardPage = () => {
  const topics = useLoaderData();

  return (
    <div>
      <TopicsList topics={topics} />
    </div>
  );
};

export default DashboardPage;

export const loader = async ({ request, params }) => {
  const response = await fetch(`${BaseURL}/topic`);

  if (!response.ok) {
    const err = await response.json();

    return json({ message: err.message }, { status: 500 });
  } else {
    const data = await response.json();

    console.log("topics: " + data);

    return data;
  }
};
