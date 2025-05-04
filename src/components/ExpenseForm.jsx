import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";

const ExpenseForm = () => {
  const { addTransaction } = useWallet();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("spend");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    addTransaction({
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
    });

    setDescription("");
    setAmount("");
    setType("spend");
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6">
      <h2 className="text-2xl font-semibold mb-4">Add a Transaction</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        >
          <option value="spend">Spend</option>
          <option value="receive">Receive</option>
        </select>
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 p-2 rounded"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
