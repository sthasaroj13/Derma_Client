import React from "react";
import DashboardHeader from "../Component/DashBoard/Dashboardheader";
import ScanHistory from "../Component/DashBoard/ScanHistory";
import InsightsCard from "../Component/DashBoard/InsightsCard";
import Footer from "../Component/home/Footer";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <main className="flex-grow p-6">
        <DashboardHeader />
        <section className="mt-8 grid md:grid-cols-2 gap-6">
          <ScanHistory />
          <InsightsCard />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
