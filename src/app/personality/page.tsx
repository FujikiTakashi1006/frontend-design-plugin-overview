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

/* ─── Section 01: 導入 (テキストのみ) ─── */
function Section01() {
  const { ref, ok } = useReveal();
  return (
    <section className="section" ref={ref} style={{ maxWidth: 700 }}>
      <R ok={ok} d={0}><p className="section-number">01</p></R>
      <R ok={ok} d={80}><h2 className="section-heading">あなたは本当に「あなた」ですか？</h2></R>
      <div className="section-body">
        <R ok={ok} d={160}><p>転職したら性格が変わった。引っ越したら考え方が変わった。あの人と付き合い始めてから、趣味が変わった。こういう経験、ありませんか？</p></R>
        <R ok={ok} d={200}><p>私たちは「自分には確固たる性格がある」と信じています。でも進化心理学と神経科学は、驚くべき事実を示しています。</p></R>
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
      <div className="section-header">
        <R ok={ok} d={0}><p className="section-number">02</p></R>
        <R ok={ok} d={80}><h2 className="section-heading">脳が巨大化した理由は、数学でも芸術でもなかった</h2></R>
      </div>
      <div className="section-layout">
        <R ok={ok} d={160}>
          <div className="section-visual">
            <div className={`svg-container svg-animate ${ok ? 'visible' : ''}`}>
              <svg viewBox="0 0 240 160" role="img" aria-label="社会脳仮説：脳のエネルギーの大半は人間関係の処理に使われている">
                {/* Brain shape (more realistic silhouette) */}
                <path className="brain-outline" d="M120,25 C135,25 155,30 160,50 C165,65 158,78 150,82 C155,90 155,105 145,115 C135,125 115,130 100,128 C85,130 70,125 60,115 C50,105 50,90 55,82 C47,78 40,65 45,50 C50,30 70,25 85,25 C90,22 95,20 100,20 C105,20 115,22 120,25Z" fill="var(--accent)" opacity={0.08} stroke="var(--accent-light)" strokeWidth={1.2} />
                {/* Pie chart inside brain showing 80% social */}
                <circle className="brain-pie-bg" cx={100} cy={75} r={25} fill="none" stroke="var(--border)" strokeWidth={8} />
                <circle className="brain-pie" cx={100} cy={75} r={25} fill="none" stroke="var(--accent)" strokeWidth={8} strokeDasharray="126" strokeDashoffset="25" strokeLinecap="round" />
                <text className="brain-pct" fontFamily="'Outfit',sans-serif" fontSize={14} fill="var(--accent)" x={100} y={80} textAnchor="middle">80%</text>
                {/* Labels */}
                <text className="brain-label-social" fontFamily="'Noto Sans JP',sans-serif" fontSize={7} fill="var(--accent)" x={100} y={115} textAnchor="middle">人間関係の処理</text>
                <text className="brain-label-other" fontFamily="'Noto Sans JP',sans-serif" fontSize={6} fill="var(--muted)" x={170} y={50} textAnchor="start">道具・狩り</text>
                <line x1={160} y1={50} x2={128} y2={60} stroke="var(--muted)" strokeWidth={0.5} />
                {/* Dunbar number */}
                <text className="num-150" fontFamily="'Outfit',sans-serif" fontSize={18} fill="var(--accent)" x={100} y={150} textAnchor="middle">≈ 150人</text>
                <text fontFamily="'Noto Sans JP',sans-serif" fontSize={6} fill="var(--muted)" x={100} y={160} textAnchor="middle">安定的に関係を維持できる人数</text>
              </svg>
            </div>
          </div>
        </R>
        <div className="section-text">
          <div className="section-body">
            <R ok={ok} d={240}><p>脳は体重の2%なのにエネルギーの20%を消費する。なぜこれほど巨大化したのか？</p></R>
            <R ok={ok} d={280}><p>人類学者ダンバーの答え：<strong>霊長類の脳の大きさは、群れのサイズと比例する。</strong>脳は道具や狩りではなく、人間関係を処理するために大きくなった。</p></R>
            <R ok={ok} d={320}><p>安定的に関係を維持できる上限は約150人（ダンバー数）。脳のリソースの大半は、今この瞬間も「周りの人」に使われている。</p></R>
          </div>
          <R ok={ok} d={520}>
            <div className="section-point">
              <p>脳の最大の仕事は、思考でも創造でもなく「人間関係の処理」。あなたの脳のリソースの大部分は、今この瞬間も「周りの人」に使われています。</p>
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 03: if-thenペルソナ ─── */
function Section03() {
  const { ref, ok } = useReveal();
  return (
    <section className="section" ref={ref}>
      <div className="section-header">
        <R ok={ok} d={0}><p className="section-number">03</p></R>
        <R ok={ok} d={80}><h2 className="section-heading">あなたの「キャラ」は、場面ごとに自動で切り替わっている</h2></R>
      </div>
      <div className="section-layout">
        <R ok={ok} d={160}>
          <div className="section-visual">
            <div className={`svg-container svg-animate ${ok ? 'visible' : ''}`}>
              <svg viewBox="0 0 200 140" role="img" aria-label="3つのペルソナマスク：上司の前では真面目、友人の前では笑顔、初対面では慎重">
                <g className="mask-group m1">
                  <circle className="mask-face" cx={40} cy={55} r={22} />
                  <line className="mask-expression" x1={32} y1={50} x2={37} y2={49} />
                  <line className="mask-expression" x1={43} y1={49} x2={48} y2={50} />
                  <line className="mask-expression" x1={34} y1={63} x2={46} y2={63} />
                  <text className="mask-label" x={40} y={88} textAnchor="middle">上司の前</text>
                </g>
                <g className="mask-group m2">
                  <circle className="mask-face" cx={100} cy={55} r={22} />
                  <circle cx={93} cy={50} r={2} fill="none" stroke="var(--accent)" strokeWidth={1.2} />
                  <circle cx={107} cy={50} r={2} fill="none" stroke="var(--accent)" strokeWidth={1.2} />
                  <path className="mask-expression" d="M91,60 Q100,70 109,60" />
                  <text className="mask-label" x={100} y={88} textAnchor="middle">友人の前</text>
                </g>
                <g className="mask-group m3">
                  <circle className="mask-face" cx={160} cy={55} r={22} />
                  <line className="mask-expression" x1={152} y1={50} x2={158} y2={50} />
                  <line className="mask-expression" x1={162} y1={50} x2={168} y2={50} />
                  <path className="mask-expression" d="M153,62 Q160,59 167,62" />
                  <text className="mask-label" x={160} y={88} textAnchor="middle">初対面</text>
                </g>
                <path className="arrow-switch" d="M65,55 L78,55" />
                <path className="arrow-switch" d="M125,55 L138,55" />
                <text className="ifthen-label" fontFamily="'Cormorant Garamond', serif" fontSize={10} fill="var(--accent)" x={100} y={120} textAnchor="middle">if → then</text>
              </svg>
            </div>
          </div>
        </R>
        <div className="section-text">
          <div className="section-body">
            <R ok={ok} d={240}><p>会社では真面目。友人の前ではお調子者。家族の前では甘えん坊。「どれが本当の自分？」——<strong>全部、本当のあなたです。</strong></p></R>
            <R ok={ok} d={280}><p>心理学者ミシェルは、性格を「if-thenパターンの集合体」として捉えた。上司の前では慎重に、仲間の前ではオープンに。脳が状況を読み取り、最適な行動プログラムを自動で起動している。</p></R>
            <R ok={ok} d={320}><p><strong>いつも同じ行動をする個体は、予測されやすく利用されやすい。</strong>柔軟な切り替えこそが進化的に有利な戦略だ（McNamara et al., 2009）。</p></R>
          </div>
          <R ok={ok} d={600}>
            <div className="section-point">
              <p>「本当の自分」を探す必要はありません。あなたは状況ごとに最適な戦略を自動選択する、精巧なシステムそのものです。</p>
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 04: 同調圧力 ─── */
function Section04() {
  const { ref, ok } = useReveal();
  return (
    <section className="section" ref={ref}>
      <div className="section-header">
        <R ok={ok} d={0}><p className="section-number">04</p></R>
        <R ok={ok} d={80}><h2 className="section-heading">「流されやすい」のは弱さじゃない。生存本能だ。</h2></R>
      </div>
      <div className="section-layout">
        <R ok={ok} d={160}>
          <div className="section-visual">
            <div className={`svg-container svg-animate ${ok ? 'visible' : ''}`}>
              <svg viewBox="0 0 260 160" role="img" aria-label="同調圧力：集団と同じ意見は安全、ズレると脳がエラーと判定する">
                {/* Group consensus box */}
                <rect className="conform-box" x={10} y={20} width={155} height={55} rx={8} fill="var(--accent)" opacity={0.06} stroke="var(--accent-light)" strokeWidth={1} />
                <text fontFamily="'Noto Sans JP',sans-serif" fontSize={8} fill="var(--accent)" x={87} y={15} textAnchor="middle">集団の多数派</text>
                {/* Consensus nodes */}
                {[30, 60, 90, 120, 145].map((x, i) => (
                  <g key={i} className="conform-person" style={{ animationDelay: `${0.3 + i * 0.12}s` }}>
                    <circle cx={x} cy={47} r={10} fill="var(--surface)" stroke="var(--accent)" strokeWidth={1.2} />
                    <text fontFamily="'Outfit',sans-serif" fontSize={12} fill="var(--accent)" x={x} y={51} textAnchor="middle">A</text>
                  </g>
                ))}
                {/* Outlier */}
                <g className="outlier-person">
                  <circle cx={215} cy={47} r={14} fill="var(--surface)" stroke="var(--error)" strokeWidth={1.5} />
                  <text fontFamily="'Outfit',sans-serif" fontSize={14} fill="var(--error)" x={215} y={52} textAnchor="middle">B</text>
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={7} fill="var(--muted)" x={215} y={18} textAnchor="middle">あなた</text>
                </g>
                {/* Error indicator next to B */}
                <text className="error-text" fontFamily="'Outfit',sans-serif" fontSize={16} fontWeight={700} fill="var(--error)" x={240} y={52} textAnchor="middle">!</text>
              </svg>
            </div>
          </div>
        </R>
        <div className="section-text">
          <div className="section-body">
            <R ok={ok} d={240}><p>「人に流されるな」は、進化的には非常に不自然な要求だ。集団から追放＝死だった時代が何万年も続いた結果、脳には2つの装置が組み込まれた。</p></R>
            <R ok={ok} d={280}><p><strong>①自動模倣システム：</strong>口癖、食生活、趣味——周囲の行動を無意識にコピーする。意志が弱いのではなく、脳が正常に動作しているだけ。</p></R>
            <R ok={ok} d={320}><p><strong>②同調エラー検出：</strong>自分の意見が多数派とズレると、脳は計算間違いと同じ「エラー」として処理する（Klucharev et al., 2009）。<strong>みんなと違うこと＝間違い。</strong></p></R>
            <R ok={ok} d={360}><p>この仕組みは意志の力でオフにできない。</p></R>
          </div>
          <R ok={ok} d={720}>
            <div className="section-point">
              <p>あなたが周りに影響されるのは、性格の問題ではありません。数万年の進化が組み込んだ、生存のためのハードウェアです。問題は「影響されること」ではなく、「何に影響されているか」です。</p>
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 05: 社会的伝染 ─── */
function Section05() {
  const { ref, ok } = useReveal();
  return (
    <section className="section" ref={ref}>
      <div className="section-header">
        <R ok={ok} d={0}><p className="section-number">05</p></R>
        <R ok={ok} d={80}><h2 className="section-heading">肥満も、幸福も、年収も「うつる」</h2></R>
      </div>
      <div className="section-layout">
        <R ok={ok} d={160}>
          <div className="section-visual">
            <div className={`svg-container svg-animate ${ok ? 'visible' : ''}`}>
              <svg viewBox="0 0 260 160" role="img" aria-label="社会的伝染：友人の状態が自分に伝染し、さらにその先の人にも広がる連鎖">
                {/* Person A: source */}
                <g className="contagion-src">
                  <circle cx={40} cy={55} r={16} fill="var(--accent)" opacity={0.15} stroke="var(--accent)" strokeWidth={1.2} />
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={9} fill="var(--accent)" x={40} y={59} textAnchor="middle">友人</text>
                </g>
                {/* Arrow A → You */}
                <path className="contagion-arrow a1" d="M60,55 L88,55" fill="none" stroke="var(--accent)" strokeWidth={1.5} markerEnd="url(#arrowhead)" />
                {/* You */}
                <g className="contagion-you">
                  <circle cx={115} cy={55} r={18} fill="var(--surface)" stroke="var(--accent)" strokeWidth={1.5} />
                  <circle className="contagion-fill-you" cx={115} cy={55} r={18} fill="var(--accent)" opacity={0} />
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={9} fill="var(--ink)" x={115} y={59} textAnchor="middle">あなた</text>
                </g>
                {/* Arrow You → B */}
                <path className="contagion-arrow a2" d="M137,55 L163,55" fill="none" stroke="var(--accent)" strokeWidth={1.5} markerEnd="url(#arrowhead)" />
                {/* Person B */}
                <g className="contagion-b">
                  <circle cx={185} cy={55} r={14} fill="var(--surface)" stroke="var(--accent-light)" strokeWidth={1.2} />
                  <circle className="contagion-fill-b" cx={185} cy={55} r={14} fill="var(--accent)" opacity={0} />
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={7} fill="var(--muted)" x={185} y={52} textAnchor="middle">友人の</text>
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={7} fill="var(--muted)" x={185} y={62} textAnchor="middle">友人</text>
                </g>
                {/* Arrow B → C */}
                <path className="contagion-arrow a3" d="M203,55 L223,55" fill="none" stroke="var(--accent-light)" strokeWidth={1} markerEnd="url(#arrowhead)" />
                {/* Person C */}
                <g className="contagion-c">
                  <circle cx={240} cy={55} r={10} fill="var(--surface)" stroke="var(--accent-light)" strokeWidth={0.8} opacity={0.5} />
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={6} fill="var(--muted)" x={240} y={58} textAnchor="middle" opacity={0.5}>...</text>
                </g>
                {/* Stats */}
                <text className="contagion-stat" fontFamily="'Outfit',sans-serif" fontSize={22} fill="var(--accent)" x={130} y={120} textAnchor="middle">+57%</text>
                <text className="contagion-stat-sub" fontFamily="'Noto Sans JP',sans-serif" fontSize={8} fill="var(--muted)" x={130} y={138} textAnchor="middle">友人が肥満 → 自分の肥満リスク上昇</text>
                <defs>
                  <marker id="arrowhead" markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto">
                    <path d="M0,0 L6,2 L0,4" fill="var(--accent)" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </R>
        <div className="section-text">
          <div className="section-body">
            <R ok={ok} d={240}><p>1万2000人を32年追跡したフラミンガム研究（2007, NEJM）の結果：<strong>友人が肥満になると、自分の肥満リスクが57%上がる。</strong>地理的に離れた友人でも同じ効果が出た。</p></R>
            <R ok={ok} d={280}><p>喫煙、幸福感、孤独感でも同様の伝染が確認されている。影響は「友人の友人の友人」にまで波及する。</p></R>
            <R ok={ok} d={320}><p>米政府の社会実験「Moving to Opportunity」では、貧困地域から低貧困地域に引っ越した家庭の子どもの収入が最大31%上昇した（Chetty et al., 2016）。ランダム割り当てのRCTで因果関係が確認済み。</p></R>
            <R ok={ok} d={360}><p>変わったのは「周りにいる人」だけ。<strong>ただ環境を変えただけで、人生の軌道が変わった。</strong></p></R>
          </div>
          <R ok={ok} d={640}>
            <div className="section-point">
              <p>「空気」は比喩ではありません。周囲の人間の行動・感情・価値観は、測定可能な力であなたに伝染しています。</p>
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 06: ソシオメーター ─── */
function Section06() {
  const { ref, ok } = useReveal();
  return (
    <section className="section" ref={ref}>
      <div className="section-header">
        <R ok={ok} d={0}><p className="section-number">06</p></R>
        <R ok={ok} d={80}><h2 className="section-heading">自信とは、自分への評価ではなく、集団からの受容度メーター</h2></R>
      </div>
      <div className="section-layout">
        <R ok={ok} d={160}>
          <div className="section-visual">
            <div className={`svg-container svg-animate ${ok ? 'visible' : ''}`}>
              <svg viewBox="0 0 260 150" role="img" aria-label="ソシオメーター：否定的な環境では自信が下がり、肯定的な環境では上がる">
                {/* Left scene: rejection */}
                <g className="socio-left">
                  <rect x={10} y={15} width={110} height={95} rx={8} fill="var(--error)" opacity={0.05} stroke="var(--error)" strokeWidth={1} />
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={7} fill="var(--error)" x={65} y={12} textAnchor="middle">否定的な環境</text>
                  {/* Rejecting circles */}
                  {[30, 65, 100].map((x, i) => (
                    <circle key={i} cx={x} cy={45} r={10} fill="var(--error)" opacity={0.12} stroke="var(--error)" strokeWidth={1} />
                  ))}
                  {/* Small "you" */}
                  <circle cx={65} cy={80} r={8} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1.2} />
                  {/* Down arrow (right of self) */}
                  <line x1={80} y1={74} x2={80} y2={88} stroke="var(--error)" strokeWidth={1.5} opacity={0.6} />
                  <path d="M75,83 L80,90 L85,83" fill="none" stroke="var(--error)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.6} />
                </g>
                {/* Arrow */}
                <path className="socio-divider" d="M125,60 L135,60" fill="none" stroke="var(--muted)" strokeWidth={1} />
                <text fontFamily="'Noto Sans JP',sans-serif" fontSize={6} fill="var(--muted)" x={130} y={75} textAnchor="middle">vs</text>
                {/* Right scene: acceptance */}
                <g className="socio-right">
                  <rect x={140} y={15} width={110} height={95} rx={8} fill="none" stroke="var(--accent)" strokeWidth={1} />
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={7} fill="var(--accent)" x={195} y={12} textAnchor="middle">肯定的な環境</text>
                  {/* Welcoming circles */}
                  {[160, 195, 230].map((x, i) => (
                    <circle key={i} cx={x} cy={45} r={10} fill="var(--accent)" opacity={0.1} stroke="var(--accent)" strokeWidth={1} />
                  ))}
                  {/* Big "you" */}
                  <circle cx={195} cy={80} r={12} fill="var(--surface)" stroke="var(--accent)" strokeWidth={1.5} />
                  {/* Up arrow (right of self) */}
                  <line x1={214} y1={88} x2={214} y2={74} stroke="var(--accent)" strokeWidth={1.5} />
                  <path d="M209,79 L214,72 L219,79" fill="none" stroke="var(--accent)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </g>
                {/* Bottom */}
                <text className="socio-bottom" fontFamily="'Noto Sans JP',sans-serif" fontSize={8} fill="var(--muted)" x={130} y={140} textAnchor="middle">自信 ＝ 周囲からの受容度メーター</text>
              </svg>
            </div>
          </div>
        </R>
        <div className="section-text">
          <div className="section-body">
            <R ok={ok} d={240}><p>心理学者リアリーのソシオメーター理論：<strong>自尊心とは、集団から受け入れられているかを測るゲージである。</strong></p></R>
            <R ok={ok} d={280}><p>「自信がない」の正体は、今いる環境で居場所が不安定だというアラート。ゲージが参照しているのは<strong>今、周囲にいる人間との関係</strong>だ。</p></R>
            <R ok={ok} d={320}><p>否定する人に囲まれればゲージは下がり続ける。どれだけ自己啓発をしても入力源が変わらなければ意味がない。逆に、対等に扱ってくれる人の中に入ればゲージは自然に上がる。</p></R>
          </div>
          <R ok={ok} d={600}>
            <div className="section-point">
              <p>自信を持ちたいなら、自分の内面ではなく、自分の周囲を変えるのが先です。</p>
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 07: ネットワーク再構成 ─── */
function Section07() {
  const { ref, ok } = useReveal();
  return (
    <section className="section" ref={ref}>
      <div className="section-header">
        <R ok={ok} d={0}><p className="section-number">07</p></R>
        <R ok={ok} d={80}><h2 className="section-heading">「環境を変える」は逃げじゃない。最も合理的な自己変革だ。</h2></R>
      </div>
      <div className="section-layout">
        <R ok={ok} d={160}>
          <div className="section-visual">
            <div className={`svg-container svg-animate ${ok ? 'visible' : ''}`}>
              <svg viewBox="0 0 260 140" role="img" aria-label="環境を変える＝自分を変える：周囲の入力が変われば出力（行動・自信）も変わる">
                {/* Left: old environment */}
                <g className="env-old">
                  <rect x={10} y={15} width={95} height={90} rx={8} fill="var(--border)" opacity={0.15} stroke="var(--border)" strokeWidth={1} />
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={7} fill="var(--muted)" x={57} y={12} textAnchor="middle">現在の環境</text>
                  {[30, 57, 84].map((x, i) => (
                    <circle key={i} cx={x} cy={45} r={9} fill="var(--border)" opacity={0.25} stroke="var(--border)" strokeWidth={1} />
                  ))}
                  <circle cx={57} cy={78} r={10} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1.2} />
                </g>
                {/* Arrow */}
                <g className="env-arrow">
                  <path d="M112,60 L148,60" fill="none" stroke="var(--accent)" strokeWidth={2} markerEnd="url(#arrowhead2)" />
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={7} fill="var(--accent)" x={130} y={52} textAnchor="middle">変える</text>
                </g>
                {/* Right: new environment */}
                <g className="env-new">
                  <rect x={155} y={15} width={95} height={90} rx={8} fill="var(--accent)" opacity={0.06} stroke="var(--accent)" strokeWidth={1.2} />
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={7} fill="var(--accent)" x={202} y={12} textAnchor="middle">新しい環境</text>
                  {[175, 202, 229].map((x, i) => (
                    <circle key={i} cx={x} cy={45} r={9} fill="var(--accent)" opacity={0.12} stroke="var(--accent)" strokeWidth={1} />
                  ))}
                  <circle cx={202} cy={78} r={12} fill="var(--surface)" stroke="var(--accent)" strokeWidth={1.5} />
                </g>
                {/* Bottom */}
                <text className="env-bottom" fontFamily="'Noto Sans JP',sans-serif" fontSize={9} fontWeight={500} fill="var(--accent)" x={130} y={130} textAnchor="middle">周りを変える ＝ 自分が変わる</text>
                <defs>
                  <marker id="arrowhead2" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
                    <path d="M0,0 L8,3 L0,6" fill="var(--accent)" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </R>
        <div className="section-text">
          <div className="section-body">
            <R ok={ok} d={240}><p><strong>あなたは「誰と過ごすか」でつくられている。</strong>脳の構造、性格の切り替え、同調本能、社会的伝染、自尊心のメカニズム——すべてがこの事実を指し示している。</p></R>
            <R ok={ok} d={280}><p>挑戦を続ける人の近くに身を置くことは「刺激をもらう」という軽い話ではない。脳の入力を変え、行動戦略の基準線を書き換え、<strong>自分自身を再構成する行為</strong>だ。</p></R>
            <R ok={ok} d={320}><p>意志の力で内面を変えようとするのは、進化の設計に逆らうこと。脳は外部の社会的入力に応じて自分を調整するように作られている。その設計に素直に従おう。</p></R>
          </div>
          <R ok={ok} d={680}>
            <div className="section-point">
              <p>自分を変えたいなら、自分の周りを変える。それが、数万年の進化が教えてくれる最もシンプルな戦略です。</p>
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function PersonalityPage() {
  return (
    <main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;700&display=swap');

        :root {
          --bg: #09090b;
          --surface: #18181b;
          --border: #27272a;
          --accent: #e2a067;
          --accent-light: #c97b3a;
          --muted: #71717a;
          --ink: #fafafa;
          --body: #a1a1aa;
          --sub: #71717a;
          --error: #f87171;
        }

        body {
          background: var(--bg);
          background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px);
          background-size: 24px 24px;
          font-family: 'Noto Sans JP', sans-serif;
          color: var(--body);
        }

        /* ─── Page Header ─── */
        .page-header {
          max-width: 860px;
          margin: 0 auto;
          padding: 120px 40px 80px;
          text-align: center;
          position: relative;
        }
        .page-header::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(226,160,103,0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .page-header > * { position: relative; z-index: 1; }
        .page-label {
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 24px;
          display: inline-block;
          background: rgba(226, 160, 103, 0.1);
          padding: 6px 16px;
          border-radius: 100px;
        }
        .page-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(32px, 6vw, 60px);
          font-weight: 700;
          line-height: 1.3;
          color: var(--ink);
          margin-bottom: 24px;
          letter-spacing: -0.03em;
        }
        .page-title em {
          font-style: normal;
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .page-lead {
          font-size: clamp(14px, 1.8vw, 16px);
          font-weight: 300;
          color: var(--sub);
          line-height: 1.9;
          max-width: 580px;
          margin: 0 auto;
        }

        /* ─── Animations ─── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ─── Sections ─── */
        .section {
          max-width: 1060px;
          margin: 0 auto;
          padding: 64px 40px;
          border-top: 1px solid var(--border);
        }
        .section-header {
          margin-bottom: 32px;
          position: relative;
        }
        .section-number {
          font-family: 'Outfit', sans-serif;
          font-size: 48px;
          font-weight: 700;
          color: var(--ink);
          opacity: 0.06;
          position: absolute;
          top: -18px;
          left: -4px;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          pointer-events: none;
        }
        .section-heading {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(18px, 2.5vw, 24px);
          font-weight: 600;
          color: var(--ink);
          line-height: 1.5;
          margin-bottom: 0;
          letter-spacing: -0.01em;
          position: relative;
        }
        /* 横並び */
        .section-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .section-visual {
          position: sticky;
          top: 80px;
          background: rgba(24,24,27,0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(226,160,103,0.12);
          border-radius: 16px;
          padding: 28px;
          transition: border-color 0.3s ease;
        }
        .section-visual:hover {
          border-color: rgba(226,160,103,0.3);
        }
        .section-body {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.9;
          color: var(--body);
        }
        .section-body p {
          margin-bottom: 1.3em;
        }
        .section-body strong {
          font-weight: 500;
          color: var(--ink);
        }
        .section-point {
          margin: 24px 0 0;
          padding: 20px 24px 20px 28px;
          background: radial-gradient(ellipse at 10% 50%, rgba(226,160,103,0.06) 0%, rgba(24,24,27,0.8) 70%);
          border: 1px solid rgba(226,160,103,0.15);
          border-left: 4px solid;
          border-image: linear-gradient(180deg, var(--accent), var(--accent-light)) 1;
          border-radius: 0 12px 12px 0;
          box-shadow: inset 0 0 30px rgba(226,160,103,0.03);
        }
        .section-point p {
          font-size: 16px;
          font-weight: 500;
          color: var(--ink);
          line-height: 1.8;
          margin: 0;
        }

        /* ─── Keyframes ─── */
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
          max-width: 100%;
          margin: 0 auto;
        }
        .svg-animate * {
          animation-play-state: paused;
        }
        .svg-animate.visible * {
          animation-play-state: running;
        }


        /* ─── Section 02 SVG Classes ─── */
        .brain-pie-bg { opacity: 0; }
        .svg-animate.visible .brain-pie-bg { animation: fadeIn 0.6s ease 0.5s forwards; }
        .brain-pie { opacity: 0; stroke-dashoffset: 126; }
        .svg-animate.visible .brain-pie { animation: pieReveal 1.5s ease 1s forwards; }
        @keyframes pieReveal { to { opacity: 1; stroke-dashoffset: 25; } }
        .brain-pct { opacity: 0; }
        .svg-animate.visible .brain-pct { animation: fadeIn 0.6s ease 2s forwards; }
        .brain-label-social { opacity: 0; }
        .svg-animate.visible .brain-label-social { animation: fadeIn 0.6s ease 2.2s forwards; }
        .brain-label-other { opacity: 0; }
        .svg-animate.visible .brain-label-other { animation: fadeIn 0.6s ease 1.5s forwards; }
        .num-150 { opacity: 0; }
        .svg-animate.visible .num-150 { animation: fadeIn 0.8s ease 2.5s forwards; }

        /* ─── Section 03 SVG Classes ─── */
        .mask-face { stroke: var(--accent-light); stroke-width: 1.2; fill: none; }
        .mask-expression { stroke: var(--accent); stroke-width: 1.5; fill: none; stroke-linecap: round; }
        .mask-label { font-family: 'Noto Sans JP', sans-serif; font-size: 8px; fill: var(--muted); }
        .mask-group { opacity: 0; }
        .svg-animate.visible .mask-group.m1 { animation: maskIn 0.8s ease 0.5s forwards; }
        .svg-animate.visible .mask-group.m2 { animation: maskIn 0.8s ease 1.2s forwards; }
        .svg-animate.visible .mask-group.m3 { animation: maskIn 0.8s ease 1.9s forwards; }
        @keyframes maskIn { to { opacity: 1; } }
        .arrow-switch { stroke: var(--accent-light); stroke-width: 0.8; fill: none; stroke-dasharray: 4 3; opacity: 0; }
        .svg-animate.visible .arrow-switch { animation: arrowIn 0.6s ease 2.5s forwards; }
        @keyframes arrowIn { to { opacity: 0.6; } }
        .ifthen-label { opacity: 0; }
        .svg-animate.visible .ifthen-label { animation: fadeIn 0.8s ease 2.8s forwards; }

        /* ─── Section 04 SVG Classes ─── */
        .conform-box { opacity: 0; }
        .svg-animate.visible .conform-box { animation: fadeIn 0.6s ease 0.2s forwards; }
        .conform-person { opacity: 0; }
        .svg-animate.visible .conform-person { animation: fadeIn 0.5s ease forwards; }
        .outlier-person { opacity: 0; }
        .svg-animate.visible .outlier-person { animation: fadeIn 0.6s ease 1s forwards; }
        .error-zone { opacity: 0; }
        .svg-animate.visible .error-zone { animation: fadeIn 0.6s ease 1.6s forwards; }
        .error-signal { stroke: var(--error); stroke-width: 1.2; fill: none; opacity: 0; }
        .svg-animate.visible .error-signal { animation: errorPulse 1.5s ease 1.8s infinite; }
        @keyframes errorPulse { 0%,100% { opacity: 0.2; } 50% { opacity: 0.7; } }
        .error-text { fill: var(--error); opacity: 0; }
        .svg-animate.visible .error-text { animation: fadeIn 0.5s ease 1.8s forwards; }
        .error-label { opacity: 0; }
        .svg-animate.visible .error-label { animation: fadeIn 0.6s ease 2s forwards; }
        .error-arrow { opacity: 0; }
        .svg-animate.visible .error-arrow { animation: fadeIn 0.5s ease 1.4s forwards; }

        /* ─── Section 05 SVG Classes ─── */
        .contagion-src { opacity: 0; }
        .svg-animate.visible .contagion-src { animation: fadeIn 0.6s ease 0.3s forwards; }
        .contagion-arrow { opacity: 0; stroke-dasharray: 30; stroke-dashoffset: 30; }
        .svg-animate.visible .contagion-arrow.a1 { animation: drawArrow 0.6s ease 0.8s forwards; }
        .svg-animate.visible .contagion-arrow.a2 { animation: drawArrow 0.6s ease 1.8s forwards; }
        .svg-animate.visible .contagion-arrow.a3 { animation: drawArrow 0.6s ease 2.8s forwards; }
        @keyframes drawArrow { to { opacity: 0.7; stroke-dashoffset: 0; } }
        .contagion-you { opacity: 0; }
        .svg-animate.visible .contagion-you { animation: fadeIn 0.5s ease 0.5s forwards; }
        .contagion-fill-you { opacity: 0; }
        .svg-animate.visible .contagion-fill-you { animation: fillIn 0.8s ease 1.4s forwards; }
        @keyframes fillIn { to { opacity: 0.3; } }
        .contagion-b { opacity: 0; }
        .svg-animate.visible .contagion-b { animation: fadeIn 0.5s ease 1.6s forwards; }
        .contagion-fill-b { opacity: 0; }
        .svg-animate.visible .contagion-fill-b { animation: fillIn 0.8s ease 2.4s forwards; }
        .contagion-c { opacity: 0; }
        .svg-animate.visible .contagion-c { animation: fadeIn 0.5s ease 2.6s forwards; }
        .contagion-stat { opacity: 0; }
        .svg-animate.visible .contagion-stat { animation: fadeIn 0.8s ease 1.6s forwards; }
        .contagion-stat-sub { opacity: 0; }
        .svg-animate.visible .contagion-stat-sub { animation: fadeIn 0.6s ease 2s forwards; }

        /* ─── Section 06 SVG Classes ─── */
        .socio-left { opacity: 0; }
        .svg-animate.visible .socio-left { animation: fadeIn 0.8s ease 0.3s forwards; }
        .socio-divider { opacity: 0; }
        .svg-animate.visible .socio-divider { animation: fadeIn 0.6s ease 0.8s forwards; }
        .socio-right { opacity: 0; }
        .svg-animate.visible .socio-right { animation: fadeIn 0.8s ease 1.2s forwards; }
        .socio-bottom { opacity: 0; }
        .svg-animate.visible .socio-bottom { animation: fadeIn 0.6s ease 2s forwards; }

        /* ─── Section 07 SVG Classes ─── */
        .env-old { opacity: 0; }
        .svg-animate.visible .env-old { animation: fadeIn 0.8s ease 0.3s forwards; }
        .env-arrow { opacity: 0; }
        .svg-animate.visible .env-arrow { animation: fadeIn 0.6s ease 1s forwards; }
        .env-new { opacity: 0; }
        .svg-animate.visible .env-new { animation: fadeIn 0.8s ease 1.5s forwards; }
        .env-bottom { opacity: 0; }
        .svg-animate.visible .env-bottom { animation: fadeIn 0.6s ease 2.2s forwards; }

        .footer { text-align: center; padding: 64px 24px 48px; border-top: 1px solid var(--border); }
        .footer p { font-family: 'Noto Sans JP', sans-serif; font-size: 11px; color: var(--muted); letter-spacing: 1px; }

        /* ─── Responsive ─── */
        @media (max-width: 860px) {
          .section-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .section-visual {
            position: static;
            max-width: 420px;
            margin: 0 auto;
          }
          .section { padding: 48px 20px; }
          .section-header { }
          .page-header { padding: 80px 20px 48px; }
        }
      `}</style>

      <header className="page-header">
        <p className="page-label" style={{ opacity: 0, animation: 'fadeUp 0.8s ease 0.2s forwards' }}>Evolutionary Psychology</p>
        <h1 className="page-title" style={{ opacity: 0, animation: 'fadeUp 0.8s ease 0.4s forwards' }}>
          「環境を変える」は逃げじゃない。<br />最も合理的な<em>自己変革</em>だ。
        </h1>
        <p className="page-lead" style={{ opacity: 0, animation: 'fadeUp 0.8s ease 0.6s forwards' }}>
          進化心理学と神経科学が示す事実——あなたの性格・自信・行動は、周囲の人間によってつくられている。<br />
          なぜそう言えるのか。7つの科学的根拠で解説する。
        </p>
      </header>

      <Section01 />
      <Section02 />
      <Section03 />
      <Section04 />
      <Section05 />
      <Section06 />
      <Section07 />
      <footer className="footer">
        <p>Built with Claude Code</p>
      </footer>
    </main>
  );
}
