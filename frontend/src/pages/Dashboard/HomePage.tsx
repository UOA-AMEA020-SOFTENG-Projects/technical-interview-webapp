import RecommendedProblems from "../../components/dashboard/RecommendedProblems";
import Statistics from "../../components/dashboard/Statistics";
import TopicsList from "../../components/dashboard/TopicsList";
import { Typography } from "@mui/material";

interface Problem {
  _id: string;
  title: string;
}

interface Topic {
  _id: string;
  title: string;
  problems: Problem[];
}

interface Props {
  topics: Topic[];
}

const HomePage = ({ topics }: Props) => {
  return (
    <div className="home-page">
      <div>
        <Typography variant="h3">Welcome Back</Typography>
        <div className="home-cols">
          <div className="home-col">
            <TopicsList topics={topics} />
          </div>
          <div className="home-col">
            <RecommendedProblems />
          </div>
          <div className="home-col">
            <Statistics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
