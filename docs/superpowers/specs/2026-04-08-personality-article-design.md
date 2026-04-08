# Design Spec: 「あなたの性格は、あなたが『選んだもの』じゃない」記事ページ

## Overview

進化心理学・神経科学をベースにした7セクション構成の長文科学エッセイ。「誰と過ごすかが自分をつくる」というテーマを、上品なタイポグラフィと各セクション固有のSVGアニメーションで読ませるページ。

**ルート:** `/personality`
**ファイル:** `src/app/personality/page.tsx`（フルカスタム1ファイル構成）
**Knowledge Hubへの追加:** ホームページの記事一覧に新しいカードを追加

---

## Design Direction

- **トーン:** 最高クオリティ、落ち着いていておしゃれ。品格で勝負する。
- **参考イメージ:** Kinfolk誌、BRUTUS、Aesop のウェブサイト
- **アニメーション方針:** 派手さではなく、コンセプトの視覚化。スクロールで画面に入ったときに再生（Intersection Observer）

---

## Color Palette (ライトウォーム)

| Role | Color | Usage |
|------|-------|-------|
| Background | `#f3efe8` | ページ全体の背景（オフホワイト、紙の質感） |
| Surface | `#faf8f5` | カード・引用ボックスの背景 |
| Border | `#e0dbd4` | セクション区切り線 |
| Accent | `#8b6f47` | セクション番号、ラベル、SVGの主要色 |
| Accent Light | `#c4a882` | SVGの接続線、装飾要素 |
| Muted | `#a89a8b` | 補助テキスト、キャプション |
| Ink | `#1a1a1a` | 見出しテキスト |
| Body | `#3a3632` | 本文テキスト |
| Sub | `#6b6560` | サブタイトル |
| Error/Outlier | `#c4574a` | セクション4の逸脱ドット（アクセント的使用） |

---

## Typography (ミックス: セリフ見出し × サンセリフ本文)

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display Title | Playfair Display | 400 (italic for emphasis) | clamp(28px, 5vw, 52px) |
| Section Heading | Playfair Display | 400 | clamp(20px, 3vw, 32px) |
| Label / Category | Cormorant Garamond | 600 | 12-13px, letter-spacing: 3-4px |
| Body | Noto Sans JP | 300 | 15-16px, line-height: 2.0 |
| Body Emphasis | Noto Sans JP | 500 | 14-15px |
| SVG Labels | Cormorant Garamond / Noto Sans JP | 400 | 各SVG内で調整 |

**Google Fonts import:**
- Playfair Display (400, 400i)
- Cormorant Garamond (400, 600)
- Noto Sans JP (300, 400, 500, 700)

---

## Layout

### Overall Structure

シングルカラム・記事型レイアウト。中央寄せ。

```
┌─────────────────────────────────────────┐
│              [Hero Section]              │
│  Label: "EVOLUTIONARY PSYCHOLOGY"        │
│  Title: あなたの性格は、あなたが          │
│         「選んだもの」じゃない。           │
│  Subtitle                                │
│  ── divider ──                           │
│  [SVG: Social Network Animation]         │
│  Scroll indicator                        │
├─────────────────────────────────────────┤
│  01  導入：問いを投げる                   │
│  [Body text]                             │
│  [Point box]                             │
├─────────────────────────────────────────┤
│  02  脳が巨大化した理由                   │
│  [SVG: Brain × Dunbar Number]            │
│  [Body text]                             │
│  [Point box]                             │
├─────────── (repeat for 03-06) ──────────┤
│  07  結論                                │
│  [SVG: Network Reconnect]                │
│  [Body text]                             │
│  [Final Point box]                       │
├─────────────────────────────────────────┤
│              [Footer]                    │
│  Built with Claude Code                  │
└─────────────────────────────────────────┘
```

### Spacing System

| Element | Spacing |
|---------|---------|
| Hero padding | 60px top/bottom, 24px sides |
| Section padding | 80px top/bottom |
| Section max-width (text) | 640px |
| SVG container max-width | 400px |
| Paragraph margin-bottom | 1.5em |
| Point box margin | 32px top/bottom |
| Section divider | 1px solid `#e0dbd4` |

### Responsive

- Mobile (< 640px): パディング縮小、フォントサイズ clamp で自動調整
- SVGはviewBox指定で自然にスケール
- シングルカラムなので基本的なレスポンシブ対応で十分

---

## Sections & SVG Animations

