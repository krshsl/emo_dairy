import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useTheme from "../context/UseTheme";
import useSidebar from "../context/UseSidebar";

import PlaceholderIcon from "../icons/Placeholder";
import CloseIcon from "../icons/Close";
import SunIcon from "../icons/Sun";
import MoonIcon from "../icons/Moon";

const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  const handleNavigationClick = () => {
    setSidebarOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return (
        location.pathname === "/" || !location.pathname.startsWith("/status")
      );
    }
    return location.pathname.startsWith(path);
  };

  const linkClass = (path: string) =>
    `flex items-center px-6 py-3 text-primary-600 hover:bg-primary-200 dark:text-primary-300 dark:hover:bg-primary-700 ${
      isActive(path)
        ? "bg-primary-200 text-primary-700 font-semibold dark:bg-primary-700 dark:text-background"
        : ""
    }`;

  return (
    <>
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      />

      <aside
        className={`
                          fixed inset-y-0 left-0 z-30 w-64 flex-shrink-0 transform bg-primary-100 shadow-md transition-transform duration-300 ease-in-out
                          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                          lg:static lg:inset-auto lg:translate-x-0 lg:block
                          dark:bg-primary-800 dark:shadow-lg
                        `}
      >
        <div className="flex items-center justify-between p-6">
          <h1 className="text-2xl font-bold text-foreground dark:text-background">
            Emo-Diary
          </h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <CloseIcon />
          </button>
        </div>
        <nav className="mt-6">
          <Link
            to="/"
            onClick={handleNavigationClick}
            className={linkClass("/")}
          >
            <PlaceholderIcon />
            <span className="mx-4 font-medium">Dashboard</span>
          </Link>
          <Link
            to="/status"
            onClick={handleNavigationClick}
            className={linkClass("/status")}
          >
            <PlaceholderIcon />
            <span className="mx-4 font-medium">Status</span>
          </Link>
        </nav>
        <div className="absolute bottom-0 w-full p-6">
          <button
            onClick={toggleDarkMode}
            className="mt-4 w-full flex items-center justify-center px-4 py-2 rounded-md bg-primary-200 text-primary-700 hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 dark:bg-primary-700 dark:text-background dark:hover:bg-primary-600 dark:focus:ring-primary-500"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
            <span className="ml-2">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
