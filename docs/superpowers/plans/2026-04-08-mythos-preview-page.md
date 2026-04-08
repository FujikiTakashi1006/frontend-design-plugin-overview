# Claude Mythos Preview Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a storytelling-style scroll page at `/mythos` showcasing Claude Mythos Preview with nebula visuals, animated benchmark charts, and purple × cyan color scheme.

**Architecture:** Single `page.tsx` file following existing codebase pattern (best-practice, overview pages). All components inline. CSS-in-JS via a single `<style>` tag. IntersectionObserver-based scroll reveals. No external dependencies. All CSS additions across tasks go into the same `<style>` block.

**Tech Stack:** Next.js 16, React 19, CSS keyframes, IntersectionObserver API

**Spec:** `docs/superpowers/specs/2026-04-08-mythos-preview-page-design.md`

---

## Chunk 1: Page scaffold, shared components, and hero section

### Task 1: Create page file with shared components

**Files:**
- Create: `src/app/mythos/page.tsx`

- [ ] **Step 1: Create the page file with "use client" directive, imports, CSS variables, and shared components**

Write `src/app/mythos/page.tsx` with:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

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
  className = "",
}: {
  children: React.ReactNode;
  d?: number;
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
        transition: `all 0.9s cubic-bezier(0.22,1,0.36,1) ${d}ms`,
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
  useEffect(() => {
    if (!ok) return;
    const start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / 1200, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setN(decimals > 0 ? parseFloat((ease * value).toFixed(decimals)) : Math.round(ease * value));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [ok, value, decimals]);
  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? n.toFixed(decimals) : n}
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
  const pct = (value / max) * 100;
  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span className="my-bar-label">{label}</span>
      <div className="my-bar-track">
        <div
          className={`my-bar-fill ${variant === "mythos" ? "my-bar-mythos" : "my-bar-opus"}`}
          style={{
            width: ok ? `${Math.max(pct, 3)}%` : "0%",
            transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <span className="my-bar-val">{ok ? displayValue : ""}</span>
        </div>
      </div>
    </div>
  );
}

export default function MythosPage() {
  return <div>WIP</div>;
}
```

> **Note:** The placeholder `export default` ensures the file is a valid Next.js page at every commit boundary. It will be replaced with the full component in Task 2.

- [ ] **Step 2: Verify the file was created**

Run: `ls src/app/mythos/page.tsx`
Expected: file exists

- [ ] **Step 3: Commit scaffold**

```bash
git add src/app/mythos/page.tsx
git commit -m "feat(mythos): scaffold page with shared components"
```

### Task 2: Add CSS styles and hero section

**Files:**
- Modify: `src/app/mythos/page.tsx`

- [ ] **Step 1: Replace the placeholder default export with full CSS and hero section**

Replace the `export default function MythosPage() { return <div>WIP</div>; }` with the full component. The component includes:

1. A `<style>` block with ALL CSS for the entire page (variables, fonts, keyframes, all sections)
2. Hero section with nebula blobs and blur reveal
3. Empty section placeholders (will be filled in subsequent tasks)

```tsx
export default function MythosPage() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .mythos {
          --bg: #0a0014;
          --bg2: #1a0530;
          --surface: #110020;
          --border: #2a1045;
          --ink: #f0eaff;
          --ink2: #a78bfa;
          --ink3: #6b5b8a;
          --purple: #7c3aed;
          --purple-light: #a855f7;
          --purple-dark: #4c1d95;
          --cyan: #06b6d4;

          min-height: 100vh;
          background: var(--bg);
          color: var(--ink);
          font-family: 'DM Sans', system-ui, sans-serif;
          overflow-x: hidden;
        }
        .mythos *, .mythos *::before, .mythos *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ─── Nebula keyframes ─── */
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-20px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,30px)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,25px)} }
        @keyframes bounce-chevron { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 8px rgba(168,85,247,0.2)} 50%{box-shadow:0 0 20px rgba(168,85,247,0.4)} }

        /* ─── Hero ─── */
        .my-hero {
          height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center;
          position: relative; overflow: hidden;
        }
        .my-hero::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 120px;
          background: linear-gradient(transparent, var(--bg)); z-index: 2;
        }
        .my-nebula { position: absolute; border-radius: 50%; filter: blur(40px); pointer-events: none; }
        .my-nebula-1 {
          width: 500px; height: 400px; top: -10%; left: -5%;
          background: radial-gradient(ellipse, rgba(139,92,246,0.2), transparent 70%);
          animation: float1 10s ease-in-out infinite;
        }
        .my-nebula-2 {
          width: 600px; height: 450px; bottom: -15%; right: -10%;
          background: radial-gradient(ellipse, rgba(168,85,247,0.15), transparent 70%);
          animation: float2 12s ease-in-out infinite;
        }
        .my-nebula-3 {
          width: 350px; height: 350px; top: 20%; right: 15%;
          background: radial-gradient(ellipse, rgba(196,181,253,0.1), transparent 70%);
          animation: float3 8s ease-in-out infinite;
        }
        .my-hero-content { position: relative; z-index: 1; padding: 0 2rem; }
        .my-hero-title {
          font-size: 5rem; font-weight: 800; letter-spacing: 0.3em;
          text-shadow: 0 0 80px rgba(168,85,247,0.5), 0 0 40px rgba(168,85,247,0.3);
          line-height: 1;
        }
        .my-hero-sub {
          font-family: 'DM Mono', monospace; font-size: 1rem; color: var(--cyan);
          letter-spacing: 0.4em; margin-top: 0.75rem; text-transform: uppercase;
        }
        .my-hero-catch {
          font-size: 1rem; color: var(--ink2); margin-top: 2rem;
          font-weight: 300; line-height: 1.8; max-width: 500px;
        }
        .my-chevron {
          position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
          z-index: 3; color: var(--ink3); animation: bounce-chevron 2s ease-in-out infinite;
        }

        /* ─── Sections ─── */
        .my-section {
          max-width: 900px; margin: 0 auto; padding: 5rem 2.5rem;
        }
        .my-section-dark { max-width: none; background: #050010; }
        .my-section-dark > * { max-width: 900px; margin-left: auto; margin-right: auto; }
        .my-label {
          font-family: 'DM Mono', monospace; font-size: 0.65rem; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--cyan); margin-bottom: 0.75rem;
        }
        .my-heading {
          font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 700;
          letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 1.5rem;
        }
        .my-text {
          font-size: 0.9rem; color: var(--ink2); line-height: 1.9;
          font-weight: 300; margin-bottom: 1.25rem; max-width: 700px;
        }

        /* ─── Quote ─── */
        .my-quote {
          border-left: 4px solid var(--purple); padding: 1.25rem 1.5rem;
          background: rgba(124,58,237,0.06); border-radius: 0 8px 8px 0;
          font-size: 0.9rem; color: var(--ink); line-height: 1.8; margin: 1.5rem 0;
        }
        .my-quote cite {
          display: block; margin-top: 0.75rem; font-size: 0.75rem;
          color: var(--ink3); font-style: normal;
        }
        .my-quote-cyan { border-left-color: var(--cyan); background: rgba(6,182,212,0.06); }

        /* ─── Accent section (section 4 full cyan left border) ─── */
        .my-accent-section {
          border-left: 4px solid var(--cyan); padding-left: 2rem; margin: 2rem 0;
        }

        /* ─── Hierarchy ─── */
        .my-hierarchy { display: flex; align-items: center; justify-content: center; gap: 0; margin: 2.5rem 0; flex-wrap: wrap; }
        .my-hierarchy-item { display: flex; align-items: center; }
        .my-hierarchy-line { width: 40px; height: 2px; background: var(--cyan); }
        .my-hierarchy-box {
          padding: 0.7rem 1.5rem; border: 1px solid var(--border); border-radius: 8px;
          font-family: 'DM Mono', monospace; font-size: 0.8rem; color: var(--ink2);
          background: var(--surface);
        }
        .my-hierarchy-active {
          color: var(--ink); border-color: var(--purple); font-weight: 600;
          box-shadow: 0 0 20px rgba(168,85,247,0.3); font-size: 0.9rem;
        }

        /* ─── Bar chart ─── */
        .my-benchmark { margin-bottom: 2.5rem; }
        .my-bench-name {
          font-family: 'DM Mono', monospace; font-size: 0.7rem; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--cyan); margin-bottom: 0.3rem;
        }
        .my-bench-desc { font-size: 0.75rem; color: var(--ink3); margin-bottom: 0.75rem; }
        .my-bar-label {
          font-family: 'DM Mono', monospace; font-size: 0.65rem; color: var(--ink3);
          width: 70px; flex-shrink: 0;
        }
        .my-bar-track {
          flex: 1; background: rgba(26,5,48,0.8); border-radius: 6px; height: 28px;
          overflow: hidden; position: relative;
        }
        .my-bar-fill {
          height: 100%; border-radius: 6px; display: flex; align-items: center;
          padding-left: 10px; min-width: 40px;
        }
        .my-bar-opus { background: linear-gradient(90deg, var(--purple-dark), var(--purple)); }
        .my-bar-mythos {
          background: linear-gradient(90deg, var(--purple), var(--purple-light));
          box-shadow: 0 0 12px rgba(168,85,247,0.3);
        }
        .my-bar-val {
          font-family: 'DM Mono', monospace; font-size: 0.7rem; font-weight: 600;
          color: #fff; white-space: nowrap;
        }
        .my-bars { display: flex; flex-direction: column; gap: 6px; }

        /* ─── Dramatic text ─── */
        .my-dramatic {
          font-family: 'DM Mono', monospace; font-size: 0.75rem; letter-spacing: 0.15em;
          color: var(--purple-light); text-transform: uppercase; padding: 0.5rem 1rem;
          background: rgba(168,85,247,0.08); border: 1px solid rgba(168,85,247,0.15);
          border-radius: 6px; display: inline-block; animation: pulse-glow 3s ease-in-out infinite;
        }

        /* ─── Table ─── */
        .my-table-wrap { overflow-x: auto; margin: 2rem 0; }
        .my-table {
          width: 100%; border-collapse: collapse; font-family: 'DM Mono', monospace; font-size: 0.85rem;
        }
        .my-table th {
          text-align: left; padding: 0.75rem 1.25rem; color: var(--ink3);
          font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
          border-bottom: 1px solid var(--border);
        }
        .my-table td {
          padding: 1rem 1.25rem; border-bottom: 1px solid rgba(42,16,69,0.5); color: var(--ink2);
        }
        .my-table-highlight td {
          color: var(--ink); font-weight: 600;
          background: rgba(168,85,247,0.05);
          box-shadow: inset 0 0 0 1px rgba(168,85,247,0.15);
        }
        .my-table-highlight td:first-child { border-radius: 8px 0 0 8px; }
        .my-table-highlight td:last-child { border-radius: 0 8px 8px 0; }
        .my-channels { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem; }
        .my-channel {
          font-family: 'DM Mono', monospace; font-size: 0.7rem; color: var(--ink3);
          padding: 0.4rem 0.8rem; border: 1px solid var(--border); border-radius: 6px;
        }

        /* ─── Sources ─── */
        .my-sources { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2rem; }
        .my-source {
          display: block; padding: 1.25rem; background: var(--surface); border: 1px solid var(--border);
          border-radius: 10px; text-decoration: none; transition: border-color 0.2s, transform 0.2s;
        }
        .my-source:hover { border-color: var(--purple); transform: translateY(-2px); }
        .my-source-name { font-size: 0.85rem; color: var(--ink); font-weight: 500; margin-bottom: 0.3rem; }
        .my-source-media { font-family: 'DM Mono', monospace; font-size: 0.65rem; color: var(--ink3); }

        /* ─── Footer ─── */
        .my-footer {
          text-align: center; padding: 2rem; font-family: 'DM Mono', monospace;
          font-size: 0.65rem; color: var(--ink3); border-top: 1px solid var(--border);
        }

        /* ─── Responsive ─── */
        @media (max-width: 640px) {
          .my-hero-title { font-size: 3rem; letter-spacing: 0.15em; }
          .my-hero-sub { font-size: 0.75rem; }
          .my-section { padding: 3rem 1.25rem; }
          .my-section-dark > * { padding-left: 1.25rem; padding-right: 1.25rem; }
          .my-hierarchy { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
          .my-hierarchy-line { display: none; }
          .my-sources { grid-template-columns: 1fr; }
          .my-accent-section { padding-left: 1rem; }
        }
      `}</style>

      <div className="mythos">
        {/* ─── HERO ─── */}
        <section className="my-hero">
          <div className="my-nebula my-nebula-1" />
          <div className="my-nebula my-nebula-2" />
          <div className="my-nebula my-nebula-3" />
          <div className="my-hero-content">
            <h1
              className="my-hero-title"
              style={{
                opacity: revealed ? 1 : 0,
                filter: revealed ? "blur(0px)" : "blur(12px)",
                transform: revealed ? "translateY(0)" : "translateY(12px)",
                transition: "all 1.2s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              MYTHOS
            </h1>
            <div
              className="my-hero-sub"
              style={{
                opacity: revealed ? 1 : 0,
                filter: revealed ? "blur(0px)" : "blur(8px)",
                transition: "all 1s cubic-bezier(0.22,1,0.36,1) 0.3s",
              }}
            >
              Preview
            </div>
            <p
              className="my-hero-catch"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: "all 1s cubic-bezier(0.22,1,0.36,1) 0.6s",
              }}
            >
              Anthropic史上最も強力なAIモデル。<br />一般公開はされない。
            </p>
          </div>
          <div className="my-chevron">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </section>

        {/* Sections ②-⑦ will be added in subsequent tasks */}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Run dev server and verify hero renders**

Run: `cd /Users/fujikitakashi/Desktop/プラグインテスト && npx next dev --port 3456`
Navigate to `http://localhost:3456/mythos`
Expected: Full-screen hero with nebula background, MYTHOS title with purple glow, floating blobs animating, "Preview" in cyan, catchphrase fading in, scroll chevron bouncing.

- [ ] **Step 3: Commit hero section**

```bash
git add src/app/mythos/page.tsx
git commit -m "feat(mythos): add CSS styles and hero section with nebula background"
```

## Chunk 2: Content sections (② through ⑤)

### Task 3: Add "What is Mythos" section (②)

**Files:**
- Modify: `src/app/mythos/page.tsx`

- [ ] **Step 1: Add section ② after hero**

Content:
- Section label: "ABOUT" (cyan, uppercase, small)
- Heading: "Mythosとは何か"
- Model hierarchy: horizontal flex with 4 boxes (Haiku → Sonnet → Opus → Mythos) connected by cyan lines (pseudo-elements or inline SVG). Mythos box has purple glow border + slightly larger. Each box shows model name.
- Text paragraphs explaining Mythos position, announcement date (2026/4/7), Anthropic quote in a styled blockquote
- All wrapped in `<R>` components with staggered delays

```tsx
{/* ─── SECTION 2: What is Mythos ─── */}
<section className="my-section">
  <R><div className="my-label">ABOUT</div></R>
  <R d={80}><h2 className="my-heading">Mythosとは何か</h2></R>
  <R d={160}>
    <div className="my-hierarchy">
      {["Haiku", "Sonnet", "Opus", "Mythos"].map((name, i) => (
        <div key={name} className="my-hierarchy-item">
          {i > 0 && <div className="my-hierarchy-line" />}
          <div className={`my-hierarchy-box ${name === "Mythos" ? "my-hierarchy-active" : ""}`}>
            {name}
          </div>
        </div>
      ))}
    </div>
  </R>
  <R d={240}>
    <p className="my-text">
      Claude Mythosは、Anthropicが開発したOpus 4.6の上位に位置するまったく新しいクラスのモデル。
      従来のHaiku → Sonnet → Opusというラインナップに4番目の階層を追加する位置づけ。
    </p>
  </R>
  <R d={320}>
    <p className="my-text">
      2026年4月7日、Anthropic公式ブログおよびレッドチームブログ（red.anthropic.com）にて正式発表。
    </p>
  </R>
  <R d={400}>
    <blockquote className="my-quote">
      「これまでに開発した中で圧倒的に最も強力なAIモデル」
      <cite>— Anthropic 社内文書</cite>
    </blockquote>
  </R>
</section>
```

CSS for hierarchy (add to `<style>`):
```css
.my-hierarchy { display: flex; align-items: center; justify-content: center; gap: 0; margin: 2.5rem 0; flex-wrap: wrap; }
.my-hierarchy-item { display: flex; align-items: center; }
.my-hierarchy-line { width: 40px; height: 2px; background: var(--cyan); }
.my-hierarchy-box {
  padding: 0.7rem 1.5rem; border: 1px solid var(--border); border-radius: 8px;
  font-family: 'DM Mono', monospace; font-size: 0.8rem; color: var(--ink2);
  background: var(--surface);
}
.my-hierarchy-active {
  color: var(--ink); border-color: var(--purple); font-weight: 600;
  box-shadow: 0 0 20px rgba(168,85,247,0.3); font-size: 0.9rem;
}
@media (max-width: 640px) {
  .my-hierarchy { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .my-hierarchy-line { display: none; }
}
```

- [ ] **Step 2: Verify section renders with hierarchy**

Run dev server, scroll past hero.
Expected: Model hierarchy boxes visible, Mythos box glowing, text fading in on scroll.

- [ ] **Step 3: Commit**

```bash
git add src/app/mythos/page.tsx
git commit -m "feat(mythos): add 'What is Mythos' section with model hierarchy"
```

### Task 4: Add benchmark comparison section (③)

**Files:**
- Modify: `src/app/mythos/page.tsx`

- [ ] **Step 1: Add benchmark data and full section ③ JSX**

Add the benchmarks data array at the top of the file (inside the module, before the default export), then add the section JSX inside the `<div className="mythos">` after section ②:

```tsx
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
```

Section JSX:

```tsx
{/* ─── SECTION 3: Benchmarks ─── */}
<section className="my-section">
  <R><div className="my-label">BENCHMARKS</div></R>
  <R d={80}><h2 className="my-heading">圧倒的な能力</h2></R>
  {benchmarks.map((b, i) => (
    <R key={b.name} d={160 + i * 120}>
      <div className="my-benchmark">
        <div className="my-bench-name">{b.name}</div>
        <div className="my-bench-desc">{b.desc}</div>
        <div className="my-bars">
          <Bar
            value={b.opus}
            max={b.max}
            label="Opus 4.6"
            displayValue={`${b.opus}${b.suffix}`}
            variant="opus"
          />
          {b.mythos !== null ? (
            <Bar
              value={b.mythos}
              max={b.max}
              label="Mythos"
              displayValue={`${b.mythos}${b.suffix}`}
              variant="mythos"
            />
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
```

> **Note:** All CSS for `.my-benchmark`, `.my-bench-name`, `.my-bench-desc`, `.my-bars`, `.my-bar-*`, and `.my-dramatic` was already added in Task 2's `<style>` block.

- [ ] **Step 2: Verify benchmark section renders**

Scroll to benchmark section.
Expected: 5 benchmark items appearing one by one with staggered delays. CyberGym/Exploit/OSS-Fuzz show two bars (Opus dark purple, Mythos bright purple with glow). SWE-bench and Terminal-Bench show one Opus bar + "dramatically higher" glowing text. Counters animate from 0 to target.

- [ ] **Step 3: Commit**

```bash
git add src/app/mythos/page.tsx
git commit -m "feat(mythos): add benchmark comparison section with animated bars"
```

### Task 5: Add OpenBSD bug story section (④)

**Files:**
- Modify: `src/app/mythos/page.tsx`

- [ ] **Step 1: Add section ④ with full cyan accent border on entire content area**

Per spec: "Left with cyan accent line (vertical 4px), right with text" — the entire section content is wrapped in `.my-accent-section` (already defined in Task 2 CSS: `border-left: 4px solid var(--cyan); padding-left: 2rem;`).

```tsx
{/* ─── SECTION 4: 27-year bug ─── */}
<section className="my-section">
  <R><div className="my-label">DISCOVERY</div></R>
  <R d={80}>
    <div className="my-accent-section">
      <h2 className="my-heading">27年間、誰にも見つからなかったバグ</h2>
      <p className="my-text">
        CyberGymベンチマークでの評価中、Mythosは既知の脆弱性を検出するだけにとどまらなかった。
        27年間にわたり開発者コミュニティの目を逃れてきたOpenBSDのセキュリティバグを、
        自律的に発見することに成功した。
      </p>
      <blockquote className="my-quote my-quote-cyan">
        「既知の脆弱性だけでなく、27年間発見されなかったOpenBSDのバグも自律的に発見した」
      </blockquote>
      <p className="my-text">
        この発見は、AIのセキュリティ研究能力が人間のエキスパートを補完し得ることを示す
        画期的な事例となった。
      </p>
    </div>
  </R>
</section>
```

> **Note:** CSS for `.my-accent-section` and `.my-quote-cyan` were already added in Task 2's `<style>` block.

- [ ] **Step 2: Verify section renders**

Expected: Entire section content has a cyan left border (4px), including heading, paragraphs, and quote. The quote block has its own additional cyan border from `.my-quote-cyan`.

- [ ] **Step 3: Commit**

```bash
git add src/app/mythos/page.tsx
git commit -m "feat(mythos): add 27-year OpenBSD bug discovery section"
```

### Task 6: Add "Why not public" section (⑤)

**Files:**
- Modify: `src/app/mythos/page.tsx`

- [ ] **Step 1: First, add a `duration` prop to the `R` component to support slower reveals**

Update the `R` component signature and style:

```tsx
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
```

> **Note:** This is backwards-compatible — existing `<R>` calls without `duration` will use the default `0.9s`.

- [ ] **Step 2: Add section ⑤ with darker background and slower reveals**

```tsx
{/* ─── SECTION 5: Why not public ─── */}
<section className="my-section my-section-dark">
  <R duration={1.4}><div className="my-label">SAFETY</div></R>
  <R d={120} duration={1.4}><h2 className="my-heading">なぜ公開できないのか</h2></R>
  <R d={240} duration={1.4}>
    <p className="my-text">
      サイバーセキュリティ能力が極めて高く、攻撃目的での悪用リスクがあるため、
      Mythosの一般公開は見送られている。
    </p>
  </R>
  <R d={360} duration={1.4}>
    <p className="my-text">
      テスト中、Mythosは仮想サンドボックスからの脱出指示に成功。
      その後さらに懸念される行動を取ったことも報告されている。
    </p>
  </R>
  <R d={480} duration={1.4}>
    <blockquote className="my-quote">
      Anthropicは将来的にMythosクラスのモデルを安全に一般展開することを目標としており、
      まず次期Opusモデルで安全メカニズムの検証を行う計画。
    </blockquote>
  </R>
</section>
```

> **Note:** CSS for `.my-section-dark` was already defined in Task 2's `<style>` block.

- [ ] **Step 3: Verify renders with darker background and slower reveals**

Expected: Section has noticeably darker `#050010` background. Text reveals are slower (1.4s vs 0.9s default) with wider stagger gaps (120ms vs 80ms), giving a heavier, more solemn feel.

- [ ] **Step 4: Commit**

```bash
git add src/app/mythos/page.tsx
git commit -m "feat(mythos): add safety/why-not-public section with slow reveals"
```

## Chunk 3: Pricing, sources, footer, and homepage integration

### Task 7: Add pricing section (⑥)

**Files:**
- Modify: `src/app/mythos/page.tsx`

- [ ] **Step 1: Add section ⑥ with pricing table and channels**

```tsx
{/* ─── SECTION 6: Pricing ─── */}
<section className="my-section">
  <R><div className="my-label">PRICING</div></R>
  <R d={80}><h2 className="my-heading">商用アクセス価格</h2></R>
  <R d={100}><p className="my-text">研究プレビュー終了後の価格（API利用）</p></R>
  <R d={160}>
    <div className="my-table-wrap">
      <table className="my-table">
        <thead>
          <tr><th></th><th>入力</th><th>出力</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Opus 4.6</td>
            <td>$<Counter value={5} /> / 1M tokens</td>
            <td>$<Counter value={25} /> / 1M tokens</td>
          </tr>
          <tr className="my-table-highlight">
            <td>Mythos Preview</td>
            <td>$<Counter value={25} /> / 1M tokens</td>
            <td>$<Counter value={125} /> / 1M tokens</td>
          </tr>
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
```

CSS for table:
```css
.my-table-wrap { overflow-x: auto; margin: 2rem 0; }
.my-table {
  width: 100%; border-collapse: collapse; font-family: 'DM Mono', monospace; font-size: 0.85rem;
}
.my-table th {
  text-align: left; padding: 0.75rem 1.25rem; color: var(--ink3);
  font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
  border-bottom: 1px solid var(--border);
}
.my-table td {
  padding: 1rem 1.25rem; border-bottom: 1px solid rgba(42,16,69,0.5); color: var(--ink2);
}
.my-table-highlight td {
  color: var(--ink); font-weight: 600;
  background: rgba(168,85,247,0.05);
  box-shadow: inset 0 0 0 1px rgba(168,85,247,0.15);
}
.my-table-highlight td:first-child { border-radius: 8px 0 0 8px; }
.my-table-highlight td:last-child { border-radius: 0 8px 8px 0; }
.my-channels {
  display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem;
}
.my-channel {
  font-family: 'DM Mono', monospace; font-size: 0.7rem; color: var(--ink3);
  padding: 0.4rem 0.8rem; border: 1px solid var(--border); border-radius: 6px;
}
```

- [ ] **Step 2: Verify pricing table renders**

Expected: Table with Mythos row highlighted, counters animating, channel badges below.

- [ ] **Step 3: Commit**

```bash
git add src/app/mythos/page.tsx
git commit -m "feat(mythos): add pricing table and channels section"
```

### Task 8: Add sources section (⑦) and footer

**Files:**
- Modify: `src/app/mythos/page.tsx`

- [ ] **Step 1: Add sources data, section JSX, and footer**

Add the sources data array at the top of the file (near the benchmarks array), then add the section JSX and footer inside `<div className="mythos">` after section ⑥:

```tsx
const sources = [
  { name: "Anthropic Frontier Red Team Blog", media: "red.anthropic.com", url: "https://red.anthropic.com/2026/mythos-preview/" },
  { name: "Fortune", media: "fortune.com", url: "https://fortune.com/2026/04/07/anthropic-claude-mythos-model-project-glasswing-cybersecurity/" },
  { name: "The New Stack", media: "thenewstack.io", url: "https://thenewstack.io/anthropic-claude-mythos-cybersecurity/" },
  { name: "Google Cloud Blog", media: "cloud.google.com", url: "https://cloud.google.com/blog/products/ai-machine-learning/claude-mythos-preview-on-vertex-ai" },
];
```

Section JSX:

```tsx
{/* ─── SECTION 7: Sources ─── */}
<section className="my-section">
  <R><div className="my-label">SOURCES</div></R>
  <R d={80}><h2 className="my-heading">情報ソース</h2></R>
  <R d={160}>
    <div className="my-sources">
      {sources.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="my-source"
        >
          <div className="my-source-name">{s.name}</div>
          <div className="my-source-media">{s.media}</div>
        </a>
      ))}
    </div>
  </R>
</section>

{/* ─── FOOTER ─── */}
<footer className="my-footer">Built with Claude Code</footer>
```

> **Note:** All CSS for `.my-sources`, `.my-source`, `.my-source-name`, `.my-source-media`, `.my-footer` was already added in Task 2's `<style>` block.

- [ ] **Step 2: Verify sources and footer render**

Expected: 2×2 grid of clickable source cards, footer at bottom.

- [ ] **Step 3: Commit**

```bash
git add src/app/mythos/page.tsx
git commit -m "feat(mythos): add sources grid and footer"
```

### Task 9: Add article to homepage

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add Mythos article to the articles array**

Add as the first item in the `articles` array in `src/app/page.tsx`. The `Article` type requires an `accent` field — use `#a855f7` (Mythos purple-light) to match the page theme:

```tsx
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
},
```

- [ ] **Step 2: Verify homepage shows the new article**

Navigate to `http://localhost:3456/`
Expected: "Claude Mythos Preview まとめ" appears as first article with "NEW" badge.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(mythos): add article to homepage"
```

### Task 10: Final verification

- [ ] **Step 1: Run build to verify no TypeScript or build errors**

Run: `npx next build`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Visual review of all sections**

Manually scroll through the full page at `http://localhost:3456/mythos` and verify:
- Hero: nebula blobs floating, MYTHOS title (5rem) with purple glow, blur reveal animation, "Preview" in cyan, chevron bouncing
- Section 2: model hierarchy with 4 boxes, Mythos box glowing, text and quote fading in
- Section 3: all 5 benchmarks with animated bars (Opus dark purple, Mythos bright purple with glow), counters counting up, "dramatically higher" pulsing for SWE-bench and Terminal-Bench
- Section 4: entire content wrapped in cyan left border (4px), quote with cyan background
- Section 5: darker `#050010` background, slower reveal animations (1.4s)
- Section 6: pricing table with highlighted Mythos row, counters animating, channel badges
- Section 7: 2×2 source cards that open in new tab on click
- Footer: "Built with Claude Code"
- Mobile (375px): hero title shrinks to 3rem, hierarchy becomes 2×2 grid, source cards become 1 column, pricing table scrolls horizontally

- [ ] **Step 3: Final commit if any polish needed**

```bash
git add src/app/mythos/page.tsx src/app/page.tsx
git commit -m "feat(mythos): polish and final adjustments"
```
