// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
-import { BrowserRouter } from "react-router-dom";
+import { HashRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { WalletProvider } from "./context/WalletContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <WalletProvider>
-      <BrowserRouter>
+      <HashRouter>
        <App />
-      </BrowserRouter>
+      </HashRouter>
    </WalletProvider>
  </AuthProvider>
);
