import { Box, Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import SettingSidebar from "./SettingSidebar";
import Profile from "../SettingsPages/Profile";
import BasicInfo from "../SettingsPages/BasicInfo";
import ProjectsInfo from "../SettingsPages/ProjectsInfo";
import Skills from "../SettingsPages/Skills";
import Experience from "../SettingsPages/Experience";
import Education from "../SettingsPages/Education";
import OtherInfo from "../SettingsPages/OtherInfo";

const SettingLayout = () => {
  return (
    <>
    {/* <Box>settings</Box> */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          ml: 12,
          // flexDirection:"column",
          width: "fit-content",
          borderRadius: "4px",
          overflow: "hidden",
          border: "1px solid #eee",
          bgcolor: "#fff",
        }}
      >
        <SettingSidebar />

        <Box sx={{ flex: 1, p: 4 }}>
          <Routes>
            {/* /settings */}
            <Route index element={<Profile />} />

            {/* /settings/profile */}
            <Route path="profile" element={<Profile />} />
            <Route path="profile/basic-info" element={<BasicInfo />} />
            <Route path="profile/projects" element={<ProjectsInfo />} />
            <Route path="profile/skills" element={<Skills />} />
            <Route path="profile/experience" element={<Experience />} />
            <Route path="profile/education" element={<Education />} />
            <Route path="profile/other-info" element={<OtherInfo />} />
          </Routes>
        </Box>
      </Paper>
    </>
  );
};

export default SettingLayout;
