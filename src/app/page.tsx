"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Article = {
  category: string;
  tag: string;
  title: string;
  description: string;
  href: string;
  date: string;
  author: string;
};

const categories = [
  { id: "plugin", label: "Plugin" },
  { id: "guide", label: "Guide" },
];

const articles: Article[] = [
  {

    category: "plugin",
    tag: "Plugin",
    title: "Frontend Design Plugin",
    description:
      "プラグインあり・なしでIT企業HPの品質差を比較。同じプロンプトから生成されたページのデザイン品質を検証する。",
    href: "/comparison",
    date: "2025年3月",
    author: "藤木崇史",
  },
  {

    category: "guide",
    tag: "Guide",
    title: "プラグイン解説",
    description: "Claude Codeプラグインの導入方法・設定・活用事例をまとめた包括的ガイド。",
    href: "/overview",
    date: "2025年3月",
    author: "藤木崇史",
  },
];

export default function Home() {
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    setReady(true);
  }, []);

  const filtered = filter
    ? articles.filter((a) => a.category === filter)
    : articles;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

        .hub {
          --bg: #0a0a0a;
          --surface: #141414;
          --line: #1e1e1e;
          --ink: #e5e5e5;
          --ink2: #999;
          --ink3: #555;
          --accent: #f97316;

          min-height: 100vh;
          background: var(--bg);
          color: var(--ink);
          font-family: 'DM Sans', system-ui, sans-serif;
          padding-bottom: 3.5rem;
        }
        .hub *, .hub *::before, .hub *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* Header */
        .hub-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 3rem;
          border-bottom: 1px solid var(--line);
        }
        @media (max-width: 640px) { .hub-header { padding: 1rem 1.25rem; } }
        .hub-logo {
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .hub-logo span { color: var(--accent); }

        /* Filters — horizontal tabs like Google News */
        .hub-tabs {
          display: flex;
          gap: 0;
          padding: 0 3rem;
          border-bottom: 1px solid var(--line);
        }
        @media (max-width: 640px) { .hub-tabs { padding: 0 1.25rem; } }
        .hub-tab {
          font-size: 0.8rem;
          font-weight: 400;
          padding: 0.75rem 1.25rem;
          border: none;
          background: transparent;
          color: var(--ink3);
          cursor: pointer;
          position: relative;
          transition: color 0.15s;
        }
        .hub-tab:hover { color: var(--ink2); }
        .hub-tab-on {
          color: var(--accent);
        }
        .hub-tab-on::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 1.25rem;
          right: 1.25rem;
          height: 2px;
          background: var(--accent);
        }

        /* Content area — centered like Google */
        .hub-content {
          max-width: 780px;
          margin: 0 auto;
          padding: 0.5rem 2rem;
        }
        @media (max-width: 640px) { .hub-content { padding: 0.5rem 1.25rem; } }

        /* Article row */
        .hub-article {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--line);
          text-decoration: none;
          color: inherit;
          transition: opacity 0.15s;
        }
        .hub-article:hover { opacity: 0.75; }

        .hub-article-body {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          align-self: stretch;
        }

        .hub-article-source {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          color: var(--ink2);
          letter-spacing: 0.03em;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 3px;
          padding: 0.2rem 0.5rem;
          display: inline-block;
          width: fit-content;
        }

        .hub-article-title {
          font-size: 1.1rem;
          font-weight: 500;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }

        .hub-article-desc {
          font-size: 0.8rem;
          color: var(--ink3);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hub-article-date {
          font-size: 0.7rem;
          color: var(--ink3);
          margin-top: auto;
        }

        .hub-article-thumb {
          width: 240px;
          height: 150px;
          border-radius: 8px;
          background: var(--surface);
          border: 1px solid var(--line);
          flex-shrink: 0;
          overflow: hidden;
          position: relative;
          align-self: center;
        }
        .hub-article-thumb iframe {
          width: 1280px;
          height: 800px;
          border: none;
          transform: scale(0.1875);
          transform-origin: top left;
          pointer-events: none;
          position: absolute;
          top: 0;
          left: 0;
        }
        @media (max-width: 480px) {
          .hub-article-thumb { width: 140px; height: 88px; }
          .hub-article-thumb iframe { transform: scale(0.109); }
        }


        /* Footer */
        .hub-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0.75rem 3rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.55rem;
          color: var(--ink3);
          background: var(--bg);
          border-top: 1px solid var(--line);
        }
        @media (max-width: 640px) { .hub-footer { padding: 0.75rem 1.25rem; } }

        /* Fade */
        .fade { opacity: 0; transform: translateY(6px); }
        .fade-in { opacity: 1; transform: none; transition: all 0.4s cubic-bezier(0.22,1,0.36,1); }
      `}</style>

      <div className="hub">
        <header
          className={`hub-header fade ${ready ? "fade-in" : ""}`}
        >
          <div className="hub-logo">
            Claude Code <span>Lab</span>
          </div>
        </header>

        <nav
          className={`hub-tabs fade ${ready ? "fade-in" : ""}`}
          style={{ transitionDelay: "40ms" }}
        >
          <button
            className={`hub-tab ${filter === null ? "hub-tab-on" : ""}`}
            onClick={() => setFilter(null)}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={`hub-tab ${filter === c.id ? "hub-tab-on" : ""}`}
              onClick={() => setFilter(filter === c.id ? null : c.id)}
            >
              {c.label}
            </button>
          ))}
        </nav>

        <div className="hub-content">
          {filtered.map((a, i) => (
            <Link
              key={a.title}
              href={a.href}
              className={`hub-article fade ${ready ? "fade-in" : ""}`}
              style={{ transitionDelay: `${80 + i * 40}ms` }}
            >
              <div className="hub-article-body">
                <div className="hub-article-source">{a.tag}</div>
                <div className="hub-article-title">{a.title}</div>
                <div className="hub-article-desc">{a.description}</div>
                <div className="hub-article-date">{a.date} ・ {a.author}</div>
              </div>
              <div className="hub-article-thumb">
                <iframe src={a.href} tabIndex={-1} loading="lazy" />
              </div>
            </Link>
          ))}
        </div>

        <footer className="hub-footer">Built with Claude Code</footer>
      </div>
    </>
  );
}
