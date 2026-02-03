import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import MainLayout from "./layout/mainlayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./Theme/index";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Resetpassword from "./pages/Reset-password";
// import PrivateRoute from "../PrivateRoute/index"; // ✅ import

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* AUTH ROUTES (NO SIDEBAR / NO NAVBAR) */}
          <Route path="/" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Reset-password" element={<Resetpassword />} />

          {/* PROTECTED APP */}
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
