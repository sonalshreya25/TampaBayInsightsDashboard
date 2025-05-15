import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import CountyDashboard from "./pages/CountyDashboard";
import CountyComparison from "./pages/CountyComparison";

function App() {
  return (
    <Router>
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
