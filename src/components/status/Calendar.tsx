import React from "react";
import { TreeValue } from "../../interface/diaryEntry";
import { getMoodColors } from "../../lib/utils/moodColor";

interface CalendarEntry {
  date: Date | null;
  dayOfMonth: number | null;
  hasEntry: boolean;
  entry: TreeValue | null;
  isFuture: boolean;
}

interface CalendarProps {
  currentMonth: Date;
  calendarDays: CalendarEntry[];
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  handleMonthChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleYearChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDateClick: (day: CalendarEntry) => void;
  daysOfWeek: string[];
  today: Date;
  isFutureMonth: boolean;
  years: number[];
}

const CalendarComponent: React.FC<CalendarProps> = ({
  currentMonth,
  calendarDays,
  goToPreviousMonth,
  goToNextMonth,
  handleMonthChange,
  handleYearChange,
  handleDateClick,
  daysOfWeek,
  today,
  isFutureMonth,
  years,
}) => {
  return (
    <div className="flex flex-col items-center justify-start rounded-lg border-4 border-dashed border-primary-300 bg-primary-50 p-6 dark:bg-primary-800 dark:border-primary-700 w-full mb-8">
      <h2 className="text-center text-2xl font-bold text-primary-900 lg:text-3xl dark:text-primary-50 mb-4">
        Calendar View
      </h2>
      <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-4 gap-2 sm:gap-4">
        <button
          onClick={goToPreviousMonth}
          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-700 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75"
        >
          &lt; Previous
        </button>

        <div className="flex gap-2 w-full sm:w-auto justify-center">
          <select
            value={currentMonth.getMonth()}
            onChange={handleMonthChange}
            className="p-2 border border-primary-200 rounded-lg bg-primary-100 text-foreground dark:bg-primary-700 dark:text-background dark:border-primary-600"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
          <select
            value={currentMonth.getFullYear()}
            onChange={handleYearChange}
            className="p-2 border border-primary-200 rounded-lg bg-primary-100 text-foreground dark:bg-primary-700 dark:text-background dark:border-primary-600"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={goToNextMonth}
          disabled={isFutureMonth}
          className={`px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-700 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75
                      ${isFutureMonth ? "opacity-50 cursor-not-allowed" : ""}
                    `}
        >
          Next &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 w-full border border-primary-200 dark:border-primary-700 rounded-lg p-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center font-bold text-primary-700 dark:text-primary-300 py-2"
          >
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => {
          const moodColors = day.entry?.name
            ? getMoodColors(day.entry?.name)
            : null;
          const isToday =
            day.date && day.date.toDateString() === today.toDateString();

          return (
            <div
              key={index}
              className={`
                  relative flex flex-col items-center justify-center p-3 h-28 sm:h-32 md:h-36 lg:h-40 border rounded-lg transition-colors duration-200
                  ${day.date ? (moodColors ? `${moodColors.bgColor} border-${moodColors.borderColor}` : "bg-primary-100 dark:bg-primary-700 border-primary-200 dark:border-primary-600") : "bg-primary-200 dark:bg-primary-800 border-primary-300 dark:border-primary-700"}
                  ${isToday ? "ring-4 ring-teal-900 dark:ring-teal-400" : ""}
                  ${day.isFuture ? "opacity-50 cursor-not-allowed" : ""}
                  ${day.hasEntry && !day.isFuture ? "cursor-pointer hover:shadow-md" : day.date && !day.isFuture ? "cursor-default" : ""}
                `}
              onClick={() => handleDateClick(day)}
            >
              {day.dayOfMonth && (
                <span
                  className={`text-lg font-medium ${moodColors ? moodColors.textColor : "text-primary-900 dark:text-primary-50"} absolute top-2 left-2`}
                >
                  {day.dayOfMonth}
                </span>
              )}
              {day.hasEntry && day.entry?.emoji && (
                <span className="absolute bottom-2 right-2 text-xl">
                  {day.entry?.emoji}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarComponent;
