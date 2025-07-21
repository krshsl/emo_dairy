import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  iterateFromFirst,
  RedBlackTreeIterator,
} from "@collectable/red-black-tree";

import { getTree, insertOrUpdate, treeLen } from "../../lib/tree/redBlackTree";
import type { TreeKey, TreeValue } from "../../interface/diaryEntry";
import { reactions } from "../../interface/diaryEntry";
import { formatDateToYYYYMMDD } from "../../lib/utils/dateUtils";
import { getMoodColors } from "../../lib/utils/moodColor";

const PAGE_SIZE = 10;
const TRUNCATE_LENGTH = 100;

const Dashboard: React.FC = () => {
  const [entries, setEntries] = useState<[TreeKey, TreeValue][]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const rbIterRef = useRef<RedBlackTreeIterator<TreeKey, TreeValue> | null>(
    null,
  );
  const navigate = useNavigate();

  const _generateDummyData = useCallback(() => {
    if (treeLen() === 0) {
      const now = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(now.getMonth() - 6);

      for (let i = 0; i < 100; i++) {
        const randomTime =
          sixMonthsAgo.getTime() +
          Math.random() * (now.getTime() - sixMonthsAgo.getTime());
        const date = new Date(randomTime);

        const random = Math.floor(Math.random() * reactions.length);
        insertOrUpdate(date, {
          emoji: reactions[random].emoji,
          name: reactions[random].name,
          note: `This is a dummy note for ${date.toLocaleDateString()}. It's a bit longer to test the truncation feature. We want to make sure that if the note is very long, it still displays correctly with an ellipsis. This part of the note should be truncated.`,
        });
      }
    }
  }, []);

  useEffect(() => {
    // _generateDummyData();
    loadMoreEntries();
  });

  const loadMoreEntries = useCallback(() => {
    const tree = getTree();
    const allEntriesCount = treeLen();

    if (loadedCount >= allEntriesCount || !hasMore) {
      setHasMore(false);
      return;
    }

    if (!rbIterRef.current) {
      rbIterRef.current = iterateFromFirst(tree);
    }

    const newEntries: [TreeKey, TreeValue][] = [];
    let fetchedCount = 0;

    let currentEntry = rbIterRef.current.next();
    while (fetchedCount < PAGE_SIZE && !currentEntry.done) {
      newEntries.push([currentEntry.value.key, currentEntry.value.value]);
      fetchedCount++;
      currentEntry = rbIterRef.current.next();
    }

    setEntries((prev) => [...prev, ...newEntries]);
    const newLoadedCount = loadedCount + newEntries.length;
    setLoadedCount(newLoadedCount);

    if (newLoadedCount >= allEntriesCount || newEntries.length === 0) {
      setHasMore(false);
    }
  }, [loadedCount, hasMore]);

  const handleScroll = useCallback(() => {
    const element = scrollContainerRef.current;
    if (element) {
      const { scrollTop, scrollHeight, clientHeight } = element;

      if (scrollHeight - scrollTop - clientHeight < 200 && hasMore) {
        loadMoreEntries();
      }
    }
  }, [loadMoreEntries, hasMore]);

  useEffect(() => {
    const element = scrollContainerRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => element.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  return (
    <div
      ref={scrollContainerRef}
      className="
      flex flex-col items-center justify-start overflow-auto p-8
      h-full w-full rounded-none bg-background dark:bg-foreground

      md:h-full md:w-full md:rounded-lg
      md:border-4 md:border-dashed md:border-primary-200 md:dark:border-primary-600
    "
    >
      <h1 className="text-center text-3xl font-extrabold text-foreground lg:text-5xl dark:text-background">
        Daily Entries
      </h1>
      <p className="mt-4 text-center text-lg text-primary-600 dark:text-primary-300">
        Welcome to your emoji diary! Scroll down to load more entries.
      </p>

      <button
        onClick={() => navigate("/add")}
        className="mt-6 mb-8 px-6 py-3 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75"
      >
        Add New Entry
      </button>

      <ul className="mt-8 w-full">
        {entries.map(([date, { emoji, name, note }]) => {
          const moodColors = getMoodColors(name);
          return (
            <li
              key={formatDateToYYYYMMDD(date)}
              className={`mb-2 rounded-lg border ${moodColors.borderColor} p-4 ${moodColors.bgColor} flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-200 relative`}
              onClick={() => navigate(`/entry/${formatDateToYYYYMMDD(date)}`)}
            >
              <div className="flex justify-between items-center w-full mb-2">
                <div
                  className={`flex items-center text-xl lg:text-2xl ${moodColors.textColor}`}
                >
                  <span className="font-semibold">{name}</span>
                </div>
                <span className={`font-mono text-base ${moodColors.textColor}`}>
                  {date.toLocaleDateString()}
                </span>
              </div>
              <div
                className={`mt-1 text-base lg:text-lg ${moodColors.textColor} w-full text-center`}
              >
                {note.length > TRUNCATE_LENGTH
                  ? `${note.substring(0, TRUNCATE_LENGTH)}...`
                  : note}
              </div>
              <span className="absolute bottom-2 right-2 text-3xl">
                {emoji}
              </span>
            </li>
          );
        })}
      </ul>
      {!hasMore && (
        <p className="mt-4 text-center text-primary-500 dark:text-primary-400">
          No more entries to load.
        </p>
      )}
      {hasMore && (
        <p className="mt-4 text-center text-primary-500 dark:text-primary-400">
          Loading more...
        </p>
      )}
    </div>
  );
};

export default Dashboard;
