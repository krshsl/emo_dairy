import React from "react";
import type { TreeKey, TreeValue } from "../../interface/diaryEntry";
import { getMoodColors } from "../../lib/utils/moodColor";

interface MoodLinePlotProps {
  entriesForMonth: [TreeKey, TreeValue][];
  isDarkMode?: boolean;
  getMoodColors?: (
    moodName: string,
    isDarkMode: boolean,
  ) => {
    bgColor: string;
    borderColor: string;
    textColorPrimary: string;
    textColorSecondary: string;
  };
}

const MoodLinePlotComponent: React.FC<MoodLinePlotProps> = ({
  entriesForMonth,
}) => {
  const moodScale: { [key: string]: number } = {
    Rad: 5,
    Good: 4,
    Meh: 3,
    Sad: 2,
    Awful: 1,
  };

  const daysInMonth =
    entriesForMonth.length > 0
      ? new Date(
          entriesForMonth[0][0].getFullYear(),
          entriesForMonth[0][0].getMonth() + 1,
          0,
        ).getDate()
      : 30;

  const allDaysData = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    value: null as number | null,
    name: null as string | null,
  }));

  entriesForMonth.forEach(([date, entry]) => {
    const dayOfMonth = date.getDate();
    if (dayOfMonth <= daysInMonth) {
      allDaysData[dayOfMonth - 1] = {
        day: dayOfMonth,
        value: moodScale[entry.name] ?? null,
        name: entry.name,
      };
    }
  });

  const plottedData = allDaysData.filter((d) => d.value !== null) as {
    day: number;
    value: number;
    name: string;
  }[];

  const maxMoodValue = 5;
  const minMoodValue = 1;
  const range = maxMoodValue - minMoodValue;

  const svgWidth = 1000;
  const svgHeight = 250;
  const leftMargin = 100;
  const rightMargin = 20;
  const topMargin = 20;
  const bottomMargin = 40;

  const plotWidth = svgWidth - leftMargin - rightMargin;
  const plotHeight = svgHeight - topMargin - bottomMargin;

  const getX = (day: number) =>
    leftMargin +
    ((day - 1) / (daysInMonth > 1 ? daysInMonth - 1 : 1)) * plotWidth;

  const getY = (value: number) =>
    topMargin + ((maxMoodValue - value) / range) * plotHeight;

  return (
    <div className="flex flex-col items-center rounded-lg border-4 border-dashed border-primary-300 bg-primary-50 p-6 dark:bg-primary-800 dark:border-primary-700 w-full h-full">
      <h2 className="text-center text-2xl font-bold text-primary-900 lg:text-3xl dark:text-primary-50 mb-4">
        Mood Transition
      </h2>
      {plottedData.length > 0 ? (
        <div className="relative h-full w-full">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {Object.keys(moodScale)
              .reverse()
              .map((key) => {
                const val = moodScale[key];
                return (
                  <text
                    key={`y-label-${key}`}
                    x={leftMargin - 10}
                    y={getY(val)}
                    textAnchor="end"
                    alignmentBaseline="middle"
                    className="fill-primary-600 dark:fill-primary-300"
                    fontSize="14"
                  >
                    {`${key} (${val})`}
                  </text>
                );
              })}

            {Array.from({ length: Math.ceil(daysInMonth / 5) }).map((_, i) => {
              const day = i * 5 + 1;
              if (day > daysInMonth) return null;
              const xPos = getX(day);
              return (
                <text
                  key={`x-label-${day}`}
                  x={xPos}
                  y={svgHeight - bottomMargin + 20}
                  textAnchor="middle"
                  alignmentBaseline="hanging"
                  className="fill-primary-600 dark:fill-primary-300"
                  fontSize="14"
                >
                  Day {day}
                </text>
              );
            })}

            {plottedData.slice(1).map((point, index) => {
              const prev = plottedData[index];
              const x1 = getX(prev.day);
              const y1 = getY(prev.value);
              const x2 = getX(point.day);
              const y2 = getY(point.value);
              const colorClass = getMoodColors(prev.name).strokeFill;

              return (
                <line
                  key={`line-${prev.day}-${point.day}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className={colorClass}
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-primary-600 dark:text-primary-300">
            Not enough data to draw a line plot for this month.
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodLinePlotComponent;
