import { useState } from "react";
import apiUrl from "../api/index";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email, resetToken } = state;
  const [newPassword, setNewPassword] = useState("123456789");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!state?.resetToken) {
    return navigate("/forgot-password");
  }

  const handleReset = async () => {
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    const payload = {
      // email,
      token: resetToken,
      newPassword,
      // confirmPassword,
    };

    try {
      await axios.post(`http://192.168.1.48:3000/api/v1/auth/reset-password`, {
        token: resetToken,
        newPassword: newPassword,
        // password,
      });
      alert("Password reset successful");
      navigate("/");
    } catch (err) {
      alert("Reset failed");
    }
  };
  return (
    <Box sx={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <Box sx={{ width: 350 }}>
        <Typography variant="h6">Reset Password</Typography>

        <TextField
          fullWidth
          label="New Password"
          type="password"
          sx={{ mt: 2 }}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          sx={{ mt: 2 }}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button fullWidth sx={{ mt: 2 }} onClick={handleReset} variant="black">
          Reset Password
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
