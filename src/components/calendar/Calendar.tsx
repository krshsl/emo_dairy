import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { iterateFrom } from "@collectable/red-black-tree";

import type { TreeKey, TreeValue } from "../../interface/dairyEntry";
import { getTree } from "../../lib/tree/redBlackTree";
import { formatDateToYYYYMMDD } from "../../lib/utils/dateUtils";
import { getMoodColors } from "../../lib/utils/moodColor";

interface CalendarEntry {
  date: Date | null;
  dayOfMonth: number | null;
  hasEntry: boolean;
  entry: TreeValue | null;
  isFuture: boolean;
}

const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Array<CalendarEntry>>([]);

  const generateCalendar = useCallback(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let days: Array<CalendarEntry> = [];

    const defaultCalendarEntry: CalendarEntry = {
      date: null,
      dayOfMonth: null,
      hasEntry: false,
      entry: null,
      isFuture: false,
    };

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(defaultCalendarEntry);
    }

    const entriesMap = new Map<string, TreeValue>();

    const startOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1,
    );
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0,
    );
    endOfMonth.setHours(0, 0, 0, 0);

    const iter = iterateFrom<TreeKey, TreeValue>(
      "gte",
      false,
      endOfMonth,
      getTree(),
    );
    let entry = iter.next();

    while (!entry.done && entry.value && entry.value.key >= startOfMonth) {
      const { key, value } = entry.value;
      entriesMap.set(key.toLocaleDateString(), value);
      entry = iter.next();
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      date.setHours(0, 0, 0, 0);
      const entry = entriesMap.get(date.toLocaleDateString());
      const isFuture = date.getTime() > today.getTime();

      days.push({
        date: date,
        dayOfMonth: i,
        hasEntry: !!entry,
        entry: !!entry ? entry : null,
        isFuture: isFuture,
      });
    }

    const totalCellsIncludingMonthDays = firstDayOfWeek + daysInMonth;
    const numRows = Math.ceil(totalCellsIncludingMonthDays / 7);
    const cellsToRender = numRows * 7;

    for (let i = days.length; i < cellsToRender; i++) {
      days.push(defaultCalendarEntry);
    }

    setCalendarDays(days);
  }, [currentMonth]);

  useEffect(() => {
    generateCalendar();
  }, [generateCalendar]);

  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth() - 1,
        1,
      );
      return newMonth;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth() + 1,
        1,
      );
      return newMonth;
    });
  };

  const handleDateClick = (day: CalendarEntry) => {
    if (day.date && day.hasEntry && !day.isFuture) {
      navigate(`/entry/${formatDateToYYYYMMDD(day.date)}`, {
        state: { from: location.pathname },
      });
    }
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(event.target.value, 10);
    setCurrentMonth((prevMonth) => {
      const newDate = new Date(prevMonth.getFullYear(), newMonth, 1);
      return newDate;
    });
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setCurrentMonth((prevMonth) => {
      const newDate = new Date(newYear, prevMonth.getMonth(), 1);
      return newDate;
    });
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isFutureMonth =
    currentMonth.getFullYear() > today.getFullYear() ||
    (currentMonth.getFullYear() === today.getFullYear() &&
      currentMonth.getMonth() >= today.getMonth());

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);

  return (
    <div className="flex h-full flex-col items-center justify-start rounded-lg border-4 border-dashed border-primary-200 bg-background p-8 dark:bg-foreground dark:border-primary-600 overflow-auto max-h-screen">
      <h1 className="text-center text-3xl font-extrabold text-foreground lg:text-5xl dark:text-background mb-6">
        Calendar
      </h1>

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
            className="text-center font-bold text-foreground dark:text-background py-2"
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
                  ${day.date ? (moodColors ? `${moodColors.bgColor1} border-${moodColors.borderColor1}` : "bg-background dark:bg-primary-700 border-primary-200 dark:border-primary-700") : "bg-primary-100 dark:bg-primary-800 border-primary-200 dark:border-primary-700"}
                  ${isToday ? "ring-2 ring-accent dark:ring-accent" : ""}
                  ${day.isFuture ? "opacity-50 cursor-not-allowed" : ""}
                  ${day.hasEntry && !day.isFuture ? "cursor-pointer hover:shadow-md" : day.date && !day.isFuture ? "cursor-default" : ""}
                `}
              onClick={() => handleDateClick(day)}
            >
              {day.dayOfMonth && (
                <span
                  className={`text-lg font-medium ${moodColors ? moodColors.textColor2 : "text-foreground dark:text-background"} absolute top-2 left-2`}
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

export default Calendar;
