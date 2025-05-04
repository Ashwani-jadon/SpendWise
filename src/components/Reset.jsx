// src/components/Reset.jsx
import React from "react";
import { useWallet } from "../context/WalletContext";

export default function Reset() {
  const { resetAll } = useWallet();

  const handleReset = () => {
    if (!window.confirm("Are you sure you want to reset all data?")) return;
    resetAll();
  };

  return (
    <div className="p-4">
      <button
        onClick={handleReset}
        className="bg-red-600 px-4 py-2 rounded text-white"
      >
        Confirm Reset All Data
      </button>
    </div>
  );
}
