// src/pages/HomePage.jsx
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Sidebar from "../components/Sidebar";
import HomeSection from "../components/HomeSection";
import ExpensesSection from "../components/ExpensesSection";
import HomeAnalytics from "../components/HomeAnalytics";
import Borrow from "../components/Borrow";
import Reset from "../components/Reset";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Home");

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex min-h-screen bg-[#121212] text-white">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
      />
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === "Home" && <HomeSection />}
        {activeTab === "Expenses" && <ExpensesSection />}
        {activeTab === "Analytics" && <HomeAnalytics />}
        {activeTab === "Borrow" && <Borrow />}
        {activeTab === "Reset" && <Reset />}
      </div>
    </div>
  );
}
