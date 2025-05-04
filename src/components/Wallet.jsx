import React, { useState, useEffect } from "react";

const Wallet = ({ onBalanceChange, balance }) => {
  const [balanceInput, setBalanceInput] = useState(balance || "");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (balance) {
      setBalanceInput(balance); // Update input when balance prop changes
    }
  }, [balance]);

  const handleSave = () => {
    const parsedBalance = parseFloat(balanceInput);
    if (!isNaN(parsedBalance) && parsedBalance >= 0) {
      onBalanceChange(parsedBalance);  // This updates the balance in HomePage
      setEditMode(false);  // Exit edit mode
    } else {
      alert("Please enter a valid non-negative number.");
    }
  };

  return (
    <div className="mb-6 p-6 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-1">Wallet Balance</h3>
          {editMode ? (
            <input
              type="number"
              value={balanceInput}
              placeholder="Enter Balance"
              onChange={(e) => setBalanceInput(e.target.value)}
              className="px-3 py-1 bg-indigo-50 rounded text-black"
            />
          ) : (
            <p className="text-3xl font-bold tracking-wide">
              ₹{parseFloat(balanceInput || 0).toLocaleString()}
            </p>
          )}
        </div>
        <div>
          {editMode ? (
            <button
              onClick={handleSave}
              className="bg-green-500 px-4 py-1 rounded hover:bg-green-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-yellow-500 px-4 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
