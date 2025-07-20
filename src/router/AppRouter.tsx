import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../components/dashboard/Dashboard";
import AddEntry from "../components/entry/AddEntry";
import Stats from "../components/stats/Stats";
import Calendar from "../components/calendar/Calendar";
import EntryDetail from "../components/entry/ViewEntry";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add" element={<AddEntry />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/entry/:dateString" element={<EntryDetail />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRouter;
