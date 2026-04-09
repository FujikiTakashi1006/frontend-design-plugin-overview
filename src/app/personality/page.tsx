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

/* ─── Section 01: 導入 ─── */
function Section01() {
  const { ref, ok } = useReveal();
  return (
    <section className="section" ref={ref}>
      <R ok={ok} d={0}><p className="section-number">01</p></R>
      <R ok={ok} d={80}><h2 className="section-heading">あなたは本当に<br />「あなた」ですか？</h2></R>
      <div className="section-body">
        <R ok={ok} d={160}><p>転職したら性格が変わった。引っ越したら考え方が変わった。あの人と付き合い始めてから、趣味が変わった。</p></R>
        <R ok={ok} d={200}><p>こういう経験、ありませんか？</p></R>
        <R ok={ok} d={240}><p>私たちは「自分には確固たる性格がある」と信じています。でも、こんなにコロコロ変わるものを「自分の性格」と呼んでいいのでしょうか。</p></R>
        <R ok={ok} d={280}><p>実は、進化心理学や神経科学の研究は、驚くべきことを示しています。</p></R>
      </div>
      <R ok={ok} d={360}>
        <div className="section-point">
          <p>あなたの性格は、あなたの周りにいる人によってつくられている。</p>
        </div>
      </R>
    </section>
  );
}

/* ─── Section 02: 社会脳 ─── */
function Section02() {
  const { ref, ok } = useReveal();
  return (
    <section className="section" ref={ref}>
      <R ok={ok} d={0}><p className="section-number">02</p></R>
      <R ok={ok} d={80}><h2 className="section-heading">脳が巨大化した理由は、<br />数学でも芸術でもなかった</h2></R>
      <R ok={ok} d={160}>
        <div className={`svg-container svg-animate ${ok ? 'visible' : ''}`}>
          <svg viewBox="0 0 200 160" role="img" aria-label="社会脳仮説：脳のシルエットの周囲に人々のドットが広がり、ダンバー数150を示す">
            <path className="brain-outline" d="M70,80 C70,50 85,35 100,35 C115,35 130,50 130,80 C130,100 120,115 100,115 C80,115 70,100 70,80Z" />
            <path className="brain-fill" d="M70,80 C70,50 85,35 100,35 C115,35 130,50 130,80 C130,100 120,115 100,115 C80,115 70,100 70,80Z" />
            <circle className="group-circle g1" cx={100} cy={80} r={35} />
            <circle className="group-circle g2" cx={100} cy={80} r={50} />
            <circle className="group-circle g3" cx={100} cy={80} r={65} />
            {[[72,55],[128,55],[60,80],[140,80],[55,105],[145,105],[42,65],[158,65]].map(([cx,cy], i) => (
              <circle key={i} className={`person-dot d${i+1}`} cx={cx} cy={cy} r={i < 4 ? 2.5 : i < 6 ? 2 : 1.5} />
            ))}
            <text className="num-150" x={100} y={148} textAnchor="middle">150</text>
          </svg>
        </div>
      </R>
      <div className="section-body">
        <R ok={ok} d={240}><p>人間の脳は体重の2%しかないのに、エネルギーの20%を消費します。これほどコストの高い臓器が進化で残ったのは、それだけの「見返り」があったからです。</p></R>
        <R ok={ok} d={280}><p>では何のために？</p></R>
        <R ok={ok} d={320}><p>長い間「道具を作るため」「狩りをするため」と考えられてきました。しかし人類学者ロビン・ダンバーの研究（社会脳仮説）は、別の答えを示しました。</p></R>
        <R ok={ok} d={360}><p><strong>霊長類の脳の大きさは、群れのサイズと比例する。</strong></p></R>
        <R ok={ok} d={400}><p>つまり脳は、複雑な人間関係を処理するために大きくなった。誰が味方で、誰が敵か。誰に恩を売り、誰から恩を返してもらうか。この「社会的な計算」こそが、脳の本来の仕事です。</p></R>
        <R ok={ok} d={440}><p>人間の場合、安定的に関係を維持できる人数は約150人（ダンバー数）。私たちの脳は、この150人の関係をナビゲートするために最適化されたコンピュータなのです。</p></R>
      </div>
      <R ok={ok} d={520}>
        <div className="section-point">
          <p>脳の最大の仕事は、思考でも創造でもなく「人間関係の処理」。あなたの脳のリソースの大部分は、今この瞬間も「周りの人」に使われています。</p>
        </div>
      </R>
    </section>
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

      <section className="hero">
        <p className="hero-label" style={{ opacity: 0, animation: 'fadeUp 0.8s ease 0.3s forwards' }}>
          Evolutionary Psychology
        </p>
        <h1 className="hero-title" style={{ opacity: 0, animation: 'fadeUp 0.8s ease 0.5s forwards' }}>
          あなたの性格は、あなたが<br /><em>「選んだもの」</em>じゃない。
        </h1>
        <p className="hero-subtitle" style={{ opacity: 0, animation: 'fadeUp 0.8s ease 0.7s forwards' }}>
          進化心理学と神経科学が明かす、<br />「自分」をつくる本当のメカニズム
        </p>
        <div className="divider" style={{ opacity: 0, animation: 'fadeUp 0.8s ease 1.1s forwards' }} />
        <div className="hero-svg-container" style={{ opacity: 0, animation: 'fadeUp 0.8s ease 0.9s forwards' }}>
          <svg viewBox="0 0 400 250" role="img" aria-label="社会的ネットワーク図：中心の人物から周囲の人々へ接続が広がる">
            {/* Connection lines */}
            {[
              [200,125,120,60], [200,125,280,60], [200,125,100,150],
              [200,125,300,150], [200,125,140,200], [200,125,260,200],
              [120,60,280,60], [100,150,140,200], [300,150,260,200], [120,60,100,150]
            ].map(([x1,y1,x2,y2], i) => (
              <line key={i} className="connection" x1={x1} y1={y1} x2={x2} y2={y2}
                style={{ animationDelay: `${1.2 + i * 0.2}s` }} />
            ))}
            {/* Pulse rings */}
            {[0, 1, 2].map(i => (
              <circle key={i} className="pulse" cx={200} cy={125} r={4}
                style={{ animationDelay: `${i}s` }} />
            ))}
            {/* Center node */}
            <circle cx={200} cy={125} r={8} fill="var(--accent)" opacity={0.9} />
            {/* Surrounding nodes */}
            {[[120,60],[280,60],[100,150],[300,150],[140,200],[260,200]].map(([cx,cy], i) => (
              <circle key={i} className="node-appear" cx={cx} cy={cy} r={5}
                fill="var(--accent)" style={{ animationDelay: `${1.0 + i * 0.1}s` }} />
            ))}
            {/* Outer nodes (friends of friends) */}
            {[[60,30],[340,30],[50,190]].map(([cx,cy], i) => (
              <circle key={i} className="node-appear" cx={cx} cy={cy} r={3}
                fill="var(--accent)" opacity={0.3} style={{ animationDelay: `${1.6 + i * 0.1}s` }} />
            ))}
          </svg>
        </div>
        <div className="scroll-indicator" style={{ opacity: 0, animation: 'fadeUp 0.8s ease 1.5s forwards' }}>
          <span style={{ fontSize: 11, letterSpacing: 2, color: 'var(--muted)', textTransform: 'uppercase' as const, fontFamily: "'Cormorant Garamond', serif" }}>
            Scroll
          </span>
          <div className="scroll-line" />
        </div>
      </section>

      <Section01 />
      <Section02 />
    </main>
  );
}
