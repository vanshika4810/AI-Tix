import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import { StrictMode } from "react";
import CheckAuth from "./components/check-auth.jsx";
import Tickets from "./pages/tickets.jsx";
import TicketDetailsPage from "./pages/ticket.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Admin from "./pages/admin.jsx";
import Navbar from "./components/navbar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-secondary-light dark:text-secondary-dark transition-all duration-300">
          <Navbar />
          <div className="theme-transition-wrapper">
            <Routes>
              <Route
                path="/"
                element={
                  <CheckAuth protectedRoute={true}>
                    <Tickets />
                  </CheckAuth>
                }
              />
              <Route
                path="/tickets/:id"
                element={
                  <CheckAuth protectedRoute={true}>
                    <TicketDetailsPage />
                  </CheckAuth>
                }
              />
              <Route
                path="/login"
                element={
                  <CheckAuth protectedRoute={false}>
                    <Login />
                  </CheckAuth>
                }
              />
              <Route
                path="/signup"
                element={
                  <CheckAuth protectedRoute={false}>
                    <Signup />
                  </CheckAuth>
                }
              />
              <Route
                path="/admin"
                element={
                  <CheckAuth protectedRoute={true}>
                    <Admin />
                  </CheckAuth>
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
