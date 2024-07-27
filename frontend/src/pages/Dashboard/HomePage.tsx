import { Topic } from "@/types";
import RecommendedProblems from "../../components/dashboard/RecommendedProblems";
import Statistics from "../../components/dashboard/Statistics";
import TopicsList from "../../components/dashboard/TopicsList";
import { Typography } from "@mui/material";

const FEATURE_FLAG_RECOMMENDED_PROBLEMS = true;

interface Props {
  topics: Topic[];
}

const HomePage = ({ topics }: Props) => {
  return (
    <div className="home-page">
      <div>
        <Typography variant="h3" sx={{ marginBottom: "0.3em" }}>
          Welcome Back
        </Typography>
        <div className="home-cols">
          <div className="home-col">
            <TopicsList topics={topics} />
          </div>
          {FEATURE_FLAG_RECOMMENDED_PROBLEMS && (
            <div className="home-col">
              <RecommendedProblems />
            </div>
          )}
          <div className="home-col">
            <Statistics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
