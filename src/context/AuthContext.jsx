import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

// 1) Create the context
const AuthContext = createContext(null);

// 2) Provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3) Hook to consume
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
