import React from "react";

import type { TreeKey, TreeValue } from "../../interface/diaryEntry";
import { reactions } from "../../interface/diaryEntry";
import { getMoodColors } from "../../lib/utils/moodColor";

interface MoodBarPlotProps {
  entriesForMonth: [TreeKey, TreeValue][];
}

const MoodBarPlotComponent: React.FC<MoodBarPlotProps> = ({
  entriesForMonth,
}) => {
  const moodCounts: { [key: string]: number } = {};
  reactions.forEach((reaction) => {
    moodCounts[reaction.name] = 0;
  });

  entriesForMonth.forEach(([, entry]) => {
    if (moodCounts.hasOwnProperty(entry.name)) {
      moodCounts[entry.name]++;
    }
  });

  const maxCount = Math.max(...Object.values(moodCounts), 1);

  return (
    <div className="flex flex-col items-center rounded-lg border-4 border-dashed border-primary-300 bg-primary-50 p-6 dark:bg-primary-800 dark:border-primary-700 w-full h-full">
      <h2 className="text-center text-2xl font-bold text-primary-900 lg:text-3xl dark:text-primary-50 mb-4">
        Monthly Moods
      </h2>
      <div className="flex items-end justify-around w-full h-48">
        {reactions.map((reaction) => {
          const count = moodCounts[reaction.name];
          const height = (count / maxCount) * 100;
          const moodColors = getMoodColors(reaction.name);
          return (
            <div
              key={reaction.name}
              className="flex flex-col items-center h-full justify-end w-1/5 px-1"
            >
              <div
                className={`${moodColors.bgColor} ${moodColors.borderColor} border w-full rounded-t-md transition-all duration-300 ease-in-out`}
                style={{ height: `${height}%` }}
              ></div>
              <span
                className={`text-sm font-medium ${moodColors.textColor} mt-1`}
              >
                {reaction.emoji}
              </span>
              <span
                className={`text-xs text-primary-600 dark:text-primary-300`}
              >
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoodBarPlotComponent;
