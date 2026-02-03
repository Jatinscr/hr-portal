import {
  Avatar,
  Box,
  Typography,
  Popover,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";

function ProfileMenu({ anchorEl, open, onClose }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user, "kjdhsghs");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        onMouseLeave={onClose}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            width: 220,
            borderRadius: 2,
            p: 1,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box>
            {/* {" "} */}
            <Avatar
              src={
                user?.photo
                  ? `http://192.168.1.48:3000/uploads/${user.photo}`
                  : undefined
              }
              sx={{ width: 40, height: 40 }}
            >
              {" "}
              {user?.firstName?.charAt(0) || "undefined"}
            </Avatar>
          </Box>
          <Box
            px={1}
            py={1}
            // display="flex"
            alignItems="center"
            justifyContent={"flex-start"}
            gap={1.5}
            flexDirection="row"
          >
            <Typography variant="body2">
              {user?.firstName
                ? `${user.firstName} ${user.lastName || ""}`
                : "User"}
            </Typography>
            <Typography variant="h7">
              {user?.email || "user@gmail.com"}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 0 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <List dense>
            <ListItem
              Button
              sx={{
                borderRadius: 1,
                px: 0,
                py: 0,
                mb: 1,
                "&:hover": {
                  backgroundColor: "#f4f6f8",
                },
              }}
            >
              <ListItemIcon
                onClick={() => navigate("/Profile")}
                sx={{ cursor: "pointer" }}
              >
                <PersonOutlineOutlinedIcon sx={{ fontSize: 22 }} />
                <ListItemText
                  primary="Profile"
                  sx={{ pl: 1 }}
                  primaryTypographyProps={{
                    fontSize: "14px",
                    lineHeight: "1",
                  }}
                />
              </ListItemIcon>
            </ListItem>
            <ListItem
              Button
              sx={{
                borderRadius: 1,
                px: 0,
                py: 0,
                mb: 1,
                "&:hover": {
                  backgroundColor: "#f4f6f8",
                },
              }}
            >
              {/* onClick={() => navigate("/Profile")} */}
              <ListItemIcon sx={{ cursor: "pointer" }}>
                <SettingsOutlinedIcon sx={{ fontSize: 22 }} />
                <ListItemText
                  primary="Account Setting"
                  sx={{ pl: 1 }}
                  primaryTypographyProps={{
                    fontSize: "14px",
                    lineHeight: "1",
                  }}
                />
              </ListItemIcon>
            </ListItem>
            <ListItem
              Button
              sx={{
                borderRadius: 1,
                px: 0,
                py: 0,
                mb: 1,
                "&:hover": {
                  backgroundColor: "#f4f6f8",
                },
              }}
            >
              <ListItemIcon sx={{ cursor: "pointer" }}>
                <HistoryOutlinedIcon sx={{ fontSize: 22 }} />
                <ListItemText
                  primary="Activity Log"
                  sx={{ pl: 1 }}
                  primaryTypographyProps={{
                    fontSize: "14px",
                    lineHeight: "1",
                  }}
                />
              </ListItemIcon>
            </ListItem>
            {/* <Divider /> */}
            <ListItem
              Button
              onClick={handleSignOut}
              sx={{
                borderRadius: 1,
                color: "error.main",
                alignItems: "center",
                px: 0,
                py: 0,
                mb: 1,
              }}
            >
              <ListItemIcon sx={{ cursor: "pointer" }}>
                <LogoutOutlinedIcon sx={{ fontSize: 22 }} />
                <ListItemText
                  primary="Sign Out"
                  sx={{ pl: 1 }}
                  primaryTypographyProps={{
                    fontSize: "14px",
                    lineHeight: "1",
                  }}
                />
              </ListItemIcon>
            </ListItem>
          </List>
        </Box>
      </Popover>
    </>
  );
}
export default ProfileMenu;
