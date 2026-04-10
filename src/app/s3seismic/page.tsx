"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";

const specimens = [
  {
    id: "skill",
    name: "/clone-website スキル",
    desc: "スキルによる自動クローン",
    url: "/s3seismic/clone",
    href: "/s3seismic/clone",
  },
  {
    id: "direct",
    name: "直接指示",
    desc: "プロンプトで直接指示",
    url: "/s3seismic/clone/prompt",
    href: "/s3seismic/clone/prompt",
  },
];

export default function S3ComparisonPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@300;400;500&display=swap');

        .gal {
          --bg: #f8f7f4;
          --bg2: #f0efeb;
          --ink: #1a1a18;
          --ink2: #6b6960;
          --ink3: #9e9b90;
          --line: #dddbd4;
          --line2: #e8e6e0;
          --terra: #c45a3c;
          --terra-dim: rgba(196,90,60,0.07);
          --card-bg: #ffffff;

          min-height: 100vh;
          background: var(--bg);
          color: var(--ink);
          font-family: 'JetBrains Mono', monospace;
          -webkit-font-smoothing: antialiased;
        }

        /* grain */
        .gal::after {
          content: '';
          position: fixed;
          inset: 0;
          opacity: 0.3;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 100;
        }

        .gal-back {
          position: fixed;
          top: 1.75rem; left: 2rem; z-index: 50;
          font-size: 0.6rem;
          color: var(--ink3);
          text-decoration: none;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.3s;
        }
        .gal-back:hover { color: var(--terra); }

        /* header */
        .gal-head {
          text-align: center;
          padding: 4rem 2rem 0;
          opacity: 0; transform: translateY(20px);
          transition: all 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        @media (max-width: 640px) { .gal-head { padding: 3rem 1.25rem 0; } }
        .gal-head.on { opacity: 1; transform: none; }

        .gal-eyebrow {
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--terra);
          margin-bottom: 1.5rem;
        }

        .gal-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2.6rem, 6.5vw, 5rem);
          font-weight: 700;
          color: var(--ink);
          line-height: 0.95;
          margin: 0;
          letter-spacing: -0.03em;
          text-transform: uppercase;
        }
        .gal-title-vs {
          font-size: 0.4em;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: var(--ink3);
          vertical-align: middle;
          margin: 0 0.15em;
        }

        .gal-sub {
          font-size: 0.7rem;
          color: var(--ink3);
          margin-top: 1.5rem;
          line-height: 1.8;
          font-weight: 300;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }
        .gal-sub a {
          color: var(--ink2);
          text-decoration: none;
          border-bottom: 1px solid var(--line);
          transition: all 0.2s;
        }
        .gal-sub a:hover { color: var(--terra); border-color: var(--terra); }

        .gal-rule {
          width: 40px;
          height: 1px;
          background: var(--line);
          margin: 2.5rem auto 0;
        }

        /* grid */
        .gal-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 0;
          max-width: 1100px;
          margin: 3rem auto 0;
          padding: 0 2.5rem;
          align-items: start;
        }
        @media (max-width: 720px) {
          .gal-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 0 1.25rem;
          }
          .gal-vs { display: none; }
        }

        .gal-vs {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 8rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .gal-vs-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ink3);
          position: relative;
        }
        .gal-vs-text::before,
        .gal-vs-text::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 3rem;
          background: var(--line);
        }
        .gal-vs-text::before { bottom: calc(100% + 0.75rem); }
        .gal-vs-text::after { top: calc(100% + 0.75rem); }

        /* card */
        .gal-card {
          opacity: 0; transform: translateY(24px);
          transition: all 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .gal-card.on { opacity: 1; transform: none; }

        .gal-card-link {
          display: block;
          text-decoration: none;
          color: inherit;
          group: card;
        }

        .gal-card-frame {
          aspect-ratio: 16 / 10;
          background: var(--card-bg);
          border: 1px solid var(--line);
          border-radius: 6px;
          overflow: hidden;
          position: relative;
          container-type: inline-size;
          transition: all 0.5s cubic-bezier(0.22,1,0.36,1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .gal-card-link:hover .gal-card-frame {
          box-shadow: 0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04);
          transform: translateY(-4px);
          border-color: var(--ink3);
        }

        .gal-card-frame iframe {
          width: 1440px; height: 900px;
          border: none;
          transform: scale(calc(100cqi / 1440));
          transform-origin: top left;
          pointer-events: none;
          position: absolute;
          top: 0; left: 0;
        }

        .gal-card-info {
          padding: 1.25rem 0.25rem 0;
        }

        .gal-card-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .gal-card-desc {
          font-size: 0.6rem;
          color: var(--ink3);
          margin-top: 0.3rem;
          font-weight: 300;
        }

        .gal-card-arrow {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          margin-top: 0.75rem;
          font-size: 0.55rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink3);
          transition: color 0.3s;
        }
        .gal-card-arrow svg {
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .gal-card-link:hover .gal-card-arrow {
          color: var(--terra);
        }
        .gal-card-link:hover .gal-card-arrow svg {
          transform: translateX(4px);
        }

        /* footer */
        .gal-foot {
          text-align: center;
          padding: 2rem 2rem 4rem;
          font-size: 0.5rem;
          color: var(--ink3);
          letter-spacing: 0.06em;
          opacity: 0;
          transition: opacity 0.5s 0.5s;
        }
        @media (max-width: 640px) { .gal-foot { padding: 2rem 1.25rem 3rem; } }
        .gal-foot.on { opacity: 1; }
        .gal-foot a {
          color: var(--ink2);
          text-decoration: none;
          border-bottom: 1px solid var(--line);
        }
        .gal-foot a:hover { color: var(--terra); border-color: var(--terra); }
      `}</style>

      <div className="gal">
        <Link href="/" className="gal-back">&larr; Back</Link>

        <header className={`gal-head ${ready ? "on" : ""}`}>
          <h1 className="gal-title">Skill <span className="gal-title-vs">vs</span> Prompt</h1>
          <p className="gal-sub">
            <a href="https://www.s3seismic.com/" target="_blank" rel="noopener noreferrer">s3seismic.com</a> をクローン元として、スキル使用と直接指示の品質を比較する。
            <br />
            Skill: <a href="https://github.com/JCodesMore/ai-website-cloner-template" target="_blank" rel="noopener noreferrer">ai-website-cloner-template</a>
          </p>
          <div className="gal-rule" />
        </header>

        <div className="gal-grid">
          {specimens.map((s, i) => (
            i === 1 ? (
              <React.Fragment key="with-vs">
                <div className="gal-vs">
                  <span className="gal-vs-text">vs</span>
                </div>
                <div
                  className={`gal-card ${ready ? "on" : ""}`}
                  style={{ transitionDelay: `${300 + i * 150}ms` }}
                >
                  <Link href={s.href} className="gal-card-link">
                    <div className="gal-card-frame">
                      <iframe src={s.url} tabIndex={-1} loading="lazy" />
                    </div>
                    <div className="gal-card-info">
                      <div className="gal-card-name">{s.name}</div>
                      <div className="gal-card-desc">{s.desc}</div>
                      <div className="gal-card-arrow">
                        View
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </React.Fragment>
            ) : (
              <div
                key={s.id}
                className={`gal-card ${ready ? "on" : ""}`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <Link href={s.href} className="gal-card-link">
                  <div className="gal-card-frame">
                    <iframe src={s.url} tabIndex={-1} loading="lazy" />
                  </div>
                  <div className="gal-card-info">
                    <div className="gal-card-name">{s.name}</div>
                    <div className="gal-card-desc">{s.desc}</div>
                    <div className="gal-card-arrow">
                      View
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </Link>
              </div>
            )
          ))}
        </div>

        <div className={`gal-foot ${ready ? "on" : ""}`}>
          Built with <a href="https://claude.com/claude-code" target="_blank" rel="noopener noreferrer">Claude Code</a>
        </div>
      </div>
    </>
  );
}
