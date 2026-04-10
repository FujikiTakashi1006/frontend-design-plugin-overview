"use client";

import { useEffect, useState, useRef } from "react";

/* ─── Reveal on Scroll ─── */
function useReveal(threshold = 0.18) {
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
      className={`rv${ok ? " vis" : ""}`}
      style={{ transitionDelay: `${d}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── SVG Components ─── */

function SvgBrainPie() {
  return (
    <div className="svg-wrap">
      <svg viewBox="0 0 320 320" className="diagram" aria-label="Brain social processing diagram">
        {/* 80% arc */}
        <circle cx="160" cy="160" r="120" fill="none" stroke="#333" strokeWidth="28" />
        <circle cx="160" cy="160" r="120" fill="none" stroke="#555" strokeWidth="28"
          strokeDasharray={`${2 * Math.PI * 120 * 0.8} ${2 * Math.PI * 120 * 0.2}`}
          strokeDashoffset={2 * Math.PI * 120 * 0.25}
          strokeLinecap="round" />
        <text x="160" y="145" textAnchor="middle" className="svg-big" fill="#888">80%</text>
        <text x="160" y="172" textAnchor="middle" className="svg-label" fill="#888">社会的処理</text>
        <text x="160" y="198" textAnchor="middle" className="svg-sub" fill="#666">≈ 150人（ダンバー数）</text>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 160 + Math.cos(rad) * 120;
          const cy = 160 + Math.sin(rad) * 120;
          return <circle key={i} cx={cx} cy={cy} r="4" fill="#555" opacity={0.4 + i * 0.07} />;
        })}
      </svg>
    </div>
  );
}

function SvgMasks() {
  const masks = [
    { label: "上司の前", emoji: "■", x: 50 },
    { label: "友人の前", emoji: "●", x: 160 },
    { label: "初対面", emoji: "◆", x: 270 },
  ];
  return (
    <div className="svg-wrap">
      <svg viewBox="0 0 320 280" className="diagram" aria-label="Persona masks diagram">
        {masks.map((m, i) => (
          <g key={i}>
            <rect x={m.x - 38} y="40" width="76" height="90" rx="16" fill="#1a1a1a"
              stroke="#555" strokeWidth="1.5" opacity={0.4 + i * 0.2} />
            <text x={m.x} y="90" textAnchor="middle" className="svg-icon" fill="#555"
              opacity={0.5 + i * 0.2}>{m.emoji}</text>
            <text x={m.x} y="155" textAnchor="middle" className="svg-label" fill="#888">{m.label}</text>
          </g>
        ))}
        <line x1="88" y1="85" x2="122" y2="85" stroke="#444" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="198" y1="85" x2="232" y2="85" stroke="#444" strokeWidth="1" strokeDasharray="4 3" />
        <rect x="85" y="195" width="150" height="36" rx="18" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
        <text x="160" y="218" textAnchor="middle" className="svg-sub" fill="#666">if-then パターン</text>
      </svg>
    </div>
  );
}

function SvgConsensus() {
  return (
    <div className="svg-wrap">
      <svg viewBox="0 0 320 280" className="diagram" aria-label="Conformity consensus diagram">
        <text x="80" y="30" textAnchor="middle" className="svg-label" fill="#666">多数派</text>
        {[0, 1, 2, 3].map((i) => (
          <circle key={`a${i}`} cx={50 + i * 20} cy="65" r="12" fill="#1a1a1a" stroke="#555" strokeWidth="1.5" />
        ))}
        <text x="80" y="70" textAnchor="middle" className="svg-sub" fill="#888" style={{ fontWeight: 600 }}>A</text>
        <circle cx="160" cy="140" r="20" fill="#1a1a1a" stroke="#888" strokeWidth="2" />
        <text x="160" y="146" textAnchor="middle" className="svg-sub" fill="#888" style={{ fontWeight: 600 }}>You</text>
        <line x1="100" y1="80" x2="145" y2="125" stroke="#444" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <rect x="200" y="110" width="90" height="36" rx="8" fill="#1a1a1a" stroke="#cc4444" strokeWidth="1" opacity="0.6" />
        <text x="245" y="124" textAnchor="middle" className="svg-sub" fill="#cc4444" style={{ fontWeight: 600 }}>!</text>
        <text x="245" y="140" textAnchor="middle" className="svg-tiny" fill="#cc4444">同調エラー</text>
        <line x1="180" y1="137" x2="200" y2="130" stroke="#cc4444" strokeWidth="1" opacity="0.4" />
        <text x="160" y="210" textAnchor="middle" className="svg-sub" fill="#666">①自動模倣 + ②エラー検出</text>
        <text x="160" y="235" textAnchor="middle" className="svg-tiny" fill="#555">オフにできない</text>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#444" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function SvgContagion() {
  const nodes = [
    { x: 60, y: 140, label: "友人" },
    { x: 160, y: 140, label: "あなた" },
    { x: 260, y: 140, label: "友人" },
  ];
  return (
    <div className="svg-wrap">
      <svg viewBox="0 0 320 280" className="diagram" aria-label="Social contagion chain diagram">
        <line x1="85" y1="140" x2="135" y2="140" stroke="#555" strokeWidth="1.5" />
        <line x1="185" y1="140" x2="235" y2="140" stroke="#555" strokeWidth="1.5" />
        <polygon points="130,136 138,140 130,144" fill="#555" />
        <polygon points="230,136 238,140 230,144" fill="#555" />
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={i === 1 ? 28 : 22}
              fill="#1a1a1a"
              stroke={i === 1 ? "#888" : "#555"}
              strokeWidth={i === 1 ? 2 : 1.5} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" className="svg-sub"
              fill={i === 1 ? "#888" : "#666"}
              style={{ fontWeight: i === 1 ? 600 : 400 }}>{n.label}</text>
          </g>
        ))}
        <rect x="95" y="82" width="50" height="26" rx="13" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
        <text x="120" y="100" textAnchor="middle" className="svg-sub" fill="#888" style={{ fontWeight: 600 }}>+57%</text>
        <text x="160" y="210" textAnchor="middle" className="svg-tiny" fill="#555">フラミンガム研究 — 友人の友人の友人にまで伝染</text>
        <text x="160" y="235" textAnchor="middle" className="svg-sub" fill="#888">引越しだけで収入 +31%</text>
      </svg>
    </div>
  );
}

function SvgSociometer() {
  return (
    <div className="svg-wrap">
      <svg viewBox="0 0 320 280" className="diagram" aria-label="Sociometer comparison diagram">
        <g>
          <text x="80" y="30" textAnchor="middle" className="svg-label" fill="#cc4444">否定的環境</text>
          <rect x="30" y="45" width="100" height="120" rx="12" fill="#1a1a1a" stroke="#cc4444" strokeWidth="1" opacity="0.5" />
          <rect x="65" y="80" width="30" height="60" rx="4" fill="#222" />
          <rect x="65" y="120" width="30" height="20" rx="4" fill="#cc4444" opacity="0.5" />
          <text x="80" y="190" textAnchor="middle" className="svg-tiny" fill="#cc4444">自信 ▼</text>
        </g>
        <text x="160" y="110" textAnchor="middle" className="svg-big" fill="#444">→</text>
        <g>
          <text x="240" y="30" textAnchor="middle" className="svg-label" fill="#888">肯定的環境</text>
          <rect x="190" y="45" width="100" height="120" rx="12" fill="#1a1a1a" stroke="#555" strokeWidth="1" />
          <rect x="225" y="80" width="30" height="60" rx="4" fill="#222" />
          <rect x="225" y="80" width="30" height="50" rx="4" fill="#555" opacity="0.5" />
          <text x="240" y="190" textAnchor="middle" className="svg-tiny" fill="#888">自信 ▲</text>
        </g>
        <text x="160" y="240" textAnchor="middle" className="svg-sub" fill="#666">ソシオメーター理論（リアリー）</text>
        <text x="160" y="262" textAnchor="middle" className="svg-tiny" fill="#555">自信 = 集団からの受容度メーター</text>
      </svg>
    </div>
  );
}

function SvgTransition() {
  return (
    <div className="svg-wrap">
      <svg viewBox="0 0 320 280" className="diagram" aria-label="Environment transition diagram">
        <g>
          <circle cx="80" cy="120" r="50" fill="#1a1a1a" stroke="#444" strokeWidth="1.5" />
          <text x="80" y="115" textAnchor="middle" className="svg-sub" fill="#666">旧環境</text>
          <text x="80" y="135" textAnchor="middle" className="svg-tiny" fill="#555">固定された</text>
          <text x="80" y="148" textAnchor="middle" className="svg-tiny" fill="#555">パターン</text>
        </g>
        <line x1="135" y1="120" x2="185" y2="120" stroke="#555" strokeWidth="1.5" />
        <polygon points="183,115 193,120 183,125" fill="#555" />
        <text x="160" y="105" textAnchor="middle" className="svg-tiny" fill="#888">再構成</text>
        <g>
          <circle cx="240" cy="120" r="50" fill="#1a1a1a" stroke="#888" strokeWidth="1.5" />
          <text x="240" y="115" textAnchor="middle" className="svg-sub" fill="#888" style={{ fontWeight: 600 }}>新環境</text>
          <text x="240" y="135" textAnchor="middle" className="svg-tiny" fill="#666">新しい入力</text>
          <text x="240" y="148" textAnchor="middle" className="svg-tiny" fill="#666">新しい自分</text>
        </g>
        <text x="160" y="220" textAnchor="middle" className="svg-sub" fill="#888">脳の入力を変え、自分を再構成する</text>
        <text x="160" y="248" textAnchor="middle" className="svg-tiny" fill="#555">進化の設計に従う最も合理的な行為</text>
      </svg>
    </div>
  );
}

/* ─── Data ─── */
type SectionData = {
  num: string;
  heading: string;
  body: string[];
  point: string;
  Svg?: () => React.JSX.Element;
};

const sections: SectionData[] = [
  {
    num: "01",
    heading: "あなたは本当に「あなた」ですか？",
    body: [
      "転職したら性格が変わった。引っ越したら考え方が変わった。あの人と付き合い始めてから、趣味が変わった。こういう経験、ありませんか？",
      "私たちは「自分には確固たる性格がある」と信じています。でも進化心理学と神経科学は、驚くべき事実を示しています。",
    ],
    point: "あなたの性格は、あなたの周りにいる人によってつくられている。",
  },
  {
    num: "02",
    heading: "脳が巨大化した理由は、数学でも芸術でもなかった",
    body: [
      "脳は体重の2%なのにエネルギーの20%を消費する。なぜこれほどのコストを払うのか？",
      "ダンバーの答え：霊長類の脳の大きさは群れのサイズと比例する。人間関係処理のために大きくなった。その上限は約150人——ダンバー数と呼ばれている。",
    ],
    point: "脳の最大の仕事は「人間関係の処理」。",
    Svg: SvgBrainPie,
  },
  {
    num: "03",
    heading: "あなたの「キャラ」は、場面ごとに自動で切り替わっている",
    body: [
      "会社では真面目。友人の前ではお調子者。初対面では慎重。全部本当のあなたです。",
      "心理学者ミシェルが発見した「if-thenパターン」。状況が変わると脳が自動的に別の行動プログラムを起動する。同じ行動パターンを繰り返すと、予測されやすくなり、利用されやすくなる。",
    ],
    point: "「本当の自分」を探す必要はない。あなたは精巧なシステムそのもの。",
    Svg: SvgMasks,
  },
  {
    num: "04",
    heading: "「流されやすい」のは弱さじゃない。生存本能だ。",
    body: [
      "「流されるな」という助言は進化的に不自然。人間には2つの同調装置がある。",
      "①自動模倣——他者の行動を無意識にコピーする。②同調エラー検出——みんなと違う行動を「間違い」として検出する。どちらもオフにできない。",
    ],
    point: "影響されるのは性格の問題ではなく、生存ハードウェアの仕様。",
    Svg: SvgConsensus,
  },
  {
    num: "05",
    heading: "肥満も、幸福も、年収も「うつる」",
    body: [
      "フラミンガム研究の驚くべき発見：友人が肥満になると、自分の肥満リスクが57%上昇する。喫煙も、幸福感も同様に伝染する。しかも友人の友人の友人にまで。",
      "Moving to Opportunity実験では、低所得地域から中流地域への引越しだけで、子どもの将来の収入が31%上昇した。",
    ],
    point: "「空気」は比喩ではない。測定可能な力。",
    Svg: SvgContagion,
  },
  {
    num: "06",
    heading: "自信とは、自分への評価ではなく、集団からの受容度メーター",
    body: [
      "心理学者リアリーのソシオメーター理論。自信（自尊心）は「自分はこの集団に受け入れられているか」を測るゲージにすぎない。",
      "自信がない、とは「居場所が不安定」というアラームが鳴っている状態。入力源——つまり周囲の人間——を変えれば、ゲージは自然と上がる。",
    ],
    point: "自信を持ちたいなら、周囲を変えるのが先。",
    Svg: SvgSociometer,
  },
  {
    num: "07",
    heading: "「環境を変える」は逃げじゃない。最も合理的な自己変革だ。",
    body: [
      "あなたは「誰と過ごすか」でつくられている。これは弱さでも怠惰でもない。数百万年の進化が設計した仕様だ。",
      "環境を変えるとは、脳の入力を変え、自分自身を再構成する行為。進化の設計に従った、最も合理的な自己変革だ。",
    ],
    point: "自分を変えたいなら、自分の周りを変える。",
    Svg: SvgTransition,
  },
];

/* ─── Page Component ─── */
export default function PersonalityPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Noto+Sans+JP:wght@400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .pg {
          background: #111;
          color: #888;
          font-family: 'DM Sans', 'Noto Sans JP', sans-serif;
          font-weight: 400;
          line-height: 1.85;
          font-size: 15px;
          -webkit-font-smoothing: antialiased;
        }

        /* ─ Reveal ─ */
        .rv {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .rv.vis {
          opacity: 1;
          transform: translateY(0);
        }

        /* ─ Header ─ */
        .hdr {
          padding: 140px 24px 80px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hdr-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 28px;
        }
        .hdr-title {
          font-family: 'DM Sans', 'Noto Sans JP', sans-serif;
          font-size: 42px;
          font-weight: 600;
          line-height: 1.4;
          letter-spacing: -0.02em;
          max-width: 680px;
          margin-bottom: 24px;
          color: #eee;
        }
        .hdr-lead {
          max-width: 520px;
          font-size: 15px;
          color: #666;
          line-height: 1.9;
        }

        /* ─ Sections ─ */
        .sec-divider {
          max-width: 1000px;
          margin: 0 auto;
          height: 1px;
          background: #2a2a2a;
        }
        .sec {
          max-width: 1000px;
          margin: 0 auto;
          padding: 80px 24px;
        }
        .sec-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
        }
        .sec-inner.text-only {
          grid-template-columns: 1fr;
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }
        .sec-num {
          font-family: 'DM Sans', monospace;
          font-size: 11px;
          font-weight: 500;
          color: #333;
          margin-bottom: 12px;
          letter-spacing: 1px;
        }
        .sec-h {
          font-family: 'DM Sans', 'Noto Sans JP', sans-serif;
          font-size: 22px;
          font-weight: 600;
          line-height: 1.5;
          color: #eee;
          margin-bottom: 20px;
        }
        .sec-body p {
          margin-bottom: 14px;
          color: #888;
        }

        /* ─ Point box ─ */
        .pt {
          margin-top: 8px;
          padding: 16px 20px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
        }
        .pt-text {
          font-size: 15px;
          font-weight: 500;
          color: #eee;
          line-height: 1.7;
        }

        /* ─ SVG container ─ */
        .svg-wrap {
          background: #161616;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 24px;
        }
        .diagram {
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
          display: block;
        }
        .svg-big { font-family: 'DM Sans', sans-serif; font-size: 36px; font-weight: 600; }
        .svg-label { font-family: 'DM Sans', 'Noto Sans JP', sans-serif; font-size: 13px; font-weight: 500; }
        .svg-sub { font-family: 'DM Sans', 'Noto Sans JP', sans-serif; font-size: 12px; font-weight: 400; }
        .svg-tiny { font-family: 'DM Sans', 'Noto Sans JP', sans-serif; font-size: 10px; font-weight: 400; }
        .svg-icon { font-size: 28px; }

        /* ─ Footer ─ */
        .ft {
          text-align: center;
          padding: 120px 24px 60px;
          font-size: 11px;
          color: #333;
        }

        /* ─ Responsive ─ */
        @media (max-width: 768px) {
          .hdr { padding: 100px 20px 60px; }
          .hdr-title { font-size: 32px; }
          .sec-inner { grid-template-columns: 1fr; gap: 40px; }
          .sec { padding: 60px 20px; }
        }
      `}</style>

      <div className="pg">
        <Header />
        {sections.map((s, i) => (
          <div key={s.num}>
            <div className="sec-divider" />
            <Section data={s} flip={i % 2 === 1} />
          </div>
        ))}
        <div className="sec-divider" />
        <footer className="ft">Built with Claude Code</footer>
      </div>
    </>
  );
}

