"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate } from "animejs";
import Link from "next/link";

/* ────────────────────────────── Reveal ────────────────────────────────── */
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

function R({
  children,
  d = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  d?: number;
  y?: number;
  className?: string;
}) {
  const { ref, ok } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: ok ? 1 : 0,
        transform: ok ? "none" : `translateY(${y}px)`,
        transition: `opacity 800ms cubic-bezier(0.22,1,0.36,1) ${d}ms, transform 800ms cubic-bezier(0.22,1,0.36,1) ${d}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────── Animated bar (for matrix) ────────────────────── */
function Bar({
  pct,
  tone,
  thick = false,
  delay = 0,
}: {
  pct: number;
  tone: "primary" | "muted" | "ghost";
  thick?: boolean;
  delay?: number;
}) {
  const { ref, ok } = useReveal();
  const fillRef = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  useEffect(() => {
    if (!ok || done.current || !fillRef.current) return;
    done.current = true;
    animate(fillRef.current, {
      width: ["0%", `${Math.max(pct, 1)}%`],
      duration: 1200,
      ease: "outExpo",
      delay,
    });
  }, [ok, pct, delay]);
  return (
    <div
      ref={ref as unknown as React.RefObject<HTMLDivElement>}
      className={`bar bar--${tone} ${thick ? "bar--thick" : ""}`}
    >
      <div ref={fillRef} className="bar-fill" />
    </div>
  );
}

/* ────────────────────────────── Data ──────────────────────────────────── */

type Row = {
  metric: string;
  bench: string;
  opus47: number | null;
  opus46: number | null;
  gpt: number | null;
  gemini: number | null;
  mythos: number | null;
  note?: Partial<Record<"opus47" | "opus46" | "gpt" | "gemini" | "mythos", string>>;
};

const CODING: Row[] = [
  { metric: "エージェント的コーディング", bench: "SWE-bench Pro", opus47: 64.3, opus46: 53.4, gpt: 57.7, gemini: 54.2, mythos: 77.8 },
  { metric: "検証付きコーディング", bench: "SWE-bench Verified", opus47: 87.6, opus46: 80.8, gpt: null, gemini: 80.6, mythos: 93.9 },
  { metric: "ターミナル操作", bench: "Terminal-Bench 2.0", opus47: 69.4, opus46: 65.4, gpt: 75.1, gemini: 68.5, mythos: 82.0, note: { gpt: "self" } },
];
const AGENT: Row[] = [
  { metric: "エージェント検索", bench: "BrowseComp", opus47: 79.3, opus46: 83.7, gpt: 89.3, gemini: 85.9, mythos: 86.9, note: { gpt: "Pro" } },
  { metric: "大規模ツール利用", bench: "MCP-Atlas", opus47: 77.3, opus46: 75.8, gpt: 68.1, gemini: 73.9, mythos: null },
  { metric: "コンピュータ操作", bench: "OSWorld-Verified", opus47: 78.0, opus46: 72.7, gpt: 75.0, gemini: null, mythos: 79.6 },
  { metric: "金融分析エージェント", bench: "Finance Agent v1.1", opus47: 64.4, opus46: 60.1, gpt: 61.5, gemini: 59.7, mythos: null, note: { gpt: "Pro" } },
];
const REASONING: Row[] = [
  { metric: "学際的推論(ツールなし)", bench: "Humanity's Last Exam", opus47: 46.9, opus46: 40.0, gpt: 42.7, gemini: 44.4, mythos: 56.8, note: { gpt: "Pro" } },
  { metric: "学際的推論(ツールあり)", bench: "Humanity's Last Exam", opus47: 54.7, opus46: 53.3, gpt: 58.7, gemini: 51.4, mythos: 64.7, note: { gpt: "Pro" } },
  { metric: "大学院レベル推論", bench: "GPQA Diamond", opus47: 94.2, opus46: 91.3, gpt: 94.4, gemini: 94.3, mythos: 94.6, note: { gpt: "Pro" } },
];
const VISION: Row[] = [
  { metric: "視覚的推論(ツールなし)", bench: "CharXiv Reasoning", opus47: 82.1, opus46: 69.1, gpt: null, gemini: null, mythos: 86.1 },
  { metric: "視覚的推論(ツールあり)", bench: "CharXiv Reasoning", opus47: 91.0, opus46: 84.7, gpt: null, gemini: null, mythos: 93.2 },
  { metric: "サイバーセキュリティ", bench: "CyberGym", opus47: 73.1, opus46: 73.8, gpt: 66.3, gemini: null, mythos: 83.1 },
  { metric: "多言語Q&A", bench: "MMMLU", opus47: 91.5, opus46: 91.1, gpt: null, gemini: 92.6, mythos: null },
];

const TABS = [
  { id: "coding", label: "コーディング", rows: CODING },
  { id: "agent", label: "エージェント", rows: AGENT },
  { id: "reasoning", label: "推論", rows: REASONING },
  { id: "vision", label: "ビジョン・他", rows: VISION },
] as const;
type TabId = typeof TABS[number]["id"];

const ALL = [...CODING, ...AGENT, ...REASONING, ...VISION];
type Delta = { bench: string; metric: string; from: number; to: number; dPt: number; dPct: number };
const DELTAS: Delta[] = ALL
  .filter((r): r is Row & { opus46: number; opus47: number } => r.opus46 != null && r.opus47 != null)
  .map((r) => ({ bench: r.bench, metric: r.metric, from: r.opus46, to: r.opus47, dPt: r.opus47 - r.opus46, dPct: ((r.opus47 - r.opus46) / r.opus46) * 100 }))
  .sort((a, b) => b.dPct - a.dPct);

const MAX_ABS_PCT = Math.max(...DELTAS.map((d) => Math.abs(d.dPct)));
const IMPROVED = DELTAS.filter((d) => d.dPt > 0).length;
const REGRESSED = DELTAS.filter((d) => d.dPt < 0);

/* ─────────────────────── Capability visuals ───────────────────────────── */
function VisCoding() {
  return (
    <svg viewBox="0 0 400 300" className="vis">
      <defs>
        <linearGradient id="vc-g" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#0a0a0a" stopOpacity="0.05" />
          <stop offset="1" stopColor="#0a0a0a" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="vc-r" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#0066ff" stopOpacity="0.25" />
          <stop offset="1" stopColor="#0066ff" />
        </linearGradient>
      </defs>
      <line x1="40" y1="240" x2="360" y2="240" stroke="#0a0a0a" strokeOpacity="0.08" strokeWidth="1" />
      <rect x="110" y="140" width="60" height="100" fill="url(#vc-g)" rx="2" />
      <text x="140" y="260" textAnchor="middle" fontSize="11" fill="#6b7280" fontWeight="500">4.6</text>
      <text x="140" y="130" textAnchor="middle" fontSize="14" fill="#0a0a0a" fontWeight="600">53.4</text>
      <rect x="220" y="88" width="60" height="152" fill="url(#vc-r)" rx="2" />
      <text x="250" y="260" textAnchor="middle" fontSize="11" fill="#0066ff" fontWeight="600">4.7</text>
      <text x="250" y="78" textAnchor="middle" fontSize="14" fill="#0066ff" fontWeight="600">64.3</text>
      <path d="M 295 130 L 340 130 L 340 90 L 295 90" fill="none" stroke="#0066ff" strokeWidth="1.5" />
      <text x="360" y="115" textAnchor="end" fontSize="22" fill="#0066ff" fontWeight="600" letterSpacing="-0.02em">+20.4%</text>
    </svg>
  );
}
function VisReliability() {
  return (
    <svg viewBox="0 0 400 300" className="vis">
      <defs>
        <marker id="vr-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#0a0a0a" />
        </marker>
      </defs>
      {[
        { x: 70, l: "DRAFT" },
        { x: 200, l: "VERIFY" },
        { x: 330, l: "REPORT" },
      ].map((n, i) => (
        <g key={n.l}>
          <rect x={n.x - 48} y={130} width="96" height="56" rx="12" fill="#fff" stroke="#0a0a0a" strokeOpacity="0.15" strokeWidth="1.2" />
          <text x={n.x} y={164} textAnchor="middle" fontSize="12" fill="#0a0a0a" fontWeight="600" letterSpacing="0.05em">{n.l}</text>
        </g>
      ))}
      <line x1="118" y1="158" x2="150" y2="158" stroke="#0a0a0a" strokeWidth="1.2" markerEnd="url(#vr-a)" />
      <line x1="248" y1="158" x2="280" y2="158" stroke="#0a0a0a" strokeWidth="1.2" markerEnd="url(#vr-a)" />
      <path d="M 230 130 C 265 80, 175 80, 170 130" fill="none" stroke="#0066ff" strokeWidth="2">
        <animate attributeName="stroke-dasharray" values="0 200;120 200;200 0" dur="3s" repeatCount="indefinite" />
      </path>
      <polygon points="170,130 164,122 176,122" fill="#0066ff" />
      <text x="200" y="72" textAnchor="middle" fontSize="14" fill="#0066ff" fontWeight="500" fontStyle="italic">self-check</text>
    </svg>
  );
}
function VisVision() {
  return (
    <svg viewBox="0 0 400 300" className="vis">
      <rect x="60" y="145" width="60" height="60" fill="none" stroke="#0a0a0a" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" rx="4" />
      <text x="90" y="225" textAnchor="middle" fontSize="10" fill="#6b7280">1× · 従来</text>
      <rect x="160" y="70" width="180" height="180" fill="none" stroke="#0066ff" strokeWidth="2" rx="8" />
      <rect x="164" y="74" width="172" height="172" fill="#0066ff" fillOpacity="0.05" rx="6" />
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={i} x1="164" y1={74 + i * 17.2} x2="336" y2={74 + i * 17.2} stroke="#0066ff" strokeOpacity="0.1" strokeWidth="0.5" />
      ))}
      <text x="250" y="58" textAnchor="middle" fontSize="11" fill="#0066ff" fontWeight="500">2,576 px 長辺</text>
      <text x="250" y="170" textAnchor="middle" fontSize="42" fill="#0066ff" fontWeight="600" letterSpacing="-0.04em">3.75</text>
      <text x="250" y="190" textAnchor="middle" fontSize="12" fill="#0066ff" fontWeight="500">MP · 3×</text>
    </svg>
  );
}
function VisLevels() {
  const ls = [
    { l: "low", x: 50 },
    { l: "medium", x: 130 },
    { l: "high", x: 210 },
    { l: "xhigh", x: 290, isNew: true },
    { l: "max", x: 360 },
  ];
  return (
    <svg viewBox="0 0 400 300" className="vis">
      <line x1="20" y1="160" x2="380" y2="160" stroke="#0a0a0a" strokeOpacity="0.15" strokeWidth="1" />
      {ls.map((l) => (
        <g key={l.l}>
          <circle cx={l.x} cy={160} r={l.isNew ? 8 : 4} fill={l.isNew ? "#0066ff" : "#0a0a0a"} fillOpacity={l.isNew ? 1 : 0.4} />
          {l.isNew && (
            <circle cx={l.x} cy={160} r="14" fill="none" stroke="#0066ff" strokeWidth="1.2">
              <animate attributeName="r" values="10;22;10" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
            </circle>
          )}
          <text x={l.x} y={l.isNew ? 195 : 190} textAnchor="middle" fontSize={l.isNew ? 14 : 11} fill={l.isNew ? "#0066ff" : "#6b7280"} fontWeight={l.isNew ? 600 : 500}>
            {l.l}
          </text>
          {l.isNew && (
            <>
              <line x1={l.x} y1={130} x2={l.x} y2={146} stroke="#0066ff" strokeWidth="1" />
              <text x={l.x} y={120} textAnchor="middle" fontSize="13" fill="#0066ff" fontWeight="600" fontStyle="italic">new</text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

const CAPS = [
  { n: "01", tag: "Coding", title: "最難関タスクでの飛躍", kpi: "+13%", kpiSub: "Hex 93タスク", summary: "Hex社の93タスクで解決率+13%向上。4.6 と Sonnet 4.6 が解けなかった 4 タスクを新たに解決。low-effort の 4.7 が 4.6 の medium-effort とほぼ同等の効率性を示す。", vis: <VisCoding />, accent: true },
  { n: "02", tag: "Reliability", title: "自己検証と長時間タスク", kpi: "Self-check", kpiSub: "内蔵", summary: "報告前に自身の出力を検証する仕組みを自ら考案。複雑で長時間のタスクを一貫して処理。エージェント的ワークフローと非同期実行で特に効果が顕著。", vis: <VisReliability /> },
  { n: "03", tag: "Vision", title: "解像度 3 倍超のビジョン", kpi: "3.75 MP", kpiSub: "2,576 px 長辺", summary: "従来モデルの 3 倍以上の解像度で画像を処理。UI・図面・資料のような細部が重要な視覚情報を扱う場面で差が出る。", vis: <VisVision /> },
  { n: "04", tag: "Thinking", title: "xhigh エフォートレベル", kpi: "+1 level", kpiSub: "between high & max", summary: "high と max の間に xhigh を追加。推論とレイテンシのトレードオフを細かく制御。コーディング・エージェント用途では「high または xhigh から始める」のが公式推奨。", vis: <VisLevels /> },
];

/* ════════════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════════════ */
export default function OpusPage() {
  const [tab, setTab] = useState<TabId>("coding");
  const activeRows = useMemo(() => TABS.find((t) => t.id === tab)!.rows, [tab]);
  const [showAllDeltas, setShowAllDeltas] = useState(false);
  const visibleDeltas = showAllDeltas ? DELTAS : DELTAS.slice(0, 5);

  return (
    <>
      <style>{styles}</style>

      <div className="ap">
        {/* ── nav ── */}
        <nav className="ap-nav">
          <div className="ap-nav-inner">
            <Link href="/" className="ap-nav-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <span>Knowledge Hub</span>
            </Link>
            <div className="ap-nav-title">Claude Opus 4.7</div>
            <div className="ap-nav-meta">Anthropic · 2026</div>
          </div>
        </nav>

        {/* ═════ HERO ═════ */}
        <section className="ap-hero">
          <R>
            <div className="ap-eyebrow">New · Model briefing</div>
          </R>
          <R d={120} y={36}>
            <h1 className="ap-hero-title">
              <span className="ap-hero-title-accent">Frontier work,</span> delegated.
            </h1>
          </R>
          <R d={280}>
            <p className="ap-hero-sub">
              Claude Opus 4.7 — 最難関のコーディングを任せられる、Anthropic の現行最上位モデル。
            </p>
          </R>
        </section>

        {/* ═════ DELTA ═════ */}
        <section className="ap-sec">
          <div className="ap-container">
            <R>
              <div className="ap-sech">
                <span className="ap-sech-eye">4.6 からの変化</span>
                <h2 className="ap-sech-title">
                  測れる <em>進化</em>。
                </h2>
                <p className="ap-sech-desc">
                  {IMPROVED}/{DELTAS.length} 項目で改善。最大 +{DELTAS[0].dPct.toFixed(1)}% ({DELTAS[0].bench})、
                  {REGRESSED.length > 0 && <> {REGRESSED[0].bench} のみ {REGRESSED[0].dPct.toFixed(1)}%。</>}
                </p>
              </div>
            </R>

            <R d={100}>
              <div className="ap-delta-list">
                {visibleDeltas.map((d, i) => {
                  const pos = d.dPt > 0;
                  const mag = (Math.abs(d.dPct) / MAX_ABS_PCT) * 100;
                  const intensity = Math.abs(d.dPct) / MAX_ABS_PCT;
                  const bg = pos
                    ? `linear-gradient(90deg, rgba(0,102,255,${0.02 + intensity * 0.08}), rgba(0,102,255,${0.04 + intensity * 0.14}))`
                    : `linear-gradient(90deg, rgba(234,67,53,${0.02 + intensity * 0.08}), rgba(234,67,53,${0.04 + intensity * 0.14}))`;
                  return (
                    <R key={d.bench + i} d={i * 40}>
                      <div className="ap-delta-row" style={{ background: bg }}>
                        <div className="ap-delta-meta">
                          <div className="ap-delta-metric">{d.metric}</div>
                          <div className="ap-delta-bench">{d.bench}</div>
                        </div>
                        <div className="ap-delta-nums">
                          <span className="ap-delta-from">{d.from.toFixed(1)}</span>
                          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.6" className="ap-delta-arr">
                            <path d="M1 6 L15 6 M10 1 L15 6 L10 11" />
                          </svg>
                          <span className="ap-delta-to">{d.to.toFixed(1)}</span>
                        </div>
                        <div className={`ap-delta-pct ${pos ? "is-pos" : "is-neg"}`}>
                          {pos ? "+" : ""}{d.dPct.toFixed(1)}
                          <span className="ap-delta-pct-sym">%</span>
                        </div>
                        <div className="ap-mag">
                          <div className="ap-mag-ax" />
                          <div className="ap-mag-c" />
                          <div
                            className={`ap-mag-f ${pos ? "is-pos" : "is-neg"}`}
                            style={{
                              width: `${mag / 2}%`,
                              left: pos ? "50%" : `${50 - mag / 2}%`,
                            }}
                          />
                        </div>
                      </div>
                    </R>
                  );
                })}
              </div>
            </R>

            {DELTAS.length > 5 && (
              <R d={200}>
                <div className="ap-delta-more">
                  <button
                    className="ap-delta-more-btn"
                    onClick={() => setShowAllDeltas((v) => !v)}
                  >
                    {showAllDeltas ? "折りたたむ" : `残り ${DELTAS.length - 5} 件を表示`}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ transform: showAllDeltas ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>
                      <path d="M2 4 L6 8 L10 4" />
                    </svg>
                  </button>
                </div>
              </R>
            )}
          </div>
        </section>

        {/* ═════ CAPABILITIES ═════ */}
        <section className="ap-sec">
          <div className="ap-container">
            <R>
              <div className="ap-sech ap-sech--center">
                <span className="ap-sech-eye">4 つの進化</span>
                <h2 className="ap-sech-title">
                  何が、<em>新しい</em>のか。
                </h2>
              </div>
            </R>

            <div className="ap-caps">
              {CAPS.map((c, i) => (
                <R key={c.n} d={i * 120} className={`ap-cap ${c.accent ? "ap-cap--accent" : ""} ${i % 2 === 1 ? "ap-cap--rev" : ""}`}>
                  <article>
                    <div className="ap-cap-body">
                      <div className="ap-cap-meta">
                        <span className="ap-cap-n">{c.n}</span>
                        <span className="ap-cap-tag">{c.tag}</span>
                      </div>
                      <h3 className="ap-cap-title">{c.title}</h3>
                      <p className="ap-cap-sum">{c.summary}</p>
                      <div className="ap-cap-kpi">
                        <span className="ap-cap-kpi-v">{c.kpi}</span>
                        <span className="ap-cap-kpi-s">{c.kpiSub}</span>
                      </div>
                    </div>
                    <div className="ap-cap-vis">{c.vis}</div>
                  </article>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ═════ MATRIX ═════ */}
        <section className="ap-sec ap-sec--dark">
          <div className="ap-container">
            <R>
              <div className="ap-sech">
                <span className="ap-sech-eye ap-sech-eye--light">他モデルとの比較</span>
                <h2 className="ap-sech-title ap-sech-title--light">
                  最前線で、<em>競る</em>。
                </h2>
                <p className="ap-sech-desc ap-sech-desc--light">
                  Opus 4.6 / GPT-5.4 / Gemini 3.1 Pro / Mythos (参考) と同一ベンチでの横並び。青が Opus 4.7、◆ は公開モデル内トップ。
                </p>
              </div>
            </R>

            <R d={150}>
              <nav className="ap-mx-tabs" role="tablist">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={tab === t.id}
                    className={`ap-mx-tab ${tab === t.id ? "is-on" : ""}`}
                    onClick={() => setTab(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </nav>
            </R>

            <div className="ap-mx">
              {activeRows.map((row, ri) => {
                const vals: [string, number | null][] = [
                  ["opus47", row.opus47],
                  ["opus46", row.opus46],
                  ["gpt", row.gpt],
                  ["gemini", row.gemini],
                  ["mythos", row.mythos],
                ];
                const topPublic = Math.max(...vals.slice(0, 4).map(([, v]) => v ?? 0));
                const maxVal = Math.max(...vals.map(([, v]) => v ?? 0));
                return (
                  <R key={`${row.bench}-${ri}-${tab}`} d={ri * 100}>
                    <div className="ap-mx-row">
                      <div className="ap-mx-head">
                        <div className="ap-mx-metric">{row.metric}</div>
                        <div className="ap-mx-bench">{row.bench}</div>
                      </div>
                      <div className="ap-mx-bars">
                        {vals.map(([k, v]) => {
                          const lbl: Record<string, string> = {
                            opus47: "Opus 4.7",
                            opus46: "Opus 4.6",
                            gpt: "GPT-5.4",
                            gemini: "Gemini 3.1",
                            mythos: "Mythos",
                          };
                          if (v == null) {
                            return (
                              <div key={k} className={`ap-mx-bar is-empty is-${k}`}>
                                <span className="ap-mx-bar-l">{lbl[k]}</span>
                                <div className="ap-mx-bar-t"><span className="ap-mx-bar-empty">データなし</span></div>
                                <span className="ap-mx-bar-v">—</span>
                              </div>
                            );
                          }
                          const isLead = v === topPublic && k !== "mythos";
                          const pct = (v / maxVal) * 100;
                          const tone: "primary" | "muted" | "ghost" = k === "opus47" ? "primary" : k === "mythos" ? "ghost" : "muted";
                          return (
                            <div key={k} className={`ap-mx-bar is-${k} ${isLead ? "is-lead" : ""}`}>
                              <span className="ap-mx-bar-l">
                                {lbl[k]}
                                {row.note?.[k as keyof typeof row.note] && <sup className="ap-mx-bar-sup">{row.note[k as keyof typeof row.note]}</sup>}
                              </span>
                              <Bar pct={pct} tone={tone} thick={k === "opus47"} delay={120} />
                              <span className="ap-mx-bar-v">
                                {v.toFixed(1)}<span className="ap-mx-bar-vpct">%</span>
                                {isLead && <span className="ap-mx-crown">◆</span>}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </R>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═════ NOTES ═════ */}
        <section className="ap-sec">
          <div className="ap-container">
            <R>
              <div className="ap-sech">
                <span className="ap-sech-eye">所感</span>
                <h2 className="ap-sech-title">
                  どこで、<em>選ぶ</em>か。
                </h2>
              </div>
            </R>

            <div className="ap-notes">
              {[
                { tone: "pos", head: "Opus 4.7 がリードする領域", body: "MCP-Atlas / Finance Agent の 2 項目で全モデル中トップ。コーディング系 3 項目(SWE-bench Pro/Verified、Terminal-Bench)と視覚的推論で Opus 4.6 から大幅に改善。" },
                { tone: "neutral", head: "Mythos Preview は参考値", body: "ほぼ全項目で最高スコアだが一般提供されていない参考モデル。Anthropic は安全性の観点から限定公開にとどめており、Opus 4.7 はその学びを反映した最初の公開モデル。" },
                { tone: "neg", head: "苦手な領域・注意点", body: "BrowseComp(検索)では GPT-5.4 に後退、MMMLU(多言語)では Gemini にわずかに及ばず。用途によっては他モデルとの使い分けが有効。" },
              ].map((n, i) => (
                <R key={n.head} d={i * 120}>
                  <article className={`ap-note ap-note--${n.tone}`}>
                    <div className="ap-note-dot" />
                    <div>
                      <h3 className="ap-note-h">{n.head}</h3>
                      <p className="ap-note-p">{n.body}</p>
                    </div>
                  </article>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ═════ SPECS ═════ */}
        <section className="ap-sec">
          <div className="ap-container">
            <R>
              <div className="ap-sech">
                <span className="ap-sech-eye">仕様・価格</span>
                <h2 className="ap-sech-title">
                  いくらで、<em>どこで</em>動く。
                </h2>
              </div>
            </R>

            <R d={150}>
              <div className="ap-specs">
                {[
                  { k: "モデル ID", v: <code>claude-opus-4-7</code> },
                  { k: "価格", v: "入力 $5 · 出力 $25 / MTok" },
                  { k: "節約", v: "Prompt caching 最大 90% · Batch 50%" },
                  { k: "提供", v: "Claude 全製品 · API · Bedrock · Vertex AI · Microsoft Foundry" },
                  { k: "エフォート", v: <>low · medium · high · <b className="ap-accent">xhigh</b> · max</> },
                  { k: "トークナイザー", v: "更新あり(使用量 1.0 〜 1.35 倍)" },
                  { k: "Mythos との関係", v: "Mythos Preview より能力は抑制(一般提供の最上位)" },
                ].map((r) => (
                  <div key={r.k} className="ap-spec-row">
                    <dt>{r.k}</dt>
                    <dd>{r.v}</dd>
                  </div>
                ))}
              </div>
            </R>
          </div>
        </section>

        {/* ═════ MIGRATION ═════ */}
        <section className="ap-sec ap-sec--cta">
          <div className="ap-container">
            <R>
              <div className="ap-mig">
                <div className="ap-mig-head">
                  <span className="ap-mig-eye">4.6 からの移行</span>
                  <h2 className="ap-mig-title">
                    切り替え時の<br />
                    <em>3 つの確認</em>。
                  </h2>
                  <p className="ap-mig-lead">
                    指示を<em>より文字通りに解釈する</em>ようになっているため、既存プロンプトの調整が必要になる可能性があります。
                    Anthropic は公式の移行ガイドを公開しており、ハーネス側のチューニングも推奨されます。
                  </p>
                </div>
                <div className="ap-mig-grid">
                  <div className="ap-mig-card">
                    <div className="ap-mig-card-k">トークン使用量</div>
                    <div className="ap-mig-card-v">1.00 – 1.35×</div>
                    <div className="ap-mig-card-s">課金の見積もりを見直す</div>
                  </div>
                  <div className="ap-mig-card">
                    <div className="ap-mig-card-k">解釈の傾向</div>
                    <div className="ap-mig-card-v">literal</div>
                    <div className="ap-mig-card-s">曖昧な指示は明示化</div>
                  </div>
                  <div className="ap-mig-card">
                    <div className="ap-mig-card-k">ハーネス</div>
                    <div className="ap-mig-card-v">re-tune</div>
                    <div className="ap-mig-card-s">エージェント設定を調整</div>
                  </div>
                </div>
              </div>
            </R>
          </div>
        </section>

        {/* ═════ FOOTER ═════ */}
        <footer className="ap-foot">
          <div className="ap-container">
            <div className="ap-foot-inner">
              <div className="ap-foot-brand">Claude Opus 4.7</div>
              <div className="ap-foot-meta">
                Briefing · 2026.04.17 · Source: Anthropic · AWS · Axios
              </div>
              <Link href="/" className="ap-foot-back">
                ← Knowledge Hub
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STYLES — Apple product page aesthetic
   Pure white + deep black + single electric blue accent
   SF-inspired typography via -apple-system + Inter Tight fallback
   ════════════════════════════════════════════════════════════════════════ */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=JetBrains+Mono:wght@400;500&display=swap');

.ap {
  --bg: #ffffff;
  --bg-soft: #f5f5f7;
  --bg-dark: #0a0a0a;
  --bg-dark-soft: #1d1d1f;
  --ink: #0a0a0a;
  --ink-2: #1d1d1f;
  --ink-3: #6e6e73;
  --ink-4: #a1a1a6;
  --line: #e5e5ea;
  --line-2: #d2d2d7;
  --accent: #0066ff;
  --accent-soft: #e5efff;
  --pos: #0066ff;
  --neg: #ea4335;

  --font-display: -apple-system, 'SF Pro Display', BlinkMacSystemFont, 'Inter Tight', sans-serif;
  --font-text: -apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Inter Tight', sans-serif;
  --font-mono: 'SF Mono', 'JetBrains Mono', Menlo, monospace;

  color: var(--ink);
  background: var(--bg);
  font-family: var(--font-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: -0.01em;
  font-feature-settings: 'ss01', 'cv11';
  overflow-x: hidden;
}
.ap *, .ap *::before, .ap *::after { box-sizing: border-box; margin: 0; padding: 0; }
.ap a { color: inherit; text-decoration: none; }
.ap button { font-family: inherit; cursor: pointer; background: none; border: none; color: inherit; }
.ap code { font-family: var(--font-mono); font-size: 0.95em; }

.ap em {
  font-style: italic;
  font-weight: 500;
  color: var(--accent);
  background: linear-gradient(90deg, var(--accent), #4f94ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ap .ap-accent { color: var(--accent); }
.ap .ap-neg { color: var(--neg); }

/* ════ NAV ════ */
.ap-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.ap-nav-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 14px 24px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  font-size: 13px;
  color: var(--ink-3);
}
.ap-nav-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--ink-3);
  transition: color 0.2s;
}
.ap-nav-back:hover { color: var(--accent); }
.ap-nav-title {
  justify-self: center;
  color: var(--ink);
  font-weight: 600;
  letter-spacing: -0.015em;
  font-size: 14px;
}
.ap-nav-meta { justify-self: end; }
@media (max-width: 640px) {
  .ap-nav-meta { display: none; }
  .ap-nav-inner { grid-template-columns: auto 1fr; padding: 12px 16px; }
  .ap-nav-title { justify-self: end; }
}

/* ════ CONTAINER ════ */
.ap-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
}
@media (max-width: 640px) { .ap-container { padding: 0 18px; } }

/* ════ SECTIONS ════ */
.ap-sec {
  padding: 160px 0;
  position: relative;
}
.ap-sec--dark {
  background: var(--bg-dark);
  color: #fff;
}
.ap-sec--cta {
  background: var(--bg-soft);
}
@media (max-width: 720px) {
  .ap-sec { padding: 96px 0; }
}

/* section header */
.ap-sech { max-width: 820px; margin-bottom: 80px; }
.ap-sech--center { text-align: center; margin-left: auto; margin-right: auto; }
.ap-sech-eye {
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--accent);
  margin-bottom: 16px;
  text-transform: none;
}
.ap-sech-eye--light { color: #7aa8ff; }
.ap-sech-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(40px, 6vw, 80px);
  line-height: 1.04;
  letter-spacing: -0.035em;
  color: var(--ink);
  margin-bottom: 20px;
}
.ap-sech-title--light { color: #fff; }
.ap-sech-desc {
  font-size: 17px;
  line-height: 1.55;
  color: var(--ink-3);
  max-width: 680px;
  font-weight: 400;
  letter-spacing: -0.012em;
}
.ap-sech-desc--light { color: rgba(255,255,255,0.7); }

/* ════ HERO ════ */
.ap-hero {
  padding: 140px 24px 180px;
  max-width: 1120px;
  margin: 0 auto;
  text-align: left;
}
.ap-eyebrow {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 32px;
}
.ap-hero-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(44px, 8vw, 112px);
  line-height: 1;
  letter-spacing: -0.045em;
  color: var(--ink);
  margin-bottom: 28px;
  max-width: 14ch;
}
.ap-hero-title-accent {
  background: linear-gradient(90deg, #0066ff 0%, #5b9eff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-style: italic;
  font-weight: 600;
}
.ap-hero-sub {
  font-size: clamp(17px, 1.6vw, 20px);
  line-height: 1.5;
  color: var(--ink-3);
  max-width: 560px;
  font-weight: 400;
  letter-spacing: -0.012em;
}

@media (max-width: 720px) {
  .ap-hero { padding: 80px 18px 100px; }
}

/* ════ DELTA ════ */
.ap-delta-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ap-delta-row {
  display: grid;
  grid-template-columns: 2fr 140px 120px 1.2fr;
  align-items: center;
  gap: 24px;
  padding: 20px 28px;
  border-radius: 14px;
  transition: transform 0.2s;
}
.ap-delta-row:hover { transform: translateX(4px); }
.ap-delta-meta { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.ap-delta-metric { font-size: 15px; font-weight: 600; color: var(--ink); letter-spacing: -0.012em; line-height: 1.3; }
.ap-delta-bench { font-size: 12px; color: var(--ink-3); font-family: var(--font-mono); letter-spacing: 0; }

.ap-delta-nums {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  font-variant-numeric: tabular-nums;
  color: var(--ink-3);
  font-size: 14px;
  font-weight: 500;
}
.ap-delta-from { color: var(--ink-4); }
.ap-delta-arr { color: var(--ink-4); }
.ap-delta-to { color: var(--ink); font-weight: 600; }

.ap-delta-pct {
  text-align: right;
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.025em;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}
.ap-delta-pct.is-pos { color: var(--accent); }
.ap-delta-pct.is-neg { color: var(--neg); }
.ap-delta-pct-sym { font-size: 0.6em; font-weight: 500; margin-left: 2px; }

.ap-mag {
  position: relative;
  height: 20px;
  display: flex;
  align-items: center;
}
.ap-mag-ax { position: absolute; inset: 50% 0 auto 0; height: 1px; background: rgba(0,0,0,0.08); }
.ap-mag-c { position: absolute; top: 3px; bottom: 3px; left: 50%; width: 1px; background: rgba(0,0,0,0.12); }
.ap-mag-f {
  position: absolute;
  height: 6px;
  border-radius: 3px;
  top: 50%;
  transform: translateY(-50%);
}
.ap-mag-f.is-pos { background: var(--accent); }
.ap-mag-f.is-neg { background: var(--neg); }

@media (max-width: 900px) {
  .ap-delta-row {
    grid-template-columns: 1fr auto;
    gap: 12px;
    padding: 18px 20px;
  }
  .ap-delta-nums, .ap-mag { display: none; }
  .ap-delta-pct { font-size: 22px; }
}

.ap-delta-more {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
.ap-delta-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  font-size: 14px;
  font-weight: 500;
  color: var(--accent);
  background: var(--accent-soft);
  border-radius: 999px;
  letter-spacing: -0.01em;
  transition: background 0.2s, transform 0.15s;
}
.ap-delta-more-btn:hover { background: #d7e4ff; transform: translateY(-1px); }

/* ════ CAPABILITIES ════ */
.ap-caps {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.ap-cap {
  border-radius: 24px;
  background: var(--bg-soft);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.ap-cap:hover { transform: translateY(-4px); box-shadow: 0 24px 60px -20px rgba(0,0,0,0.12); }
.ap-cap--accent {
  background: linear-gradient(135deg, #001d5c 0%, #0a2a8f 50%, #0052d4 100%);
  color: #fff;
}
.ap-cap > article {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 0;
  align-items: stretch;
  min-height: 360px;
}
.ap-cap--rev > article { grid-template-columns: 1fr 1.1fr; }
.ap-cap--rev .ap-cap-body { order: 2; padding-right: 56px; padding-left: 32px; }
.ap-cap--rev .ap-cap-vis { order: 1; }

.ap-cap-body {
  padding: 56px 32px 56px 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}
.ap-cap-meta { display: flex; align-items: center; gap: 14px; }
.ap-cap-n {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-4);
  letter-spacing: 0.04em;
}
.ap-cap--accent .ap-cap-n { color: rgba(255,255,255,0.5); }
.ap-cap-tag {
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 4px 10px;
  border-radius: 999px;
  letter-spacing: 0.02em;
}
.ap-cap--accent .ap-cap-tag { background: rgba(255,255,255,0.12); color: #fff; }
.ap-cap-title {
  font-family: var(--font-display);
  font-size: clamp(26px, 3vw, 36px);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.025em;
  color: var(--ink);
}
.ap-cap--accent .ap-cap-title { color: #fff; }
.ap-cap-sum {
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink-3);
  letter-spacing: -0.01em;
}
.ap-cap--accent .ap-cap-sum { color: rgba(255,255,255,0.72); }
.ap-cap-kpi {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  margin-top: 8px;
}
.ap-cap--accent .ap-cap-kpi { border-top-color: rgba(255,255,255,0.15); }
.ap-cap-kpi-v {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--accent);
}
.ap-cap--accent .ap-cap-kpi-v { color: #7aa8ff; }
.ap-cap-kpi-s {
  font-size: 13px;
  color: var(--ink-3);
  font-weight: 500;
}
.ap-cap--accent .ap-cap-kpi-s { color: rgba(255,255,255,0.6); }
.ap-cap-vis {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: var(--bg);
  border-radius: 16px;
  margin: 32px 32px 32px 0;
}
.ap-cap--rev .ap-cap-vis { margin: 32px 0 32px 32px; }
.ap-cap--accent .ap-cap-vis {
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(20px);
}
.ap-cap--accent .vis text { fill: rgba(255,255,255,0.9) !important; }
.ap-cap--accent .vis line[stroke="#0a0a0a"] { stroke: rgba(255,255,255,0.2) !important; }
.ap-cap--accent .vis rect[fill="#fff"] { fill: rgba(255,255,255,0.08) !important; }

.vis { width: 100%; height: auto; max-width: 420px; }

@media (max-width: 900px) {
  .ap-cap > article, .ap-cap--rev > article { grid-template-columns: 1fr; }
  .ap-cap-body, .ap-cap--rev .ap-cap-body { padding: 40px 28px 20px; }
  .ap-cap-vis, .ap-cap--rev .ap-cap-vis { margin: 0 28px 28px; padding: 24px; }
}

/* ════ MATRIX ════ */
.ap-mx-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 40px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.ap-mx-tab {
  padding: 10px 20px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255,255,255,0.7);
  border: 1px solid rgba(255,255,255,0.15);
  transition: all 0.2s;
  white-space: nowrap;
  letter-spacing: -0.01em;
}
.ap-mx-tab:hover { color: #fff; border-color: rgba(255,255,255,0.4); }
.ap-mx-tab.is-on {
  color: #0a0a0a;
  background: #fff;
  border-color: #fff;
  font-weight: 600;
}

.ap-mx {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.ap-mx-row {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 40px;
  padding: 28px 32px;
  background: rgba(255,255,255,0.04);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.06);
  transition: background 0.2s;
}
.ap-mx-row:hover { background: rgba(255,255,255,0.06); }
.ap-mx-head { display: flex; flex-direction: column; gap: 4px; }
.ap-mx-metric {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.015em;
  line-height: 1.3;
}
.ap-mx-bench {
  font-family: var(--font-mono);
  font-size: 11px;
  color: rgba(255,255,255,0.5);
}
.ap-mx-bars { display: flex; flex-direction: column; gap: 10px; }
.ap-mx-bar {
  display: grid;
  grid-template-columns: 100px 1fr 90px;
  align-items: center;
  gap: 16px;
}
.ap-mx-bar.is-empty { opacity: 0.45; }
.ap-mx-bar.is-mythos { opacity: 0.72; }
.ap-mx-bar-l {
  font-size: 13px;
  text-align: right;
  color: rgba(255,255,255,0.6);
  font-weight: 500;
  letter-spacing: -0.01em;
}
.ap-mx-bar.is-opus47 .ap-mx-bar-l { color: #5b9eff; font-weight: 600; }
.ap-mx-bar.is-mythos .ap-mx-bar-l { color: #c4b78a; }
.ap-mx-bar-sup { font-size: 9px; opacity: 0.7; margin-left: 2px; }
.ap-mx-bar-v {
  font-family: var(--font-mono);
  font-size: 12px;
  color: #fff;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  font-variant-numeric: tabular-nums;
}
.ap-mx-bar-vpct { color: rgba(255,255,255,0.5); margin-left: 1px; }
.ap-mx-bar.is-lead .ap-mx-bar-v { color: #5b9eff; font-weight: 600; }
.ap-mx-crown { color: #5b9eff; font-size: 9px; margin-left: 2px; }
.ap-mx-bar-t {
  height: 10px;
  background: rgba(255,255,255,0.06);
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0 8px;
}
.ap-mx-bar-empty { font-size: 10px; color: rgba(255,255,255,0.3); }

/* shared bar */
.bar {
  position: relative;
  height: 10px;
  background: rgba(255,255,255,0.06);
  border-radius: 5px;
  overflow: hidden;
}
.bar--thick { height: 14px; border-radius: 7px; background: rgba(91,158,255,0.12); }
.bar-fill {
  height: 100%;
  width: 0;
  border-radius: inherit;
  transition: width 100ms;
}
.bar--primary .bar-fill { background: linear-gradient(90deg, #0066ff, #5b9eff); }
.bar--muted .bar-fill { background: rgba(255,255,255,0.45); }
.bar--ghost .bar-fill {
  background: repeating-linear-gradient(90deg, rgba(196,183,138,0.6) 0 4px, transparent 4px 8px);
}

@media (max-width: 760px) {
  .ap-mx-row { grid-template-columns: 1fr; gap: 20px; padding: 22px 20px; }
  .ap-mx-bar { grid-template-columns: 80px 1fr 64px; gap: 10px; }
}

/* ════ NOTES ════ */
.ap-notes { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.ap-note {
  padding: 32px 28px;
  background: var(--bg-soft);
  border-radius: 20px;
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 16px;
  align-items: start;
  transition: transform 0.3s, box-shadow 0.3s;
}
.ap-note:hover { transform: translateY(-4px); box-shadow: 0 24px 60px -20px rgba(0,0,0,0.1); }
.ap-note-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  margin-top: 10px;
}
.ap-note--pos .ap-note-dot { background: var(--accent); box-shadow: 0 0 0 4px var(--accent-soft); }
.ap-note--neutral .ap-note-dot { background: #c4b78a; box-shadow: 0 0 0 4px rgba(196,183,138,0.2); }
.ap-note--neg .ap-note-dot { background: var(--neg); box-shadow: 0 0 0 4px rgba(234,67,53,0.12); }
.ap-note-h {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin-bottom: 10px;
  line-height: 1.25;
}
.ap-note-p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink-3);
  font-weight: 400;
  letter-spacing: -0.01em;
}
@media (max-width: 900px) { .ap-notes { grid-template-columns: 1fr; } }

/* ════ SPECS ════ */
.ap-specs {
  border-top: 1px solid var(--line);
  background: var(--bg);
  border-radius: 20px;
  overflow: hidden;
}
.ap-spec-row {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 32px;
  padding: 20px 28px;
  border-bottom: 1px solid var(--line);
  align-items: baseline;
}
.ap-spec-row:last-child { border-bottom: none; }
.ap-spec-row dt {
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-3);
  letter-spacing: -0.01em;
}
.ap-spec-row dd {
  font-size: 15px;
  color: var(--ink);
  font-weight: 500;
  line-height: 1.55;
  letter-spacing: -0.012em;
}
.ap-spec-row dd code {
  background: var(--bg-soft);
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
}
@media (max-width: 640px) {
  .ap-spec-row { grid-template-columns: 1fr; gap: 6px; padding: 18px 20px; }
}

/* ════ MIGRATION ════ */
.ap-mig {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  padding: 64px 56px;
  background: #fff;
  border-radius: 24px;
  align-items: center;
}
.ap-mig-eye {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 16px;
}
.ap-mig-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--ink);
  margin-bottom: 20px;
}
.ap-mig-lead {
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink-3);
  letter-spacing: -0.01em;
}
.ap-mig-lead em { font-style: italic; }
.ap-mig-grid { display: flex; flex-direction: column; gap: 12px; }
.ap-mig-card {
  display: grid;
  grid-template-columns: 140px 1fr auto;
  gap: 20px;
  align-items: center;
  padding: 20px 24px;
  background: var(--bg-soft);
  border-radius: 14px;
}
.ap-mig-card-k {
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-3);
}
.ap-mig-card-v {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--accent);
}
.ap-mig-card-s {
  font-size: 12px;
  color: var(--ink-3);
  text-align: right;
}
@media (max-width: 900px) {
  .ap-mig { grid-template-columns: 1fr; gap: 36px; padding: 40px 28px; }
  .ap-mig-card { grid-template-columns: 1fr; gap: 4px; padding: 18px 20px; text-align: left; }
  .ap-mig-card-s { text-align: left; }
}

/* ════ FOOT ════ */
.ap-foot {
  padding: 48px 0;
  border-top: 1px solid var(--line);
  background: var(--bg);
}
.ap-foot-inner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 32px;
  align-items: center;
}
.ap-foot-brand { font-weight: 700; font-size: 15px; letter-spacing: -0.015em; }
.ap-foot-meta { font-size: 13px; color: var(--ink-3); }
.ap-foot-back {
  font-size: 13px;
  color: var(--accent);
  font-weight: 500;
  transition: opacity 0.2s;
}
.ap-foot-back:hover { opacity: 0.7; }
@media (max-width: 720px) {
  .ap-foot-inner { grid-template-columns: 1fr; gap: 12px; text-align: left; }
}
`;
