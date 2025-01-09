import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Tracker from "./Tracker/Tracker";
import About from './About'
import Contact from "./Contact";
import PrivacyPolicy from "./PrivacyPolicy";
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import { Analytics } from "@vercel/analytics/react"

import "./App.css";
import LoginPage from "./LoginPage.jsx";
import SignUpPage from './SignUpPage.jsx'

function App() {
  return (
    <AuthProvider>  {/* Wrap all routes with the AuthProvider */}
      <Router>
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<LandingPage />} />

          {/* About Page Route */}
          <Route path="/about" element={<About />} />

          {/* Contact Page Route */}
          <Route path="/contact" element={<Contact />} />

          {/* Privacy Policy Page Route */}
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* Public Route for Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Public Route for Sign Up */}
        <Route path="/signup" element={<SignUpPage />} />

          {/* Tracker (Main App) Route */}
          <Route path="/tracker" element={
            <PrivateRoute>
              <Tracker />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
      <Analytics/>
    </AuthProvider>
    
  );
}

export default App;
