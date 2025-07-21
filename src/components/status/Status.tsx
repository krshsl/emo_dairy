import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { iterateFrom } from "@collectable/red-black-tree";

import type { TreeKey, TreeValue } from "../../interface/dairyEntry";
import { getTree } from "../../lib/tree/redBlackTree";
import { formatDateToYYYYMMDD } from "../../lib/utils/dateUtils";
import CalendarComponent from "./Calendar";
import MoodBarPlotComponent from "./MoodBar";
import MoodLinePlotComponent from "./MoodLine";

interface CalendarEntry {
  date: Date | null;
  dayOfMonth: number | null;
  hasEntry: boolean;
  entry: TreeValue | null;
  isFuture: boolean;
}

const Status: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Array<CalendarEntry>>([]);
  const [entriesForMonth, setEntriesForMonth] = useState<
    [TreeKey, TreeValue][]
  >([]);

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

    setEntriesForMonth([]);
    while (!entry.done && entry.value && entry.value.key >= startOfMonth) {
      const { key, value } = entry.value;
      entriesMap.set(key.toLocaleDateString(), value);
      setEntriesForMonth((prev) => [...prev, [key, value]]);
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
    <div
      className="
      flex flex-col items-center justify-start overflow-auto
      h-full w-full rounded-none bg-background dark:bg-foreground

      md:h-full md:w-full md:rounded-lg md:p-8
      md:border-4 md:border-dashed md:border-primary-200 md:dark:border-primary-600
    "
    >
      <h1 className="text-center text-3xl font-extrabold text-foreground lg:text-5xl dark:text-background mb-6">
        Monthly Status
      </h1>

      <CalendarComponent
        currentMonth={currentMonth}
        calendarDays={calendarDays}
        goToPreviousMonth={goToPreviousMonth}
        goToNextMonth={goToNextMonth}
        handleMonthChange={handleMonthChange}
        handleYearChange={handleYearChange}
        handleDateClick={handleDateClick}
        daysOfWeek={daysOfWeek}
        today={today}
        isFutureMonth={isFutureMonth}
        years={years}
      />

      <div className="flex flex-col lg:flex-row w-full gap-8 mt-8">
        <div className="w-full lg:w-1/2">
          <MoodBarPlotComponent entriesForMonth={entriesForMonth} />
        </div>

        <div className="w-full lg:w-1/2">
          <MoodLinePlotComponent entriesForMonth={entriesForMonth} />
        </div>
      </div>
    </div>
  );
};

export default Status;
