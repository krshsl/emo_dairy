import React from "react";
import { useNavigate } from "react-router-dom";

const Stats: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-dashed border-primary-200 bg-background p-8 dark:bg-foreground dark:border-primary-600">
      <h1 className="text-center text-3xl font-extrabold text-foreground lg:text-5xl dark:text-background">
        Statistics
      </h1>
      <p className="mt-4 text-center text-lg text-primary-600 dark:text-primary-300">
        This page is still under construction...
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 px-6 py-3 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default Stats;
