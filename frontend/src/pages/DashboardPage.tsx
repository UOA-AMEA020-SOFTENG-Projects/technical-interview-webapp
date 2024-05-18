import React from "react";
import { useLoaderData, json } from "react-router-dom";
import TopicsList from "../components/dashboard/TopicsList/TopicsList";
import { Grid, Typography } from "@mui/material";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

interface Problem {
  _id: string;
  title: string;
}

interface Topic {
  _id: string;
  title: string;
  problems: Problem[];
}

const DashboardPage = () => {
  const topics = useLoaderData() as Topic[];

  return (
    <Grid container direction="row">
      <Typography variant="h3"> Welcome Back</Typography>
      <TopicsList topics={topics} />
    </Grid>
  );
};

export default DashboardPage;

export const loader = async () => {
  const response = await fetch(`${BaseURL}/topic`);

  if (!response.ok) {
    const err = await response.json();

    return json({ message: err.message }, { status: 500 });
  } else {
    const data = await response.json();

    return data;
  }
};
