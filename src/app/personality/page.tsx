"use client";

import { useEffect, useState, useRef } from "react";

/* ─── Reveal on Scroll ─── */
function useReveal(threshold = 0.2) {
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

function R({ ok, children, d = 0 }: { ok: boolean; children: React.ReactNode; d?: number }) {
  return (
    <div
      className={`reveal${ok ? " visible" : ""}`}
      style={{ transitionDelay: `${d}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Page ─── */
export default function PersonalityPage() {
  return (
    <main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Cormorant+Garamond:wght@400;600&family=Noto+Sans+JP:wght@300;400;500&display=swap');

        :root {
          --bg: #f3efe8;
          --surface: #faf8f5;
          --border: #e0dbd4;
          --accent: #8b6f47;
          --accent-light: #c4a882;
          --muted: #a89a8b;
          --ink: #1a1a1a;
          --body: #3a3632;
          --sub: #6b6560;
          --error: #c4574a;
        }

        body {
          background: var(--bg);
          font-family: 'Noto Sans JP', sans-serif;
          color: var(--body);
        }

        /* ─── Hero ─── */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 24px;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .hero-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 12px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--accent);
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 5vw, 52px);
          font-weight: 400;
          line-height: 1.4;
          color: var(--ink);
        }
        .hero-title em {
          font-style: italic;
          color: var(--accent);
        }
        .hero-subtitle {
          font-family: 'Noto Sans JP', sans-serif;
          font-size: clamp(14px, 2vw, 18px);
          font-weight: 300;
          color: var(--sub);
          max-width: 540px;
          line-height: 1.8;
        }
        .divider {
          width: 60px;
          height: 1px;
          background: var(--accent-light);
          margin: 0 auto;
        }
        .hero-svg-container {
          max-width: 400px;
          margin: 0 auto 48px;
        }
        .scroll-indicator {
          position: absolute;
          bottom: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--accent), transparent);
        }

        /* ─── Animations ─── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        /* ─── Sections ─── */
        .section {
          max-width: 640px;
          margin: 0 auto;
          padding: 80px 24px;
          border-top: 1px solid var(--border);
        }
        .section-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          color: var(--accent);
          letter-spacing: 3px;
        }
        .section-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 3vw, 32px);
          font-weight: 400;
          color: var(--ink);
          line-height: 1.5;
          margin-bottom: 24px;
        }
        .section-body {
          font-family: 'Noto Sans JP', sans-serif;
          font-size: 15px;
          font-weight: 300;
          line-height: 2.0;
          color: var(--body);
        }
        .section-body p {
          margin-bottom: 1.5em;
        }
        .section-body strong {
          font-weight: 500;
        }
        .section-point {
          background: var(--surface);
          border-left: 3px solid var(--accent);
          padding: 20px 24px;
          border-radius: 0 4px 4px 0;
          margin: 32px 0;
        }
        .section-point p {
          font-size: 14px;
          font-weight: 500;
          color: var(--ink);
          line-height: 1.8;
          margin: 0;
        }

        /* ─── Hero SVG Keyframes ─── */
        @keyframes drawLine {
          from { opacity: 0; stroke-dasharray: 200; stroke-dashoffset: 200; }
          to { opacity: 0.4; stroke-dasharray: 200; stroke-dashoffset: 0; }
        }
        @keyframes pulse {
          0% { opacity: 0; r: 4; }
          50% { opacity: 0.3; r: 20; }
          100% { opacity: 0; r: 36; }
        }
        @keyframes nodeAppear {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 0.7; transform: scale(1); }
        }

        /* ─── Section 02 SVG Keyframes ─── */
        @keyframes brainGrow { to { opacity: 0.15; } }
        @keyframes ringAppear { to { opacity: 0.5; } }
        @keyframes dotIn { to { opacity: 0.7; } }
        @keyframes fadeIn { to { opacity: 1; } }

        /* ─── Reveal ─── */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: all 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ─── SVG Container ─── */
        .svg-container {
          max-width: 400px;
          margin: 32px auto;
        }
        .svg-animate * {
          animation-play-state: paused;
        }
        .svg-animate.visible * {
          animation-play-state: running;
        }

        /* ─── Hero SVG Classes ─── */
        .connection {
          stroke: var(--accent-light);
          stroke-width: 0.8;
          opacity: 0;
          animation: drawLine 2s ease forwards;
        }
        .pulse {
          fill: none;
          stroke: var(--accent);
          stroke-width: 1;
          opacity: 0;
          animation: pulse 3s ease-in-out infinite;
        }
        .node-appear {
          opacity: 0;
          animation: nodeAppear 0.6s ease forwards;
        }

        /* ─── Section 02 SVG Classes ─── */
        .brain-outline {
          stroke: var(--accent-light);
          stroke-width: 1.5;
          fill: none;
        }
        .brain-fill {
          fill: var(--accent);
          opacity: 0;
        }
        .svg-animate.visible .brain-fill {
          animation: brainGrow 2s ease 0.5s forwards;
        }
        .group-circle {
          fill: none;
          stroke: var(--accent);
          stroke-width: 1;
          stroke-dasharray: 4 2;
          opacity: 0;
        }
        .svg-animate.visible .group-circle.g1 {
          animation: ringAppear 1s ease 1s forwards;
        }
        .svg-animate.visible .group-circle.g2 {
          animation: ringAppear 1s ease 1.5s forwards;
        }
        .svg-animate.visible .group-circle.g3 {
          animation: ringAppear 1s ease 2s forwards;
        }
        .person-dot {
          fill: var(--accent);
          opacity: 0;
        }
        .svg-animate.visible .person-dot.d1 { animation: dotIn 0.5s ease 1.2s forwards; }
        .svg-animate.visible .person-dot.d2 { animation: dotIn 0.5s ease 1.4s forwards; }
        .svg-animate.visible .person-dot.d3 { animation: dotIn 0.5s ease 1.6s forwards; }
        .svg-animate.visible .person-dot.d4 { animation: dotIn 0.5s ease 1.8s forwards; }
        .svg-animate.visible .person-dot.d5 { animation: dotIn 0.5s ease 2.0s forwards; }
        .svg-animate.visible .person-dot.d6 { animation: dotIn 0.5s ease 2.2s forwards; }
        .svg-animate.visible .person-dot.d7 { animation: dotIn 0.5s ease 2.4s forwards; }
        .svg-animate.visible .person-dot.d8 { animation: dotIn 0.5s ease 2.6s forwards; }
        .num-150 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          fill: var(--accent);
          opacity: 0;
        }
        .svg-animate.visible .num-150 {
          animation: fadeIn 1s ease 2.5s forwards;
        }

        /* ─── Responsive ─── */
        @media (max-width: 640px) {
          .section { padding: 48px 16px; }
          .hero { padding: 40px 16px; }
        }
      `}</style>

      {/* Content will be added in subsequent tasks */}
    </main>
  );
}
