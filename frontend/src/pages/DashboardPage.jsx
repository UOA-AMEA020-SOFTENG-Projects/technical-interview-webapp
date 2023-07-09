import React from "react";
import { useLoaderData, redirect, json } from 'react-router-dom';
import TopicsList from "../components/dashboard/TopicsList/TopicsList";

const DashboardPage = () => {

  const topics = useLoaderData();

  return (
    <div>
        <h1>Dashboard</h1>
        <TopicsList topics={topics}/>
    </div>
  );
};

export default DashboardPage;

export const loader = async ({ request, params }) => {


  const response = await fetch('http://localhost:3000/topic');

  if (!response.ok) {
      const err = await response.json();

      return json({ message: err.message }, { status: 500 });
  } else {
      const data = await response.json();

      console.log("topics: " + data);

      return data;
  }
}