"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

// ✅ ここを修正
import { ANIMALS, Animal } from "@/data/animals";

// （相対でもOKだが、統一のためエイリアスで）
import { loadState, saveState } from "@/app/lib/storage";



export default function Home() {
  const techList = [
    {
      name: "Linux",
      animal: "🐧",
      desc: "自由と安定の象徴。ペンギンのTuxがマスコット。",
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Docker",
      animal: "🐋",
      desc: "コンテナの海を泳ぐクジラ。環境構築を軽くする。",
      color: "bg-sky-100 text-sky-800",
    },
    {
      name: "GitHub",
      animal: "🐙",
      desc: "コードの海に潜むタコ。バージョン管理の王様。",
      color: "bg-gray-100 text-gray-800",
    },
    {
      name: "Python",
      animal: "🐍",
      desc: "シンプルで力強いヘビ。機械学習や自動化に強い。",
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Kubernetes",
      animal: "🦑",
      desc: "クジラたちを操るイカ。クラスタ管理の司令塔。",
      color: "bg-indigo-100 text-indigo-800",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Engineer Zoo 🧑‍💻🦁
      </h1>
      <p className="text-gray-700 text-center max-w-2xl mb-10">
        エンジニアの世界には、いろんな技術があり、  
        それぞれに個性的な「動物の象徴」がいます。  
        この動物園では、それらをやさしく紹介していきます。
      </p>
        <Link
          href="/zoo"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 text-white px-6 py-3 font-semibold shadow hover:bg-blue-500 transition"
        >
          動物たちと戯れる（/zoo）
        </Link>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        {techList.map((tech) => (
          <div
            key={tech.name}
            className={`rounded-2xl shadow-md hover:shadow-lg transition p-6 ${tech.color}`}
          >
            <div className="text-5xl mb-3">{tech.animal}</div>
            <h2 className="text-2xl font-semibold mb-2">{tech.name}</h2>
            <p className="text-sm leading-relaxed">{tech.desc}</p>
          </div>
        ))}
      </div>

      
    </main>
  );
}

