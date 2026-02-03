import { useState } from "react";
import apiUrl from "../api/index";
import { useNavigate } from "react-router-dom";

import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleForgot = async () => {
    console.log("buttion clciked");
    try {
      const res = await axios.post(`http://192.168.1.48:3000/api/v1/auth/forgot-password`, {
        email,
      });
      const resetToken = res.data.resetToken;
      console.log("FORGOT RES:", res.data.resetToken);
      navigate("/reset-password", { state: { email, resetToken } });
    } catch (err) {
      console.log(err);
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
      <Paper
        elevation={3}
        sx={{
          width: 360,
          p: 3,
          borderRadius: "8px",
        }}
      >
        {/* <Box sx={{ display: "flex", flexDirection: "" }}> */}
        <Typography variant="h8" display="block" mb={1}>
          Forgot Password
        </Typography>

        <Typography variant="h7" display="block" sx={{ mr: 5, mb: 2 }}>
          Please enter your email to recover your password
        </Typography>
        {/* </Box> */}
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

        <Button
          fullWidth
          sx={{ mt: 2, py: 2, borderRadius: "8px" }}
          variant="black"
          onClick={handleForgot}
        >
          Submit
        </Button>
      </Paper>
    </Box>
  );
}
export default ForgetPassword;
