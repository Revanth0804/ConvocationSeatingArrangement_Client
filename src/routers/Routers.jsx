import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AdminDashboard from "../pages/AdminDashboard";
import FindSeat from "../pages/FindSeat";
import SignUpForm from "../pages/SignUpForm";
import LoginForm from "../pages/LoginForm";
import LandingPage from "../pages/LandingPage";
import UserProfile from "../pages/UserProfile";
import VisualMap from "../pages/VisualMap";
import Dashboard1 from "../pages/Dashboard1";
import ProtectedRoute from "../components/ProtectedRouter";
import AdminLoginForm from "../pages/AdminLoginForm";
import AdminProtectedRoute from "../components/AdminProtectedRoute";

function Routers() {
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("userEmail"));
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => localStorage.getItem("isAdminLoggedIn") === "true");

  useEffect(() => {
    // Sync userEmail with localStorage
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    } else {
      localStorage.removeItem("userEmail");
    }
  }, [userEmail]);

  useEffect(() => {
    if (isAdminLoggedIn) {
      localStorage.setItem("isAdminLoggedIn", "true");
    } else {
      localStorage.removeItem("isAdminLoggedIn");
    }
  }, [isAdminLoggedIn]);

  const handleLogout = () => {
    setUserEmail(null);
    setIsAdminLoggedIn(false);
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdminLoggedIn");
  };

  const isUserLoggedIn = !!userEmail;
  const isLoggedIn = isUserLoggedIn || isAdminLoggedIn;

  return (
    <Router>
      <MainLayout isLoggedIn={isLoggedIn} isAdminLoggedIn={isAdminLoggedIn} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm setLoggedInUser={setUserEmail} />} />
          <Route path="/adminlogin" element={<AdminLoginForm setLoggedInAdmin={() => setIsAdminLoggedIn(true)} />} />

          <Route
            path="/loginhome"
            element={
              <ProtectedRoute isLoggedIn={isUserLoggedIn}>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/findseat"
            element={
              <ProtectedRoute isLoggedIn={isUserLoggedIn}>
                <FindSeat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/visualmap"
            element={
              <ProtectedRoute isLoggedIn={isUserLoggedIn}>
                <VisualMap userEmail={userEmail} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard1"
            element={
              <ProtectedRoute isLoggedIn={isUserLoggedIn}>
                <Dashboard1 userEmail={userEmail} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isUserLoggedIn}>
                <UserProfile userEmail={userEmail} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admindashboard"
            element={
              <AdminProtectedRoute isAdminLoggedIn={isAdminLoggedIn}>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default Routers;
