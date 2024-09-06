import { Topic } from "@/types";
import { Typography } from "@mui/material";
import RecommendedProblems from "../../components/dashboard/RecommendedProblems";
import Statistics from "../../components/dashboard/Statistics";
import TopicsList from "../../components/dashboard/TopicsList";

interface Props {
  topics: Topic[];
  SHOW_SR_RECOMMENDATIONS?: boolean;
}

const HomePage = ({ topics, SHOW_SR_RECOMMENDATIONS = false }: Props) => {
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
          {SHOW_SR_RECOMMENDATIONS && (
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
