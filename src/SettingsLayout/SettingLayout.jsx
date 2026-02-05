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
import PersonalInfo from "../SettingsPages/PersonalInfo ";

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
            <Route index element={<PersonalInfo />} />

            {/* /settings/profile */}
            <Route path="PersonalInfo" element={<PersonalInfo />} />
            <Route path="PersonalInfo/basic-info" element={<BasicInfo />} />
            <Route path="PersonalInfo/projects" element={<ProjectsInfo />} />
            <Route path="PersonalInfo/skills" element={<Skills />} />
            <Route path="PersonalInfo/experience" element={<Experience />} />
            <Route path="PersonalInfo/education" element={<Education />} />
            <Route path="PersonalInfo/other-info" element={<OtherInfo />} />
          </Routes>
        </Box>
      </Paper>
    </>
  );
};

export default SettingLayout;
