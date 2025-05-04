import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";

export default function Borrow() {
  const { borrowedFrom, lentTo, addBorrow, addLend } = useWallet();

  const [bName, setBName] = useState("");
  const [bAmt, setBAmt] = useState("");
  const [lName, setLName] = useState("");
  const [lAmt, setLAmt] = useState("");

  const handleBorrow = (e) => {
    e.preventDefault();
    if (!bName || !bAmt) return;

    addBorrow({
      id: Date.now(),
      name: bName,
      amount: +bAmt,
      date: new Date().toLocaleDateString(),
    });
    setBName("");
    setBAmt("");
  };

  const handleLend = (e) => {
    e.preventDefault();
    if (!lName || !lAmt) return;

    addLend({
      id: Date.now(),
      name: lName,
      amount: +lAmt,
      date: new Date().toLocaleDateString(),
    });
    setLName("");
    setLAmt("");
  };

  return (
    <div className="space-y-8 text-white">
      {/* Borrowed From Section */}
      <div className="bg-[#1e1e1e] p-4 rounded">
        <h2 className="text-yellow-400 mb-4">📤 I Borrowed From</h2>
        <form onSubmit={handleBorrow} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Name"
            className="bg-gray-800 p-2 rounded text-white"
            value={bName}
            onChange={(e) => setBName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className="bg-gray-800 p-2 rounded text-white"
            value={bAmt}
            onChange={(e) => setBAmt(e.target.value)}
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-black font-semibold"
          >
            Add Borrow
          </button>
        </form>
        <ul className="list-disc ml-4 text-sm">
          {borrowedFrom.map((e) => (
            <li key={e.id}>
              You borrowed ₹{e.amount} from <strong>{e.name}</strong> on {e.date}
            </li>
          ))}
        </ul>
      </div>

      {/* Lent To Section */}
      <div className="bg-[#1e1e1e] p-4 rounded">
        <h2 className="text-blue-400 mb-4">📥 Someone Borrowed From Me</h2>
        <form onSubmit={handleLend} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Name"
            className="bg-gray-800 p-2 rounded text-white"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className="bg-gray-800 p-2 rounded text-white"
            value={lAmt}
            onChange={(e) => setLAmt(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-black font-semibold"
          >
            Add Lend
          </button>
        </form>
        <ul className="list-disc ml-4 text-sm">
          {lentTo.map((e) => (
            <li key={e.id}>
              <strong>{e.name}</strong> borrowed ₹{e.amount} from you on {e.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
