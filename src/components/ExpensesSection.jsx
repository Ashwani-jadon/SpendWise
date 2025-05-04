// src/components/ExpensesSection.jsx
import React from "react";
import { useWallet } from "../context/WalletContext";  // ← import the hook
import TransactionList from "./TransactionList";

export default function ExpensesSection() {
  const { transactions } = useWallet();

  return (
    <div>
      <h2 className="text-2xl mb-4">Your Expenses</h2>
      <TransactionList transactions={transactions} />
    </div>
  );
}
