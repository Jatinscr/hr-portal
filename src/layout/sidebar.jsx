import React from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
  Avatar,
  Divider,
  Tooltip,
} from "@mui/material";

import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import RocketOutlinedIcon from "@mui/icons-material/RocketOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { useNavigate } from "react-router-dom";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";

const drawerWidth = 240;
const collapsedWidth = 60;

const Sidebar = ({ open, setOpen }) => {
  const navHeight = 66;
  const headerHeight = 48;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: navHeight,
          left: 0,
          width: open ? drawerWidth : collapsedWidth,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
          zIndex: 1201, //AppBar (1100) se
          backgroundColor: "background.paper",
          borderRight: "1px solid #e0e0e0",
          transition: "width 0.3s ease",
        }}
      >
        {open && (
          <Typography
            variant="body4"
            sx={{
              ml: 1.2,
              cursor: "pointer",
            }}
            // onClick={() => navigate("/dashboard")}
          >
            DASHBOARD
          </Typography>
        )}
        <Tooltip
          title={open ? "Close Sidebar" : "Open Sidebar"}
          placement="right"
          arrow
        >
          <IconButton onClick={() => setOpen(!open)}>
            <MenuOpenIcon sx={{ fontSize: 19 }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: open ? drawerWidth : collapsedWidth,
            boxSizing: "border-box",
            transition: "width 0.3s ease",
            top: navHeight + headerHeight, // यहाँ add करें
            height: `calc(100% - ${navHeight + headerHeight}px)`, // यहाँ भी adjust करें
            overflowX: "hidden",
            overflowY: "auto",
            scrollbarWidth: "ultra-thin",
            "&::-webkit-scrollbar": {
              width: "3px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#637381",
              // borderRadius: "20px",
            },
          },
        }}
      >
        <List>
          <ListItemButton onClick={() => navigate("/dashboard")}>
            <ListItemIcon
              sx={{
                opacity: open ? 1 : 1,
                transition: "opacity 0.3 ease",
                minWidth: 0, // यह add करें
                justifyContent: "center", // यह add करें
              }}
            >
              <DashboardCustomizeOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{
                opacity: open ? 1 : 0,
                maxWidth: open ? "200px" : "0px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                transition: "opacity 0.2s ease, max-width 0.3s ease",
                fontSize: 18,
                fontWeight: 500,
              }}
            />
          </ListItemButton>

          <Tooltip
            title="Holidays"
            placement="right"
            arrow
            disableHoverListener={open}
          >
            <ListItemButton onClick={() => navigate("/holidays")}>
              <ListItemIcon
                sx={{
                  opacity: open ? 1 : 1,
                  transition: "opacity 0.3 ease",
                  minWidth: 0,
                }}
              >
                <CalendarMonthOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Holidays"
                primaryTypographyProps={{
                  opacity: open ? 1 : 0,
                  maxWidth: open ? "200px" : "0px",
                }}
              />
            </ListItemButton>
          </Tooltip>
          <Tooltip
            title="Employees"
            placement="right"
            arrow
            disableHoverListener={open}
          >
            <ListItemButton onClick={() => navigate("/employees")}>
              <ListItemIcon
                sx={{
                  opacity: open ? 1 : 1,
                  transition: "opacity 0.3 ease",
                  minWidth: 0,
                }}
              >
                <PersonOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Employees"
                primaryTypographyProps={{
                  opacity: open ? 1 : 0,
                  maxWidth: open ? "200px" : "0px",
                }}
              />
            </ListItemButton>
          </Tooltip>
          <Tooltip
            title="Analytic"
            placement="right"
            arrow
            disableHoverListener={open}
          >
            <ListItemButton onClick={() => navigate("/analytic")}>
              <ListItemIcon
                sx={{
                  opacity: open ? 1 : 1,
                  transition: "opacity 0.3 ease",
                  minWidth: 0,
                }}
              >
                <EqualizerOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Analytic"
                primaryTypographyProps={{
                  opacity: open ? 1 : 0,
                  maxWidth: open ? "200px" : "0px",
                }}
              />
            </ListItemButton>
          </Tooltip>
          <Tooltip
            title="Projects"
            placement="right"
            arrow
            disableHoverListener={open}
          >
            <ListItemButton onClick={() => navigate("/projects")}>
              <ListItemIcon
                sx={{
                  opacity: open ? 1 : 1,
                  transition: "opacity 0.3 ease",
                  minWidth: 0,
                }}
              >
                <RocketOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Projects"
                primaryTypographyProps={{
                  opacity: open ? 1 : 0,
                  maxWidth: open ? "200px" : "0px",
                }}
              />
            </ListItemButton>
          </Tooltip>
          {open && (
            <Typography
              variant="body4"
              sx={{
                ml: 1.2,
                pt: 2,
              }}
            >
              Concepts
            </Typography>
          )}
          <Tooltip
            title="Help Center"
            placement="right"
            arrow
            disableHoverListener={open}
          >
            <ListItemButton onClick={() => navigate("/help-center")}>
              <ListItemIcon
                sx={{
                  opacity: open ? 1 : 1,
                  transition: "opacity 0.3 ease",
                  minWidth: 0,
                }}
              >
                <HelpOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Help Center"
                primaryTypographyProps={{
                  opacity: open ? 1 : 0,
                  maxWidth: open ? "200px" : "0px",
                }}
              />
            </ListItemButton>
          </Tooltip>
          <Tooltip
            title="Mailbox"
            placement="right"
            arrow
            disableHoverListener={open}
          >
            <ListItemButton onClick={() => navigate("/mailbox")}>
              <ListItemIcon
                sx={{
                  opacity: open ? 1 : 1,
                  transition: "opacity 0.3 ease",
                  minWidth: 0,
                }}
              >
                <MailOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Mailbox"
                primaryTypographyProps={{
                  opacity: open ? 1 : 0,
                  maxWidth: open ? "200px" : "0px",
                }}
              />
            </ListItemButton>
          </Tooltip>
          <Tooltip
            title="Account"
            placement="right"
            arrow
            disableHoverListener={open}
          >
            <ListItemButton onClick={() => navigate("/account")}>
              <ListItemIcon
                sx={{
                  opacity: open ? 1 : 1,
                  transition: "opacity 0.3 ease",
                  minWidth: 0,
                }}
              >
                <AccountCircleOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Account"
                primaryTypographyProps={{
                  opacity: open ? 1 : 0,
                  maxWidth: open ? "200px" : "0px",
                }}
              />
            </ListItemButton>
          </Tooltip>
          {open && (
            <Typography
              variant="body4"
              sx={{
                ml: 1.2,
                pt: 2,
              }}
            >
              Authentication
            </Typography>
          )}
          <Tooltip
            title="Sign In"
            placement="right"
            arrow
            disableHoverListener={open}
          >
            <ListItemButton onClick={() => navigate("/signin")}>
              <ListItemIcon
                sx={{
                  opacity: open ? 1 : 1,
                  transition: "opacity 0.3 ease",
                  minWidth: 0,
                }}
              >
                <Person4OutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Sign In"
                primaryTypographyProps={{
                  opacity: open ? 1 : 0,
                  maxWidth: open ? "200px" : "0px",
                }}
              />
            </ListItemButton>
          </Tooltip>
          <Tooltip
            title="Sign Up"
            placement="right"
            arrow
            disableHoverListener={open}
          >
            <ListItemButton onClick={() => navigate("/signup")}>
              <ListItemIcon
                sx={{
                  opacity: open ? 1 : 1,
                  transition: "opacity 0.3 ease",
                  minWidth: 0,
                }}
              >
                <PersonAddAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Sign Up"
                primaryTypographyProps={{
                  opacity: open ? 1 : 0,
                  maxWidth: open ? "200px" : "0px",
                }}
              />
            </ListItemButton>
          </Tooltip>
          <Tooltip
            title="Forgot Password"
            placement="right"
            arrow
            disableHoverListener={open}
          >
            <ListItemButton onClick={() => navigate("/forgot-password")}>
              <ListItemIcon
                sx={{
                  opacity: open ? 1 : 1,
                  transition: "opacity 0.3 ease",
                  minWidth: 0,
                }}
              >
                <LockOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Forgot Password"
                primaryTypographyProps={{
                  opacity: open ? 1 : 0,
                  maxWidth: open ? "200px" : "0px",
                }}
              />
            </ListItemButton>
          </Tooltip>
          <Tooltip
            title="Otp Verification"
            placement="right"
            arrow
            disableHoverListener={open}
          >
            <ListItemButton onClick={() => navigate("/otp-verification")}>
              <ListItemIcon
                sx={{
                  opacity: open ? 1 : 1,
                  whiteSpace: "nowrap",
                  transition: "opacity 0.3 ease",
                  minWidth: 0,
                }}
              >
                <BadgeOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Otp Verification"
                primaryTypographyProps={{
                  opacity: open ? 1 : 0,
                  maxWidth: open ? "200px" : "0px",
                }}
              />
            </ListItemButton>
          </Tooltip>
        </List>
        <Box sx={{ mt: "auto", p: 2 }}>
          {/* Top row: Avatar + Name */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: open ? "flex-start" : "center",
              gap: open ? 1.5 : 0,
            }}
          >
            <Avatar
              src={
                user?.photo
                  ? `http://192.168.1.48:3000/uploads/${user.photo}`
                  : undefined
              }
              sx={{
                width: open ? 28 : 24,
                height: open ? 28 : 24,
                transition: "all 0.3s ease",
                flexShrink: 0,
              }}
            >
              {user?.firstName?.charAt(0) || "undefined"}
            </Avatar>

            {open && (
              <Box>
                <Typography
                  sx={{ fontSize: 12, color: "#637381", fontWeight: 600 }}
                >
                  WelCome,
                </Typography>

                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  {user?.firstName
                    ? `${user.firstName} ${user.lastName || ""}`
                    : "User"}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Divider */}
          {open && <Divider />}
          {/* Experience + Role */}
          {open && (
            <Box>
              <Typography
                sx={{ fontSize: 12, color: "#637381", fontWeight: 600 }}
              >
                {user?.Department || "NA"}
              </Typography>
              <Typography
                sx={{ fontSize: 12, color: "#637381", fontWeight: 600 }}
              >
                {user?.role || "N\A"}
              </Typography>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
