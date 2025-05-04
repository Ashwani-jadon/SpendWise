// src/components/TransactionList.jsx
import React from "react";
export default function TransactionList({ transactions }) {
  if (!transactions.length)
    return <p className="text-gray-400">No transactions yet.</p>;
  return (
    <ul className="space-y-2">
      {transactions.map((tx) => (
        <li
          key={tx.id}
          className={`flex justify-between p-3 rounded ${
            tx.type === "receive" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <span>{tx.description}</span>
          <span>
            {tx.type === "receive" ? "+" : "-"}₹{tx.amount}
          </span>
        </li>
      ))}
    </ul>
  );
}
