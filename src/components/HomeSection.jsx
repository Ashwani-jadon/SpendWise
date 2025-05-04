// src/components/HomeSection.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useWallet } from "../context/WalletContext";
import Wallet from "./Wallet";
import ExpenseForm from "./ExpenseForm";

export default function HomeSection() {
  const { currentUser } = useAuth();               // ← get user from context
  const {
    walletBalance,
    updateInitialBalance,
    addTransaction,
  } = useWallet();

  return (
    <div className="bg-[#1e1e1e] rounded-lg space-y-8">
      <h1 className="text-4xl font-extrabold bg-clip-text text-transparent
                     bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500">
        Welcome, {currentUser?.displayName || "User"} 👋
      </h1>

      {/* Wallet and ExpenseForm stay the same */}
      <Wallet
        balance={walletBalance}
        onBalanceChange={updateInitialBalance}
      />

      <ExpenseForm onAdd={addTransaction} />
    </div>
  );
}
