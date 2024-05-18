import { useLoaderData, json } from "react-router-dom";
import TopicsList from "../../components/dashboard/TopicsList";
import RecommendedProblems from "../../components/dashboard/RecommendedProblems";
import { Typography } from "@mui/material";
import "./DashboardPage.css";
import Statistics from "../../components/dashboard/Statistics";

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
    <div className="dashboards-page">
      <Typography variant="h3">Welcome Back</Typography>
      <div className="dashboard-cols">
        <div className="dashboard-col">
          <TopicsList topics={topics} />
        </div>
        <div className="dashboard-col">
          <RecommendedProblems />
        </div>
        <div className="dashboard-col">
          <Statistics />
        </div>
      </div>
    </div>
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
