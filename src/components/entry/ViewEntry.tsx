import React, { useEffect, useState } from "react";
import { Path, useLocation, useNavigate, useParams } from "react-router-dom";

import { find } from "@collectable/red-black-tree";

import type { TreeKey, TreeValue } from "../../interface/dairyEntry";
import { getTree } from "../../lib/tree/redBlackTree";
import { parseYYYYMMDDToDate } from "../../lib/utils/dateUtils";
import { getMoodColors } from "../../lib/utils/moodColor";

interface EntryDetailParams extends Record<string, string | undefined> {
  dateString?: string;
}

const EntryDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [backState, setBack] = useState<[String, string | Partial<Path>]>([
    "Dashboard",
    "/dashboard",
  ]);
  const { dateString } = useParams<EntryDetailParams>();
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

    if (location.state?.from === "/status") {
      setBack(["Status", "/status"]);
    }
  }, [dateString, location]);

  if (!entry) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-dashed border-primary-200 bg-background p-8 dark:bg-foreground dark:border-primary-600">
        <h1 className="text-center text-3xl font-extrabold text-foreground lg:text-5xl dark:text-background">
          Entry Not Found
        </h1>
        <p className="mt-4 text-center text-lg text-primary-600 dark:text-primary-300">
          The diary entry for {displayDate || "the specified date"} could not be
          found.
        </p>
        <button
          onClick={() => navigate(backState[1])}
          className="mt-6 px-6 py-3 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75"
        >
          Back to {backState[0]}
        </button>
      </div>
    );
  }

  const { emoji, name, note } = entry[1];
  const moodColors = getMoodColors(name);
  console.log(moodColors);

  return (
    <div
      className="
      flex flex-col items-center justify-start overflow-auto p-8
      h-full w-full rounded-none bg-background dark:bg-foreground

      md:h-full md:w-full md:rounded-lg
      md:border-4 md:border-dashed md:border-primary-200 md:dark:border-primary-600
    "
    >
      <h1 className="text-center text-3xl font-extrabold text-foreground lg:text-5xl dark:text-background mb-6">
        Diary Entry
      </h1>
      <p className="mt-4 text-center text-lg text-primary-600 dark:text-primary-300 mb-8">
        View the full details of your diary entry.
      </p>

      <div
        className={`mt-8 w-full max-w-md p-6 rounded-lg shadow-md border ${moodColors.borderColor1} ${moodColors.bgColor1}`}
      >
        <div className="flex justify-between items-center w-full mb-4">
          <div
            className={`flex items-center text-3xl lg:text-4xl ${moodColors.textColor2}`}
          >
            {emoji} <span className="ml-3 font-bold">{name}</span>
          </div>
          <span className={`font-mono text-base ${moodColors.textColor3}`}>
            {displayDate}
          </span>
        </div>
        <div
          className={`text-lg lg:text-xl leading-relaxed whitespace-pre-wrap p-3 border ${moodColors.borderColor2} rounded-lg ${moodColors.bgColor2} ${moodColors.textColor2}`}
        >
          {note}
        </div>
        <button
          onClick={() => navigate(backState[1])}
          className="mt-6 w-full px-6 py-3 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75"
        >
          Back to {backState[0]}
        </button>
      </div>
    </div>
  );
};

export default EntryDetail;
