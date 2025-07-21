import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router";
import { SidebarContext } from "./context/UseSidebar";
import { ThemeContext } from "./context/UseTheme";
import Sidebar from "./common/Sidebar";
import MainContent from "./components/MainContent";
import "./App.css";

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const userPref = localStorage.getItem("theme");
    if (userPref) {
      return userPref === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <BrowserRouter>
      <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
          <div className="relative flex h-screen overflow-hidden bg-background font-sans dark:bg-foreground">
            <Sidebar />
            <MainContent />
          </div>
        </ThemeContext.Provider>
      </SidebarContext.Provider>
    </BrowserRouter>
  );
};

export default App;
