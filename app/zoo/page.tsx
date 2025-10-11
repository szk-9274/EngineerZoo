"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ANIMALS } from "@/data/animals"; // ✅ これにする
import { loadState, saveState, resetState } from "@/app/lib/storage";

type Gauge = { hunger: number; hygiene: number; happiness: number };
type AnimalState = Record<string, Gauge>; // key = animal.id

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function defaultGauges(): AnimalState {
  const state: AnimalState = {};
  for (const a of ANIMALS) {
    state[a.id] = { hunger: 60, hygiene: 60, happiness: 60 };
  }
  return state;
}

export default function ZooPage() {
  const initial = useMemo(() => loadState<AnimalState>(defaultGauges()), []);
  const [gauges, setGauges] = useState<AnimalState>(initial);

  // 自然減衰（30秒ごとに少し下がる）
  useEffect(() => {
    const timer = setInterval(() => {
      setGauges((prev) => {
        const next: AnimalState = {};
        for (const id in prev) {
          const g = prev[id];
          next[id] = {
            hunger: clamp(g.hunger - 2),
            hygiene: clamp(g.hygiene - 1),
            happiness: clamp(g.happiness - 1),
          };
        }
        return next;
      });
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // 変更があれば保存
  useEffect(() => {
    saveState(gauges);
  }, [gauges]);

  const act = (id: string, type: "feed" | "clean" | "play") => {
    setGauges((prev) => {
      const g = prev[id];
      const upd: Gauge = { ...g };
      if (type === "feed")      upd.hunger = clamp(g.hunger + 20);
      if (type === "clean")     upd.hygiene = clamp(g.hygiene + 20);
      if (type === "play")      upd.happiness = clamp(g.happiness + 20);
      return { ...prev, [id]: upd };
    });
  };

  const resetAll = () => {
    const d = defaultGauges();
    setGauges(d);
    resetState();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-6">
      <header className="max-w-5xl mx-auto flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Zoo（お世話）</h1>
        <div className="flex gap-3">
          <button
            onClick={resetAll}
            className="rounded-lg bg-gray-200 hover:bg-gray-300 px-3 py-2 text-sm"
          >
            リセット
          </button>
          <Link
            href="/"
            className="rounded-lg bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-500"
          >
            ← トップへ
          </Link>
        </div>
      </header>

      <section className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ANIMALS.map((a) => {
          const g = gauges[a.id];
          return (
            <article
              key={a.id}
              className={`rounded-2xl shadow-md p-5 ${a.color} flex flex-col`}
            >
              <div className="text-5xl mb-2">{a.emoji}</div>
              <h2 className="text-xl font-semibold mb-1">{a.name}</h2>
              <p className="text-xs opacity-80 mb-4">{a.category}</p>

              {/* メーター */}
              <Meter label="おなか" value={g.hunger} />
              <Meter label="きれい" value={g.hygiene} />
              <Meter label="ごきげん" value={g.happiness} />

              {/* アクション */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  onClick={() => act(a.id, "feed")}
                  className="rounded-lg bg-white/90 hover:bg-white px-2 py-2 text-sm shadow"
                >
                  🍙 Feed
                </button>
                <button
                  onClick={() => act(a.id, "clean")}
                  className="rounded-lg bg-white/90 hover:bg-white px-2 py-2 text-sm shadow"
                >
                  🧼 Clean
                </button>
                <button
                  onClick={() => act(a.id, "play")}
                  className="rounded-lg bg-white/90 hover:bg-white px-2 py-2 text-sm shadow"
                >
                  🎮 Play
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

// シンプルなメーター
function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-black/10">
        <div
          className="h-2 rounded-full bg-black/50 transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
