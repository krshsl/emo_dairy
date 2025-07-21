export type TreeKey = Date;
export interface TreeValue {
  emoji: string;
  name: string;
  note: string;
}

export interface reactions_type {
  emoji: string;
  name: string;
  color: string;
}

export const reactions: reactions_type[] = [
  { emoji: "🤩", name: "Rad", color: "emerald" },
  { emoji: "😊", name: "Good", color: "sky" },
  { emoji: "😐", name: "Meh", color: "slate" },
  { emoji: "😞", name: "Bad", color: "amber" },
  { emoji: "😩", name: "Awful", color: "rose" },
];

export const getMood = (moodName: string): reactions_type | undefined =>
  reactions.find((r) => r.name.includes(moodName));
