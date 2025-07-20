import React from "react";

import useSidebar from "../context/UseSidebar";

import HamburgerIcon from "../icons/Hamburger";
import AppRouter from "../router/AppRouter";

const MainContent: React.FC = () => {
  const { setSidebarOpen } = useSidebar();

  return (
    <div className="flex flex-1 flex-col overflow-hidden dark:bg-gray-800">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white p-4 lg:hidden dark:bg-gray-900 dark:border-gray-700">
        <span className="text-lg font-semibold text-gray-800 dark:text-white">
          My App
        </span>
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-500 focus:text-gray-600 focus:outline-none dark:text-gray-400 dark:focus:text-gray-300"
        >
          <HamburgerIcon />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-10">
        <AppRouter />
      </main>
    </div>
  );
};

export default MainContent;
