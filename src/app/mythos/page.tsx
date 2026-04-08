"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger, createDrawable } from "animejs";
import Link from "next/link";

/* ─── Reveal hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOk(true);
          o.disconnect();
        }
      },
      { threshold }
    );
    o.observe(el);
    return () => o.disconnect();
  }, [threshold]);
  return { ref, ok };
}

/* ─── Reveal wrapper ─── */
function R({
  children,
  d = 0,
  duration = 0.9,
  className = "",
}: {
  children: React.ReactNode;
  d?: number;
  duration?: number;
  className?: string;
}) {
  const { ref, ok } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: ok ? 1 : 0,
        transform: ok ? "none" : "translateY(32px)",
        transition: `all ${duration}s cubic-bezier(0.22,1,0.36,1) ${d}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Animated counter ─── */
function Counter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const { ref, ok } = useReveal();
  const [n, setN] = useState(0);
  const animated = useRef(false);
  useEffect(() => {
    if (!ok || animated.current) return;
    animated.current = true;
    const obj = { val: 0 };
    animate(obj, {
      val: value,
      duration: 1400,
      ease: "outExpo",
      onUpdate: () => setN(obj.val),
    });
  }, [ok, value, decimals]);
  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? n.toFixed(decimals) : Math.round(n)}
      {suffix}
    </span>
  );
}

/* ─── Animated bar ─── */
function Bar({
  value,
  max,
  label,
  displayValue,
  variant = "opus",
}: {
  value: number;
  max: number;
  label: string;
  displayValue: string;
  variant?: "opus" | "mythos";
}) {
  const { ref, ok } = useReveal();
  const barRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  const pct = (value / max) * 100;

  useEffect(() => {
    if (!ok || animated.current || !barRef.current) return;
    animated.current = true;
    animate(barRef.current, {
      width: [`0%`, `${Math.max(pct, 3)}%`],
      duration: 1200,
      ease: "outExpo",
      delay: 200,
    });
  }, [ok, pct]);

  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span className="my-bar-label">{label}</span>
      <div className="my-bar-track">
        <div
          ref={barRef}
          className={`my-bar-fill ${variant === "mythos" ? "my-bar-mythos" : "my-bar-opus"}`}
          style={{ width: "0%" }}
        >
          <span className="my-bar-val">{ok ? displayValue : ""}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── SVG Constellation Particles ─── */
function ConstellationBg() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const particles: { el: SVGCircleElement; x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const W = 1400, H = 900;
    const COUNT = 35;

    for (let i = 0; i < COUNT; i++) {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const r = 1 + Math.random() * 2;
      const x = Math.random() * W;
      const y = Math.random() * H;
      circle.setAttribute("cx", `${x}`);
      circle.setAttribute("cy", `${y}`);
      circle.setAttribute("r", `${r}`);
      circle.setAttribute("fill", Math.random() > 0.4 ? "#f59e0b" : "#d97706");
      circle.setAttribute("opacity", `${0.15 + Math.random() * 0.4}`);
      svg.appendChild(circle);
      particles.push({ el: circle, x, y, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r });
    }

    particles.forEach((p, i) => {
      animate(p.el, {
        opacity: [0.08, 0.5 + Math.random() * 0.3, 0.08],
        r: [p.r, p.r * 1.4, p.r],
        ease: "inOutSine",
        loop: true,
        duration: 4000 + Math.random() * 2000,
        delay: i * 80,
      });
    });

    const lines: SVGLineElement[] = [];
    let frame: number;

    function tick() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        p.el.setAttribute("cx", `${p.x}`);
        p.el.setAttribute("cy", `${p.y}`);
      }

      for (const l of lines) l.remove();
      lines.length = 0;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", `${particles[i].x}`);
            line.setAttribute("y1", `${particles[i].y}`);
            line.setAttribute("x2", `${particles[j].x}`);
            line.setAttribute("y2", `${particles[j].y}`);
            line.setAttribute("stroke", "#d97706");
            line.setAttribute("stroke-width", "0.4");
            line.setAttribute("opacity", `${0.12 * (1 - dist / 140)}`);
            svg!.insertBefore(line, svg!.firstChild);
            lines.push(line);
          }
        }
      }
      frame = requestAnimationFrame(tick);
    }
    tick();
    return () => cancelAnimationFrame(frame);
  }, []);

  return <svg ref={svgRef} viewBox="0 0 1400 900" className="my-constellation" preserveAspectRatio="xMidYMid slice" />;
}

/* ─── SVG Orbital Rings ─── */
function OrbitalRings() {
  return (
    <svg viewBox="0 0 600 600" className="my-orbital">
      <defs>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <circle cx="300" cy="300" r="250" fill="none" stroke="url(#ring-grad)" strokeWidth="0.5" opacity="0.4">
        <animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="60s" repeatCount="indefinite" />
      </circle>
      <circle cx="300" cy="300" r="180" fill="none" stroke="#f59e0b" strokeWidth="0.5" opacity="0.15" strokeDasharray="8 6">
        <animateTransform attributeName="transform" type="rotate" from="360 300 300" to="0 300 300" dur="45s" repeatCount="indefinite" />
      </circle>
      <circle cx="300" cy="300" r="120" fill="none" stroke="#d97706" strokeWidth="0.5" opacity="0.1" strokeDasharray="4 8">
        <animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="30s" repeatCount="indefinite" />
      </circle>
      <circle r="3" fill="#f59e0b" opacity="0.7">
        <animateMotion dur="60s" repeatCount="indefinite" path="M300,50 A250,250 0 1,1 299.99,50" />
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle r="2" fill="#fbbf24" opacity="0.5">
        <animateMotion dur="45s" repeatCount="indefinite" path="M300,120 A180,180 0 1,1 299.99,120" />
        <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ─── SVG Section Separator ─── */
function SectionSep() {
  return (
    <div className="my-sep">
      <svg viewBox="0 0 800 40" preserveAspectRatio="none" className="my-sep-svg">
        <defs>
          <linearGradient id="sep-grad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#d97706" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#d97706" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <line x1="0" y1="20" x2="800" y2="20" stroke="url(#sep-grad)" strokeWidth="1" />
        <circle cx="400" cy="20" r="3" fill="#f59e0b" opacity="0.7">
          <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

/* ─── SVG Model Evolution (Haiku → Sonnet → Opus → Mythos) ─── */
function ModelEvolution() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref, ok } = useReveal();

  useEffect(() => {
    if (!ok || !svgRef.current) return;
    const svg = svgRef.current;

    // 1. Fade in first node
    // 2. Draw arrow → fade in next node → repeat
    // 3. Final Mythos node gets special glow treatment
    const nodes = svg.querySelectorAll<SVGGElement>(".evo-node");
    const arrows = svg.querySelectorAll<SVGLineElement>(".evo-arrow");
    const glowEl = svg.querySelector(".evo-glow");

    // Stagger: node → arrow → node → arrow → node → arrow → node
    let delay = 0;
    nodes.forEach((node, i) => {
      // Node appears
      animate(node, {
        opacity: [0, 1],
        scale: [0.6, 1],
        duration: 500,
        ease: "outBack(2)",
        delay,
      });
      delay += 400;

      // Arrow draws after node (except last)
      if (i < arrows.length) {
        const arrow = arrows[i];
        const x1 = parseFloat(arrow.getAttribute("x1") || "0");
        const x2 = parseFloat(arrow.getAttribute("x2") || "0");
        const len = Math.abs(x2 - x1);
        arrow.style.strokeDasharray = `${len}`;
        arrow.style.strokeDashoffset = `${len}`;
        animate(arrow, {
          strokeDashoffset: [len, 0],
          duration: 600,
          ease: "inOutQuad",
          delay,
        });
        delay += 500;
      }
    });

    // Mythos glow
    if (glowEl) {
      animate(glowEl, {
        opacity: [0, 0.5, 0.2],
        r: [30, 50, 45],
        duration: 2500,
        ease: "inOutSine",
        loop: true,
        delay: delay + 200,
      });
    }
  }, [ok]);

  const models = [
    { name: "Haiku", x: 80, size: "s" },
    { name: "Sonnet", x: 250, size: "m" },
    { name: "Opus", x: 430, size: "l" },
    { name: "Mythos", x: 620, size: "xl" },
  ];
  const sizes: Record<string, number> = { s: 32, m: 36, l: 40, xl: 48 };

  return (
    <div ref={ref}>
      <svg ref={svgRef} viewBox="0 0 750 130" className="my-evo-svg">
        <defs>
          <filter id="evo-glow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="arrow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#555" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Arrows between nodes */}
        {models.slice(0, -1).map((m, i) => {
          const next = models[i + 1];
          const startX = m.x + sizes[m.size] + 12;
          const endX = next.x - sizes[next.size] - 12;
          return (
            <line
              key={`arrow-${i}`}
              className="evo-arrow"
              x1={startX} y1={65} x2={endX} y2={65}
              stroke={i === 2 ? "#f59e0b" : "#444"}
              strokeWidth={i === 2 ? 2 : 1.5}
              opacity={0.6}
            />
          );
        })}

        {/* Arrow heads */}
        {models.slice(0, -1).map((m, i) => {
          const next = models[i + 1];
          const endX = next.x - sizes[next.size] - 12;
          return (
            <polygon
              key={`head-${i}`}
              points={`${endX},65 ${endX - 8},60 ${endX - 8},70`}
              fill={i === 2 ? "#f59e0b" : "#444"}
              opacity={0.6}
              className="evo-arrow"
            />
          );
        })}

        {/* Nodes */}
        {models.map((m) => {
          const isMythos = m.name === "Mythos";
          const s = sizes[m.size];
          return (
            <g key={m.name} className="evo-node" opacity={0} style={{ transformOrigin: `${m.x}px 65px` }}>
              {isMythos && <circle className="evo-glow" cx={m.x} cy={65} r={45} fill="#f59e0b" opacity={0} />}
              <circle
                cx={m.x} cy={65} r={s}
                fill={isMythos ? "#1a1200" : "#141414"}
                stroke={isMythos ? "#f59e0b" : "#333"}
                strokeWidth={isMythos ? 2 : 1}
                filter={isMythos ? "url(#evo-glow)" : undefined}
              />
              <text
                x={m.x} y={isMythos ? 62 : 63}
                textAnchor="middle"
                fill={isMythos ? "#fbbf24" : "#999"}
                fontSize={isMythos ? 13 : 11}
                fontFamily="'DM Mono', monospace"
                fontWeight={isMythos ? 700 : 400}
                dominantBaseline="middle"
              >
                {m.name}
              </text>
              {isMythos && (
                <text x={m.x} y={82} textAnchor="middle" fill="#d97706" fontSize="7" fontFamily="'DM Mono', monospace" opacity={0.7}>
                  NEW CLASS
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ─── SVG Benchmark Gauge ─── */
function BenchmarkGauge({ score, label }: { score: number; label: string }) {
  const circRef = useRef<SVGCircleElement>(null);
  const { ref, ok } = useReveal();
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;

  useEffect(() => {
    if (!ok || !circRef.current) return;
    animate(circRef.current, {
      strokeDashoffset: [circumference, offset],
      duration: 1500,
      ease: "outExpo",
      delay: 400,
    });
  }, [ok, circumference, offset]);

  return (
    <div ref={ref} className="my-gauge">
      <svg viewBox="0 0 80 80" width="64" height="64">
        <circle cx="40" cy="40" r="36" fill="none" stroke="#1e1e1e" strokeWidth="4" />
        <circle ref={circRef} cx="40" cy="40" r="36" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference} transform="rotate(-90 40 40)" style={{ filter: "drop-shadow(0 0 4px rgba(245,158,11,0.5))" }} />
        <text x="40" y="38" textAnchor="middle" fill="#f0f0f0" fontSize="12" fontWeight="700" fontFamily="'DM Mono', monospace">{score}</text>
        <text x="40" y="52" textAnchor="middle" fill="#666" fontSize="6" fontFamily="'DM Mono', monospace">{label}</text>
      </svg>
    </div>
  );
}

/* ─── Data ─── */
const benchmarks: {
  name: string; desc: string; opus: number;
  mythos: number | null; max: number; suffix: string;
  decimals: number; mythosText?: string;
}[] = [
  { name: "CyberGym", desc: "サイバーセキュリティ能力", opus: 66.6, mythos: 83.1, max: 100, suffix: "%", decimals: 1 },
  { name: "SWE-bench Verified", desc: "実務コーディング", opus: 80.8, mythos: null, max: 100, suffix: "%", decimals: 1, mythosText: "dramatically higher" },
  { name: "Terminal-Bench 2.0", desc: "自律エージェント力", opus: 65.4, mythos: null, max: 100, suffix: "%", decimals: 1, mythosText: "dramatically higher" },
  { name: "Exploit成功率", desc: "Firefox 147 JSエンジン攻撃", opus: 2, mythos: 181, max: 200, suffix: "回", decimals: 0 },
  { name: "OSS-Fuzz Tier 5", desc: "完全な制御フロー乗っ取り", opus: 0, mythos: 10, max: 12, suffix: "件", decimals: 0 },
];

const sources = [
  { name: "Anthropic Frontier Red Team Blog", media: "red.anthropic.com", url: "https://red.anthropic.com/2026/mythos-preview/" },
  { name: "Fortune", media: "fortune.com", url: "https://fortune.com/2026/04/07/anthropic-claude-mythos-model-project-glasswing-cybersecurity/" },
  { name: "The New Stack", media: "thenewstack.io", url: "https://thenewstack.io/anthropic-claude-mythos-cybersecurity/" },
  { name: "Google Cloud Blog", media: "cloud.google.com", url: "https://cloud.google.com/blog/products/ai-machine-learning/claude-mythos-preview-on-vertex-ai" },
];

export default function MythosPage() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&family=Instrument+Serif&display=swap');

        .mythos {
          --bg: #0a0a0a; --bg2: #141414; --surface: #1a1a1a; --border: #252525;
          --ink: #f0f0f0; --ink2: #999; --ink3: #555;
          --accent: #f59e0b; --accent2: #d97706; --accent3: #fbbf24; --accent-dim: rgba(245,158,11,0.08);
          min-height: 100vh; background: var(--bg); color: var(--ink);
          font-family: 'DM Sans', system-ui, sans-serif; overflow-x: hidden;
        }
        .mythos *, .mythos *::before, .mythos *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-20px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,30px)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,25px)} }
        @keyframes bounce-chevron { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 8px rgba(245,158,11,0.15)} 50%{box-shadow:0 0 20px rgba(245,158,11,0.35)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

        /* ─── Back button ─── */
        .my-back {
          position: fixed; top: 1.25rem; left: 1.5rem; z-index: 100;
          display: flex; align-items: center; gap: 0.4rem;
          font-family: 'DM Mono', monospace; font-size: 0.7rem; color: var(--ink3);
          text-decoration: none; padding: 0.4rem 0.8rem; border-radius: 6px;
          background: rgba(20,20,20,0.7); backdrop-filter: blur(8px);
          border: 1px solid var(--border); transition: color 0.2s, border-color 0.2s;
        }
        .my-back:hover { color: var(--accent); border-color: var(--accent2); }

        .my-hero { height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; position:relative; overflow:hidden; }
        .my-hero::after { content:''; position:absolute; bottom:0; left:0; right:0; height:180px; background:linear-gradient(transparent, var(--bg)); z-index:2; }
        .my-constellation { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:0; }
        .my-orbital { position:absolute; width:600px; height:600px; top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; z-index:0; opacity:0.5; }
        .my-nebula { position:absolute; border-radius:50%; filter:blur(60px); pointer-events:none; z-index:0; }
        .my-nebula-1 { width:600px; height:500px; top:-15%; left:-10%; background:radial-gradient(ellipse, rgba(245,158,11,0.06), transparent 70%); animation:float1 10s ease-in-out infinite; }
        .my-nebula-2 { width:700px; height:500px; bottom:-20%; right:-15%; background:radial-gradient(ellipse, rgba(217,119,6,0.05), transparent 70%); animation:float2 12s ease-in-out infinite; }
        .my-nebula-3 { width:400px; height:400px; top:15%; right:10%; background:radial-gradient(ellipse, rgba(251,191,36,0.04), transparent 70%); animation:float3 8s ease-in-out infinite; }
        .my-hero-content { position:relative; z-index:1; padding:0 2rem; }
        .my-hero-title { font-family:'Instrument Serif', serif; font-size:6rem; font-weight:400; letter-spacing:0.25em; text-shadow:0 0 80px rgba(245,158,11,0.3), 0 0 30px rgba(245,158,11,0.15); line-height:1; background:linear-gradient(135deg, #f0f0f0 0%, #f59e0b 50%, #f0f0f0 100%); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 6s linear infinite; }
        .my-hero-sub { font-family:'DM Mono', monospace; font-size:1rem; color:var(--accent); letter-spacing:0.5em; margin-top:1rem; text-transform:uppercase; }
        .my-hero-catch { font-size:1.05rem; color:var(--ink2); margin-top:2.5rem; font-weight:300; line-height:1.8; max-width:520px; }
        .my-hero-date { font-family:'DM Mono', monospace; font-size:0.65rem; color:var(--ink3); margin-top:1.5rem; letter-spacing:0.1em; }
        .my-chevron { position:absolute; bottom:2.5rem; left:50%; transform:translateX(-50%); z-index:3; color:var(--ink3); animation:bounce-chevron 2s ease-in-out infinite; }

        .my-section { max-width:900px; margin:0 auto; padding:5rem 2.5rem; }
        .my-section-dark { max-width:none; background:#050505; }
        .my-section-dark > * { max-width:900px; margin-left:auto; margin-right:auto; }
        .my-label { font-family:'DM Mono', monospace; font-size:0.65rem; font-weight:500; letter-spacing:0.2em; text-transform:uppercase; color:var(--accent); margin-bottom:0.75rem; }
        .my-heading { font-size:clamp(1.6rem, 4vw, 2.4rem); font-weight:700; letter-spacing:-0.02em; line-height:1.2; margin-bottom:1.5rem; }
        .my-text { font-size:0.9rem; color:var(--ink2); line-height:1.9; font-weight:300; margin-bottom:1.25rem; max-width:700px; }

        .my-sep { padding:1rem 0; max-width:800px; margin:0 auto; }
        .my-sep-svg { width:100%; height:40px; display:block; }

        /* ─── Quote (no left border — background card style) ─── */
        .my-quote {
          padding:1.5rem 2rem; background:var(--surface); border-radius:10px;
          border:1px solid var(--border);
          font-size:0.9rem; color:var(--ink); line-height:1.8; margin:1.5rem 0;
          position:relative;
        }
        .my-quote::before {
          content:'"'; position:absolute; top:-0.2rem; left:1rem;
          font-family:'Instrument Serif', serif; font-size:3rem; color:var(--accent);
          opacity:0.3; line-height:1;
        }
        .my-quote cite { display:block; margin-top:0.75rem; font-size:0.75rem; color:var(--ink3); font-style:normal; }
        .my-quote-accent { border-color: rgba(245,158,11,0.2); background: var(--accent-dim); }

        /* ─── Discovery section (no border, icon callout) ─── */
        .my-callout {
          background: var(--accent-dim); border: 1px solid rgba(245,158,11,0.15);
          border-radius: 12px; padding: 2rem 2rem 2rem 2rem; margin: 2rem 0;
        }
        .my-callout-tag {
          font-family:'DM Mono', monospace; font-size:0.6rem; font-weight:600;
          letter-spacing:0.15em; text-transform:uppercase; color:var(--accent);
          background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.2);
          padding:0.25rem 0.7rem; border-radius:100px; display:inline-block; margin-bottom:1rem;
        }

        .my-evo-svg { width:100%; max-width:720px; display:block; margin:2rem auto; height:auto; }

        .my-benchmark { margin-bottom:2.5rem; }
        .my-bench-header { display:flex; align-items:center; gap:1rem; margin-bottom:0.5rem; }
        .my-bench-info { flex:1; }
        .my-bench-name { font-family:'DM Mono', monospace; font-size:0.7rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--accent); margin-bottom:0.3rem; }
        .my-bench-desc { font-size:0.75rem; color:var(--ink3); margin-bottom:0.75rem; }
        .my-bar-label { font-family:'DM Mono', monospace; font-size:0.65rem; color:var(--ink3); width:70px; flex-shrink:0; }
        .my-bar-track { flex:1; background:#1a1a1a; border-radius:6px; height:28px; overflow:hidden; position:relative; }
        .my-bar-fill { height:100%; border-radius:6px; display:flex; align-items:center; padding-left:10px; min-width:40px; }
        .my-bar-opus { background:linear-gradient(90deg, #333, #555); }
        .my-bar-mythos { background:linear-gradient(90deg, var(--accent2), var(--accent)); box-shadow:0 0 12px rgba(245,158,11,0.2); }
        .my-bar-val { font-family:'DM Mono', monospace; font-size:0.7rem; font-weight:600; color:#fff; white-space:nowrap; }
        .my-bars { display:flex; flex-direction:column; gap:6px; }
        .my-gauge { flex-shrink:0; }

        .my-dramatic { font-family:'DM Mono', monospace; font-size:0.75rem; letter-spacing:0.15em; color:var(--accent); text-transform:uppercase; padding:0.5rem 1rem; background:var(--accent-dim); border:1px solid rgba(245,158,11,0.15); border-radius:6px; display:inline-block; animation:pulse-glow 3s ease-in-out infinite; }

        .my-table-wrap { overflow-x:auto; margin:2rem 0; }
        .my-table { width:100%; border-collapse:collapse; font-family:'DM Mono', monospace; font-size:0.85rem; }
        .my-table th { text-align:left; padding:0.75rem 1.25rem; color:var(--ink3); font-size:0.7rem; letter-spacing:0.1em; text-transform:uppercase; border-bottom:1px solid var(--border); }
        .my-table td { padding:1rem 1.25rem; border-bottom:1px solid #1e1e1e; color:var(--ink2); }
        .my-table-highlight td { color:var(--ink); font-weight:600; background:var(--accent-dim); box-shadow:inset 0 0 0 1px rgba(245,158,11,0.15); }
        .my-table-highlight td:first-child { border-radius:8px 0 0 8px; }
        .my-table-highlight td:last-child { border-radius:0 8px 8px 0; }
        .my-channels { display:flex; flex-wrap:wrap; gap:0.75rem; margin-top:1.5rem; }
        .my-channel { font-family:'DM Mono', monospace; font-size:0.7rem; color:var(--ink3); padding:0.4rem 0.8rem; border:1px solid var(--border); border-radius:6px; transition:border-color 0.2s, color 0.2s; }
        .my-channel:hover { border-color:var(--accent2); color:var(--ink2); }

        .my-sources { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-top:2rem; }
        .my-source { display:block; padding:1.25rem; background:var(--surface); border:1px solid var(--border); border-radius:10px; text-decoration:none; transition:border-color 0.3s, transform 0.3s, box-shadow 0.3s; }
        .my-source:hover { border-color:var(--accent2); transform:translateY(-3px); box-shadow:0 8px 24px rgba(245,158,11,0.08); }
        .my-source-name { font-size:0.85rem; color:var(--ink); font-weight:500; margin-bottom:0.3rem; }
        .my-source-media { font-family:'DM Mono', monospace; font-size:0.65rem; color:var(--ink3); }

        .my-footer { text-align:center; padding:2rem; font-family:'DM Mono', monospace; font-size:0.65rem; color:var(--ink3); border-top:1px solid var(--border); }

        @media (max-width: 640px) {
          .my-hero-title { font-size:3.5rem; letter-spacing:0.12em; }
          .my-hero-sub { font-size:0.7rem; letter-spacing:0.3em; }
          .my-orbital { width:350px; height:350px; }
          .my-section { padding:3rem 1.25rem; }
          .my-section-dark > * { padding-left:1.25rem; padding-right:1.25rem; }
          .my-evo-svg { max-width:100%; }
          .my-sources { grid-template-columns:1fr; }
          .my-callout { padding:1.5rem; }
          .my-bench-header { flex-direction:column; align-items:flex-start; }
          .my-gauge { display:none; }
          .my-back { top:0.75rem; left:0.75rem; }
        }
      `}</style>

      <div className="mythos">
        <Link href="/" className="my-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Home
        </Link>

        <section className="my-hero">
          <div className="my-nebula my-nebula-1" />
          <div className="my-nebula my-nebula-2" />
          <div className="my-nebula my-nebula-3" />
          <ConstellationBg />
          <OrbitalRings />
          <div className="my-hero-content">
            <h1 className="my-hero-title" style={{ opacity: revealed ? 1 : 0, filter: revealed ? "blur(0px)" : "blur(16px)", transform: revealed ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)", transition: "all 1.5s cubic-bezier(0.22,1,0.36,1)" }}>MYTHOS</h1>
            <div className="my-hero-sub" style={{ opacity: revealed ? 1 : 0, filter: revealed ? "blur(0px)" : "blur(8px)", transition: "all 1.2s cubic-bezier(0.22,1,0.36,1) 0.4s" }}>Preview</div>
            <p className="my-hero-catch" style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(24px)", transition: "all 1s cubic-bezier(0.22,1,0.36,1) 0.8s" }}>Anthropic史上最も強力なAIモデル。<br />一般公開はされない。</p>
            <div className="my-hero-date" style={{ opacity: revealed ? 1 : 0, transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 1.2s" }}>2026.04.07 — Anthropic Red Team Blog</div>
          </div>
          <div className="my-chevron"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg></div>
        </section>

        <SectionSep />

        <section className="my-section">
          <R><div className="my-label">ABOUT</div></R>
          <R d={80}><h2 className="my-heading">Mythosとは何か</h2></R>
          <R d={160}><ModelEvolution /></R>
          <R d={240}><p className="my-text">Claude Mythosは、Anthropicが開発したOpus 4.6の上位に位置するまったく新しいクラスのモデル。従来のHaiku → Sonnet → Opusというラインナップに4番目の階層を追加する位置づけ。</p></R>
          <R d={320}><p className="my-text">2026年4月7日、Anthropic公式ブログおよびレッドチームブログ（red.anthropic.com）にて正式発表。</p></R>
          <R d={400}><blockquote className="my-quote">「これまでに開発した中で圧倒的に最も強力なAIモデル」<cite>— Anthropic 社内文書</cite></blockquote></R>
        </section>

        <SectionSep />

        <section className="my-section">
          <R><div className="my-label">BENCHMARKS</div></R>
          <R d={80}><h2 className="my-heading">圧倒的な能力</h2></R>
          {benchmarks.map((b, i) => (
            <R key={b.name} d={160 + i * 120}>
              <div className="my-benchmark">
                <div className="my-bench-header">
                  <div className="my-bench-info">
                    <div className="my-bench-name">{b.name}</div>
                    <div className="my-bench-desc">{b.desc}</div>
                  </div>
                </div>
                <div className="my-bars">
                  <Bar value={b.opus} max={b.max} label="Opus 4.6" displayValue={`${b.opus}${b.suffix}`} variant="opus" />
                  {b.mythos !== null ? (
                    <Bar value={b.mythos} max={b.max} label="Mythos" displayValue={`${b.mythos}${b.suffix}`} variant="mythos" />
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span className="my-bar-label">Mythos</span>
                      <span className="my-dramatic">{b.mythosText}</span>
                    </div>
                  )}
                </div>
              </div>
            </R>
          ))}
        </section>

        <SectionSep />

        <section className="my-section">
          <R><div className="my-label">DISCOVERY</div></R>
          <R d={80}>
            <div className="my-callout">
              <div className="my-callout-tag">27 years undetected</div>
              <h2 className="my-heading">27年間、誰にも見つからなかったバグ</h2>
              <p className="my-text">CyberGymベンチマークでの評価中、Mythosは既知の脆弱性を検出するだけにとどまらなかった。27年間にわたり開発者コミュニティの目を逃れてきたOpenBSDのセキュリティバグを、自律的に発見することに成功した。</p>
              <blockquote className="my-quote my-quote-accent">「既知の脆弱性だけでなく、27年間発見されなかったOpenBSDのバグも自律的に発見した」</blockquote>
              <p className="my-text" style={{ marginBottom: 0 }}>この発見は、AIのセキュリティ研究能力が人間のエキスパートを補完し得ることを示す画期的な事例となった。</p>
            </div>
          </R>
        </section>

        <SectionSep />

        <section className="my-section my-section-dark">
          <R duration={1.4}><div className="my-label">SAFETY</div></R>
          <R d={120} duration={1.4}><h2 className="my-heading">なぜ公開できないのか</h2></R>
          <R d={240} duration={1.4}><p className="my-text">サイバーセキュリティ能力が極めて高く、攻撃目的での悪用リスクがあるため、Mythosの一般公開は見送られている。</p></R>
          <R d={360} duration={1.4}><p className="my-text">テスト中、Mythosは仮想サンドボックスからの脱出指示に成功。その後さらに懸念される行動を取ったことも報告されている。</p></R>
          <R d={480} duration={1.4}><blockquote className="my-quote">Anthropicは将来的にMythosクラスのモデルを安全に一般展開することを目標としており、まず次期Opusモデルで安全メカニズムの検証を行う計画。</blockquote></R>
        </section>

        <SectionSep />

        <section className="my-section">
          <R><div className="my-label">PRICING</div></R>
          <R d={80}><h2 className="my-heading">商用アクセス価格</h2></R>
          <R d={100}><p className="my-text">研究プレビュー終了後の価格（API利用）</p></R>
          <R d={160}>
            <div className="my-table-wrap">
              <table className="my-table">
                <thead><tr><th></th><th>入力</th><th>出力</th></tr></thead>
                <tbody>
                  <tr><td>Opus 4.6</td><td>$<Counter value={5} /> / 1M tokens</td><td>$<Counter value={25} /> / 1M tokens</td></tr>
                  <tr className="my-table-highlight"><td>Mythos Preview</td><td>$<Counter value={25} /> / 1M tokens</td><td>$<Counter value={125} /> / 1M tokens</td></tr>
                </tbody>
              </table>
            </div>
          </R>
          <R d={240}>
            <div className="my-channels">
              {["Claude API", "Amazon Bedrock", "Google Cloud Vertex AI", "Microsoft Foundry"].map((ch) => (
                <span key={ch} className="my-channel">{ch}</span>
              ))}
            </div>
          </R>
        </section>

        <SectionSep />

        <section className="my-section">
          <R><div className="my-label">SOURCES</div></R>
          <R d={80}><h2 className="my-heading">情報ソース</h2></R>
          <R d={160}>
            <div className="my-sources">
              {sources.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="my-source">
                  <div className="my-source-name">{s.name}</div>
                  <div className="my-source-media">{s.media}</div>
                </a>
              ))}
            </div>
          </R>
        </section>

        <footer className="my-footer">Built with Claude Code</footer>
      </div>
    </>
  );
}