function Header() {
  const { ref, ok } = useReveal(0.1);
  return (
    <header className="hdr" ref={ref}>
      <R ok={ok} d={0}><p className="hdr-label">Evolutionary Psychology</p></R>
      <R ok={ok} d={150}><h1 className="hdr-title">「環境を変える」は逃げじゃない。<br />最も合理的な自己変革だ。</h1></R>
      <R ok={ok} d={300}><p className="hdr-lead">進化心理学と神経科学が示す事実——あなたの性格・自信・行動は、周囲の人間によってつくられている。なぜそう言えるのか。7つの科学的根拠で解説する。</p></R>
    </header>
  );
}

function Section({ data, flip }: { data: SectionData; flip: boolean }) {
  const { ref, ok } = useReveal();
  const isTextOnly = !data.Svg;

  const textBlock = (
    <div>
      <R ok={ok} d={0}><p className="sec-num">{data.num}</p></R>
      <R ok={ok} d={80}><h2 className="sec-h">{data.heading}</h2></R>
      <div className="sec-body">
        {data.body.map((p, i) => (
          <R ok={ok} d={160 + i * 80} key={i}><p>{p}</p></R>
        ))}
      </div>
      <R ok={ok} d={320}>
        <div className="pt">
          <p className="pt-text">{data.point}</p>
        </div>
      </R>
    </div>
  );

  const svgBlock = data.Svg ? (
    <R ok={ok} d={200}>
      <data.Svg />
    </R>
  ) : null;

  return (
    <section className="sec" ref={ref}>
      <div className={`sec-inner${isTextOnly ? " text-only" : ""}`}>
        {isTextOnly ? (
          textBlock
        ) : flip ? (
          <>{textBlock}{svgBlock}</>
        ) : (
          <>{svgBlock}{textBlock}</>
        )}
      </div>
    </section>
  );
}
