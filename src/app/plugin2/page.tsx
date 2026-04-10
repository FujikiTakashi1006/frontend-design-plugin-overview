"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function useScrollReveal() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return revealed;
}

export default function Plugin2Page() {
  const revealed = useScrollReveal();
  const [mounted, setMounted] = useState(false);
  const isRevealed = (id: string) => revealed.has(id);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "#f7f3ed",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Zen+Old+Mincho:wght@400;500;600;700;900&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

        :root {
          --gold: #b8953e;
          --gold-light: #d4b366;
          --gold-dark: #8a6d2b;
          --cream: #f7f3ed;
          --cream-dark: #ede7dd;
          --ink: #1a1714;
          --ink-light: #4a453d;
          --ink-muted: #8a8378;
        }

        .font-jp { font-family: 'Zen Old Mincho', serif; }
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-mono { font-family: 'DM Mono', monospace; }

        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes expandLine {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .reveal-up { opacity: 0; }
        .reveal-up.active {
          animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .reveal-up.d1.active { animation-delay: 0.1s; }
        .reveal-up.d2.active { animation-delay: 0.2s; }
        .reveal-up.d3.active { animation-delay: 0.3s; }
        .reveal-up.d4.active { animation-delay: 0.4s; }
        .reveal-up.d5.active { animation-delay: 0.5s; }
        .reveal-up.d6.active { animation-delay: 0.6s; }

        .gold-shimmer {
          background: linear-gradient(
            90deg,
            var(--gold-dark) 0%,
            var(--gold-light) 40%,
            #f0dca4 50%,
            var(--gold-light) 60%,
            var(--gold-dark) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .washi-texture {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='washi'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23washi)' opacity='0.03'/%3E%3C/svg%3E");
        }

        .service-card-lux {
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
        }
        .service-card-lux::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--gold);
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          transform: translateX(-50%);
        }
        .service-card-lux:hover::after {
          width: 60%;
        }
        .service-card-lux:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(184, 149, 62, 0.08);
        }

        .team-portrait {
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .team-portrait:hover .portrait-frame {
          border-color: var(--gold);
          box-shadow: 0 0 40px rgba(184, 149, 62, 0.12);
        }
        .team-portrait:hover .portrait-name {
          color: var(--gold);
        }

        .input-lux {
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--ink-muted);
          padding: 12px 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          color: var(--ink);
          outline: none;
          transition: border-color 0.4s ease;
          width: 100%;
        }
        .input-lux:focus {
          border-bottom-color: var(--gold);
        }
        .input-lux::placeholder {
          color: var(--ink-muted);
          font-style: italic;
        }
      `}</style>

      {/* Washi texture overlay */}
      <div className="washi-texture fixed inset-0 pointer-events-none z-10" />

      {/* Subtle gold dust particles */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {mounted && [...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: "var(--gold-light)",
              opacity: 0.2,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `fadeIn 2s ${i * 0.8}s ease both`,
              boxShadow: "0 0 6px rgba(184, 149, 62, 0.3)",
            }}
          />
        ))}
      </div>

      {/* ===== HEADER ===== */}
      <header
        className="relative z-20"
        style={{ borderBottom: "1px solid rgba(26, 23, 20, 0.08)" }}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
              <div className="w-4 h-px" style={{ background: "var(--gold)" }} />
              <div className="w-2 h-px" style={{ background: "var(--gold)" }} />
            </div>
            <span
              className="font-display text-2xl font-light tracking-[0.12em]"
              style={{ color: "var(--ink)" }}
            >
              NexTech
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-10 font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: "var(--ink-muted)" }}>
            {["Services", "Philosophy", "Team", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition-colors duration-400"
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
              >
                {item}
              </a>
            ))}
          </nav>
          <Link
            href="/"
            className="font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300"
            style={{ color: "var(--ink-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
          >
            Back
          </Link>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative z-20 min-h-[92vh] flex items-center">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-32 w-full">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Vertical text accent */}
            <div className="hidden md:flex md:col-span-1 justify-center">
              <p
                className="writing-vertical font-jp text-sm tracking-[0.5em]"
                style={{
                  color: "var(--ink-muted)",
                  opacity: mounted ? 1 : 0,
                  animation: mounted ? "fadeIn 1.5s 0.3s ease both" : "none",
                }}
              >
                革新と伝統の融合
              </p>
            </div>

            <div className="md:col-span-7">
              <div
                className="font-mono text-[11px] tracking-[0.3em] uppercase mb-10"
                style={{
                  color: "var(--gold)",
                  opacity: mounted ? 1 : 0,
                  animation: mounted ? "fadeIn 1s ease both" : "none",
                }}
              >
                Digital Craftsmanship Since 2018
              </div>
              <h1
                className="font-jp font-bold leading-[1.15] tracking-wide"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                  color: "var(--ink)",
                  opacity: mounted ? 1 : 0,
                  animation: mounted ? "fadeUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both" : "none",
                }}
              >
                技術という
                <br />
                <span className="gold-shimmer">美学</span>を、
                <br />
                世界へ。
              </h1>
              <p
                className="font-display text-xl md:text-2xl mt-10 max-w-lg leading-relaxed font-light italic"
                style={{
                  color: "var(--ink-light)",
                  opacity: mounted ? 1 : 0,
                  animation: mounted ? "fadeUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both" : "none",
                }}
              >
                一つひとつのプロジェクトに、
                職人の手仕事のような丁寧さを。
              </p>
            </div>

            <div
              className="md:col-span-4 flex flex-col gap-5"
              style={{
                opacity: mounted ? 1 : 0,
                animation: mounted ? "fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both" : "none",
              }}
            >
              <a
                href="#contact"
                className="font-display text-base tracking-[0.1em] text-center py-4 px-8 transition-all duration-500"
                style={{
                  background: "var(--ink)",
                  color: "var(--cream)",
                  letterSpacing: "0.15em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--gold)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--ink)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
              >
                Contact Us
              </a>
              <a
                href="#services"
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-center py-4 px-8 border transition-all duration-500"
                style={{ borderColor: "var(--ink-muted)", color: "var(--ink-light)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.color = "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--ink-muted)";
                  e.currentTarget.style.color = "var(--ink-light)";
                }}
              >
                Our Services
              </a>
            </div>
          </div>
        </div>

        {/* Decorative gold line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px"
          style={{
            width: "40%",
            background: "linear-gradient(90deg, transparent, var(--gold-light), transparent)",
            opacity: mounted ? 1 : 0,
            animation: mounted ? "expandLine 1.5s 1s cubic-bezier(0.22, 1, 0.36, 1) both" : "none",
            transformOrigin: "center",
          }}
        />
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="relative z-20 py-16 md:py-32" style={{ background: "var(--cream-dark)" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex items-start gap-12 mb-20">
            <div
              id="svc-head"
              data-reveal
              className={`reveal-up ${isRevealed("svc-head") ? "active" : ""}`}
            >
              <span
                className="font-mono text-[11px] tracking-[0.3em] uppercase block mb-4"
                style={{ color: "var(--gold)" }}
              >
                Services
              </span>
              <h2 className="font-jp text-4xl md:text-6xl font-bold" style={{ color: "var(--ink)" }}>
                三つの柱
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                num: "壱",
                en: "Web Application",
                title: "Web開発",
                desc: "React・Next.jsによる洗練されたアプリケーション。パフォーマンスと美しさを兼ね備えたプロダクトを創り上げます。",
              },
              {
                num: "弐",
                en: "Cloud Infrastructure",
                title: "クラウド基盤",
                desc: "AWS・Azure・GCPを熟知した設計者が、堅牢でスケーラブルなインフラストラクチャを構築します。",
              },
              {
                num: "参",
                en: "AI Solutions",
                title: "AI導入",
                desc: "大規模言語モデルから画像認識まで。AIの力を、お客様のビジネスに確かな価値として届けます。",
              },
            ].map((service, i) => (
              <div
                key={service.num}
                id={`svc-${i}`}
                data-reveal
                className={`service-card-lux reveal-up d${i + 1} ${isRevealed(`svc-${i}`) ? "active" : ""} p-6 md:p-10`}
                style={{ background: "var(--cream)", border: "1px solid rgba(26, 23, 20, 0.06)" }}
              >
                <span
                  className="font-jp text-5xl font-bold block mb-2"
                  style={{ color: "var(--gold-light)", opacity: 0.4 }}
                >
                  {service.num}
                </span>
                <span
                  className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-6"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {service.en}
                </span>
                <h3
                  className="font-jp text-2xl font-semibold mb-4"
                  style={{ color: "var(--ink)" }}
                >
                  {service.title}
                </h3>
                <p
                  className="font-display text-base leading-relaxed font-light"
                  style={{ color: "var(--ink-light)" }}
                >
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY / ABOUT ===== */}
      <section id="philosophy" className="relative z-20 py-16 md:py-32">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">
            <div className="md:col-span-5">
              <div
                id="phil-head"
                data-reveal
                className={`reveal-up ${isRevealed("phil-head") ? "active" : ""}`}
              >
                <span
                  className="font-mono text-[11px] tracking-[0.3em] uppercase block mb-4"
                  style={{ color: "var(--gold)" }}
                >
                  Philosophy
                </span>
                <h2 className="font-jp text-4xl md:text-6xl font-bold mb-8" style={{ color: "var(--ink)" }}>
                  私たちの想い
                </h2>
              </div>
              <div
                id="phil-text"
                data-reveal
                className={`reveal-up d2 ${isRevealed("phil-text") ? "active" : ""}`}
              >
                <p
                  className="font-display text-lg leading-[2] font-light italic"
                  style={{ color: "var(--ink-light)" }}
                >
                  2018年、東京——。テクノロジーを「道具」としてではなく、
                  「表現」として捉え直すところから、NexTechは始まりました。
                </p>
                <p
                  className="font-display text-lg leading-[2] font-light italic mt-6"
                  style={{ color: "var(--ink-light)" }}
                >
                  コードの一行一行に意味を。設計の一つひとつに美意識を。
                  300社を超えるパートナーと共に歩んできた道のりが、
                  私たちの確かな指針です。
                </p>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="grid grid-cols-2 gap-3 md:gap-6">
                {[
                  { value: "2018", label: "創業", sub: "Year Founded" },
                  { value: "120", label: "匠", sub: "Engineers", suffix: "名" },
                  { value: "300", label: "縁", sub: "Partnerships", suffix: "社+" },
                  { value: "500", label: "作品", sub: "Projects", suffix: "件+" },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    id={`stat2-${i}`}
                    data-reveal
                    className={`reveal-up d${i + 1} ${isRevealed(`stat2-${i}`) ? "active" : ""} p-4 md:p-8 text-center`}
                    style={{ border: "1px solid rgba(26, 23, 20, 0.06)" }}
                  >
                    <div
                      className="font-display text-4xl md:text-5xl font-light"
                      style={{ color: "var(--gold)" }}
                    >
                      {stat.value}
                      {stat.suffix && (
                        <span className="text-2xl" style={{ color: "var(--gold-light)" }}>
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <div
                      className="font-jp text-lg mt-2"
                      style={{ color: "var(--ink)" }}
                    >
                      {stat.label}
                    </div>
                    <div
                      className="font-mono text-[10px] tracking-[0.15em] uppercase mt-1"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-4 md:px-8">
        <div
          className="h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold-light) 30%, var(--gold-light) 70%, transparent)" }}
        />
      </div>

      {/* ===== TEAM ===== */}
      <section id="team" className="relative z-20 py-16 md:py-32">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div
            id="team2-head"
            data-reveal
            className={`reveal-up ${isRevealed("team2-head") ? "active" : ""} mb-20`}
          >
            <span
              className="font-mono text-[11px] tracking-[0.3em] uppercase block mb-4"
              style={{ color: "var(--gold)" }}
            >
              Team
            </span>
            <h2 className="font-jp text-4xl md:text-6xl font-bold" style={{ color: "var(--ink)" }}>
              匠たち
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10">
            {[
              { name: "田中 太郎", role: "CEO / Founder", kanji: "創" },
              { name: "佐藤 花子", role: "CTO", kanji: "智" },
              { name: "鈴木 一郎", role: "Lead Engineer", kanji: "技" },
              { name: "高橋 美咲", role: "Design Lead", kanji: "美" },
            ].map((member, i) => (
              <div
                key={member.name}
                id={`tm-${i}`}
                data-reveal
                className={`team-portrait reveal-up d${i + 1} ${isRevealed(`tm-${i}`) ? "active" : ""} text-center`}
              >
                <div
                  className="portrait-frame w-full aspect-[3/4] mb-6 border-2 flex items-center justify-center transition-all duration-600"
                  style={{
                    borderColor: "rgba(26, 23, 20, 0.08)",
                    background: "linear-gradient(180deg, var(--cream-dark) 0%, var(--cream) 100%)",
                  }}
                >
                  <span
                    className="font-jp text-6xl font-bold"
                    style={{ color: "var(--gold-light)", opacity: 0.25 }}
                  >
                    {member.kanji}
                  </span>
                </div>
                <h3
                  className="portrait-name font-jp text-lg font-semibold transition-colors duration-400"
                  style={{ color: "var(--ink)" }}
                >
                  {member.name}
                </h3>
                <p
                  className="font-mono text-[10px] tracking-[0.15em] uppercase mt-1"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section
        id="contact"
        className="relative z-20 py-16 md:py-32"
        style={{ background: "var(--cream-dark)" }}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <div
                id="ct-head"
                data-reveal
                className={`reveal-up ${isRevealed("ct-head") ? "active" : ""}`}
              >
                <span
                  className="font-mono text-[11px] tracking-[0.3em] uppercase block mb-4"
                  style={{ color: "var(--gold)" }}
                >
                  Contact
                </span>
                <h2 className="font-jp text-4xl md:text-6xl font-bold" style={{ color: "var(--ink)" }}>
                  お便り
                </h2>
                <p
                  className="font-display text-lg font-light italic mt-6 leading-relaxed"
                  style={{ color: "var(--ink-light)" }}
                >
                  お気軽にお声がけください。
                  <br />
                  二営業日以内にご返信いたします。
                </p>
              </div>
            </div>
            <div className="md:col-span-8">
              <form
                id="ct-form"
                data-reveal
                className={`reveal-up d2 ${isRevealed("ct-form") ? "active" : ""} space-y-6 md:space-y-10`}
              >
                <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                  <div>
                    <label
                      className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-2"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      お名前
                    </label>
                    <input type="text" className="input-lux" placeholder="Your name" />
                  </div>
                  <div>
                    <label
                      className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-2"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      メールアドレス
                    </label>
                    <input type="email" className="input-lux" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label
                    className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-2"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    ご用件
                  </label>
                  <textarea
                    rows={4}
                    className="input-lux resize-none"
                    placeholder="How can we help?"
                    style={{ borderBottom: "1px solid var(--ink-muted)" }}
                  />
                </div>
                <button
                  type="submit"
                  className="font-display text-base tracking-[0.15em] py-4 px-12 transition-all duration-500"
                  style={{
                    background: "var(--ink)",
                    color: "var(--cream)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--gold)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--ink)";
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        className="relative z-20 py-10"
        style={{ borderTop: "1px solid rgba(26, 23, 20, 0.06)" }}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-4 h-px" style={{ background: "var(--gold)" }} />
              <div className="w-2 h-px" style={{ background: "var(--gold)" }} />
            </div>
            <span
              className="font-display text-sm tracking-[0.1em] font-light"
              style={{ color: "var(--ink-light)" }}
            >
              NexTech Solutions
            </span>
          </div>
          <span
            className="font-mono text-[10px] tracking-[0.15em] uppercase"
            style={{ color: "var(--ink-muted)" }}
          >
            &copy; 2025 All Rights Reserved
          </span>
        </div>
      </footer>
    </div>
  );
}
