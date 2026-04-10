"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import Link from "next/link";

/* ─── Reveal ─── */
function useReveal(t = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOk(true); o.disconnect(); } }, { threshold: t });
    o.observe(el);
    return () => o.disconnect();
  }, [t]);
  return { ref, ok };
}

function R({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) {
  const { ref, ok } = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: ok ? 1 : 0, transform: ok ? "none" : "translateY(28px)",
      transition: `all 0.85s cubic-bezier(0.22,1,0.36,1) ${d}ms`,
    }}>{children}</div>
  );
}

function Ct({ v, s = "" }: { v: number; s?: string }) {
  const { ref, ok } = useReveal();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!ok) return;
    const st = performance.now();
    function t(now: number) { const p = Math.min((now - st) / 1200, 1); setN(Math.round((1 - Math.pow(1 - p, 3)) * v)); if (p < 1) requestAnimationFrame(t); }
    requestAnimationFrame(t);
  }, [ok, v]);
  return <span ref={ref}>{n.toLocaleString()}{s}</span>;
}

/* ─── SVG Components ─── */
function PulseRing({ cx, cy, r, color, delay = 0 }: { cx: number; cy: number; r: number; color: string; delay?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="1" opacity="0.3">
        <animate attributeName="r" from={r} to={r + 18} dur="2.5s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.4" to="0" dur="2.5s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={r * 0.35} fill={color} opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
    </g>
  );
}

function CircuitPath({ d, color, dur = "3s", delay = "0s" }: { d: string; color: string; dur?: string; delay?: string }) {
  return (
    <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="8 4" opacity="0.4">
      <animate attributeName="stroke-dashoffset" from="200" to="0" dur={dur} begin={delay} repeatCount="indefinite" />
    </path>
  );
}

function Gear({ cx, cy, size, color, speed = "8s" }: { cx: number; cy: number; size: number; color: string; speed?: string }) {
  const teeth = 8;
  const inner = size * 0.55;
  const outer = size;
  let path = "";
  for (let i = 0; i < teeth; i++) {
    const a1 = (i / teeth) * Math.PI * 2;
    const a2 = ((i + 0.3) / teeth) * Math.PI * 2;
    const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
    const a4 = ((i + 0.8) / teeth) * Math.PI * 2;
    path += `${i === 0 ? "M" : "L"}${cx + Math.cos(a1) * inner},${cy + Math.sin(a1) * inner} `;
    path += `L${cx + Math.cos(a2) * outer},${cy + Math.sin(a2) * outer} `;
    path += `L${cx + Math.cos(a3) * outer},${cy + Math.sin(a3) * outer} `;
    path += `L${cx + Math.cos(a4) * inner},${cy + Math.sin(a4) * inner} `;
  }
  path += "Z";
  return (
    <g opacity="0.2">
      <path d={path} fill="none" stroke={color} strokeWidth="1.2">
        <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur={speed} repeatCount="indefinite" />
      </path>
    </g>
  );
}

function SignalFlow({ x1, y1, x2, y2, color, dur = "2s" }: { x1: number; y1: number; x2: number; y2: number; color: string; dur?: string }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.5" opacity="0.12" />
      <circle r="2.5" fill={color} opacity="0.6">
        <animateMotion dur={dur} repeatCount="indefinite" path={`M${x1},${y1} L${x2},${y2}`} />
      </circle>
    </g>
  );
}

