export type TreeKey = Date;
export interface TreeValue {
  emoji: string;
  name: string;
  note: string;
}

export const reactions = [
  { emoji: "🤩", name: "Rad" },
  { emoji: "😊", name: "Good" },
  { emoji: "😐", name: "Meh" },
  { emoji: "😞", name: "Bad" },
  { emoji: "😩", name: "Awful" },
];
