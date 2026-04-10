"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function useScrollReveal() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setRevealed((prev) => new Set(prev).add(entry.target.id));
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return revealed;
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="font-code text-xs tracking-[0.3em] uppercase" style={{ color: "var(--cyan)" }}>
        [{number}]
      </span>
      <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, var(--cyan-dim), transparent)" }} />
      <span className="font-code text-xs tracking-[0.2em] uppercase" style={{ color: "var(--slate)" }}>
        {label}
      </span>
    </div>
  );
}

export default function OverviewPage() {
  const revealed = useScrollReveal();
  const [mounted, setMounted] = useState(false);
  const isR = (id: string) => revealed.has(id);

  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "var(--navy)", fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=IBM+Plex+Mono:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');

        :root {
          --navy: #0b1120;
          --navy-light: #111b33;
          --navy-surface: #152042;
          --cyan: #22d3ee;
          --cyan-dim: rgba(34, 211, 238, 0.25);
          --cyan-glow: rgba(34, 211, 238, 0.08);
          --amber: #f59e0b;
          --amber-dim: rgba(245, 158, 11, 0.25);
          --amber-glow: rgba(245, 158, 11, 0.08);
          --red: #ef4444;
          --red-dim: rgba(239, 68, 68, 0.3);
          --green: #22c55e;
          --green-dim: rgba(34, 197, 94, 0.25);
          --text: #c8d6e5;
          --text-dim: #5a6d82;
          --slate: #3e5068;
        }

        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body { font-family: 'IBM Plex Sans', sans-serif; }
        .font-code { font-family: 'IBM Plex Mono', monospace; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes flowDown {
          0% { background-position: 0 0; }
          100% { background-position: 0 20px; }
        }

        .rv { opacity: 0; }
        .rv.on { animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .rv.d1.on { animation-delay: 0.1s; }
        .rv.d2.on { animation-delay: 0.2s; }
        .rv.d3.on { animation-delay: 0.3s; }
        .rv.d4.on { animation-delay: 0.4s; }
        .rv.d5.on { animation-delay: 0.5s; }

        .blueprint-grid {
          background-image:
            linear-gradient(var(--cyan-dim) 1px, transparent 1px),
            linear-gradient(90deg, var(--cyan-dim) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.15;
        }

        .card {
          background: var(--navy-light);
          border: 1px solid var(--slate);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .card:hover {
          border-color: var(--cyan);
          box-shadow: 0 0 30px var(--cyan-glow), inset 0 0 30px var(--cyan-glow);
          transform: translateY(-2px);
        }

        .card-amber:hover {
          border-color: var(--amber);
          box-shadow: 0 0 30px var(--amber-glow), inset 0 0 30px var(--amber-glow);
        }

        .tag {
          border: 1px solid var(--slate);
          padding: 3px 10px;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-dim);
          transition: all 0.3s ease;
        }
        .tag:hover { border-color: var(--cyan); color: var(--cyan); }

        .terminal-block {
          background: rgba(0,0,0,0.4);
          border: 1px solid var(--slate);
          border-radius: 6px;
          overflow: hidden;
        }
        .terminal-header {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 14px;
          background: rgba(0,0,0,0.3);
          border-bottom: 1px solid var(--slate);
        }
        .terminal-dot { width: 8px; height: 8px; border-radius: 50%; }

        .flow-pipe {
          width: 2px;
          background: repeating-linear-gradient(
            to bottom,
            var(--cyan) 0px, var(--cyan) 4px,
            transparent 4px, transparent 8px
          );
          animation: flowDown 1s linear infinite;
        }

        .context-ring {
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>

      {/* Blueprint grid background */}
      <div className="blueprint-grid fixed inset-0 pointer-events-none z-0" />

      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" style={{ opacity: 0.03 }}>
        <div className="w-full h-1 bg-cyan-400" style={{ animation: "scanline 8s linear infinite" }} />
      </div>

      {/* ===== HEADER ===== */}
      <header className="relative z-20" style={{ borderBottom: "1px solid var(--slate)" }}>
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-4 md:py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--cyan)", boxShadow: "0 0 8px var(--cyan)" }} />
            <span className="font-code text-sm font-semibold tracking-[0.15em] uppercase" style={{ color: "var(--cyan)" }}>
              Plugin Overview
            </span>
          </div>
          <Link
            href="/"
            className="font-code text-xs tracking-wider uppercase transition-colors duration-300"
            style={{ color: "var(--text-dim)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
          >
            ← Home
          </Link>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative z-20 py-14 md:py-28">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <div
            className="font-code text-xs tracking-[0.3em] uppercase mb-6"
            style={{ color: "var(--cyan)", opacity: mounted ? 1 : 0, animation: mounted ? "fadeIn 0.8s ease both" : "none" }}
          >
            Claude Code Plugin Deep Dive
          </div>
          <h1
            className="font-display text-5xl md:text-7xl font-black leading-[1.05] tracking-tight"
            style={{ color: "#f0f4f8", opacity: mounted ? 1 : 0, animation: mounted ? "fadeUp 1s 0.2s cubic-bezier(0.22,1,0.36,1) both" : "none" }}
          >
            Frontend Design
            <br />
            <span style={{ color: "var(--cyan)" }}>Plugin</span> の全貌
          </h1>
          <p
            className="font-body text-lg md:text-xl mt-8 max-w-2xl leading-relaxed font-light"
            style={{ color: "var(--text-dim)", opacity: mounted ? 1 : 0, animation: mounted ? "fadeUp 1s 0.5s cubic-bezier(0.22,1,0.36,1) both" : "none" }}
          >
            たった42行のプロンプトが、AIのデザイン出力を劇的に変える。
            その仕組みと設計思想を、視覚的に解き明かします。
          </p>
          <div
            className="flex flex-wrap items-center gap-6 mt-10 font-code text-xs"
            style={{ color: "var(--text-dim)", opacity: mounted ? 1 : 0, animation: mounted ? "fadeIn 1s 0.8s both" : "none" }}
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--cyan)", animation: "pulse 2s ease infinite" }} />
              Frontend Design Plugin で作成しています
            </span>
          </div>
        </div>
      </section>

      {/* ===== SECTION 1: WHAT IS IT ===== */}
      <section className="relative z-20 py-12 md:py-24" style={{ background: "var(--navy-light)" }}>
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <SectionLabel number="01" label="What is it" />
          <div id="s1" data-reveal className={`rv ${isR("s1") ? "on" : ""}`}>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6" style={{ color: "#f0f4f8" }}>
              プラグインとは何か
            </h2>
            <p className="font-body text-lg leading-relaxed max-w-3xl" style={{ color: "var(--text)" }}>
              Claude Codeに追加できる<span style={{ color: "var(--cyan)" }}>フロントエンドデザイン特化のプラグイン</span>。
              プログラム的な拡張ではなく、<span style={{ color: "var(--amber)" }}>「条件付きで追加されるシステムプロンプト」</span>。
              フロントエンド制作を検知すると、SKILL.mdの内容がコンテキストに注入され、デザイン品質を引き上げます。
            </p>
          </div>

          {/* File structure */}
          <div id="s1-tree" data-reveal className={`rv d3 ${isR("s1-tree") ? "on" : ""} mt-12`}>
            <div className="terminal-block max-w-xl">
              <div className="terminal-header">
                <div className="terminal-dot" style={{ background: "#ef4444" }} />
                <div className="terminal-dot" style={{ background: "#f59e0b" }} />
                <div className="terminal-dot" style={{ background: "#22c55e" }} />
                <span className="font-code text-[11px] ml-2" style={{ color: "var(--text-dim)" }}>plugin-structure</span>
              </div>
              <pre className="p-5 font-code text-sm leading-7" style={{ color: "var(--text)" }}>
{`frontend-design/
├── .claude-plugin/
│   └── `}<span style={{ color: "var(--amber)" }}>plugin.json</span>{`       ← マニフェスト
├── skills/
│   └── frontend-design/
│       └── `}<span style={{ color: "var(--cyan)" }}>SKILL.md</span>{`        ← 本体（42行）
├── README.md
└── LICENSE`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: BEFORE / AFTER ===== */}
      <section className="relative z-20 py-12 md:py-24">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <SectionLabel number="02" label="Before / After" />
          <div id="s2" data-reveal className={`rv ${isR("s2") ? "on" : ""}`}>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-16" style={{ color: "#f0f4f8" }}>
              何が変わるのか
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {/* Before */}
            <div id="s2-before" data-reveal className={`rv d1 ${isR("s2-before") ? "on" : ""}`}>
              <div className="card card-amber p-5 md:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-3 h-3 rounded-full" style={{ background: "var(--red)", boxShadow: "0 0 8px var(--red-dim)" }} />
                  <span className="font-code text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: "var(--red)" }}>
                    Before — プラグインなし
                  </span>
                </div>
                <ul className="space-y-4 font-body text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                  {[
                    "ありきたりなフォント（Inter, Arial, Roboto）",
                    "紫グラデーション on 白背景のような定番配色",
                    "予測可能な整列レイアウト",
                    "どのAIで作っても同じに見える",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="font-code text-xs mt-0.5" style={{ color: "var(--red)" }}>✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* After */}
            <div id="s2-after" data-reveal className={`rv d2 ${isR("s2-after") ? "on" : ""}`}>
              <div className="card p-5 md:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-3 h-3 rounded-full" style={{ background: "var(--green)", boxShadow: "0 0 8px var(--green-dim)" }} />
                  <span className="font-code text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: "var(--green)" }}>
                    After — プラグインあり
                  </span>
                </div>
                <ul className="space-y-4 font-body text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                  {[
                    "大胆なフォント選び（個性的ディスプレイ × 洗練ボディ）",
                    "コンセプトに基づく配色（ブルータリスト、ラグジュアリー等）",
                    "非対称・グリッド崩しの印象的なレイアウト",
                    "アニメーション・テクスチャ・ノイズの背景効果",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="font-code text-xs mt-0.5" style={{ color: "var(--green)" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Demo links */}
          <div id="s2-demo" data-reveal className={`rv d3 ${isR("s2-demo") ? "on" : ""} mt-12 flex flex-wrap gap-4`}>
            <Link href="/default" className="tag font-code hover:border-[var(--red)] hover:!text-[var(--red)]">
              → /default を見る
            </Link>
            <Link href="/plugin" className="tag font-code hover:border-[var(--cyan)] hover:!text-[var(--cyan)]">
              → /plugin を見る
            </Link>
            <Link href="/plugin2" className="tag font-code hover:border-[var(--amber)] hover:!text-[var(--amber)]">
              → /plugin2 を見る
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: PROMPT ANATOMY ===== */}
      <section className="relative z-20 py-12 md:py-24" style={{ background: "var(--navy-light)" }}>
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <SectionLabel number="03" label="Prompt Anatomy" />
          <div id="s4" data-reveal className={`rv ${isR("s4") ? "on" : ""}`}>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6" style={{ color: "#f0f4f8" }}>
              42行のプロンプト解剖
            </h2>
            <p className="font-body text-base mb-16 max-w-2xl" style={{ color: "var(--text-dim)" }}>
              SKILL.mdは3パート構成。抽象→具体→制約の「逆三角形」で設計されています。
            </p>
          </div>

          {/* Inverted triangle SVG */}
          <div id="s4-tri" data-reveal className={`rv d2 ${isR("s4-tri") ? "on" : ""} flex justify-center mb-16`}>
            <svg width="400" height="280" viewBox="0 0 400 280" fill="none" className="max-w-full">
              {/* Triangle outline */}
              <path d="M40 20 L360 20 L200 260 Z" stroke="var(--cyan)" strokeWidth="1" fill="none" strokeDasharray="4 4" />

              {/* Level 1 - top */}
              <line x1="70" y1="80" x2="330" y2="80" stroke="var(--slate)" strokeWidth="1" strokeDasharray="2 4" />
              {/* Level 2 - middle */}
              <line x1="110" y1="150" x2="290" y2="150" stroke="var(--slate)" strokeWidth="1" strokeDasharray="2 4" />

              {/* Labels */}
              <text x="200" y="55" textAnchor="middle" fill="var(--amber)" fontSize="13" fontFamily="IBM Plex Mono">
                Design Thinking（考え方）
              </text>
              <text x="200" y="120" textAnchor="middle" fill="var(--cyan)" fontSize="13" fontFamily="IBM Plex Mono">
                Aesthetics Guidelines（5領域）
              </text>
              <text x="200" y="195" textAnchor="middle" fill="var(--red)" fontSize="13" fontFamily="IBM Plex Mono">
                禁止リスト（NEVER）
              </text>

              {/* Right side annotations */}
              <text x="355" y="55" textAnchor="start" fill="var(--text-dim)" fontSize="10" fontFamily="IBM Plex Mono">← 広い</text>
              <text x="310" y="195" textAnchor="start" fill="var(--text-dim)" fontSize="10" fontFamily="IBM Plex Mono">← 狭い</text>

              {/* Arrow on right */}
              <line x1="380" y1="40" x2="380" y2="220" stroke="var(--slate)" strokeWidth="1" markerEnd="url(#arrowhead)" />
              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="var(--slate)" />
                </marker>
              </defs>
              <text x="390" y="135" textAnchor="start" fill="var(--text-dim)" fontSize="9" fontFamily="IBM Plex Mono" transform="rotate(90, 390, 135)">具体度</text>
            </svg>
          </div>

          {/* Three parts detail */}
          <div className="grid md:grid-cols-3 gap-3 md:gap-6">
            {[
              {
                part: "Part 1",
                title: "Design Thinking",
                subtitle: "コードの前にまず考えろ",
                color: "var(--amber)",
                items: [
                  { k: "Purpose", v: "誰のため？何を解決する？" },
                  { k: "Tone", v: "美的方向性を極端に選べ" },
                  { k: "Constraints", v: "技術的制約の確認" },
                  { k: "Differentiation", v: "何が忘れられないか？" },
                ],
              },
              {
                part: "Part 2",
                title: "Aesthetics Guidelines",
                subtitle: "5つの具体的指示",
                color: "var(--cyan)",
                items: [
                  { k: "Typography", v: "個性的フォントペアリング" },
                  { k: "Color", v: "支配色＋鋭いアクセント" },
                  { k: "Motion", v: "スタガー演出・スクロールトリガー" },
                  { k: "Layout", v: "非対称・オーバーラップ" },
                  { k: "Backgrounds", v: "テクスチャ・ノイズ・奥行き" },
                ],
              },
              {
                part: "Part 3",
                title: "禁止リスト",
                subtitle: "AIスロップの明示的定義",
                color: "var(--red)",
                items: [
                  { k: "フォント", v: "Inter, Roboto, Arial → 禁止" },
                  { k: "配色", v: "紫グラデ on 白 → 禁止" },
                  { k: "レイアウト", v: "予測可能なパターン → 禁止" },
                  { k: "収束", v: "毎回同じデザイン → 禁止" },
                ],
              },
            ].map((part, i) => (
              <div
                key={part.part}
                id={`s4-p${i}`}
                data-reveal
                className={`rv d${i + 1} ${isR(`s4-p${i}`) ? "on" : ""}`}
              >
                <div className="card p-5 md:p-8 h-full">
                  <span className="font-code text-[10px] tracking-[0.2em] uppercase block mb-1" style={{ color: part.color }}>
                    {part.part}
                  </span>
                  <h3 className="font-display text-xl font-bold mb-1" style={{ color: "#f0f4f8" }}>
                    {part.title}
                  </h3>
                  <p className="font-code text-xs mb-6" style={{ color: "var(--text-dim)" }}>
                    {part.subtitle}
                  </p>
                  <div className="space-y-3">
                    {part.items.map((item) => (
                      <div key={item.k} className="flex gap-3">
                        <span className="font-code text-[10px] font-semibold tracking-wider uppercase shrink-0 mt-0.5" style={{ color: part.color, minWidth: "80px" }}>
                          {item.k}
                        </span>
                        <span className="font-body text-xs leading-relaxed" style={{ color: "var(--text)" }}>
                          {item.v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: WHY IT WORKS ===== */}
      <section className="relative z-20 py-12 md:py-24" style={{ background: "var(--navy-light)" }}>
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <SectionLabel number="04" label="Design Principles" />
          <div id="s5" data-reveal className={`rv ${isR("s5") ? "on" : ""}`}>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-16" style={{ color: "#f0f4f8" }}>
              なぜ42行でうまくいくのか
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {[
              {
                num: "01",
                title: "「どう考えろ」の指示",
                desc: "具体的手順ではなく思考フレームワークを与える。Claudeの推論能力を信頼し、応用が効く設計。",
                accent: "var(--cyan)",
              },
              {
                num: "02",
                title: "「やるな」が効く",
                desc: "LLMは最頻出パターンに収束しやすい。禁止リストで収束先を明示的にブロック。",
                accent: "var(--red)",
              },
              {
                num: "03",
                title: "再現性の意図的な破壊",
                desc: "\"No design should be the same\" — 再現性そのものを否定し、毎回違う方向に振らせる。",
                accent: "var(--amber)",
              },
              {
                num: "04",
                title: "逆三角形の構造",
                desc: "抽象→具体→制約。自由度を保ちつつ品質の下限を保証する。",
                accent: "var(--cyan)",
              },
              {
                num: "05",
                title: "リミッター解除",
                desc: "\"Don't hold back\" — LLMの安全側・無難側への傾きを最後の1行で解除。",
                accent: "var(--green)",
              },
            ].map((item, i) => (
              <div
                key={item.num}
                id={`s5-${i}`}
                data-reveal
                className={`rv d${i + 1} ${isR(`s5-${i}`) ? "on" : ""}`}
              >
                <div className="card p-7 h-full">
                  <span className="font-code text-3xl font-bold block mb-4" style={{ color: item.accent, opacity: 0.3 }}>
                    {item.num}
                  </span>
                  <h3 className="font-body font-semibold text-base mb-3" style={{ color: "#f0f4f8" }}>
                    {item.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: CONTEXT COST ===== */}
      <section className="relative z-20 py-12 md:py-24">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <SectionLabel number="05" label="Context Cost" />
          <div id="s6" data-reveal className={`rv ${isR("s6") ? "on" : ""}`}>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6" style={{ color: "#f0f4f8" }}>
              コンテキスト消費量
            </h2>
            <p className="font-body text-base mb-16 max-w-2xl" style={{ color: "var(--text-dim)" }}>
              1,000,000トークンのうち、たった~550トークン（0.05%）で最大の効果。
            </p>
          </div>

          {/* Visual context meter */}
          <div id="s6-meter" data-reveal className={`rv d2 ${isR("s6-meter") ? "on" : ""}`}>
            <div className="max-w-3xl mx-auto">
              {/* Bar visualization */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-code text-xs" style={{ color: "var(--text-dim)" }}>Context Window: 1,000,000 tokens</span>
                  <span className="font-code text-xs" style={{ color: "var(--cyan)" }}>~550 tokens used</span>
                </div>
                <div className="h-8 rounded-sm overflow-hidden" style={{ background: "var(--navy-surface)", border: "1px solid var(--slate)" }}>
                  <div
                    className="h-full rounded-sm relative"
                    style={{
                      width: "2%",
                      minWidth: "4px",
                      background: "linear-gradient(90deg, var(--cyan), var(--green))",
                      boxShadow: "0 0 20px var(--cyan-glow)",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-code text-[10px]" style={{ color: "var(--cyan)" }}>0.05% ← Frontend Design</span>
                  <span className="font-code text-[10px]" style={{ color: "var(--text-dim)" }}>99.95% 空き</span>
                </div>
              </div>

              {/* Comparison table */}
              <div className="terminal-block">
                <div className="terminal-header">
                  <div className="terminal-dot" style={{ background: "#ef4444" }} />
                  <div className="terminal-dot" style={{ background: "#f59e0b" }} />
                  <div className="terminal-dot" style={{ background: "#22c55e" }} />
                  <span className="font-code text-[11px] ml-2" style={{ color: "var(--text-dim)" }}>context-comparison</span>
                </div>
                <div className="p-4 md:p-6 overflow-x-auto">
                  <table className="w-full font-code text-sm">
                    <thead>
                      <tr style={{ color: "var(--text-dim)" }}>
                        <th className="text-left pb-4 text-xs tracking-wider uppercase">Plugin</th>
                        <th className="text-right pb-4 text-xs tracking-wider uppercase">Skills</th>
                        <th className="text-right pb-4 text-xs tracking-wider uppercase">Max Tokens</th>
                        <th className="text-right pb-4 text-xs tracking-wider uppercase">Context %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ color: "var(--cyan)" }}>
                        <td className="py-2 font-semibold">Frontend Design</td>
                        <td className="text-right py-2">1</td>
                        <td className="text-right py-2">~550</td>
                        <td className="text-right py-2">0.05%</td>
                      </tr>
                      <tr style={{ borderTop: "1px solid var(--slate)", color: "var(--text)" }}>
                        <td className="py-2">Superpowers</td>
                        <td className="text-right py-2">14</td>
                        <td className="text-right py-2">~29,597</td>
                        <td className="text-right py-2">~3%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: RANKING ===== */}
      <section className="relative z-20 py-12 md:py-24" style={{ background: "var(--navy-light)" }}>
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <SectionLabel number="06" label="Popularity" />
          <div id="s7" data-reveal className={`rv ${isR("s7") ? "on" : ""}`}>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-16" style={{ color: "#f0f4f8" }}>
              インストール数ランキング
            </h2>
          </div>

          <div id="s7-chart" data-reveal className={`rv d2 ${isR("s7-chart") ? "on" : ""}`}>
            <div className="space-y-4 max-w-3xl">
              {[
                { name: "Pieces", installs: 248, max: 280, highlight: false },
                { name: "Superpowers", installs: 119, max: 280, highlight: false },
                { name: "AI Code Review", installs: 118, max: 280, highlight: false },
                { name: "Frontend Design", installs: 96, max: 280, highlight: true },
                { name: "Feature-Dev", installs: 89, max: 280, highlight: false },
                { name: "Context7", installs: 71, max: 280, highlight: false },
                { name: "Ralph Loop", installs: 57, max: 280, highlight: false },
                { name: "Code Review", installs: 50, max: 280, highlight: false },
                { name: "Figma", installs: 45, max: 280, highlight: false },
                { name: "Supabase", installs: 37, max: 280, highlight: false },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <span
                    className="font-code text-xs w-24 md:w-36 shrink-0 text-right"
                    style={{ color: item.highlight ? "var(--cyan)" : "var(--text-dim)", fontWeight: item.highlight ? 600 : 400 }}
                  >
                    {item.name}
                  </span>
                  <div className="flex-1 h-6 rounded-sm overflow-hidden" style={{ background: "var(--navy-surface)" }}>
                    <div
                      className="h-full rounded-sm transition-all duration-1000"
                      style={{
                        width: `${(item.installs / item.max) * 100}%`,
                        background: item.highlight
                          ? "linear-gradient(90deg, var(--cyan), var(--green))"
                          : "var(--slate)",
                        boxShadow: item.highlight ? "0 0 15px var(--cyan-glow)" : "none",
                      }}
                    />
                  </div>
                  <span
                    className="font-code text-xs w-16 shrink-0"
                    style={{ color: item.highlight ? "var(--cyan)" : "var(--text-dim)" }}
                  >
                    ~{item.installs}K
                  </span>
                </div>
              ))}
            </div>
            <p className="font-code text-[10px] mt-6 max-w-3xl" style={{ color: "var(--text-dim)" }}>
              ※ 公式統一ランキングは存在しません。各テックブログから収集した参考値です。9,000+プラグイン中トップ層。
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: SUMMARY ===== */}
      <section className="relative z-20 py-12 md:py-24">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <SectionLabel number="07" label="Summary" />
          <div id="s8" data-reveal className={`rv ${isR("s8") ? "on" : ""}`}>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-16" style={{ color: "#f0f4f8" }}>
              まとめ
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[
              { icon: "◇", title: "シンプルな仕組み", desc: "プロンプト1枚でデザイン出力を劇的に変える", color: "var(--cyan)" },
              { icon: "△", title: "大きな効果", desc: "「AIっぽさ」から脱却した個性的なUI生成", color: "var(--amber)" },
              { icon: "○", title: "高い人気", desc: "9,000+プラグイン中トップ層、公式初のスキル", color: "var(--green)" },
              { icon: "□", title: "極小のコスト", desc: "コンテキストの0.05%で最大の効果", color: "var(--cyan)" },
            ].map((item, i) => (
              <div
                key={item.title}
                id={`s8-${i}`}
                data-reveal
                className={`rv d${i + 1} ${isR(`s8-${i}`) ? "on" : ""}`}
              >
                <div className="card p-7 h-full text-center">
                  <span className="font-display text-4xl block mb-4" style={{ color: item.color }}>
                    {item.icon}
                  </span>
                  <h3 className="font-body font-semibold text-base mb-2" style={{ color: "#f0f4f8" }}>
                    {item.title}
                  </h3>
                  <p className="font-body text-sm" style={{ color: "var(--text-dim)" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing line */}
          <div id="s8-close" data-reveal className={`rv d5 ${isR("s8-close") ? "on" : ""} mt-16 text-center`}>
            <p className="font-display text-2xl md:text-3xl italic font-light" style={{ color: "var(--text)" }}>
              &ldquo;プロンプトエンジニアリングの力を示す、最良の一例。&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-20 py-10" style={{ borderTop: "1px solid var(--slate)" }}>
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--cyan)", animation: "pulse 2s ease infinite" }} />
            <span className="font-code text-xs tracking-wider" style={{ color: "var(--text-dim)" }}>
              Frontend Design Plugin Overview
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-code text-[10px]" style={{ color: "var(--text-dim)" }}>
              Developer: Anthropic (Boris Cherny)
            </span>
            <span className="font-code text-[10px]" style={{ color: "var(--slate)" }}>|</span>
            <span className="font-code text-[10px]" style={{ color: "var(--text-dim)" }}>
              License: Apache 2.0
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