/* ─── Competitor comparison chart ─── */
function CompetitorChart() {
  const { ref, ok } = useReveal();
  const data = [
    { name: "claude-code-best-practice", stars: 26500, color: "#38bdf8", highlight: true },
    { name: "claude-code-tips", stars: 6952, color: "#64748b", highlight: false },
    { name: "claude-code-guide", stars: 3758, color: "#64748b", highlight: false },
    { name: "claude-code-ultimate-guide", stars: 2580, color: "#64748b", highlight: false },
  ];
  const max = 28000;
  return (
    <div ref={ref}>
      <svg viewBox="0 0 600 155" style={{ width: "100%", maxWidth: 600, height: "auto" }}>
        {data.map((d, i) => {
          const y = 8 + i * 35;
          const w = Math.max((d.stars / max) * 280, 4);
          return (
            <g key={i}>
              <text x="0" y={y + 16} fill={d.highlight ? "#e2e8f0" : "#64748b"} fontSize="9.5" fontFamily="'Source Code Pro', monospace" fontWeight={d.highlight ? "700" : "400"}>{d.name}</text>
              <rect x="220" y={y + 2} width={ok ? w : 0} height="20" rx="3" fill={d.color} opacity={d.highlight ? 0.85 : 0.35}
                style={{ transition: `width 1.2s cubic-bezier(0.22,1,0.36,1) ${i * 100}ms` }} />
              <text x={ok ? 228 + w : 228} y={y + 16} fill={d.highlight ? "#e2e8f0" : "#64748b"} fontSize="9" fontFamily="'Source Code Pro', monospace" fontWeight="600"
                style={{ transition: `all 1.2s cubic-bezier(0.22,1,0.36,1) ${i * 100}ms`, opacity: ok ? 1 : 0 }}>
                {d.stars.toLocaleString()}
              </text>
            </g>
          );
        })}
        <text x="220" y={152} fill="#64748b" fontSize="7" fontFamily="'Source Code Pro', monospace" opacity="0.5">※ 「Claude Code 使い方」系リポジトリのスター数比較</text>
      </svg>
    </div>
  );
}

