import { NavLink } from "react-router-dom";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RocketOutlinedIcon from "@mui/icons-material/RocketOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import SchoolIcon from "@mui/icons-material/School";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";

const SettingSidebar = () => {
  const linkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "#f5f5f5" : "transparent",
    borderRadius: "8px",
    // marginBottom: "0px",
  });
  return (
    <>
      <Box
        sx={{
          width: 240,
          p: 2,
          pt: 8,
          bgcolor: "#fff",
          borderRight: "1px solid #eee",
          minHeight: "100vh",
        }}
      >
        <Typography variant="body3" sx={{ px: 1, mb: 1, letterSpacing: 1.5 }}>
          Settings
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {/* <List> */}
        <ListItemButton
          component={NavLink}
          to="/settings/PersonalInfo"
          end
          style={linkStyle}
        >
          <PersonOutlinedIcon  sx={{mr:1}}/>
          <ListItemText primary="Personal Information" />
        </ListItemButton>
        {/* </List> */}
        {/* <List> */}
        <ListItemButton
          component={NavLink}
          to="/settings/PersonalInfo/basic-info"
          style={linkStyle}
        >
          <InfoOutlinedIcon sx={{mr:1}} />
          <ListItemText primary="Basic Information" />
        </ListItemButton>
        {/* </List> */}
        <ListItemButton
          component={NavLink}
          to="/settings/PersonalInfo/projects"
          style={linkStyle}
        >
          <RocketOutlinedIcon sx={{mr:1}} />
          <ListItemText primary="Projects" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/settings/PersonalInfo/skills"
          style={linkStyle}
        >
          <PsychologyOutlinedIcon  sx={{mr:1}}/>

          <ListItemText primary="Skills & Certificates" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/settings/PersonalInfo/experience"
          style={linkStyle}
        >
          <WorkOutlineOutlinedIcon  sx={{mr:1}}/>
          <ListItemText primary="Experience" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/settings/PersonalInfo/education"
          style={linkStyle}
        >
          <SchoolIcon  sx={{mr:1}}/>
          <ListItemText primary="Education" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/settings/PersonalInfo/other-info"
          style={linkStyle}
        >
          <BadgeOutlinedIcon  sx={{mr:1}}/>
          <ListItemText primary="Other Info" />
        </ListItemButton>
      </Box>
    </>
  );
};
export default SettingSidebar;
