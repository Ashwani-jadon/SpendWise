// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  
  // If the user is not logged in, redirect to the login page
  return currentUser ? children : <Navigate to="/" replace />;
}

export default function App() {
  const { currentUser } = useAuth();

  useEffect(() => {
    // Optionally, you can add some logic to check if the user is logged in
    // and maybe redirect them to HomePage immediately if the currentUser is already set.
  }, [currentUser]);

  return (
    <Routes>
      {/* Public login */}
      <Route path="/" element={<LoginPage />} />

      {/* Protected home route - only accessible if authenticated */}
      <Route
        path="/HomePage"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      {/* Fallback for any unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
