import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { find } from "@collectable/red-black-tree";

import type { TreeKey, TreeValue } from "../../interface/dairyEntry";
import { getTree } from "../../lib/tree/redBlackTree";
import { parseYYYYMMDDToDate } from "../../lib/utils/dateUtils";

interface EntryDetailParams extends Record<string, string | undefined> {
  dateString?: string;
}

const EntryDetail: React.FC = () => {
  const { dateString } = useParams<EntryDetailParams>();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<[TreeKey, TreeValue] | undefined>(
    undefined,
  );
  const [displayDate, setDisplayDate] = useState<string>("");

  useEffect(() => {
    if (dateString) {
      const targetDate = parseYYYYMMDDToDate(dateString);
      const tree = getTree();
      const entry = find("eq", targetDate, tree);

      if (entry) {
        setEntry([entry.key, entry.value]);
        setDisplayDate(entry.key.toLocaleDateString());
      } else {
        setEntry(undefined);
        setDisplayDate("Entry not found");
      }
    }
  }, [dateString]);

  if (!entry) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-dashed border-gray-300 bg-white p-8 dark:bg-gray-800 dark:border-gray-600">
        <h1 className="text-center text-3xl font-extrabold text-gray-800 lg:text-5xl dark:text-white">
          Entry Not Found
        </h1>
        <p className="mt-4 text-center text-lg text-gray-600 dark:text-gray-300">
          The diary entry for {displayDate || "the specified date"} could not be
          found.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const { emoji, name, note } = entry[1];

  return (
    <div className="flex h-full flex-col items-center justify-start rounded-lg border-4 border-dashed border-gray-300 bg-white p-8 dark:bg-gray-800 dark:border-gray-600 overflow-auto">
      <h1 className="text-center text-3xl font-extrabold text-gray-800 lg:text-5xl dark:text-white mb-6">
        Diary Entry
      </h1>
      <p className="mt-4 text-center text-lg text-gray-600 dark:text-gray-300 mb-8">
        View the full details of your diary entry.
      </p>

      {/* Content without a direct wrapper, using flexbox for organization */}
      <div className="flex flex-col w-full max-w-3xl px-4">
        {" "}
        {/* Adjusted width and added padding */}
        <div className="flex justify-between items-center w-full mb-4">
          <div className="flex items-center text-3xl lg:text-4xl text-gray-800 dark:text-white">
            {emoji} <span className="ml-3 font-bold">{name}</span>
          </div>
          <span className="font-mono text-base text-gray-600 dark:text-gray-300">
            {displayDate}
          </span>
        </div>
        <div className="text-lg lg:text-xl text-gray-800 dark:text-white leading-relaxed whitespace-pre-wrap p-3 border border-gray-300 rounded-lg dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
          {" "}
          {/* Added background to note */}
          {note}
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default EntryDetail;
