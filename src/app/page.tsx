"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

type Article = {
  category: string;
  tag: string;
  title: string;
  description: string;
  href: string;
  date: string;
  author: string;
  github?: string;
  accent: string;
  thumb: string;
};

const categories = [
  { id: "all", label: "All" },
  { id: "plugin", label: "Plugin" },
  { id: "skill", label: "Skill" },
  { id: "guide", label: "Guide" },
];

const articles: Article[] = [
  {
    category: "guide",
    tag: "Guide",
    title: "Claude Opus 4.7 まとめ",
    description:
      "Anthropic現行最上位モデル「Opus 4.7」の特徴を editorial × technical なロングスクロールで解説。ベンチマーク比較・4つの進化・仕様まで。",
    href: "/opus-4-7",
    date: "2026/4/17",
    author: "藤木崇史",
    accent: "#f59e0b",
    thumb: "/thumbs/opus-4-7.svg",
  },
  {
    category: "guide",
    tag: "Guide",
    title: "Claude Mythos Preview まとめ",
    description:
      "Anthropic史上最強のAIモデル「Mythos」の全貌。ベンチマーク、安全性、価格情報を神話的なビジュアルで解説。",
    href: "/mythos",
    date: "2026/4/8",
    author: "藤木崇史",
    accent: "#a855f7",
    thumb: "/thumbs/mythos.png",
  },
  {
    category: "guide",
    tag: "Guide",
    title: "Best Practice まとめ",
    description:
      "26,500+ Starsのコミュニティガイドを視覚的に解説。86個のTips、7つのコア機能、主要ワークフローをSVGアニメーション付きで。",
    href: "/best-practice",
    date: "2026/3/31",
    author: "藤木崇史",
    github: "https://github.com/shanraisshan/claude-code-best-practice",
    accent: "#34d399",
    thumb: "/thumbs/best-practice.png",
  },
  {
    category: "skill",
    tag: "Skill",
    title: "Website Clone Skill",
    description:
      "Claude CodeのSkill機能でWebサイトを自動クローン。S3 Seismicのサイトをピクセルパーフェクトに再現したデモ。",
    href: "/s3seismic",
    date: "2026/3/30",
    author: "藤木崇史",
    accent: "#38bdf8",
    thumb: "/thumbs/s3seismic.png",
  },
  {
    category: "plugin",
    tag: "Plugin",
    title: "Frontend Design Plugin",
    description:
      "プラグインあり・なしでIT企業HPの品質差を比較。同じプロンプトから生成されたページのデザイン品質を検証する。",
    href: "/comparison",
    date: "2026/3/20",
    author: "藤木崇史",
    accent: "#f59e0b",
    thumb: "/thumbs/comparison.png",
  },
];

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOk(true); o.disconnect(); } },
      { threshold }
    );
    o.observe(el);
    return () => o.disconnect();
  }, [threshold]);
  return { ref, ok };
}

