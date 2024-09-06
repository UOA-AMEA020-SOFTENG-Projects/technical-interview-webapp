import { Topic } from "@/types";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Typography } from "@mui/material";
import { useStatsigClient, useStatsigUser } from "@statsig/react-bindings";
import { useEffect, useState } from "react";
import Sidenav from "../../components/dashboard/Sidenav";
import "./DashboardPage.css";
import HomePage from "./HomePage";
import LearnPage from "./LearnPage";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

const DashboardPage = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  const { client } = useStatsigClient();
  const { updateUserAsync } = useStatsigUser();

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    updateUserAsync({ userID: userName ?? "1234" });
  }, []);

  const SHOW_SR_RECOMMENDATIONS = client
    .getExperiment("sr_for_coding_interviews")
    .get("show_sr_recommendations", false);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(`${BaseURL}/topic`);

        if (!response.ok) {
          console.error("Could not fetch topics: ", response.statusText);
          return;
        } else {
          const data = await response.json();
          setTopics(data);
        }
      } catch (err) {
        console.error("Could not fetch topics: ", err);
      }
    };

    // This is for skeletons
    const timer = setTimeout(() => {
      fetchTopics();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    <HomePage
      topics={topics}
      SHOW_SR_RECOMMENDATIONS={SHOW_SR_RECOMMENDATIONS}
    />,
    <LearnPage topics={topics}></LearnPage>,
    <div>3 </div>,
  ];
  const navHeadinds = [
    <>
      <GridViewOutlinedIcon />
      <Typography variant="overline">Home</Typography>
    </>,
    <>
      <LightbulbOutlinedIcon />
      <Typography variant="overline">Learn</Typography>
    </>,
    <>
      <SettingsOutlinedIcon />
      <Typography variant="overline">Settings</Typography>
    </>,
  ];

  return (
    <div className="dashboards-page">
      <Sidenav navItems={navItems} navHeadings={navHeadinds} />
    </div>
  );
};

export default DashboardPage;
