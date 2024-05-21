import "./DashboardPage.css";
import Sidenav from "../../components/dashboard/Sidenav";
import HomePage from "./HomePage";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { Typography } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useEffect, useState } from "react";
import { Topic } from "@/types";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

const DashboardPage = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

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

    const timer = setTimeout(() => {
      fetchTopics();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const navItems = [<HomePage topics={topics} />, <div>2 </div>, <div>3 </div>];
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