すべてのSVGアニメーションはIntersection Observerでビューポート進入時に再生開始。

### Hero (ページ最上部)

**SVG: ソーシャルネットワーク図**
- 中心ノード（自分）= `r:8`, `#8b6f47`
- 周囲ノード6個 = `r:5`, `#8b6f47`, `opacity:0.6`
- 外周ノード3個 = `r:3`, `#8b6f47`, `opacity:0.3`（友人の友人）
- 接続線: `#c4a882`, `stroke-width:0.8`
- パルスリング: 中心から波紋状に拡大（3つ、1秒ずらしでループ）

**アニメーション順序:**
1. 接続線がstroke-dashoffsetで描画（100ms間隔）
2. ノードがscale(0)→scale(1)で出現
3. パルスリングが継続ループ

**その他のヒーロー要素:**
- ラベル「EVOLUTIONARY PSYCHOLOGY」→ fadeUp 0.3s delay
- タイトル → fadeUp 0.5s delay（「選んだもの」をイタリック+アクセント色）
- サブタイトル → fadeUp 0.7s delay
- 区切り線 → fadeUp 1.1s delay
- スクロールインジケーター（「Scroll」+ 縦線のパルス）→ fadeUp 1.5s delay
- 背景に紙テクスチャ（SVGノイズフィルター、opacity:0.03）

---

### Section 01: 導入 — 問いを投げる

**見出し:** あなたは本当に「あなた」ですか？

SVGなし（ヒーローのSVGがこのセクションの役割を兼ねる）。テキストのみ。

**ポイントボックス:**
> あなたの性格は、あなたの周りにいる人によってつくられている。

---

### Section 02: 社会脳仮説

**見出し:** 脳が巨大化した理由は、数学でも芸術でもなかった

**SVG: 社会脳 × ダンバー数**
- 脳シルエット（パスで描画）: `stroke: #c4a882`, `fill: #8b6f47` (opacity:0.15)
- 同心円リング3つ（群れの階層）: `stroke-dasharray:4 2`, 順次出現
- 人ドット8個: 脳の内外に配置、100ms間隔で出現
- 「150」テキスト: 最後にフェードイン（Cormorant Garamond, 16px）

**ポイントボックス:**
> 脳の最大の仕事は、思考でも創造でもなく「人間関係の処理」。

---

### Section 03: 性格の正体

**見出し:** あなたの「キャラ」は、場面ごとに自動で切り替わっている

**SVG: ペルソナ切り替え（if-thenマスク）**
- 3つの円形マスク（顔）: 横並び、circle r=22
  - 左（上司の前）: 目=短い水平線2本、口=水平直線（無表情、真面目）
  - 中（友人の前）: 目=小さな丸2つ、口=上向きの弧（笑顔）
  - 右（初対面）: 目=水平線2本、口=やや下向きの弧（慎重、控えめ）
- 切り替え矢印: マスク間を破線矢印で接続
- 「if → then」ラベル: 最後にフェードイン

**アニメーション:** マスクが左→中→右の順で出現（0.7s間隔）

**ポイントボックス:**
> 「本当の自分」を探す必要はありません。あなたは状況ごとに最適な戦略を自動選択する、精巧なシステムそのものです。

---

### Section 04: 同調装置

**見出し:** 「流されやすい」のは弱さじゃない。生存本能だ。

**SVG: 同調圧力の波と逸脱エラー**
- 波線3本（集団の基準線）: 横方向の緩やかなカーブ
- 整列ドット5個: 波線上に配置、順次出現
- 逸脱ドット1個: 波線から外れた位置、`#c4574a`（赤系）
- ERRORテキスト: 逸脱ドットの上で点滅
- エラーシグナルリング: 逸脱ドットの周囲で`stroke-dasharray`パルス

**ポイントボックス:**
> あなたが周りに影響されるのは、性格の問題ではありません。数万年の進化が組み込んだ、生存のためのハードウェアです。

---

### Section 05: 社会的伝染

**見出し:** 肥満も、幸福も、年収も「うつる」

**SVG: 社会的伝染の波紋**
- 中心ノード = `r:6`
- 波紋リング3つ: `r:8` → `r:80` に拡大しながらフェードアウト（ループ）
- 第1層ノード4個（友人）: `r:4`, 1秒後にアクティブ化
- 第2層ノード4個（友人の友人）: `r:3`, 2秒後にアクティブ化
- 「57%」テキスト: 下部にフェードイン（Cormorant Garamond, 14px）