function Card({ article, index }: { article: Article; index: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transition: `opacity 0.5s ease ${index * 100}ms`,
      }}
    >
      <Link href={article.href} className="tf-card">
        {/* Thumbnail */}
        <div className="tf-thumb">
          <img src={article.thumb} alt={article.title} className="tf-thumb-img" loading="lazy" />
          <div className="tf-tag" style={{ background: article.accent }}>
            {article.tag}
          </div>
        </div>
        {/* Body */}
        <div className="tf-body">
          <h3 className="tf-title">{article.title}</h3>
          <p className="tf-desc">{article.description}</p>
          <div className="tf-meta">
            <span>{article.author}</span>
            <span className="tf-dot" />
            <span>{article.date}</span>
            {article.github && (
              <>
                <span className="tf-dot" />
                <span
                  className="tf-gh"
                  role="link"
                  tabIndex={0}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(article.github, "_blank"); }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                  GitHub
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Home() {
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState("all");
  const [filterKey, setFilterKey] = useState(0);
  const tabRefs = useRef<Record<string, HTMLButtonElement>>({});
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useEffect(() => { setReady(true); }, []);

  useEffect(() => {
    const el = tabRefs.current[filter];
    if (!el) return;
    const nav = el.parentElement;
    if (!nav) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = el.getBoundingClientRect();
    setSliderStyle({
      left: btnRect.left - navRect.left + 16,
      width: btnRect.width - 32,
    });
  }, [filter, ready]);

  const handleFilter = (id: string) => {
    setFilter(id);
    setFilterKey((k) => k + 1);
  };

  const filtered = filter === "all" ? articles : articles.filter((a) => a.category === filter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');

        .tf {
          --bg: #09090b;
          --surface: #111113;
          --surface2: #18181b;
          --card: #111113;
          --line: #1e1e22;
          --line2: #27272a;
          --ink: #f0f0f0;
          --ink2: #a1a1aa;
          --ink3: #52525b;
          --accent: #f59e0b;

          min-height: 100vh;
          background: var(--bg);
          color: var(--ink);
          font-family: 'DM Sans', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .tf *, .tf *::before, .tf *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ─── Header ─── */
        .tf-header {
          padding: 1.25rem 3rem;
          border-bottom: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        @media (max-width: 640px) { .tf-header { padding: 1rem 1.25rem; } }

        .tf-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .tf-logo-icon {
          width: 2.6rem;
          height: 2.6rem;
          object-fit: contain;
          border-radius: 6px;
        }
        .tf-logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.03em;
        }
        .tf-logo-text em {
          font-style: normal;
          color: var(--accent);
        }
        @media (max-width: 640px) {
          .tf-logo-icon { width: 2rem; height: 2rem; }
          .tf-logo-text { font-size: 1.05rem; }
        }

        .tf-header-sub {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          color: var(--ink3);
          letter-spacing: 0.06em;
        }

        /* ─── Filters ─── */
        .tf-filters {
          display: flex;
          gap: 0;
          padding: 0 3rem;
          border-bottom: 1px solid var(--line);
        }
        @media (max-width: 640px) { .tf-filters { padding: 0 1.25rem; } }

        .tf-fbtn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          padding: 0.8rem 1.35rem;
          border: none;
          background: transparent;
          color: var(--ink3);
          cursor: pointer;
          position: relative;
          transition: color 0.2s;
        }
        @media (max-width: 640px) { .tf-fbtn { font-size: 0.75rem; padding: 0.7rem 1rem; } }
        .tf-fbtn:hover { color: var(--ink2); }
        .tf-fbtn-on { color: var(--accent); }

        .tf-slider {
          position: absolute;
          bottom: 0;
          height: 2px;
          background: var(--accent);
          border-radius: 1px;
          transition: left 0.35s cubic-bezier(0.22, 1, 0.36, 1), width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 2;
        }

        /* ─── Grid ─── */
        .tf-content {
          max-width: 920px;
          margin: 0 auto;
          padding: 1.5rem 2.5rem 3rem;
        }
        @media (max-width: 640px) { .tf-content { padding: 1rem 1.25rem 2.5rem; } }

        /* ─── Card ─── */
        .tf-card {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 1.75rem;
          text-decoration: none;
          color: inherit;
          padding: 1.5rem;
          border-radius: 12px;
          transition: background 0.25s;
          position: relative;
        }
        .tf-card:hover { background: var(--surface); }
        @media (max-width: 700px) {
          .tf-card {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 1.25rem 0.75rem;
          }
        }

        .tf-thumb {
          aspect-ratio: 16 / 10;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          background: var(--surface2);
          border: 1px solid var(--line2);
          transition: border-color 0.3s;
        }
        .tf-card:hover .tf-thumb { border-color: var(--ink3); }
        .tf-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .tf-tag {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.5rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #000;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          z-index: 2;
        }

        .tf-body {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          justify-content: center;
          min-width: 0;
        }

        .tf-title {
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.3;
        }
        @media (max-width: 640px) { .tf-title { font-size: 1.05rem; } }

        .tf-desc {
          font-size: 0.84rem;
          color: var(--ink2);
          line-height: 1.7;
          font-weight: 300;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tf-meta {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          color: var(--ink3);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: auto;
          padding-top: 0.25rem;
        }
        .tf-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--ink3);
          flex-shrink: 0;
        }
        .tf-gh {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          cursor: pointer;
          transition: color 0.2s;
        }
        .tf-gh:hover { color: var(--accent); }

        /* Divider */
        .tf-divider {
          height: 1px;
          background: var(--line);
          margin: 0 1.5rem;
        }
        @media (max-width: 640px) { .tf-divider { margin: 0 0.75rem; } }

        /* Footer */
        .tf-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0.65rem 3rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.55rem;
          color: var(--ink3);
          background: var(--bg);
          border-top: 1px solid var(--line);
        }
        @media (max-width: 640px) { .tf-footer { padding: 0.65rem 1.25rem; } }

        /* Empty */
        .tf-empty {
          text-align: center;
          padding: 4rem 2rem;
          font-size: 0.9rem;
          color: var(--ink3);
        }

        /* Fade util */
        .fade { opacity: 0; transform: translateY(6px); }
        .fade-in { opacity: 1; transform: none; transition: all 0.5s cubic-bezier(0.22,1,0.36,1); }
      `}</style>

      <div className="tf" suppressHydrationWarning>
        {/* Header */}
        <header className={`tf-header fade ${ready ? "fade-in" : ""}`}>
          <div className="tf-logo">
            <img className="tf-logo-icon" src="/icon.webp" alt="" />
            <div className="tf-logo-text">Team F <em>Lab</em></div>
          </div>
          <div className="tf-header-sub">Knowledge Hub</div>
        </header>

        {/* Filters */}
        <nav className={`tf-filters fade ${ready ? "fade-in" : ""}`} style={{ transitionDelay: "50ms", position: "relative" }}>
          {categories.map((c) => (
            <button
              key={c.id}
              ref={(el) => { if (el) tabRefs.current[c.id] = el; }}
              className={`tf-fbtn ${filter === c.id ? "tf-fbtn-on" : ""}`}
              onClick={() => handleFilter(c.id)}
            >
              {c.label}
            </button>
          ))}
          <div className="tf-slider" style={{ left: sliderStyle.left, width: sliderStyle.width }} />
        </nav>

        {/* Cards */}
        <div className="tf-content" style={{ paddingBottom: "4rem" }}>
          {filtered.length === 0 ? (
            <div className="tf-empty">No articles yet.</div>
          ) : (
            filtered.map((a, i) => (
              <div key={`${filterKey}-${a.title}`}>
                {i > 0 && <div className="tf-divider" />}
                <Card article={a} index={i} />
              </div>
            ))
          )}
        </div>

        <footer className="tf-footer">Built with Claude Code</footer>
      </div>
    </>
  );
}
