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
    description:
      "Claude Codeプラグインの導入方法・設定・活用事例をまとめた包括的ガイド。",
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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');

        .hub {
          --bg: #0a0a0a;
          --surface: #141414;
          --surface2: #1a1a1a;
          --line: #1e1e1e;
          --line2: #2a2a2a;
          --ink: #f0f0f0;
          --ink2: #999;
          --ink3: #555;
          --accent: #d4804a;
          --accent-dim: rgba(249, 115, 22, 0.08);

          min-height: 100vh;
          background: var(--bg);
          color: var(--ink);
          font-family: 'DM Sans', system-ui, sans-serif;
          padding-bottom: 3.5rem;
        }
        .hub *, .hub *::before, .hub *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* Header */
        .hub-header {
          padding: 1.25rem 3rem;
          border-bottom: 1px solid var(--line);
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        @media (max-width: 640px) { .hub-header { padding: 2rem 1.25rem 1.5rem; } }

        .hub-logo {
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .hub-logo-icon {
          width: 2.4rem;
          height: 2.4rem;
          flex-shrink: 0;
          object-fit: contain;
        }
        .hub-logo span {
          color: var(--accent);
        }
        .hub-subtitle {
          font-size: 0.7rem;
          color: var(--ink3);
          letter-spacing: 0.06em;
          font-weight: 400;
        }

        /* Tabs */
        .hub-tabs {
          display: flex;
          gap: 0;
          padding: 0 3rem;
          border-bottom: 1px solid var(--line);
        }
        @media (max-width: 640px) { .hub-tabs { padding: 0 1.25rem; } }
        .hub-tab {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.85rem 1.5rem;
          border: none;
          background: transparent;
          color: var(--ink3);
          cursor: pointer;
          position: relative;
          transition: color 0.2s;
        }
        .hub-tab:hover { color: var(--ink2); }
        .hub-tab-on { color: var(--accent); }
        .hub-tab-on::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 1rem;
          right: 1rem;
          height: 2px;
          background: var(--accent);
          border-radius: 1px;
        }

        /* Content */
        .hub-content {
          max-width: 860px;
          margin: 0 auto;
          padding: 0.75rem 2.5rem;
        }
        @media (max-width: 640px) { .hub-content { padding: 0.5rem 1.25rem; } }

        /* Article */
        .hub-article {
          display: flex;
          gap: 2rem;
          padding: 2rem 1.5rem;
          margin: 0.5rem 0;
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition: background 0.2s;
        }
        .hub-article:hover {
          background: var(--surface);
        }
        @media (max-width: 640px) {
          .hub-article { padding: 1.25rem 1rem; gap: 1.25rem; }
        }

        .hub-article-body {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-self: stretch;
        }

        .hub-article-source {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          color: var(--accent);
          letter-spacing: 0.06em;
          background: var(--accent-dim);
          border: 1px solid rgba(249, 115, 22, 0.15);
          border-radius: 4px;
          padding: 0.2rem 0.6rem;
          display: inline-block;
          width: fit-content;
          text-transform: uppercase;
          font-weight: 500;
        }

        .hub-article-title {
          font-size: 1.3rem;
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: -0.02em;
        }

        .hub-article-desc {
          font-size: 0.85rem;
          color: var(--ink2);
          line-height: 1.7;
          font-weight: 300;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hub-article-meta {
          font-size: 0.7rem;
          color: var(--ink3);
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .hub-article-meta-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--ink3);
        }

        .hub-article-thumb {
          width: 260px;
          height: 162px;
          border-radius: 10px;
          background: var(--surface);
          border: 1px solid var(--line2);
          flex-shrink: 0;
          overflow: hidden;
          position: relative;
          align-self: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }
        .hub-article-thumb iframe {
          width: 1280px;
          height: 800px;
          border: none;
          transform: scale(0.203);
          transform-origin: top left;
          pointer-events: none;
          position: absolute;
          top: 0;
          left: 0;
        }
        @media (max-width: 640px) {
          .hub-article-thumb { width: 140px; height: 88px; }
          .hub-article-thumb iframe { transform: scale(0.109); }
        }

        /* Divider between articles */
        .hub-divider {
          height: 1px;
          background: var(--line);
          margin: 0 1.5rem;
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
          backdrop-filter: blur(8px);
        }
        @media (max-width: 640px) { .hub-footer { padding: 0.75rem 1.25rem; } }

        /* Fade */
        .fade { opacity: 0; transform: translateY(8px); }
        .fade-in { opacity: 1; transform: none; transition: all 0.5s cubic-bezier(0.22,1,0.36,1); }
      `}</style>

      <div className="hub">
        <header
          className={`hub-header fade ${ready ? "fade-in" : ""}`}
        >
          <div className="hub-logo">
            <img className="hub-logo-icon" src="/icon.webp" alt="Claude Code" />
            Claude Code <span>Lab</span>
          </div>
          <div className="hub-subtitle">Knowledge Hub</div>
        </header>

        <nav
          className={`hub-tabs fade ${ready ? "fade-in" : ""}`}
          style={{ transitionDelay: "50ms" }}
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
            <div key={a.title}>
              {i > 0 && <div className="hub-divider" />}
              <Link
                href={a.href}
                className={`hub-article fade ${ready ? "fade-in" : ""}`}
                style={{ transitionDelay: `${100 + i * 60}ms` }}
              >
                <div className="hub-article-body">
                  <div className="hub-article-source">{a.tag}</div>
                  <div className="hub-article-title">{a.title}</div>
                  <div className="hub-article-desc">{a.description}</div>
                  <div className="hub-article-meta">
                    <span>{a.author}</span>
                    <span className="hub-article-meta-dot" />
                    <span>{a.date}</span>
                  </div>
                </div>
                <div className="hub-article-thumb">
                  <iframe src={a.href} tabIndex={-1} loading="lazy" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        <footer className="hub-footer">Built with Claude Code</footer>
      </div>
    </>
  );
}
