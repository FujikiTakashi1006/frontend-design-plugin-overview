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
    <section className="section" ref={ref} style={{ maxWidth: 680 }}>
      <R ok={ok} d={0}><p className="section-number">01</p></R>
      <R ok={ok} d={80}><h2 className="section-heading">あなたは本当に「あなた」ですか？</h2></R>
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
                {/* Center divider (brain hemispheres) */}
                <path d="M100,25 C102,50 98,80 100,125" fill="none" stroke="var(--accent-light)" strokeWidth={0.6} opacity={0.4} />
                {/* Pie chart inside brain showing 80% social */}
                <circle className="brain-pie-bg" cx={100} cy={75} r={25} fill="none" stroke="var(--border)" strokeWidth={8} />
                <circle className="brain-pie" cx={100} cy={75} r={25} fill="none" stroke="var(--accent)" strokeWidth={8} strokeDasharray="126" strokeDashoffset="25" strokeLinecap="round" />
                <text className="brain-pct" fontFamily="'Cormorant Garamond',serif" fontSize={14} fill="var(--accent)" x={100} y={80} textAnchor="middle">80%</text>
                {/* Labels */}
                <text className="brain-label-social" fontFamily="'Noto Sans JP',sans-serif" fontSize={7} fill="var(--accent)" x={100} y={115} textAnchor="middle">人間関係の処理</text>
                <text className="brain-label-other" fontFamily="'Noto Sans JP',sans-serif" fontSize={6} fill="var(--muted)" x={170} y={50} textAnchor="start">道具・狩り</text>
                <line x1={160} y1={50} x2={128} y2={60} stroke="var(--muted)" strokeWidth={0.5} />
                {/* Dunbar number */}
                <text className="num-150" fontFamily="'Cormorant Garamond',serif" fontSize={18} fill="var(--accent)" x={100} y={150} textAnchor="middle">≈ 150人</text>
                <text fontFamily="'Noto Sans JP',sans-serif" fontSize={6} fill="var(--muted)" x={100} y={160} textAnchor="middle">安定的に関係を維持できる人数</text>
              </svg>
            </div>
          </div>
        </R>
        <div className="section-text">
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
            <R ok={ok} d={240}><p>会社では真面目で寡黙。友人の前ではよくしゃべるお調子者。家族の前では甘えん坊。</p></R>
            <R ok={ok} d={280}><p>「どれが本当の自分？」と悩んだことはありませんか？ 進化心理学の答えはシンプルです。</p></R>
            <R ok={ok} d={320}><p><strong>全部、本当のあなたです。</strong></p></R>
            <R ok={ok} d={360}><p>心理学者ウォルター・ミシェルの研究は、性格を「一貫した特性」ではなく、「この状況ではこう振る舞う」というif-thenパターンの集合体として捉えました。</p></R>
            <R ok={ok} d={400}><p>上司の前では慎重に → 生存戦略（権力者に逆らうリスクの回避）<br />気の合う仲間の前ではオープンに → 同盟強化の戦略<br />初対面の人には様子見 → 情報収集の戦略</p></R>
            <R ok={ok} d={440}><p>これらは意識的に演じ分けているのではありません。脳が社会的状況を自動で読み取り、最適な行動プログラムを起動しているのです。</p></R>
            <R ok={ok} d={480}><p>進化生物学では、こうした柔軟な切り替えが「固定された性格」よりも有利であることがゲーム理論のモデルでも証明されています（McNamara et al., 2009）。</p></R>
            <R ok={ok} d={520}><p>なぜなら、<strong>いつも同じ行動をする個体は、予測されやすく、利用されやすい</strong>から。</p></R>
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
                    <text fontFamily="'Cormorant Garamond',serif" fontSize={12} fill="var(--accent)" x={x} y={51} textAnchor="middle">A</text>
                  </g>
                ))}
                {/* Outlier */}
                <g className="outlier-person">
                  <circle cx={215} cy={47} r={14} fill="var(--surface)" stroke="var(--error)" strokeWidth={1.5} />
                  <text fontFamily="'Cormorant Garamond',serif" fontSize={14} fill="var(--error)" x={215} y={52} textAnchor="middle">B</text>
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={7} fill="var(--muted)" x={215} y={18} textAnchor="middle">あなた</text>
                </g>
                {/* Error detection area */}
                <g className="error-zone">
                  <rect x={50} y={95} width={160} height={48} rx={8} fill="var(--error)" opacity={0.04} stroke="var(--error)" strokeWidth={1} strokeDasharray="4 2" />
                  <circle className="error-signal" cx={85} cy={119} r={10} />
                  <text className="error-text" fontFamily="'Noto Sans JP',sans-serif" fontSize={10} fontWeight={700} x={85} y={123} textAnchor="middle">!</text>
                  <text className="error-label" fontFamily="'Noto Sans JP',sans-serif" fontSize={8} fill="var(--error)" x={110} y={115} textAnchor="start">脳の反応</text>
                  <text className="error-label" fontFamily="'Noto Sans JP',sans-serif" fontSize={10} fontWeight={500} fill="var(--error)" x={110} y={131} textAnchor="start">「みんなと違う＝エラー」</text>
                </g>
                {/* Arrow from outlier to error */}
                <path className="error-arrow" d="M215,65 L150,95" fill="none" stroke="var(--error)" strokeWidth={1.2} markerEnd="url(#arrowErr)" />
                <defs>
                  <marker id="arrowErr" markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto">
                    <path d="M0,0 L6,2 L0,4" fill="var(--error)" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </R>
        <div className="section-text">
          <div className="section-body">
            <R ok={ok} d={240}><p>「自分は自分」「人に流されるな」——よく聞く言葉ですが、進化の観点からは、これは非常に不自然な要求です。</p></R>
            <R ok={ok} d={280}><p>人類の進化の大半は、小さな集団での生活でした。集団から追放されること＝死を意味する環境で、何万年も生きてきた。</p></R>
            <R ok={ok} d={320}><p>その結果、人間の脳には2つの強力な装置が組み込まれました。</p></R>
            <R ok={ok} d={360}><p><strong>装置①：自動模倣システム</strong></p></R>
            <R ok={ok} d={400}><p>人間には「過剰模倣」と呼ばれる特性があります。他の霊長類は「目的に必要な行動」だけを真似しますが、人間は意味のない動作まで忠実にコピーします。</p></R>
            <R ok={ok} d={440}><p>周りの人の口癖がうつる。一緒にいる人の食生活に似てくる。パートナーの趣味に影響される。これらは「意志が弱い」のではなく、脳の模倣システムが正常に動作しているだけです。</p></R>
            <R ok={ok} d={480}><p><strong>装置②：同調エラー検出システム</strong></p></R>
            <R ok={ok} d={520}><p>脳画像研究（Klucharev et al., 2009）は驚くべき発見をしました。自分の意見が集団の多数派とズレたとき、脳はそれを「エラー」として処理するのです。</p></R>
            <R ok={ok} d={560}><p>計算間違いをしたときと同じ脳の領域が活性化する。つまり脳にとって、<strong>みんなと違うこと＝間違い</strong>なのです。</p></R>
            <R ok={ok} d={600}><p>これは原始時代の生存戦略としては合理的でした。集団の行動規範から外れること＝追放リスク＝生命の危機だったからです。</p></R>
            <R ok={ok} d={640}><p>現代ではこの装置が必ずしも有利に働くとは限りません。しかし重要なのは、<strong>この仕組みは意志の力でオフにできない</strong>ということです。</p></R>
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
                <text className="contagion-stat" fontFamily="'Cormorant Garamond',serif" fontSize={22} fill="var(--accent)" x={130} y={120} textAnchor="middle">+57%</text>
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
            <R ok={ok} d={240}><p>「あの人といると元気になる」「あの職場にいると疲れる」——この体感を、ハーバード大学の研究チームが大規模データで検証しました。</p></R>
            <R ok={ok} d={280}><p>社会学者クリスタキスとファウラーは、約1万2000人を32年間追跡したフラミンガム心臓研究のデータを分析し、衝撃的な結果を発表しました（2007年、NEJM掲載）。</p></R>
            <R ok={ok} d={320}><p><strong>友人が肥満になると、自分が肥満になるリスクが57%上がる。</strong></p></R>
            <R ok={ok} d={360}><p>これは食事を共にするから、という単純な話ではありません。地理的に離れた友人でも同じ効果が見られたのです。</p></R>
            <R ok={ok} d={400}><p>さらに後続の研究で、喫煙の習慣、幸福感、孤独感でも同様の伝染効果が確認されました。しかも影響は「友人の友人の友人」、つまり会ったこともない人からも波及します。</p></R>
            <R ok={ok} d={440}><p>別の研究では、パートナーが禁煙や運動を始めると、自分も同じ行動を起こす確率が数倍に跳ね上がることが確認されています（Jackson et al., 2015, JAMA Internal Medicine）。</p></R>
            <R ok={ok} d={480}><p>さらに経済学の世界では、アメリカ政府が実施した大規模な社会実験「Moving to Opportunity」の追跡調査で、貧困地域から低貧困地域に引っ越した家庭の子どもは、大人になったとき収入が最大31%高くなることが判明しました（Chetty et al., 2016）。</p></R>
            <R ok={ok} d={520}><p>これはランダムに引っ越し先を割り当てたRCT（無作為化比較試験）であり、因果関係が確認された、極めて信頼度の高いエビデンスです。</p></R>
            <R ok={ok} d={560}><p>変わったのは「周りにいる人」だけ。教育プログラムも、資金援助もなし。<strong>ただ環境を変えただけで、人生の軌道が変わった。</strong></p></R>
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
                  <rect x={10} y={15} width={110} height={95} rx={8} fill="none" stroke="var(--error)" strokeWidth={0.8} opacity={0.3} />
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={7} fill="var(--error)" x={65} y={12} textAnchor="middle" opacity={0.7}>否定的な環境</text>
                  {/* Rejecting circles */}
                  {[30, 65, 100].map((x, i) => (
                    <circle key={i} cx={x} cy={45} r={10} fill="var(--error)" opacity={0.08} stroke="var(--error)" strokeWidth={0.8} />
                  ))}
                  {/* Small "you" */}
                  <circle cx={65} cy={80} r={8} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1} opacity={0.4} />
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={6} fill="var(--muted)" x={65} y={83} textAnchor="middle">自分</text>
                  <text fontFamily="'Cormorant Garamond',serif" fontSize={14} fill="var(--error)" x={65} y={105} textAnchor="middle" opacity={0.7}>▼</text>
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
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={7} fill="var(--accent)" x={195} y={83} textAnchor="middle">自分</text>
                  <text fontFamily="'Cormorant Garamond',serif" fontSize={14} fill="var(--accent)" x={195} y={105} textAnchor="middle">▲</text>
                </g>
                {/* Bottom */}
                <text className="socio-bottom" fontFamily="'Noto Sans JP',sans-serif" fontSize={8} fill="var(--muted)" x={130} y={140} textAnchor="middle">自信 ＝ 周囲からの受容度メーター</text>
              </svg>
            </div>
          </div>
        </R>
        <div className="section-text">
          <div className="section-body">
            <R ok={ok} d={240}><p>「もっと自信を持て」とよく言われます。まるで自信とは、自分の内側から湧き上がるものであるかのように。</p></R>
            <R ok={ok} d={280}><p>しかし心理学者マーク・リアリーのソシオメーター理論は、まったく異なる見方を提案しています。</p></R>
            <R ok={ok} d={320}><p><strong>自尊心とは、自分が集団から受け入れられているかを測るゲージである。</strong></p></R>
            <R ok={ok} d={360}><p>自尊心が下がる＝社会的に排除されるリスクが高まっている信号。自尊心が上がる＝集団の中で安全なポジションにいる信号。</p></R>
            <R ok={ok} d={400}><p>つまり「自信がない」という感覚の正体は、今いる社会的環境の中で自分の居場所が不安定だというアラートです。</p></R>
            <R ok={ok} d={440}><p>ここで重要なことがあります。ソシオメーターが参照しているのは、<strong>今、周囲にいる人間との関係</strong>です。</p></R>
            <R ok={ok} d={480}><p>もし周囲が自分を否定する人ばかりなら、ゲージは下がり続けます。どれだけ自己啓発をしても、ソシオメーターの入力源（周囲の人間）が変わらなければ、自尊心は構造的に低いままです。</p></R>
            <R ok={ok} d={520}><p>逆に、自分を対等に扱い、挑戦を歓迎する人たちの中に入れば、ソシオメーターは自然と上がります。これは「ポジティブ思考」の効果ではなく、入力が変わったことによるシステムの正常な反応です。</p></R>
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
                  <rect x={10} y={15} width={95} height={90} rx={8} fill="var(--border)" opacity={0.1} stroke="var(--border)" strokeWidth={1} />
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={7} fill="var(--muted)" x={57} y={12} textAnchor="middle">現在の環境</text>
                  {[30, 57, 84].map((x, i) => (
                    <circle key={i} cx={x} cy={45} r={9} fill="var(--border)" opacity={0.15} stroke="var(--border)" strokeWidth={0.8} />
                  ))}
                  <circle cx={57} cy={78} r={10} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1} opacity={0.4} />
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={6} fill="var(--muted)" x={57} y={81} textAnchor="middle">自分</text>
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
                  <text fontFamily="'Noto Sans JP',sans-serif" fontSize={7} fill="var(--accent)" x={202} y={81} textAnchor="middle">自分</text>
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
            <R ok={ok} d={240}><p>ここまでの内容を整理します。</p></R>
            <R ok={ok} d={280}><p>脳は、周囲の人間関係を処理するために進化した（社会脳仮説）。性格は固定されたものではなく、社会的状況に応じて自動で切り替わる戦略の束である（if-thenパターン）。</p></R>
            <R ok={ok} d={320}><p>人間には、周囲の行動や感情を自動的にコピーし、集団の基準に合わせようとする神経回路がハードウェアとして組み込まれている（過剰模倣と同調エラー検出）。</p></R>
            <R ok={ok} d={360}><p>その結果、肥満・幸福感・年収に至るまで、周囲の人間から測定可能な影響を受ける（社会的伝染）。自信や自尊心すら、周囲の人間との関係性によって規定される（ソシオメーター理論）。</p></R>
            <R ok={ok} d={400}><p>これらすべてが指し示しているのは、一つのシンプルな事実です。</p></R>
            <R ok={ok} d={440}><p><strong>あなたは「誰と過ごすか」でつくられている。</strong></p></R>
            <R ok={ok} d={480}><p>だからこそ、集中している人、仕事を楽しんでいる人、挑戦を続けている人の近くに自分を置くことは、「刺激をもらう」といった軽い話ではありません。</p></R>
            <R ok={ok} d={520}><p>それは自分の脳の入力を変えること。自分の行動戦略の基準線を書き換えること。ソシオメーターの参照点をリセットすること。つまり、<strong>自分自身を再構成する行為</strong>です。</p></R>
            <R ok={ok} d={560}><p>「自分を変えたい」と思ったとき、意志の力で自分の内面を変えようとするのは、進化の設計に逆らうことです。脳はそもそも、外部の社会的入力に応じて自分を調整するように作られているのですから。</p></R>
            <R ok={ok} d={600}><p>その設計に素直に従いましょう。自分を変えたいなら、自分の周りを変える。</p></R>
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

        /* ─── Page Header ─── */
        .page-header {
          max-width: 800px;
          margin: 0 auto;
          padding: 100px 40px 60px;
          text-align: center;
        }
        .page-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 12px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 24px;
        }
        .page-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 4.5vw, 46px);
          font-weight: 400;
          line-height: 1.5;
          color: var(--ink);
          margin-bottom: 24px;
        }
        .page-title em {
          font-style: italic;
          color: var(--accent);
        }
        .page-lead {
          font-family: 'Noto Sans JP', sans-serif;
          font-size: clamp(14px, 1.8vw, 16px);
          font-weight: 300;
          color: var(--sub);
          line-height: 2;
          max-width: 640px;
          margin: 0 auto;
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

        /* ─── Sections (図解本スタイル) ─── */
        .section {
          max-width: 1060px;
          margin: 0 auto;
          padding: 80px 40px;
          border-top: 1px solid var(--border);
        }
        .section-header {
          margin-bottom: 40px;
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
          margin-bottom: 0;
        }
        /* 横並びレイアウト：図解 + テキスト */
        .section-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .section-visual {
          position: sticky;
          top: 80px;
        }
        .section-text {
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

        .footer { text-align: center; padding: 48px 24px; border-top: 1px solid var(--border); }
        .footer p { font-family: 'Cormorant Garamond', serif; font-size: 12px; color: var(--muted); letter-spacing: 2px; }

        /* ─── Responsive ─── */
        @media (max-width: 860px) {
          .section-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .section-visual {
            position: static;
            max-width: 400px;
            margin: 0 auto;
          }
          .section { padding: 48px 20px; }
          .page-header { padding: 60px 20px 40px; }
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
