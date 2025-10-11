// data/animals.ts
export type Animal = {
  id: string;
  name: string;
  emoji: string;
  category: string; // Linux / Docker など
  color: string;    // Tailwindの色クラス
};

export const ANIMALS: Animal[] = [
  { id: "penguin",   name: "Penguin",   emoji: "🐧", category: "Linux",      color: "bg-blue-100 text-blue-800" },
  { id: "whale",     name: "Whale",     emoji: "🐋", category: "Docker",     color: "bg-sky-100 text-sky-800" },
  { id: "elephant",  name: "Elephant",  emoji: "🐘", category: "Database",   color: "bg-gray-100 text-gray-800" },
  { id: "owl",       name: "Owl",       emoji: "🦉", category: "Monitoring", color: "bg-indigo-100 text-indigo-800" },
  { id: "beaver",    name: "Beaver",    emoji: "🦫", category: "VCS",        color: "bg-amber-100 text-amber-800" },
  { id: "gitcat",    name: "GitCat",    emoji: "🐈‍⬛", category: "Git & Collaboration", color: "bg-[#181717] text-white" },
];
