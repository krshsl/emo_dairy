import React, { useState } from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-dashed border-gray-300 bg-white p-8 dark:bg-gray-800 dark:border-gray-600">
      <h1 className="text-center text-3xl font-extrabold text-gray-800 lg:text-5xl dark:text-white">
        Dashboard.
      </h1>
      <p className="mt-4 text-center text-lg text-gray-600 dark:text-gray-300">
        Welcome to your dashboard!
      </p>
    </div>
  );
};

export default Dashboard;
