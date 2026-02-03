import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Navigate, useNavigate } from "react-router-dom";
import ProfileMenu from "../profile/ProfileMenu.jsx";
const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "background.paper" }}>
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            lineHeight: "1",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              textTransform: "uppercase",
              lineHeight: "1",
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard")}
          >
            human
          </Typography>
          <Typography variant="body3">Resource</Typography>
        </Box>
        <Box
          sx={{
            // flexGrow: 1,
            display: "flex",
            // justifyContent: "center",
            ml: "auto",
            // mr: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "rgba(255,255,255,0.15)",
              padding: "4px 10px",
              borderRadius: "8px",
              border: "1px solid #637381",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <InputBase
              placeholder="Search Here... "
              sx={{ color: "#637381", width: "100%", cursor: "pointer" }}
            />
            <SearchOutlinedIcon sx={{ color: "#637381", cursor: "pointer" }} />
          </Box>
        </Box>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <CalendarMonthOutlinedIcon />
        </IconButton>
        <IconButton>
          <MarkEmailUnreadOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleMenuOpen} onMouseEnter={handleMenuOpen}>
          <AccountCircleOutlinedIcon />
        </IconButton>
      </Toolbar>
      <ProfileMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose} />
    </AppBar>
  );
};
export default Navbar;
