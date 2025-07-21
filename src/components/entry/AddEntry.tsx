import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getTree, insertOrUpdate } from "../../lib/tree/redBlackTree";
import { reactions } from "../../interface/dairyEntry";
import { find } from "@collectable/red-black-tree";

const AddEntry: React.FC = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<{
    emoji: string;
    name: string;
  }>(reactions[1]);
  const [note, setNote] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const tree = getTree();
    const entry = find("eq", date, tree);
    if (!!entry) {
      setSelectedEmoji({ emoji: entry.value.emoji, name: entry.value.name });
      setNote(entry.value.note);
    }
  }, []);

  const handleSaveEntry = () => {
    if (!selectedEmoji || !note.trim()) {
      setMessage("Please select an emoji and write a note.");
      return;
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    try {
      insertOrUpdate(currentDate, {
        emoji: selectedEmoji.emoji,
        name: selectedEmoji.name,
        note: note.trim(),
      });
      setMessage("Entry saved successfully!");
      setSelectedEmoji(reactions[1]);
      setNote("");
      setTimeout(() => {
        setMessage("");
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setMessage("Failed to save entry. Please try again.");
      console.error("Error saving entry:", error);
    }
  };

  return (
    <div
      className="
      flex flex-col items-center justify-start overflow-auto p-8
      h-full w-full rounded-none bg-background dark:bg-foreground

      md:h-full md:w-full md:rounded-lg
      md:border-4 md:border-dashed md:border-primary-200 md:dark:border-primary-600
    "
    >
      <h1 className="text-center text-3xl font-extrabold text-foreground lg:text-5xl dark:text-background">
        Add New Entry
      </h1>
      <p className="mt-4 text-center text-lg text-primary-600 dark:text-primary-300">
        Add your daily note and reaction.
      </p>

      {message && (
        <div
          className={`mt-4 p-3 rounded-md text-center ${message.includes("successfully") ? "bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100" : "bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-100"}`}
        >
          {message}
        </div>
      )}

      <div className="mt-8 w-full max-w-md">
        <label className="block text-lg font-medium text-primary-700 dark:text-primary-200 mb-2">
          How was your day?
        </label>
        <div className="flex justify-around mb-6">
          {reactions.map((reaction) => (
            <button
              key={reaction.name}
              onClick={() => setSelectedEmoji(reaction)}
              className={`p-3 rounded-full text-4xl transition-transform transform hover:scale-110
                  ${selectedEmoji.emoji === reaction.emoji ? "ring-4 ring-accent dark:ring-accent" : "hover:bg-primary-200 dark:hover:bg-primary-700"}
                `}
              title={reaction.name}
            >
              {reaction.emoji}
            </button>
          ))}
        </div>

        <label
          htmlFor="note"
          className="block text-lg font-medium text-primary-700 dark:text-primary-200 mb-2"
        >
          Your Note:
        </label>
        <textarea
          id="note"
          className="w-full p-3 border border-primary-200 rounded-lg focus:ring-accent focus:border-accent dark:bg-primary-700 dark:border-primary-600 dark:text-background dark:placeholder-primary-400"
          rows={5}
          placeholder="Write your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>

        <button
          onClick={handleSaveEntry}
          className="mt-6 w-full px-6 py-3 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75"
        >
          Save Entry
        </button>
      </div>
    </div>
  );
};

export default AddEntry;
