import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import apiUrl from "../api/index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import apiUrl from "../api";
// import axios from "axios";

function SignIn() {
  const [isLogin, setIsLogin] = useState(true);
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("LOGIN BUTTON CLICKED");
    try {
      const res = await axios.post(
        `http://192.168.1.48:3000/api/v1/auth/login`,
        {
          email,
          password,
        },
      );
      console.log("login api res", res.data);
      const token = res.data.token;
      localStorage.setItem("token", token);
      const profileRes = await apiUrl.get("/users/me", {});
      console.log("profile data==============>", profileRes.data);
      localStorage.setItem("user", JSON.stringify(profileRes.data));
      console.log("PRIVATE ROUTE TOKEN:", localStorage.getItem("token"));

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper sx={{ p: 3.5, width: 360, borderRadius: "3.5px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "10px",
            width: "fit-content",
            padding: "2px",
            mb: 3,
            px: 8,
            // py: 2,
          }}
        >
          <Tabs
            value={tab}
            onChange={(e, newValue) => {
              setTab(newValue);
              setIsLogin(newValue === 0);
            }}
            variant="fullWidth"
            TabIndicatorProps={{
              sx: {
                height: "3px",
                backgroundColor: "#1976d2", // 👈 selected tab ke niche line
                // borderRadius: "16px",
              },
            }}
          >
            <Tab
              label="Login"
              sx={{
                minHeight: "auto",
                padding: "6px 16px",
                fontSize: "14",
                fontWeight: "600",
                borderRadius: " 8px",
                color: tab === 0 ? "#1976d2" : "#637381",
                // backgroundColor: tab === 0 ? "#ffffff" : "transparent",
                // boxShadow: tab === 0 ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
              }}
            />
            <Tab
              label="Sign Up"
              sx={{
                minHeight: "auto",
                padding: "6px 16px",
                textTransform: "none",
                fontSize: "14",
                fontWeight: "600",
                borderRadius: "8px",
                color: tab === 1 ? "#1976d2" : "#637381",
                // backgroundColor: tab === 1 ? "#ffffff" : "transparent",
                // boxShadow: tab === 1 ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
              }}
            />
          </Tabs>
        </Box>
        <Typography mb={0.5}>
          <Typography
            variant="body2"
            sx={{
              textTransform: "uppercase",
              letterSpacing: "1px",
              // lineHeight: "1",
              // cursor: "pointer",
            }}
            // onClick={() => navigate("/dashboard")}
          >
            human Resource
          </Typography>
          {/* <Typography variant="body3"></Typography> */}
        </Typography>
        <Typography variant="h8" sx={{ letterSpacing: "1px" }}>
          {isLogin ? "Login" : "Create your account"}
        </Typography>
        {!isLogin && (
          <TextField
            fullWidth
            label="Name"
            InputLabelProps={{
              sx: {
                fontSize: 12,
                color: "#637381",
              },
            }}
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "46px",
              },
            }}
          />
        )}
        <TextField
          fullWidth
          label="Email"
          InputLabelProps={{
            sx: {
              fontSize: 12,
              color: "#637381",
            },
          }}
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": { borderRadius: "8px", height: "46px" },
          }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          type="password"
          InputLabelProps={{
            sx: {
              fontSize: 12,
              color: "#637381",
            },
          }}
          label="Password"
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": { borderRadius: "8px", height: "46px" },
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLogin && (
          <TextField
            fullWidth
            type="Password"
            InputLabelProps={{
              sx: {
                fontSize: 12,
                color: "#637381",
              },
            }}
            label="Confirm Password"
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "46px",
              },
            }}
          />
        )}
        <Button
          fullWidth
          size="large"
          sx={{
            mt: 2,
            py: 1.6,
            borderRadius: "8px",
            textTransform: "none",
            fontSize: "12px",
            color: "#ffffff",
            fontWeight: 600,
            background: "linear-gradient(180deg, #1f1f1f, #0f0f0f)",
            boxShadow: "none",
            "&:hover": {
              background: "linear-gradient(180deg, #2a2a2a, #141414)",
              boxShadow: "none",
            },
          }}
          onClick={handleLogin}
        >
          {isLogin ? "Login" : "Signup"}
        </Button>
        <Typography variant="body2" mt={2} align="center">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <Typography
                component="span"
                variant="body2"
                sx={{
                  color: "#1976d2",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setIsLogin(false);
                  setTab(1);
                }}
              >
                Sign Up
              </Typography>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Typography
                component="span"
                variant="body2"
                sx={{ cursor: "pointer", color: "#1976d2" }}
                onClick={() => {
                  setIsLogin(true);
                  setTab(0);
                }}
              >
                Login
              </Typography>
            </>
          )}
        </Typography>
        <Typography
          align={"center"}
          variant="body2"
          sx={{ cursor: "pointer", color: "#1976d2" }}
          onClick={() => navigate("/forgot-password")}
        >
          Forget Password
        </Typography>
      </Paper>
    </Box>
  );
}
export default SignIn;
