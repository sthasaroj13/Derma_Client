// src/layout/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
