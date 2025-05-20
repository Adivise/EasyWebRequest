import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Authorized from "./pages/Authorized.js";
import Nav from "./components/Nav";
import "react-toastify/dist/ReactToastify.css";
import "./components/index.css";
import config from "./config.js";

export default function App() {
  const [user, setUser] = useState(null);
  const [twitchSuccess, setTwitchSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try { // http://localhost:3001/auth/login/success
        const response = await fetch(`${config.REACT_APP_API_URL}/auth/login/success`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });

        if (!response.ok) throw new Error("Authentication failed");

        const resObject = await response.json();
        setUser(resObject.user);
        setTwitchSuccess(resObject.success);
      } catch (error) {
        console.error("❌ Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return <div className="loading-screen">Loading...</div>; // Prevent UI flickering
  }

  return (
    <BrowserRouter>
      <div>
        <Nav user={user} />
        <Routes>
          {/* ✅ Redirect `/` to `/login` if user is not logged in */}
          <Route path="/" element={user ? <Authorized user={user} success={twitchSuccess} /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        </Routes>
        {/* ✅ Added ToastContainer for notifications and make close button smaller */}
        <ToastContainer className="custom-toast" position="top-left" />
      </div>
    </BrowserRouter>
  );
}