**ポイントボックス:**
> 「空気」は比喩ではありません。周囲の人間の行動・感情・価値観は、測定可能な力であなたに伝染しています。

---

### Section 06: ソシオメーター

**見出し:** 自信とは、自分への評価ではなく、集団からの受容度メーター

**SVG: ソシオメーター（受容度ゲージ）**
- 半円のゲージ: 背景=`#e0dbd4`, フィル=`#8b6f47`
- 針: 中心ピボットから伸び、左（低）→右（高）へスイング
- 左アイコン（否定的環境）: `#c4574a` の×印
- 右アイコン（肯定的環境）: `#8b6f47` の○
- 「低」「高」ラベル: ゲージ端に配置
- 「sociometer」テキスト: 下部にフェードイン

**アニメーション:** 針が-60deg→+30deg→+15degとオーバーシュートしてから安定

**ポイントボックス:**
> 自信を持ちたいなら、自分の内面ではなく、自分の周囲を変えるのが先です。

---

### Section 07: 結論

**見出し:** 「環境を変える」は逃げじゃない。最も合理的な自己変革だ。

**SVG: ネットワーク再構成**
- 中心ノード（自分）: `r:6`, `#8b6f47` — 不変
- 左側の古いネットワーク: 3本の破線接続 + 薄いノード3個（`#d4ccc0`, opacity:0.4）
- 右側の新しいネットワーク: 3本の実線がstroke-dashoffsetで描画 + 鮮明なノード3個が出現
- 「re:connect」ラベル: 上部にフェードイン

**ポイントボックス:**
> 自分を変えたいなら、自分の周りを変える。それが、数万年の進化が教えてくれる最もシンプルな戦略です。

---

## Interaction & Animation

### Scroll-triggered Animations (Intersection Observer)

- **テキスト:** セクションがビューポートに入ると fadeUp (opacity:0→1, translateY:20px→0) で出現
- **SVG:** ビューポート進入時にアニメーション開始（CSSクラスの付与で制御）
- **ポイントボックス:** テキストの後に少し遅れてフェードイン
- **threshold:** 0.2（要素が20%見えたら発火）

### Animation Timing

- fadeUp duration: 0.8s, ease
- SVGアニメーション: 各セクション内で2-3秒で完結
- ループアニメーション（パルス、波紋等）: 3s周期

### Background Texture

紙の質感をSVGノイズフィルターで生成（`feTurbulence`, opacity: 0.03）。ヒーローセクションの`::before`疑似要素に適用。

---

## Homepage Integration

ホームページ（`src/app/page.tsx`）の `articles` 配列に新しいカードを追加（先頭に挿入）:

```
{
  category: "guide",
  tag: "Guide",
  title: "あなたの性格は、あなたが「選んだもの」じゃない",
  description: "進化心理学が明かす、「自分」をつくる本当のメカニズム",
  href: "/personality",
  date: "2026/4/8",
  author: "藤木崇史",
  accent: "#8b6f47",
  thumb: "/thumbs/personality.png"
}
```

**サムネイル画像:** `/public/thumbs/personality.png` を作成する必要がある。**実装順序:** (1) personalityページを先に完成 → (2) スクリーンショットを撮影して1200x630px程度のPNGとして `/public/thumbs/personality.png` に保存 → (3) ホームページのarticles配列にカードを追加。この順序により、サムネイルが壊れた状態のコミットを避ける。

---

## Technical Notes

- **ファイル構成:** `src/app/personality/page.tsx` 1ファイル（既存ページと同じパターン）
- **スタイリング:** インライン `<style>` ブロック（プロジェクト規約に準拠）
- **クライアントコンポーネント:** `"use client"` — Intersection Observer、useState/useEffect使用
- **外部ライブラリ:** なし（CSS @keyframes + Intersection Observer のみ）
- **フォント読み込み:** `@import` Google Fonts（`<style>` ブロック内）
- **SVG:** すべてインラインSVG（外部ファイルなし）
- **アクセシビリティ:** SVGに `role="img"` + `aria-label` 属性を付与
- **本文テキスト:** ユーザー提供のコンテンツ原稿（7セクション分）をそのまま使用。実装時にpage.tsx内にハードコード
- **サムネイル:** ページ完成後にスクリーンショットを `/public/thumbs/personality.png` として保存（1200x630px程度）