/* ─── Architecture Node Graph ─── */
function ArchSVG() {
  const nodes = [
    { x: 200, y: 40, label: "Subagents", c: "#38bdf8" },
    { x: 80, y: 110, label: "Commands", c: "#38bdf8" },
    { x: 320, y: 110, label: "Skills", c: "#38bdf8" },
    { x: 50, y: 200, label: "Hooks", c: "#f59e0b" },
    { x: 200, y: 185, label: "MCP", c: "#f59e0b" },
    { x: 350, y: 200, label: "Memory", c: "#34d399" },
    { x: 200, y: 270, label: "Settings", c: "#34d399" },
  ];
  const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [5, 6]];
  return (
    <svg viewBox="0 0 400 310" style={{ width: "100%", maxWidth: 380, height: "auto" }}>
      {edges.map(([a, b], i) => (
        <g key={i}>
          <line x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#38bdf8" strokeWidth="0.6" opacity="0.15" />
          <circle r="2" fill="#38bdf8" opacity="0.5">
            <animateMotion dur={`${2 + i * 0.3}s`} repeatCount="indefinite" path={`M${nodes[a].x},${nodes[a].y} L${nodes[b].x},${nodes[b].y}`} />
          </circle>
        </g>
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="20" fill="#0c1222" stroke={n.c} strokeWidth="1.2" opacity="0.85">
            <animate attributeName="r" values="20;22;20" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <text x={n.x} y={n.y + 3.5} textAnchor="middle" fill={n.c} fontSize="7.5" fontFamily="'Source Code Pro', monospace" fontWeight="600">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

/* ─── Workflow bar chart ─── */
function WorkflowBars() {
  const { ref, ok } = useReveal();
  const data = [
    { name: "Superpowers", stars: 122, color: "#38bdf8" },
    { name: "Everything CC", stars: 116, color: "#38bdf8" },
    { name: "Spec Kit", stars: 83, color: "#f59e0b" },
    { name: "gstack", stars: 55, color: "#f59e0b" },
    { name: "Get Shit Done", stars: 44, color: "#34d399" },
    { name: "BMAD", stars: 43, color: "#34d399" },
  ];
  return (
    <div ref={ref}>
      <svg viewBox="0 0 460 210" style={{ width: "100%", maxWidth: 460, height: "auto" }}>
        {data.map((d, i) => {
          const y = 8 + i * 33;
          const w = (d.stars / 130) * 280;
          return (
            <g key={i}>
              <text x="0" y={y + 15} fill="#94a3b8" fontSize="9.5" fontFamily="'Source Code Pro', monospace">{d.name}</text>
              <rect x="120" y={y + 2} width={ok ? w : 0} height="18" rx="3" fill={d.color} opacity="0.7"
                style={{ transition: `width 1s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms` }} />
              <text x={ok ? 126 + w : 126} y={y + 15} fill="#e2e8f0" fontSize="8.5" fontFamily="'Source Code Pro', monospace" fontWeight="600"
                style={{ transition: `all 1s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms`, opacity: ok ? 1 : 0 }}>
                {d.stars}k
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ─── Hero background (client only to avoid hydration mismatch from float math) ─── */
function HeroBg() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="bp-hero-bg" />;
  return (
    <div className="bp-hero-bg">
      <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <Gear cx={100} cy={100} size={40} color="#38bdf8" speed="12s" />
        <Gear cx={700} cy={500} size={50} color="#38bdf8" speed="15s" />
        <Gear cx={650} cy={80} size={28} color="#f59e0b" speed="10s" />
        <CircuitPath d="M0,300 Q200,250 400,300 T800,280" color="#38bdf8" dur="4s" />
        <CircuitPath d="M0,420 Q300,370 500,420 T800,400" color="#f59e0b" dur="5s" delay="1s" />
        <PulseRing cx={150} cy={450} r={8} color="#38bdf8" delay={0} />
        <PulseRing cx={650} cy={250} r={6} color="#f59e0b" delay={0.8} />
        <PulseRing cx={400} cy={520} r={7} color="#34d399" delay={1.5} />
        <SignalFlow x1={50} y1={200} x2={350} y2={150} color="#38bdf8" dur="3s" />
        <SignalFlow x1={450} y1={100} x2={750} y2={180} color="#f59e0b" dur="2.5s" />
      </svg>
    </div>
  );
}

/* ─── Hero GitHub card (GitHub blocks iframe) ─── */
function BpHeroGithub() {
  return (
    <a href="https://github.com/shanraisshan/claude-code-best-practice" target="_blank" rel="noopener noreferrer" className="bp-hero-gh" style={{ textDecoration: "none" }}>
      <div className="bp-hero-gh-inner">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.8rem" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#e2e8f0"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          <span style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "0.7rem", color: "#94a3b8" }}>shanraisshan /</span>
        </div>
        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.6rem" }}>claude-code-best-practice</div>
        <div style={{ fontSize: "0.65rem", color: "#64748b", lineHeight: 1.5, marginBottom: "1rem" }}>practice made claude perfect</div>
        <div style={{ display: "flex", gap: "1.2rem", fontSize: "0.6rem", fontFamily: "'Source Code Pro', monospace", color: "#94a3b8" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            26,500+
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><line x1="12" y1="12" x2="12" y2="15"/></svg>
            2,200+
          </span>
        </div>
        {/* Fake file tree */}
        <div style={{ marginTop: "1rem", borderTop: "1px solid rgba(56,189,248,0.08)", paddingTop: "0.8rem" }}>
          {["README.md", "tips/", "core-concepts/", "workflows/", "new-features/", "CLAUDE.md"].map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.25rem 0", fontSize: "0.6rem", fontFamily: "'Source Code Pro', monospace", color: "#64748b" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={f.endsWith("/") ? "#38bdf8" : "#64748b"} strokeWidth="2"><path d={f.endsWith("/") ? "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" : "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"} /></svg>
              {f}
            </div>
          ))}
        </div>
      </div>
    </a>
  );
}

/* ═══════════ PAGE ═══════════ */
export default function BestPracticePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Source+Code+Pro:wght@300;400;500;600;700&display=swap');
        .bp {
          --bg: #0c1222; --bg2: #111827; --bg3: #1e293b;
          --cyan: #38bdf8; --amber: #f59e0b; --green: #34d399; --red: #ef4444;
          --ink: #e2e8f0; --ink2: #94a3b8; --ink3: #64748b;
          --line: rgba(56,189,248,0.1);
          min-height: 100vh; background: var(--bg); color: var(--ink);
          font-family: 'Outfit', sans-serif; overflow-x: hidden;
        }
        .bp *, .bp *::before, .bp *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .bp::before {
          content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .bp-inner { position: relative; z-index: 1; }

        .bp-back { position: fixed; top: 1.5rem; left: 2rem; z-index: 50; font-family: 'Source Code Pro', monospace; font-size: 0.65rem; color: var(--ink3); text-decoration: none; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.3s; }
        .bp-back:hover { color: var(--cyan); }

        /* Hero */
        .bp-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem; position: relative; }
        .bp-hero-bg { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .bp-hero-gh {
          position: absolute;
          top: 4rem; right: -6rem;
          transform: perspective(800px) rotateY(-6deg);
          z-index: 2;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .bp-hero-gh:hover {
          transform: perspective(800px) rotateY(-1deg) scale(1.03);
        }
        @media (max-width: 1200px) { .bp-hero-gh { right: -2rem; } }
        @media (max-width: 1000px) { .bp-hero-gh { display: none; } }
        .bp-hero-gh-inner {
          width: 280px;
          background: rgba(13,17,23,0.85);
          border: 1px solid rgba(56,189,248,0.2);
          border-radius: 10px;
          padding: 1.3rem;
          backdrop-filter: blur(8px);
          cursor: pointer;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .bp-hero-gh-inner:hover {
          border-color: rgba(56,189,248,0.5);
          box-shadow: 0 8px 32px rgba(56,189,248,0.1);
        }
        @media (max-width: 1100px) { .bp-hero-gh { right: 2%; } }
        @media (max-width: 900px) { .bp-hero-gh { display: none; } }
        .bp-badge { font-family: 'Source Code Pro', monospace; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--amber); border: 1px solid rgba(245,158,11,0.3); padding: 0.35rem 1rem; border-radius: 100px; display: inline-block; margin-bottom: 2rem; position: relative; z-index: 3; }
        .bp-h1 { font-size: clamp(2.8rem, 7vw, 5.5rem); font-weight: 900; line-height: 0.92; letter-spacing: -0.04em; background: linear-gradient(135deg, #e2e8f0 0%, #38bdf8 50%, #f59e0b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; position: relative; z-index: 3; }
        .bp-h1-sub { font-size: clamp(1rem, 2.2vw, 1.4rem); font-weight: 300; color: var(--ink2); margin-top: 1.2rem; line-height: 1.6; max-width: 900px; }
        .bp-h1-sub strong { color: var(--ink); font-weight: 600; }
        .bp-scroll-hint { position: absolute; bottom: 2rem; font-family: 'Source Code Pro', monospace; font-size: 0.55rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink3); }
        .bp-scroll-hint::after { content: ''; display: block; width: 1px; height: 28px; background: var(--ink3); margin: 0.5rem auto 0; animation: hintP 2s ease infinite; }
        @keyframes hintP { 0%,100% { opacity: 0.2; transform: scaleY(0.5); } 50% { opacity: 1; transform: scaleY(1); } }

        /* Section */
        .bp-sec { padding: 6rem 2rem; max-width: 900px; margin: 0 auto; }
        .bp-sec-num { font-family: 'Source Code Pro', monospace; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: var(--amber); margin-bottom: 0.6rem; }
        .bp-sec-title { font-size: clamp(1.6rem, 3.5vw, 2.4rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 0.8rem; }
        .bp-sec-lead { font-size: 1rem; color: var(--ink2); line-height: 1.85; max-width: 620px; margin-bottom: 2.5rem; }
        .bp-sec-lead strong { color: var(--ink); font-weight: 600; }

        /* Divider */
        .bp-div { width: 50px; height: 1px; background: linear-gradient(90deg, var(--cyan), transparent); margin: 0 auto; opacity: 0.25; }

        /* Two col */
        .bp-two { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        @media (max-width: 700px) { .bp-two { grid-template-columns: 1fr; } }
        .bp-svg-center { display: flex; justify-content: center; }

        /* Cards */
        .bp-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.8rem; }
        .bp-card { background: var(--bg2); border: 1px solid var(--line); border-radius: 8px; padding: 1.3rem; transition: border-color 0.3s, transform 0.3s; }
        .bp-card:hover { border-color: rgba(56,189,248,0.3); transform: translateY(-2px); }
        .bp-card-head { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.5rem; }
        .bp-card-name { font-weight: 700; font-size: 0.88rem; }
        .bp-card-desc { font-size: 0.75rem; color: var(--ink2); line-height: 1.6; }

        /* Tip */
        .bp-tip { display: flex; gap: 1rem; padding: 1.1rem 1.4rem; background: var(--bg2); border-left: 3px solid var(--cyan); border-radius: 0 8px 8px 0; margin-bottom: 0.8rem; }
        .bp-tip-num { font-family: 'Source Code Pro', monospace; font-size: 1.3rem; font-weight: 700; color: var(--cyan); opacity: 0.35; width: 1.8rem; flex-shrink: 0; }
        .bp-tip-title { font-weight: 600; font-size: 0.88rem; margin-bottom: 0.15rem; }
        .bp-tip-text { font-size: 0.75rem; color: var(--ink2); line-height: 1.6; }

        /* Stats row */
        .bp-stats { display: flex; gap: 3rem; flex-wrap: wrap; justify-content: center; margin: 2.5rem 0; }
        .bp-stat { text-align: center; }
        .bp-stat-val { font-size: 2.5rem; font-weight: 800; color: var(--cyan); font-variant-numeric: tabular-nums; }
        .bp-stat-label { font-family: 'Source Code Pro', monospace; font-size: 0.6rem; color: var(--ink3); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.2rem; }

        /* New features */
        .bp-new-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 0.7rem; }
        .bp-new-item { padding: 0.9rem 1rem; background: var(--bg2); border: 1px solid var(--line); border-radius: 8px; transition: border-color 0.3s; }
        .bp-new-item:hover { border-color: var(--green); }
        .bp-new-name { font-family: 'Source Code Pro', monospace; font-size: 0.78rem; font-weight: 600; color: var(--green); margin-bottom: 0.2rem; }
        .bp-new-desc { font-size: 0.68rem; color: var(--ink2); line-height: 1.5; }

        /* Callout */
        .bp-callout { background: rgba(245,158,11,0.06); border: 1px solid rgba(245,158,11,0.2); border-radius: 8px; padding: 1.5rem; margin-top: 2rem; }
        .bp-callout-title { font-weight: 700; font-size: 0.85rem; color: var(--amber); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem; }
        .bp-callout-text { font-size: 0.78rem; color: var(--ink2); line-height: 1.7; }
        .bp-callout-text a { color: var(--cyan); text-decoration: none; }
        .bp-callout-text a:hover { text-decoration: underline; }

        /* Footer */
        .bp-footer { text-align: center; padding: 3rem 2rem; font-family: 'Source Code Pro', monospace; font-size: 0.6rem; color: var(--ink3); }
        .bp-footer a { color: var(--cyan); text-decoration: none; }
        .bp-footer a:hover { text-decoration: underline; }

        /* Mobile responsive */
        @media (max-width: 640px) {
          .bp-sec { padding: 3rem 1.25rem; }
          .bp-back { left: 1rem; top: 1rem; }
          .bp-stats { gap: 1.5rem; }
          .bp-stat-val { font-size: 1.8rem; }
          .bp-callout { padding: 1rem; }
          .bp-tip { padding: 0.8rem 1rem; }
        }
      `}</style>

      <div className="bp" suppressHydrationWarning>
        <Link href="/" className="bp-back">&larr; Back</Link>
        <div className="bp-inner">

          {/* ═══ HERO ═══ */}
          <section className="bp-hero">
            <HeroBg />
            <R><div className="bp-badge">GitHub 26,500+ Stars</div></R>
            <R d={100}><h1 className="bp-h1">Claude Code<br />Best Practice</h1></R>
            <R d={200}>
              <p className="bp-h1-sub">
                Claude Codeを使いこなすための<strong>コミュニティ発の実践ガイド</strong>。<br />
                86個のTips、7つのコア機能、6つのワークフローを1つのリポジトリに集約。
              </p>
            </R>
            <div className="bp-scroll-hint">scroll</div>
          </section>

          {/* ═══ 01: WHAT IS THIS ═══ */}
          <section className="bp-sec" style={{ position: "relative" }}>
            <BpHeroGithub />
            <R><div className="bp-sec-num">01 — What is this?</div></R>
            <R d={80}><h2 className="bp-sec-title">このリポジトリは何か</h2></R>
            <R d={120}>
              <p className="bp-sec-lead">
                Claude Codeを<strong>効果的に使いこなすための実践知</strong>を集めたガイド。
                パキスタン在住のエンジニア <strong>Shayan Rais</strong> さんが個人でメンテナンスしている。
                公式ドキュメントだけではわからない「コツ」を体系的にまとめている。
              </p>
            </R>
            <R d={180}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>なぜデファクトスタンダードと言えるのか</h3>
              <p className="bp-sec-lead" style={{ marginBottom: "1.5rem", maxWidth: "100%" }}>
                「Claude Code 使い方」系のリポジトリは他にもある。だが<strong>スター数で比較すると圧倒的</strong>。
              </p>
              <CompetitorChart />
            </R>
            <R d={300}>
              <div className="bp-stats">
                <div className="bp-stat"><div className="bp-stat-val"><Ct v={26500} s="+" /></div><div className="bp-stat-label">Stars</div></div>
                <div className="bp-stat"><div className="bp-stat-val"><Ct v={2200} s="+" /></div><div className="bp-stat-label">Forks</div></div>
                <div className="bp-stat"><div className="bp-stat-val"><Ct v={86} /></div><div className="bp-stat-label">Tips</div></div>
                <div className="bp-stat"><div className="bp-stat-val" style={{ color: "var(--amber)" }}>x3.8</div><div className="bp-stat-label">2位との差</div></div>
              </div>
            </R>
          </section>

          <div className="bp-div" />

          {/* ═══ 02: CORE CONCEPTS ═══ */}
          <section className="bp-sec">
            <R><div className="bp-sec-num">02 — Core Concepts</div></R>
            <R d={80}><h2 className="bp-sec-title">7つのコア機能を体系整理</h2></R>
            <R d={120}>
              <p className="bp-sec-lead">
                Claude Codeの機能は多い。このガイドはそれを<strong>7つの概念に分類</strong>し、
                それぞれの役割と使いどころを明確にしている。
              </p>
            </R>
            <R d={200}>
              <div className="bp-two">
                <div className="bp-svg-center"><ArchSVG /></div>
                <div className="bp-cards" style={{ gridTemplateColumns: "1fr" }}>
                  {[
                    { name: "Subagents", desc: "独立した実行環境で動く自律エージェント", c: "#38bdf8" },
                    { name: "Commands", desc: "ユーザー起動型プロンプトテンプレート", c: "#38bdf8" },
                    { name: "Skills", desc: "再利用可能な知識セット", c: "#38bdf8" },
                    { name: "Hooks", desc: "イベント駆動の外部ハンドラー", c: "#f59e0b" },
                    { name: "MCP Servers", desc: "外部ツール・DB・APIへの接続", c: "#f59e0b" },
                    { name: "Memory", desc: "CLAUDE.mdによる永続コンテキスト", c: "#34d399" },
                    { name: "Settings", desc: "階層型設定システム", c: "#34d399" },
                  ].map((c, i) => (
                    <div key={i} className="bp-card" style={{ padding: "0.8rem 1rem" }}>
                      <div className="bp-card-head">
                        <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5" fill="none" stroke={c.c} strokeWidth="1.5" /><circle cx="7" cy="7" r="2" fill={c.c} /></svg>
                        <div className="bp-card-name" style={{ fontSize: "0.8rem" }}>{c.name}</div>
                      </div>
                      <div className="bp-card-desc" style={{ fontSize: "0.7rem" }}>{c.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </R>
          </section>

          <div className="bp-div" />

          {/* ═══ 03: HOW TO USE ═══ */}
          <section className="bp-sec">
            <R><div className="bp-sec-num">03 — How to use Claude Code</div></R>
            <R d={80}><h2 className="bp-sec-title">3つのプロンプティング原則</h2></R>
            <R d={120}>
              <p className="bp-sec-lead">
                ガイドが繰り返し伝えるメッセージ:
                <strong>マイクロマネジメントするな。制約だけ伝えろ。</strong>
              </p>
            </R>
            <R d={200}>
              <div>
                {[
                  { title: "バグ修正は「fix」だけ", text: "バグを貼って \"fix\" と言うだけでいい。手順の指示は逆効果。Claudeに考えさせる。" },
                  { title: "不十分なら方向性を示す", text: "「今の知識で優雅な解決を再実装して」— 具体手順ではなく、ゴールの質を伝える。" },
                  { title: "制約をゲートにする", text: "「テストに合格するまでPRを作らないで」— やることではなく、完了条件を伝える。" },
                ].map((t, i) => (
                  <R key={i} d={250 + i * 80}>
                    <div className="bp-tip">
                      <div className="bp-tip-num">0{i + 1}</div>
                      <div><div className="bp-tip-title">{t.title}</div><div className="bp-tip-text">{t.text}</div></div>
                    </div>
                  </R>
                ))}
              </div>
            </R>
          </section>

          <div className="bp-div" />

          {/* ═══ 04: PLANNING ═══ */}
          <section className="bp-sec">
            <R><div className="bp-sec-num">04 — Planning</div></R>
            <R d={80}><h2 className="bp-sec-title">常にプランモードから始める</h2></R>
            <R d={120}>
              <p className="bp-sec-lead">
                いきなりコードを書かせない。<strong>最小限のスペックを渡して、Claudeに質問させる。</strong>
                複雑なタスクはPhase分割し、各フェーズでテストゲートを挟む。
              </p>
            </R>
            <R d={200}>
              <svg viewBox="0 0 520 80" style={{ width: "100%", maxWidth: 520, height: "auto" }}>
                {["Plan", "Unit Test", "Auto Test", "Integration", "Deploy"].map((p, i) => {
                  const x = 20 + i * 100;
                  const isFirst = i === 0;
                  return (
                    <g key={i}>
                      {i > 0 && (
                        <g>
                          <line x1={x - 30} y1={40} x2={x - 5} y2={40} stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.35">
                            <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.5s" repeatCount="indefinite" />
                          </line>
                          <polygon points={`${x - 8},35 ${x - 2},40 ${x - 8},45`} fill="#38bdf8" opacity="0.45" />
                        </g>
                      )}
                      <rect x={x} y={15} width="70" height="50" rx="6" fill="none" stroke={isFirst ? "#f59e0b" : "#38bdf8"} strokeWidth="1.2" opacity="0.5">
                        <animate attributeName="opacity" values="0.35;0.7;0.35" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                      </rect>
                      <text x={x + 35} y={44} textAnchor="middle" fill={isFirst ? "#f59e0b" : "#38bdf8"} fontSize="9" fontFamily="'Source Code Pro', monospace" fontWeight="600">{p}</text>
                    </g>
                  );
                })}
              </svg>
            </R>
          </section>

          <div className="bp-div" />

          {/* ═══ 05: WORKFLOWS ═══ */}
          <section className="bp-sec">
            <R><div className="bp-sec-num">05 — Workflows</div></R>
            <R d={80}><h2 className="bp-sec-title">コミュニティ発の6大ワークフロー</h2></R>
            <R d={120}>
              <p className="bp-sec-lead">
                ガイドはClaude Code向けの主要ワークフローを<strong>スター数順に比較</strong>している。
                Superpowersが122kで最大。それぞれアプローチが異なる。
              </p>
            </R>
            <R d={200}><WorkflowBars /></R>
          </section>

          <div className="bp-div" />

          {/* ═══ 06: NEW FEATURES ═══ */}
          <section className="bp-sec">
            <R><div className="bp-sec-num">06 — Latest Features</div></R>
            <R d={80}><h2 className="bp-sec-title">ガイドが追いかける最新機能</h2></R>
            <R d={120}>
              <p className="bp-sec-lead">
                Claude Codeは急速に進化している。ガイドは<strong>ほぼ毎日更新</strong>され、
                新機能が追加されるたびに解説が加わる。
              </p>
            </R>
            <R d={200}>
              <div className="bp-new-grid">
                {[
                  { name: "Auto Mode", desc: "安全分類器で権限プロンプトを自動判定" },
                  { name: "Agent Teams", desc: "複数エージェントが同一コードベースで並列作業" },
                  { name: "Voice Dictation", desc: "20言語対応の音声入力" },
                  { name: "Channels", desc: "Telegram/Discord/webhookからイベントをプッシュ" },
                  { name: "Code Review", desc: "複数エージェントによるPR分析" },
                  { name: "/loop", desc: "最大3日の定期再実行" },
                  { name: "/schedule", desc: "Anthropicインフラ上でのcron実行" },
                ].map((f, i) => (
                  <div key={i} className="bp-new-item">
                    <div className="bp-new-name">{f.name}</div>
                    <div className="bp-new-desc">{f.desc}</div>
                  </div>
                ))}
              </div>
            </R>
          </section>

          <div className="bp-div" />

          {/* ═══ 07: TRUST ═══ */}
          <section className="bp-sec">
            <R><div className="bp-sec-num">07 — How much can you trust it?</div></R>
            <R d={80}><h2 className="bp-sec-title">信頼していいのか</h2></R>
            <R d={120}>
              <p className="bp-sec-lead">
                結論: <strong>概ね信頼できるが、公式ではない。</strong>
              </p>
            </R>
            <R d={200}>
              <div className="bp-cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                {[
                  { label: "更新頻度", val: "ほぼ毎日", detail: "直近2週間は連日コミット", color: "var(--green)" },
                  { label: "コミュニティ", val: "圧倒的 #1", detail: "同ジャンル2位に35倍の差", color: "var(--green)" },
                  { label: "公式度", val: "非公式", detail: "Anthropic公式ではない。個人運営", color: "var(--amber)" },
                  { label: "正確性", val: "概ね正確", detail: "食い違いがあれば公式ドキュメント優先", color: "var(--amber)" },
                ].map((c, i) => (
                  <div key={i} className="bp-card">
                    <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "0.65rem", color: "var(--ink3)", marginBottom: "0.3rem" }}>{c.label}</div>
                    <div style={{ fontWeight: 800, fontSize: "1.1rem", color: c.color, marginBottom: "0.2rem" }}>{c.val}</div>
                    <div className="bp-card-desc">{c.detail}</div>
                  </div>
                ))}
              </div>
            </R>
            <R d={350}>
              <div className="bp-callout">
                <div className="bp-callout-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  一次情報源は公式ドキュメント
                </div>
                <div className="bp-callout-text">
                  内容に食い違いがある場合は <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer">公式ドキュメント</a> が正です。
                  このガイドは「実践知の集約」であり、公式の代替ではありません。
                </div>
              </div>
            </R>
          </section>

          {/* ═══ CTA ═══ */}
          <section style={{ textAlign: "center", padding: "4rem 2rem 2rem" }}>
            <R>
              <a href="https://github.com/shanraisshan/claude-code-best-practice" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  border: "1px solid rgba(56,189,248,0.3)", color: "#38bdf8",
                  padding: "0.75rem 2rem", borderRadius: 6, textDecoration: "none",
                  fontWeight: 600, fontSize: "0.88rem", fontFamily: "'Source Code Pro', monospace",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(56,189,248,0.08)"; e.currentTarget.style.borderColor = "rgba(56,189,248,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(56,189,248,0.3)"; }}
              >GitHub でリポジトリを見る &rarr;</a>
            </R>
          </section>

          <footer className="bp-footer">
            <p>Source: <a href="https://github.com/shanraisshan/claude-code-best-practice">shanraisshan/claude-code-best-practice</a></p>
            <p style={{ marginTop: "0.3rem" }}>Official: <a href="https://docs.anthropic.com/en/docs/claude-code">docs.anthropic.com</a></p>
            <p style={{ marginTop: "0.8rem", opacity: 0.4 }}>Frontend Design Plugin で作成</p>
          </footer>

        </div>
      </div>
    </>
  );
}
