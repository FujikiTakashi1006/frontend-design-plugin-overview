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
      <div className="section-layout reverse">
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
              <svg viewBox="0 0 200 140" role="img" aria-label="同調圧力の波：整列するドットと、外れたドットにERRORシグナルが点滅">
                <path className="wave-line w1" d="M10,40 Q50,30 100,40 Q150,50 190,40" />
                <path className="wave-line w2" d="M10,70 Q50,60 100,70 Q150,80 190,70" />
                <path className="wave-line w3" d="M10,100 Q50,90 100,100 Q150,110 190,100" />
                {[[30,38],[60,35],[90,40],[120,43],[150,40]].map(([cx,cy], i) => (
                  <circle key={i} className="conformity-dot" cx={cx} cy={cy} r={3}
                    style={{ animationDelay: `${0.8 + i * 0.2}s` }} />
                ))}
                <circle className="outlier" cx={170} cy={20} r={4} />
                <circle className="error-signal" cx={170} cy={20} r={12} />
                <text className="error-text" fontFamily="'Noto Sans JP', sans-serif" fontSize={7} x={170} y={10} textAnchor="middle">ERROR</text>
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
      <div className="section-layout reverse">
        <R ok={ok} d={160}>
          <div className="section-visual">
            <div className={`svg-container svg-animate ${ok ? 'visible' : ''}`}>
              <svg viewBox="0 0 200 160" role="img" aria-label="社会的伝染の波紋：中心から友人、友人の友人へ影響が伝播し、57%のリスク上昇を示す">
                <circle cx={100} cy={80} r={6} fill="var(--accent)" opacity={0.9} />
                {[0,1,2].map(i => (
                  <circle key={i} className={`ripple r${i+1}`} cx={100} cy={80} r={8} />
                ))}
                {[[60,50],[140,50],[55,100],[145,100]].map(([cx,cy], i) => (
                  <circle key={i} className="spread-node" cx={cx} cy={cy} r={4}
                    style={{ animationDelay: `${1 + i * 0.2}s` }} />
                ))}
                {[[30,30],[170,30],[25,120],[175,120]].map(([cx,cy], i) => (
                  <circle key={i} className="spread-node" cx={cx} cy={cy} r={3}
                    style={{ animationDelay: `${2 + i * 0.2}s` }} />
                ))}
                <text className="percent-text" x={100} y={148} textAnchor="middle">57%</text>
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
              <svg viewBox="0 0 200 160" role="img" aria-label="ソシオメーター：自尊心ゲージの針が否定的環境から肯定的環境へ振れる">
                <path className="gauge-bg" d="M50,120 A60,60 0 0,1 150,120" />
                <path className="gauge-fill" d="M50,120 A60,60 0 0,1 150,120" />
                <line className="gauge-needle" x1={100} y1={120} x2={100} y2={65} />
                <circle cx={100} cy={120} r={4} fill="var(--ink)" />
                <text fontFamily="'Noto Sans JP', sans-serif" fontSize={7} fill="var(--muted)" x={40} y={135}>低</text>
                <text fontFamily="'Noto Sans JP', sans-serif" fontSize={7} fill="var(--muted)" x={155} y={135}>高</text>
                {/* Negative env (X mark) */}
                <g className="env-icon neg">
                  <circle cx={30} cy={90} r={8} fill="none" stroke="var(--error)" strokeWidth={0.8} opacity={0.5} />
                  <line x1={27} y1={87} x2={33} y2={93} stroke="var(--error)" strokeWidth={0.8} opacity={0.5} />
                  <line x1={33} y1={87} x2={27} y2={93} stroke="var(--error)" strokeWidth={0.8} opacity={0.5} />
                </g>
                {/* Positive env */}
                <g className="env-icon pos">
                  <circle cx={170} cy={90} r={8} fill="none" stroke="var(--accent)" strokeWidth={0.8} />
                  <circle cx={170} cy={90} r={3} fill="var(--accent)" opacity={0.3} />
                </g>
                <text className="socio-label" fontFamily="'Cormorant Garamond', serif" fontSize={10} fill="var(--accent)" x={100} y={155} textAnchor="middle">sociometer</text>
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
      <div className="section-layout reverse">
        <R ok={ok} d={160}>
          <div className="section-visual">
            <div className={`svg-container svg-animate ${ok ? 'visible' : ''}`}>
              <svg viewBox="0 0 200 140" role="img" aria-label="ネットワーク再構成：古い接続が薄れ、新しい接続が描かれる">
                {/* Old network */}
                <line className="old-path" x1={100} y1={70} x2={50} y2={30} />
                <line className="old-path" x1={100} y1={70} x2={40} y2={80} />
                <line className="old-path" x1={100} y1={70} x2={60} y2={115} />
                <circle cx={50} cy={30} r={3} fill="var(--border)" opacity={0.4} />
                <circle cx={40} cy={80} r={3} fill="var(--border)" opacity={0.4} />
                <circle cx={60} cy={115} r={3} fill="var(--border)" opacity={0.4} />
                {/* Center */}
                <circle cx={100} cy={70} r={6} fill="var(--accent)" opacity={0.9} />
                {/* New network */}
                <path className="new-path" d="M100,70 L150,35" />
                <path className="new-path" d="M100,70 L160,80" style={{ animationDelay: '1.3s' }} />
                <path className="new-path" d="M100,70 L140,115" style={{ animationDelay: '1.6s' }} />
                <circle className="transform-node t1" cx={150} cy={35} r={4} />
                <circle className="transform-node t2" cx={160} cy={80} r={4} />
                <circle className="transform-node t3" cx={140} cy={115} r={4} />
                <text className="reconnect-label" fontFamily="'Cormorant Garamond', serif" fontSize={10} fill="var(--accent)" x={100} y={12} textAnchor="middle">re:connect</text>
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
          animation: scrollPulse 2s ease-in-out infinite;
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
        .section-layout.reverse {
          direction: rtl;
        }
        .section-layout.reverse > * {
          direction: ltr;
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
        .wave-line { fill: none; stroke: var(--accent-light); stroke-width: 1; opacity: 0; }
        .svg-animate.visible .wave-line.w1 { animation: waveIn 1.5s ease 0.3s forwards; }
        .svg-animate.visible .wave-line.w2 { animation: waveIn 1.5s ease 0.8s forwards; }
        .svg-animate.visible .wave-line.w3 { animation: waveIn 1.5s ease 1.3s forwards; }
        @keyframes waveIn { to { opacity: 0.5; } }
        .conformity-dot { fill: var(--accent); opacity: 0; }
        .svg-animate.visible .conformity-dot { animation: dotAlign 0.5s ease forwards; }
        @keyframes dotAlign { to { opacity: 0.7; } }
        .outlier { fill: var(--error); opacity: 0; }
        .svg-animate.visible .outlier { animation: outlierPulse 2s ease-in-out 2s infinite; }
        @keyframes outlierPulse { 0%,100% { opacity: 0.5; } 50% { opacity: 0.9; } }
        .error-signal { stroke: var(--error); stroke-width: 0.8; fill: none; opacity: 0; stroke-dasharray: 3 2; }
        .svg-animate.visible .error-signal { animation: errorFlash 1.5s ease 2.5s infinite; }
        @keyframes errorFlash { 0%,100% { opacity: 0; } 50% { opacity: 0.6; } }
        .error-text { fill: var(--error); opacity: 0; }
        .svg-animate.visible .error-text { animation: fadeIn 0.6s ease 2.5s forwards; }

        /* ─── Section 05 SVG Classes ─── */
        .ripple { fill: none; stroke: var(--accent); stroke-width: 0.8; opacity: 0; }
        .svg-animate.visible .ripple.r1 { animation: rippleOut 3s ease 0.5s infinite; }
        .svg-animate.visible .ripple.r2 { animation: rippleOut 3s ease 1.5s infinite; }
        .svg-animate.visible .ripple.r3 { animation: rippleOut 3s ease 2.5s infinite; }
        @keyframes rippleOut { 0% { r: 8; opacity: 0.5; } 100% { r: 80; opacity: 0; } }
        .spread-node { fill: var(--accent); opacity: 0.3; }
        .svg-animate.visible .spread-node { animation: nodeActivate 0.5s ease forwards; }
        @keyframes nodeActivate { to { opacity: 0.8; } }
        .percent-text { font-family: 'Cormorant Garamond', serif; font-size: 14px; fill: var(--accent); opacity: 0; }
        .svg-animate.visible .percent-text { animation: fadeIn 0.8s ease 2s forwards; }

        /* ─── Section 06 SVG Classes ─── */
        .gauge-bg { fill: none; stroke: var(--border); stroke-width: 4; }
        .gauge-fill { fill: none; stroke: var(--accent); stroke-width: 4; stroke-linecap: round; stroke-dasharray: 126; stroke-dashoffset: 126; }
        .svg-animate.visible .gauge-fill { animation: gaugeUp 2s ease 1s forwards; }
        @keyframes gaugeUp { to { stroke-dashoffset: 40; } }
        .gauge-needle { stroke: var(--ink); stroke-width: 1.5; stroke-linecap: round; transform-origin: 100px 120px; }
        .svg-animate.visible .gauge-needle { animation: needleSwing 3s ease 0.5s forwards; }
        @keyframes needleSwing { 0% { transform: rotate(-60deg); } 60% { transform: rotate(30deg); } 100% { transform: rotate(15deg); } }
        .env-icon { opacity: 0; }
        .svg-animate.visible .env-icon.neg { animation: envIn 0.5s ease 0.5s forwards; }
        .svg-animate.visible .env-icon.pos { animation: envIn 0.5s ease 2s forwards; }
        @keyframes envIn { to { opacity: 1; } }
        .socio-label { opacity: 0; }
        .svg-animate.visible .socio-label { animation: fadeIn 0.8s ease 2.5s forwards; }

        /* ─── Section 07 SVG Classes ─── */
        .old-path { stroke: var(--border); stroke-width: 1; fill: none; stroke-dasharray: 4 3; opacity: 0.5; }
        .new-path { stroke: var(--accent); stroke-width: 1.5; fill: none; stroke-dasharray: 200; stroke-dashoffset: 200; }
        .svg-animate.visible .new-path { animation: drawNew 2s ease 1s forwards; }
        @keyframes drawNew { to { stroke-dashoffset: 0; } }
        .transform-node { fill: var(--accent); opacity: 0; }
        .svg-animate.visible .transform-node.t1 { animation: transformIn 0.6s ease 1.5s forwards; }
        .svg-animate.visible .transform-node.t2 { animation: transformIn 0.6s ease 2s forwards; }
        .svg-animate.visible .transform-node.t3 { animation: transformIn 0.6s ease 2.5s forwards; }
        @keyframes transformIn { to { opacity: 0.8; } }
        .reconnect-label { opacity: 0; }
        .svg-animate.visible .reconnect-label { animation: fadeIn 0.8s ease 3s forwards; }

        .footer { text-align: center; padding: 48px 24px; border-top: 1px solid var(--border); }
        .footer p { font-family: 'Cormorant Garamond', serif; font-size: 12px; color: var(--muted); letter-spacing: 2px; }

        /* ─── Responsive ─── */
        @media (max-width: 860px) {
          .section-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .section-layout.reverse {
            direction: ltr;
          }
          .section-visual {
            position: static;
            max-width: 400px;
            margin: 0 auto;
          }
          .section { padding: 48px 20px; }
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
