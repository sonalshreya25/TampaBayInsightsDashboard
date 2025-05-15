// App.js sets up the main routing for the application using React Router.
// It wraps all pages inside a common layout (MainLayout) and maps URLs to individual views.
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import CountyDashboard from "./pages/CountyDashboard";
import CountyComparison from "./pages/CountyComparison";

function App() {
  return (
    <Router>
          {/* MainLayout wraps around all page content (like a shell) */}
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<CountyDashboard />} />
          <Route path="/compare" element={<CountyComparison />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
