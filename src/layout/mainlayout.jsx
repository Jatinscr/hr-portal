import React, { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Box, Toolbar } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard";
import Employees from "../pages/Employees";
import Projects from "../pages/Projects";
import Analytic from "../pages/Analytic";
import Mailbox from "../pages/Mailbox";
import HelpCenter from "../pages/HelpCenter";
import Account from "../pages/Account";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import Holidays from "../pages/Holidays";

import PrivateRoute from "../Route/index"; // ✅ import
import Profile from "../profile/Profile";

const MainLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Navbar />

      <Box sx={{ display: "flex" }}>
        <Sidebar open={open} setOpen={setOpen} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            transition: "margin-left 0.1s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <Toolbar />

          <Routes>
            {/* PROTECTED ROUTES */}
            <Route
              path="/dashboard"
              element={
                // <PrivateRoute>
                  <Dashboard />
                // </PrivateRoute>
              }
            />
            <Route
              path="/employees"
              element={
                // <PrivateRoute>
                <Employees />
                //  </PrivateRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <PrivateRoute>
                  <Projects />
                </PrivateRoute>
              }
            />
            <Route
              path="/analytic"
              element={
                <PrivateRoute>
                  <Analytic />
                </PrivateRoute>
              }
            />
            <Route
              path="/holidays"
              element={
                <PrivateRoute>
                  <Holidays />
                </PrivateRoute>
              }
            />
            <Route
              path="/mailbox"
              element={
                <PrivateRoute>
                  <Mailbox />
                </PrivateRoute>
              }
            />
            <Route
              path="/help-center"
              element={
                <PrivateRoute>
                  <HelpCenter />
                </PrivateRoute>
              }
            />
            <Route
              path="/account"
              element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              }
            />
            <Route
              path="/Profile"
              element={
                // <PrivateRoute>
                  <Profile />
                // </PrivateRoute>
              }
            />

            {/* AUTH ROUTES */}
            {/* <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp-verification" element={<OtpVerification />} /> */}
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
