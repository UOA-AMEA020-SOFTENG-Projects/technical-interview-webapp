import { Button, Stack } from "@mui/material";
import React, { useMemo, useState } from "react";

interface NavPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const NavPanel = ({ children, value, index }: NavPanelProps) => {
  return (
    <div hidden={value !== index} id={`vertical-tabpanel-${index}`}>
      {value === index && <>{children}</>}
    </div>
  );
};

interface SidenavProps {
  navHeadings: React.ReactElement[];
  navItems: React.ReactElement[];
}

const Sidenav = ({ navHeadings, navItems }: SidenavProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const navTabItems = useMemo((): React.ReactElement[] => {
    return navHeadings.map((heading, idx) => {
      return (
        <Button
          key={idx}
          sx={{
            padding: "0.5em 1em",
            paddingRight: "8em",
            bgcolor: idx === value ? "rgba(171, 205, 98, 0.2)" : "transparent",
            color: "#787486",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 2,
            ":hover": {
              backgroundColor: "rgba(171, 205, 98, 0.05)",
            },
          }}
          disableRipple
          onClick={(e) => handleChange(e, idx)}
        >
          {heading}
        </Button>
      );
    });
  }, [navHeadings, value]);

  const navPanelItems = useMemo(() => {
    return navItems.map((item, idx) => {
      return (
        <NavPanel key={idx} value={value} index={idx}>
          {item}
        </NavPanel>
      );
    });
  }, [navItems, value]);

  return (
    <div className="dashboard-sidenav">
      <Stack
        sx={{
          borderRight: 2,
          padding: "0 1em",
          borderColor: "divider",
          display: "flex",
          justifyContent: "stretch",
        }}
      >
        {navTabItems}
      </Stack>

      {navPanelItems}
    </div>
  );
};

export default Sidenav;
