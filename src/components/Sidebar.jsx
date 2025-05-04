// src/components/Sidebar.jsx
import React from "react";
import {
  FaHome,
  FaFileAlt,
  FaChartPie,
  FaArrowRight,
  FaRedoAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ activeTab, setActiveTab, handleLogout }) {
  const { currentUser } = useAuth();
  const items = [
    { icon: <FaHome />, label: "Home" },
    { icon: <FaFileAlt />, label: "Expenses" },
    { icon: <FaChartPie />, label: "Analytics" },
    { icon: <FaArrowRight />, label: "Borrow" },
    { icon: <FaRedoAlt />, label: "Reset" },
  ];
  return (
    <div className="w-64 p-6 bg-[#1e1e1e] flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center mb-10">
          <img
            src={currentUser.photoURL}
            className="w-20 h-20 rounded-full"
          />
          <p className="mt-2">{currentUser.displayName}</p>
        </div>
        <nav className="space-y-4">
          {items.map(({ icon, label }) => (
            <div
              key={label}
              onClick={() => setActiveTab(label)}
              className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${
                activeTab === label
                  ? "bg-[#333] text-teal-400"
                  : "hover:bg-[#2a2a2a]"
              }`}
            >
              {icon}
              <span>{label}</span>
            </div>
          ))}
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 w-full py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
