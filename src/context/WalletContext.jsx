import React, {
    createContext,
    useContext,
    useEffect,
    useState
  } from "react";
  import { db } from "../firebase";
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { useAuth } from "./AuthContext";
  
  const WalletContext = createContext(null);
  
  export function useWallet() {
    const context = useContext(WalletContext);
    if (!context) {
      throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
  }
  
  export function WalletProvider({ children }) {
    const { currentUser } = useAuth();
    const uid = currentUser?.uid;
  
    const [walletBalance, setWalletBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [borrowedFrom, setBorrowedFrom] = useState([]);
    const [lentTo, setLentTo] = useState([]);
  
    // Load on mount
    useEffect(() => {
      if (!uid) return;
      (async () => {
        try {
          const snap = await getDoc(doc(db, "users", uid));
          if (snap.exists()) {
            const data = snap.data();
            setWalletBalance(data.wallet ?? 0);
            setTransactions(data.transactions ?? []);
            setBorrowedFrom(data.borrowedFrom ?? []);
            setLentTo(data.lentTo ?? []);
          }
        } catch (e) {
          console.error("Failed to load user data", e);
        }
      })();
    }, [uid]);
  
    // Save a single field to Firestore
    const saveField = async (field, value) => {
      if (!uid) return;
      try {
        await setDoc(doc(db, "users", uid), { [field]: value }, { merge: true });
      } catch (e) {
        console.error(`Failed to save ${field}`, e);
      }
    };
  
    // Add a transaction
    const addTransaction = (tx) => {
      const updated = [tx, ...transactions];
      setTransactions(updated);
      saveField("transactions", updated);
  
      const newBal = tx.type === "receive"
        ? walletBalance + tx.amount
        : walletBalance - tx.amount;
      setWalletBalance(newBal);
      saveField("wallet", newBal);
    };
  
    // Update initial balance directly
    const updateInitialBalance = (bal) => {
      setWalletBalance(bal);
      saveField("wallet", bal);
    };
  
    // Borrowed-from and lent-to handlers
    const addBorrow = (entry) => {
      const updated = [entry, ...borrowedFrom];
      setBorrowedFrom(updated);
      saveField("borrowedFrom", updated);
    };
  
    const addLend = (entry) => {
      const updated = [entry, ...lentTo];
      setLentTo(updated);
      saveField("lentTo", updated);
    };
  
    // Reset all data
    const resetAll = async () => {
      setWalletBalance(0);
      setTransactions([]);
      setBorrowedFrom([]);
      setLentTo([]);
      await saveField("wallet", 0);
      await saveField("transactions", []);
      await saveField("borrowedFrom", []);
      await saveField("lentTo", []);
    };
  
    return (
      <WalletContext.Provider
        value={{
          walletBalance,
          transactions,
          borrowedFrom,
          lentTo,
          addTransaction,
          updateInitialBalance,
          addBorrow,
          addLend,
          resetAll
        }}
      >
        {children}
      </WalletContext.Provider>
    );
  }
  