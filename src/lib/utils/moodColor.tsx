import { getMood } from "../../interface/diaryEntry";

export const getMoodColors = (moodName: string) => {
  let moodColor: string;
  const mood = getMood(moodName);

  if (!!mood) {
    moodColor = mood?.color;
  } else {
    moodColor = "neutral";
  }

  return {
    bgColor: `dark:bg-${moodColor}-700 bg-${moodColor}-500`,
    borderColor: `dark:border-${moodColor}-600 border-${moodColor}-100`,
    textColor: `dark:text-${moodColor}-100 text-${moodColor}-900`,
    textColorSecondary: `dark:text-${moodColor}-200 text-${moodColor}-700`,
    strokeFill: `dark:stroke-${moodColor}-600 stroke-${moodColor}-500 dark:fill-${moodColor}-600 fill-${moodColor}-500`,
    accentColor: `dark:${moodColor}-600 ${moodColor}-500`,
  };
};
