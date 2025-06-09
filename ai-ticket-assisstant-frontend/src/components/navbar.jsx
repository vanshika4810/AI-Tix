import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import RoleIndicator from "./RoleIndicator";

export default function Navbar() {
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-200">
                AI-Tix
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {!token ? (
              <div className="flex gap-2 transition-all duration-200">
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4 transition-all duration-200">
                <div className="flex items-center gap-2">
                  <RoleIndicator role={user?.role || "user"} />
                  <span className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    {user?.email}
                  </span>
                </div>
                {user && user?.role === "admin" ? (
                  <Link
                    to="/admin"
                    className="px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-200"
                  >
                    Admin
                  </Link>
                ) : null}
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
