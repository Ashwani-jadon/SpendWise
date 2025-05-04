import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const navigate = useNavigate(); 

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in:", result.user.email);
        navigate("/HomePage");
      })
      .catch((error) => {
        console.error("Login Error", error);
      });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to Spendwise</h1>
      <button
        onClick={handleLogin}
        className="bg-teal-500 hover:bg-teal-600 px-6 py-3 rounded text-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
