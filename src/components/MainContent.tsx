import React from "react";
import { useNavigate } from "react-router-dom";

import useSidebar from "../context/UseSidebar";

import HamburgerIcon from "../icons/Hamburger";
import AppRouter from "../router/AppRouter";

const MainContent: React.FC = () => {
  const { setSidebarOpen } = useSidebar();
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col overflow-hidden dark:bg-foreground">
      <header className="flex items-center justify-between border-b border-primary-200 bg-background p-4 lg:hidden dark:bg-foreground dark:border-primary-700">
        <span className="text-lg font-semibold text-foreground dark:text-background">
          <button onClick={() => navigate("/")}>Emo-Diary</button>
        </span>
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-primary-500 focus:text-primary-600 focus:outline-none dark:text-primary-400 dark:focus:text-primary-300"
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
