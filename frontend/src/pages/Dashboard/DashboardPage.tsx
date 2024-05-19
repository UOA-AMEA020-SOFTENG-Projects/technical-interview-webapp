import { useLoaderData, json } from "react-router-dom";
import "./DashboardPage.css";
import Sidenav from "../../components/dashboard/Sidenav";
import HomePage from "./HomePage";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { Typography } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

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
