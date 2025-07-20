import React from "react";
import useTheme from "../context/UseTheme";
import useSidebar from "../context/UseSidebar";
import PlaceholderIcon from "../icons/Placeholder";
import CloseIcon from "../icons/Close";
import SunIcon from "../icons/Sun";
import MoonIcon from "../icons/Moon";

const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const { isDarkMode, toggleDarkMode } = useTheme();

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
                      fixed inset-y-0 left-0 z-30 w-64 flex-shrink-0 transform bg-white shadow-md transition-transform duration-300 ease-in-out
                      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} /* Mobile toggle */
                      lg:static lg:inset-auto lg:translate-x-0 lg:block /* Desktop overrides: always visible, static position, display block */
                      dark:bg-gray-900 dark:shadow-lg
                    `}
      >
        <div className="flex items-center justify-between p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            My App
          </h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <CloseIcon />
          </button>
        </div>
        <nav className="mt-6">
          <a
            href="/"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <PlaceholderIcon />
            <span className="mx-4 font-medium">Dashboard</span>
          </a>
          <a
            href="/calendar"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <PlaceholderIcon />
            <span className="mx-4 font-medium">Calendar</span>
          </a>
          <a
            href="/stats"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <PlaceholderIcon />
            <span className="mx-4 font-medium">Stats</span>
          </a>
        </nav>
        <div className="absolute bottom-0 w-full p-6">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            This is a sidebar
          </p>
          <button
            onClick={toggleDarkMode}
            className="mt-4 w-full flex items-center justify-center px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500"
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
