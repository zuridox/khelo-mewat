import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { Link } from "react-router-dom";
import app from "../firebase/firebaseConfig"; // Import your Firebase config file
import Cookies from "js-cookie";

export default function AdminLogin() {
  const [email, setEmail] = useState(""); // Changed username to email
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth(app); // Initialize Firebase Auth

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        Cookies.set("auth", "true", { expires: 1 }); // Set cookie for 1 day
      } else {
        setIsAuthenticated(false);
        Cookies.remove("auth"); // Remove cookie if logged out
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 py-2">
            Admin Dashboard
          </h2>
          <nav className="space-y-4">
            <Link
              to="/teams"
              className="block text-gray-700 hover:text-[#39A935] hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
            >
              Team Management
            </Link>
            <Link
              to="/admineventsnotices"
              className="block text-gray-700 hover:text-[#39A935] hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
            >
              Events & Notices
            </Link>
            <Link
              to="/admincontact"
              className="block text-gray-700 hover:text-[#39A935] hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
            >
              Contact Management
            </Link>
          </nav>
          <button
            onClick={handleLogout}
            className="mt-8 bg-[#E87722] hover:bg-[#39A935] text-white font-medium py-2.5 px-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-gray-900 py-2 text-center">
          Administrator Sign-In
        </h2>
        <p className="text-gray-600 mt-2 text-center">
          Access the administration panel
        </p>
        <div className="space-y-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-black"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-[#E87722] hover:bg-[#39A935] text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
