import React from "react";
import {
  ThemeProvider,
  CssBaseline,
  inputAdornmentClasses,
} from "@mui/material";
import MainLayout from "./layout/mainlayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./Theme/index";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Resetpassword from "./pages/Reset-password";
// import PrivateRoute from "../PrivateRoute/index"; // ✅ import
// import SettingLayout from "../src/SettingsLayout/SettingLayout";
// import Profile from "./pages/Profile";

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
          {/* settingsPage routes */}
          {/* <Route path="/settings" element={<SettingLayout />} /> */}
          {/* <Route index element={<Profile />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
