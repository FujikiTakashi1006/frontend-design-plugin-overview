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
      { threshold: 0.15 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return revealed;
}

export default function PluginPage() {
  const revealed = useScrollReveal();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const isRevealed = (id: string) => revealed.has(id);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "#0a0a0a",
        fontFamily: "'Instrument Serif', Georgia, serif",
        cursor: "crosshair",
      }}
    >
      {/* Custom styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;500;600;700;800&display=swap');

        .font-display { font-family: 'Syne', sans-serif; }
        .font-serif { font-family: 'Instrument Serif', Georgia, serif; }
        .font-mono { font-family: 'Space Mono', monospace; }

        @keyframes gridPulse {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.08; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px) skewY(2deg); }
          to { opacity: 1; transform: translateY(0) skewY(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes diagonalSlide {
          from { transform: translateX(-100%) rotate(-3deg); opacity: 0; }
          to { transform: translateX(0) rotate(-3deg); opacity: 1; }
        }

        @keyframes countUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .reveal { opacity: 0; }
        .reveal.active { animation: slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .reveal-delay-1.active { animation-delay: 0.1s; }
        .reveal-delay-2.active { animation-delay: 0.2s; }
        .reveal-delay-3.active { animation-delay: 0.3s; }
        .reveal-delay-4.active { animation-delay: 0.4s; }
        .reveal-delay-5.active { animation-delay: 0.5s; }

        .hover-glitch:hover {
          animation: none;
          text-shadow: 2px 0 #c8ff00, -2px 0 #0a0a0a;
        }

        .service-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(200, 255, 0, 0.1);
        }
        .service-card:hover {
          transform: translateY(-8px) rotate(-0.5deg);
          border-color: rgba(200, 255, 0, 0.5);
          box-shadow: 0 20px 60px rgba(200, 255, 0, 0.08);
        }

        .stat-block {
          transition: all 0.3s ease;
        }
        .stat-block:hover {
          background: rgba(200, 255, 0, 0.05);
        }
        .stat-block:hover .stat-number {
          transform: scale(1.05);
          text-shadow: 0 0 40px rgba(200, 255, 0, 0.3);
        }

        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          background-repeat: repeat;
        }

        .member-card {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .member-card:hover {
          transform: scale(1.02);
        }
        .member-card:hover .member-avatar {
          border-color: #c8ff00;
          box-shadow: 0 0 30px rgba(200, 255, 0, 0.2);
        }
      `}</style>

      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200, 255, 0, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200, 255, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: "gridPulse 6s ease-in-out infinite",
        }}
      />

      {/* Cursor follow glow */}
      {mounted && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            width: 300,
            height: 300,
            background: "radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)",
            transition: "left 0.3s ease-out, top 0.3s ease-out",
          }}
        />
      )}

      {/* Noise texture overlay */}
      <div className="noise-overlay fixed inset-0 pointer-events-none z-10" />

      {/* ===== HEADER ===== */}
      <header className="relative z-20 border-b" style={{ borderColor: "rgba(200, 255, 0, 0.15)" }}>
        <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#c8ff00", boxShadow: "0 0 12px rgba(200,255,0,0.5)" }}
            />
            <span
              className="font-display text-lg font-bold tracking-wider uppercase"
              style={{ color: "#c8ff00", letterSpacing: "0.15em" }}
            >
              NexTech
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-10 font-mono text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
            {["Services", "About", "Team", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover-glitch transition-colors duration-300"
                style={{ letterSpacing: "0.2em" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c8ff00")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                {item}
              </a>
            ))}
          </nav>
          <Link
            href="/"
            className="font-mono text-xs tracking-wider uppercase transition-colors duration-300"
            style={{ color: "rgba(255,255,255,0.3)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#c8ff00")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >
            ← Back
          </Link>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative z-20 min-h-[90vh] flex items-center">
        <div className="max-w-[1400px] mx-auto px-8 py-32 w-full">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <div
                className="font-mono text-xs tracking-[0.3em] uppercase mb-8"
                style={{
                  color: "#c8ff00",
                  opacity: mounted ? 1 : 0,
                  animation: mounted ? "fadeIn 0.8s ease forwards" : "none",
                }}
              >
                Digital Innovation Studio — Est. 2018
              </div>
              <h1
                className="font-display font-extrabold leading-[0.9] tracking-tight"
                style={{
                  fontSize: "clamp(3rem, 8vw, 7.5rem)",
                  color: "#fafafa",
                  opacity: mounted ? 1 : 0,
                  animation: mounted ? "slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both" : "none",
                }}
              >
                テクノロジーで
                <br />
                <span style={{ color: "#c8ff00" }}>未来</span>を
                <br />
                デザインする。
              </h1>
              <p
                className="font-serif text-xl md:text-2xl mt-10 max-w-xl leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  opacity: mounted ? 1 : 0,
                  animation: mounted ? "slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both" : "none",
                }}
              >
                最先端のテクノロジーと大胆なクリエイティビティで、
                企業のデジタルトランスフォーメーションを加速させます。
              </p>
            </div>
            <div
              className="md:col-span-4 flex flex-col gap-4"
              style={{
                opacity: mounted ? 1 : 0,
                animation: mounted ? "slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both" : "none",
              }}
            >
              <a
                href="#contact"
                className="font-display font-bold text-sm tracking-[0.15em] uppercase text-center py-5 px-8 transition-all duration-300"
                style={{
                  background: "#c8ff00",
                  color: "#0a0a0a",
                  clipPath: "polygon(0 0, 100% 0, 96% 100%, 4% 100%)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#c8ff00";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                お問い合わせ
              </a>
              <a
                href="#services"
                className="font-mono text-xs tracking-[0.2em] uppercase text-center py-5 px-8 border transition-all duration-300"
                style={{ borderColor: "rgba(200, 255, 0, 0.3)", color: "#c8ff00" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#c8ff00";
                  e.currentTarget.style.background = "rgba(200,255,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200, 255, 0, 0.3)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                サービスを見る →
              </a>
            </div>
          </div>
        </div>

        {/* Decorative diagonal line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(200,255,0,0.3) 20%, rgba(200,255,0,0.3) 80%, transparent)",
          }}
        />
      </section>

      {/* ===== MARQUEE ===== */}
      <div
        className="relative z-20 py-6 overflow-hidden"
        style={{ borderBottom: "1px solid rgba(200,255,0,0.1)" }}
      >
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mr-12">
              {["Web Development", "Cloud Architecture", "AI Solutions", "UI/UX Design", "DevOps", "Data Engineering", "Mobile Apps", "Consulting"].map(
                (text) => (
                  <span key={`${i}-${text}`} className="flex items-center gap-12">
                    <span
                      className="font-display text-sm font-bold tracking-[0.25em] uppercase"
                      style={{ color: "rgba(200,255,0,0.2)" }}
                    >
                      {text}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: "rgba(200,255,0,0.2)" }}
                    />
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===== SERVICES ===== */}
      <section id="services" className="relative z-20 py-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <div
            id="services-header"
            data-reveal
            className={`reveal ${isRevealed("services-header") ? "active" : ""}`}
          >
            <span
              className="font-mono text-xs tracking-[0.3em] uppercase block mb-4"
              style={{ color: "#c8ff00" }}
            >
              What We Do
            </span>
            <h2
              className="font-display text-5xl md:text-7xl font-extrabold"
              style={{ color: "#fafafa" }}
            >
              サービス
            </h2>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Webアプリケーション開発",
                desc: "React, Next.js, TypeScriptを駆使した、パフォーマンスとUXを極限まで追求したプロダクト開発。",
                tags: ["React", "Next.js", "TypeScript"],
              },
              {
                num: "02",
                title: "クラウドインフラ構築",
                desc: "AWS・Azure・GCPのマルチクラウド環境を、IaCで完全自動化。スケールと耐障害性を両立。",
                tags: ["AWS", "Terraform", "Kubernetes"],
              },
              {
                num: "03",
                title: "AIソリューション",
                desc: "LLM・機械学習・コンピュータビジョンを活用した、業務を根本から変えるインテリジェンス。",
                tags: ["LLM", "ML", "Computer Vision"],
              },
            ].map((service, i) => (
              <div
                key={service.num}
                id={`service-${i}`}
                data-reveal
                className={`service-card reveal reveal-delay-${i + 1} ${isRevealed(`service-${i}`) ? "active" : ""} p-8 md:p-10`}
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <span
                  className="font-mono text-6xl font-bold block mb-8"
                  style={{ color: "rgba(200,255,0,0.15)" }}
                >
                  {service.num}
                </span>
                <h3
                  className="font-display text-xl font-bold mb-4"
                  style={{ color: "#fafafa" }}
                >
                  {service.title}
                </h3>
                <p
                  className="font-serif text-base leading-relaxed mb-8"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 border"
                      style={{ borderColor: "rgba(200,255,0,0.2)", color: "rgba(200,255,0,0.5)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT / STATS ===== */}
      <section id="about" className="relative z-20">
        {/* Diagonal accent bar */}
        <div
          className="w-full h-32 -mb-16"
          style={{
            background: "linear-gradient(135deg, #c8ff00 0%, rgba(200,255,0,0.3) 100%)",
            clipPath: "polygon(0 60%, 100% 0, 100% 40%, 0 100%)",
          }}
        />
        <div className="py-32" style={{ background: "rgba(200,255,0,0.02)" }}>
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid md:grid-cols-12 gap-16">
              <div className="md:col-span-5">
                <div
                  id="about-header"
                  data-reveal
                  className={`reveal ${isRevealed("about-header") ? "active" : ""}`}
                >
                  <span
                    className="font-mono text-xs tracking-[0.3em] uppercase block mb-4"
                    style={{ color: "#c8ff00" }}
                  >
                    About Us
                  </span>
                  <h2
                    className="font-display text-5xl md:text-7xl font-extrabold mb-8"
                    style={{ color: "#fafafa" }}
                  >
                    会社概要
                  </h2>
                </div>
                <div
                  id="about-text"
                  data-reveal
                  className={`reveal reveal-delay-2 ${isRevealed("about-text") ? "active" : ""}`}
                >
                  <p
                    className="font-serif text-lg leading-relaxed mb-6"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    2018年、東京。「テクノロジーで社会のOSを書き換える」——
                    その野心から、NexTech Solutionsは始まりました。
                  </p>
                  <p
                    className="font-serif text-lg leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    大手企業からスタートアップまで、300社を超える企業のデジタル革新を推進。
                    Web開発、クラウド構築、AI導入——あらゆるフェーズで、
                    テクノロジーの可能性を最大化します。
                  </p>
                </div>
              </div>
              <div className="md:col-span-7">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: "2018", label: "設立年", suffix: "" },
                    { num: "120", label: "エンジニア", suffix: "+" },
                    { num: "300", label: "取引企業数", suffix: "+" },
                    { num: "500", label: "完了プロジェクト", suffix: "+" },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      id={`stat-${i}`}
                      data-reveal
                      className={`stat-block reveal reveal-delay-${i + 1} ${isRevealed(`stat-${i}`) ? "active" : ""} p-8 border`}
                      style={{ borderColor: "rgba(200,255,0,0.1)" }}
                    >
                      <div
                        className="stat-number font-display text-5xl md:text-6xl font-extrabold transition-all duration-500"
                        style={{ color: "#c8ff00" }}
                      >
                        {stat.num}
                        <span className="text-3xl">{stat.suffix}</span>
                      </div>
                      <div
                        className="font-mono text-[10px] tracking-[0.2em] uppercase mt-3"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section id="team" className="relative z-20 py-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <div
            id="team-header"
            data-reveal
            className={`reveal ${isRevealed("team-header") ? "active" : ""}`}
          >
            <span
              className="font-mono text-xs tracking-[0.3em] uppercase block mb-4"
              style={{ color: "#c8ff00" }}
            >
              Our People
            </span>
            <h2
              className="font-display text-5xl md:text-7xl font-extrabold mb-4"
              style={{ color: "#fafafa" }}
            >
              チーム
            </h2>
            <p className="font-serif text-lg" style={{ color: "rgba(255,255,255,0.4)" }}>
              異能が集まる場所。
            </p>
          </div>
          <div className="mt-20 grid md:grid-cols-4 gap-6">
            {[
              { name: "田中 太郎", role: "CEO / Founder", tag: "Vision" },
              { name: "佐藤 花子", role: "CTO", tag: "Architecture" },
              { name: "鈴木 一郎", role: "Lead Engineer", tag: "Execution" },
              { name: "高橋 美咲", role: "Design Lead", tag: "Aesthetics" },
            ].map((member, i) => (
              <div
                key={member.name}
                id={`member-${i}`}
                data-reveal
                className={`member-card reveal reveal-delay-${i + 1} ${isRevealed(`member-${i}`) ? "active" : ""} p-6 border`}
                style={{ borderColor: "rgba(200,255,0,0.1)", background: "rgba(255,255,255,0.01)" }}
              >
                <div
                  className="member-avatar w-full aspect-square mb-6 border-2 transition-all duration-500"
                  style={{
                    borderColor: "rgba(200,255,0,0.15)",
                    background: `linear-gradient(135deg, rgba(200,255,0,${0.03 + i * 0.02}) 0%, rgba(200,255,0,0.01) 100%)`,
                  }}
                />
                <span
                  className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-2"
                  style={{ color: "#c8ff00" }}
                >
                  {member.tag}
                </span>
                <h3
                  className="font-display text-lg font-bold"
                  style={{ color: "#fafafa" }}
                >
                  {member.name}
                </h3>
                <p
                  className="font-mono text-xs tracking-wider mt-1"
                  style={{ color: "rgba(255,255,255,0.3)" }}
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
        className="relative z-20 py-32"
        style={{ borderTop: "1px solid rgba(200,255,0,0.1)" }}
      >
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <div
                id="contact-header"
                data-reveal
                className={`reveal ${isRevealed("contact-header") ? "active" : ""}`}
              >
                <span
                  className="font-mono text-xs tracking-[0.3em] uppercase block mb-4"
                  style={{ color: "#c8ff00" }}
                >
                  Get In Touch
                </span>
                <h2
                  className="font-display text-5xl md:text-7xl font-extrabold"
                  style={{ color: "#fafafa" }}
                >
                  お問い合わせ
                </h2>
                <p
                  className="font-serif text-lg mt-6"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  プロジェクトの相談、見積もり依頼、何でもお気軽に。
                  48時間以内にご返信いたします。
                </p>
              </div>
            </div>
            <div className="md:col-span-7">
              <form
                id="contact-form"
                data-reveal
                className={`reveal reveal-delay-2 ${isRevealed("contact-form") ? "active" : ""} space-y-6`}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      お名前
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b-2 py-3 font-serif text-lg outline-none transition-colors duration-300 focus:border-[#c8ff00]"
                      style={{ borderColor: "rgba(200,255,0,0.15)", color: "#fafafa" }}
                    />
                  </div>
                  <div>
                    <label
                      className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      className="w-full bg-transparent border-b-2 py-3 font-serif text-lg outline-none transition-colors duration-300 focus:border-[#c8ff00]"
                      style={{ borderColor: "rgba(200,255,0,0.15)", color: "#fafafa" }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    お問い合わせ内容
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-transparent border-b-2 py-3 font-serif text-lg outline-none transition-colors duration-300 focus:border-[#c8ff00] resize-none"
                    style={{ borderColor: "rgba(200,255,0,0.15)", color: "#fafafa" }}
                  />
                </div>
                <button
                  type="submit"
                  className="font-display font-bold text-sm tracking-[0.15em] uppercase py-5 px-12 transition-all duration-300"
                  style={{
                    background: "#c8ff00",
                    color: "#0a0a0a",
                    clipPath: "polygon(0 0, 100% 0, 96% 100%, 4% 100%)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#c8ff00";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  送信する
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        className="relative z-20 py-12"
        style={{ borderTop: "1px solid rgba(200,255,0,0.1)" }}
      >
        <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#c8ff00" }}
            />
            <span
              className="font-display text-sm font-bold tracking-[0.15em] uppercase"
              style={{ color: "rgba(200,255,0,0.5)" }}
            >
              NexTech Solutions
            </span>
          </div>
          <span
            className="font-mono text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            © 2025 All Rights Reserved
          </span>
        </div>
      </footer>
    </div>
  );
}
