import React from "react";
import Home from "../pages/home/Home";

const Dashboard = () => {
  return (
    <main className="min-h-screen">
      {/* pt-24 adds space for fixed navbar (adjust if needed) */}
      <Home />
    </main>
  );
};

export default Dashboard;
