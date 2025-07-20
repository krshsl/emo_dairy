import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { insertOrUpdate } from "../../lib/tree/redBlackTree";
import { reactions } from "../../interface/dairyEntry";

const AddEntry: React.FC = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<{
    emoji: string;
    name: string;
  }>(reactions[1]);
  const [note, setNote] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

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
    <div className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-dashed border-gray-300 bg-white p-8 dark:bg-gray-800 dark:border-gray-600">
      <h1 className="text-center text-3xl font-extrabold text-gray-800 lg:text-5xl dark:text-white">
        Add New Entry
      </h1>
      <p className="mt-4 text-center text-lg text-gray-600 dark:text-gray-300">
        Add your daily note and reaction.
      </p>

      {message && (
        <div
          className={`mt-4 p-3 rounded-md text-center ${message.includes("successfully") ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"}`}
        >
          {message}
        </div>
      )}

      <div className="mt-8 w-full max-w-md">
        <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
          How was your day?
        </label>
        <div className="flex justify-around mb-6">
          {reactions.map((reaction) => (
            <button
              key={reaction.name}
              onClick={() => setSelectedEmoji(reaction)}
              className={`p-3 rounded-full text-4xl transition-transform transform hover:scale-110
                ${selectedEmoji.emoji === reaction.emoji ? "ring-4 ring-blue-500 dark:ring-blue-400" : "hover:bg-gray-200 dark:hover:bg-gray-700"}
              `}
              title={reaction.name}
            >
              {reaction.emoji}
            </button>
          ))}
        </div>

        <label
          htmlFor="note"
          className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2"
        >
          Your Note:
        </label>
        <textarea
          id="note"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          rows={5}
          placeholder="Write your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>

        <button
          onClick={handleSaveEntry}
          className="mt-6 w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-500"
        >
          Save Entry
        </button>
      </div>
    </div>
  );
};

export default AddEntry;
