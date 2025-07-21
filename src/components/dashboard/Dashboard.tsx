import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  iterateFromFirst,
  RedBlackTreeIterator,
} from "@collectable/red-black-tree";

import { getTree, insertOrUpdate, treeLen } from "../../lib/tree/redBlackTree";
import type { TreeKey, TreeValue } from "../../interface/dairyEntry";
import { reactions } from "../../interface/dairyEntry";
import { formatDateToYYYYMMDD } from "../../lib/utils/dateUtils";

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

  const generateDummyData = useCallback(() => {
    if (treeLen() === 0) {
      const now = new Date();
      for (let i = 0; i < 100; i++) {
        const date = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - i,
        );

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
    generateDummyData();
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
      className="flex h-full flex-col items-center justify-start rounded-lg border-4 border-dashed border-gray-300 bg-white p-8 dark:bg-gray-800 dark:border-gray-600 overflow-auto max-h-screen"
    >
      <h1 className="text-center text-3xl font-extrabold text-gray-800 lg:text-5xl dark:text-white">
        Daily Entries
      </h1>
      <p className="mt-4 text-center text-lg text-gray-600 dark:text-gray-300">
        Welcome to your emoji dairy! Scroll down to load more entries.
      </p>

      <button
        onClick={() => navigate("/add")}
        className="mt-6 mb-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
      >
        Add New Entry
      </button>

      <ul className="mt-8 w-full">
        {entries.map(([date, { emoji, name, note }]) => (
          <li
            key={formatDateToYYYYMMDD(date)}
            className="mb-2 rounded border border-gray-300 p-4 dark:border-gray-600 dark:bg-gray-700 flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => navigate(`/entry/${formatDateToYYYYMMDD(date)}`)}
          >
            <div className="flex justify-between items-center w-full mb-2">
              <div className="flex items-center text-xl lg:text-2xl text-gray-800 dark:text-white">
                {emoji}
                <span className="ml-2 font-semibold">{name}</span>
              </div>
              <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
                {date.toLocaleDateString()}
              </span>
            </div>
            <div className="mt-1 text-base lg:text-lg text-gray-800 dark:text-white w-full text-center">
              {note.length > TRUNCATE_LENGTH
                ? `${note.substring(0, TRUNCATE_LENGTH)}...`
                : note}
            </div>
          </li>
        ))}
      </ul>
      {!hasMore && (
        <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
          No more entries to load.
        </p>
      )}
      {hasMore && (
        <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
          Loading more...
        </p>
      )}
    </div>
  );
};

export default Dashboard;
