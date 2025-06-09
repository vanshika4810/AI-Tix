import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      showThemeAlert("Dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      showThemeAlert("Light");
    }
  }, [isDarkMode]);

  const showThemeAlert = (mode) => {
    const alert = document.createElement("div");
    alert.className =
      "fixed left-1/2 transform -translate-x-1/2 top-4 bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 z-50 text-sm font-medium";
    alert.style.opacity = "0";
    alert.style.transform = "translate(-50%, -20px)";
    alert.textContent = `${mode} Mode Activated`;
    document.body.appendChild(alert);

    // Fade and slide in
    setTimeout(() => {
      alert.style.opacity = "1";
      alert.style.transform = "translate(-50%, 0)";
    }, 10);

    // Fade and slide out
    setTimeout(() => {
      alert.style.opacity = "0";
      alert.style.transform = "translate(-50%, -20px)";
      setTimeout(() => {
        document.body.removeChild(alert);
      }, 300);
    }, 1500);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
