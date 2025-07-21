// src/lib/utils/moodColor.js (or .ts)

export const getMoodColors = (moodName: string) => {
  switch (moodName.toLowerCase()) {
    case "rad":
      return {
        bgColor1: `bg-rad-bg-2 dark:bg-rad-bg-1`,
        bgColor2: `bg-rad-bg-1 dark:bg-rad-bg-2`,
        bgColor3: `bg-rad-bg-2 dark:bg-rad-bg-2`,
        borderColor1: `border-rad-accent-1 dark:border-rad-accent-1`,
        borderColor2: `border-rad-accent-2 dark:border-rad-accent-2`,
        textColor1: `text-rad-text-1 dark:text-rad-text-1`,
        textColor2: `text-rad-text-2 dark:text-rad-text-2`,
        textColor3: `text-rad-text-3 dark:text-rad-text-3`,
        accentColor1: `rad-accent-1`,
        accentColor2: `rad-accent-2`,
      };
    case "good":
      return {
        bgColor1: `bg-good-bg-2 dark:bg-good-bg-1`,
        bgColor2: `bg-good-bg-1 dark:bg-good-bg-2`,
        bgColor3: `bg-good-bg-2 dark:bg-good-bg-2`,
        borderColor1: `border-good-accent-1 dark:border-good-accent-1`,
        borderColor2: `border-good-accent-2 dark:border-good-accent-2`,
        textColor1: `text-good-text-1 dark:text-good-text-1`,
        textColor2: `text-good-text-2 dark:text-good-text-2`,
        textColor3: `text-good-text-3 dark:text-good-text-3`,
        accentColor1: `good-accent-1`,
        accentColor2: `good-accent-2`,
      };
    case "meh":
      return {
        bgColor1: `bg-meh-bg-2 dark:bg-meh-bg-1`,
        bgColor2: `bg-meh-bg-1 dark:bg-meh-bg-2`,
        bgColor3: `bg-meh-bg-2 dark:bg-meh-bg-2`,
        borderColor1: `border-meh-accent-1 dark:border-meh-accent-1`,
        borderColor2: `border-meh-accent-2 dark:border-meh-accent-2`,
        textColor1: `text-meh-text-1 dark:text-meh-text-1`,
        textColor2: `text-meh-text-2 dark:text-meh-text-2`,
        textColor3: `text-meh-text-3 dark:text-meh-text-3`,
        accentColor1: `meh-accent-1`,
        accentColor2: `meh-accent-2`,
      };
    case "sad":
      return {
        bgColor1: `bg-sad-bg-2 dark:bg-sad-bg-1`,
        bgColor2: `bg-sad-bg-1 dark:bg-sad-bg-2`,
        bgColor3: `bg-sad-bg-2 dark:bg-sad-bg-2`,
        borderColor1: `border-sad-accent-1 dark:border-sad-accent-1`,
        borderColor2: `border-sad-accent-2 dark:border-sad-accent-2`,
        textColor1: `text-sad-text-1 dark:text-sad-text-1`,
        textColor2: `text-sad-text-2 dark:text-sad-text-2`,
        textColor3: `text-sad-text-3 dark:text-sad-text-3`,
        accentColor1: `sad-accent-1`,
        accentColor2: `sad-accent-2`,
      };
    case "awful":
      return {
        bgColor1: `bg-awful-bg-2 dark:bg-awful-bg-1`,
        bgColor2: `bg-awful-bg-1 dark:bg-awful-bg-2`,
        bgColor3: `bg-awful-bg-2 dark:bg-awful-bg-2`,
        borderColor1: `border-awful-accent-1 dark:border-awful-accent-1`,
        borderColor2: `border-awful-accent-2 dark:border-awful-accent-2`,
        textColor1: `text-awful-text-1 dark:text-awful-text-1`,
        textColor2: `text-awful-text-2 dark:text-awful-text-2`,
        textColor3: `text-awful-text-3 dark:text-awful-text-3`,
        accentColor1: `awful-accent-1`,
        accentColor2: `awful-accent-2`,
      };
    default:
      return {
        bgColor1: `bg-primary-200 dark:bg-primary-800`,
        bgColor2: `bg-primary-100 dark:bg-primary-700`,
        bgColor3: `bg-primary-200 dark:bg-primary-700`,
        borderColor1: `border-primary-400 dark:border-primary-500`,
        borderColor2: `border-primary-500 dark:border-primary-600`,
        textColor1: `text-primary-900 dark:text-primary-100`,
        textColor2: `text-primary-700 dark:text-primary-300`,
        textColor3: `text-primary-500 dark:text-primary-400`,
        accentColor1: `primary-500`,
        accentColor2: `primary-600`,
      };
  }
};
