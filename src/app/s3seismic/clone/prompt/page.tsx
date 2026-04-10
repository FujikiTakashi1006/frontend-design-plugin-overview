"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import React from "react";
import Link from "next/link";

/* ─── Intersection Observer reveal ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, seen };
}

function Fade({ children, delay = 0, y = 40, className = "" }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string;
}) {
  const { ref, seen } = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: seen ? 1 : 0,
      transform: seen ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.8s cubic-bezier(0.25,1,0.5,1) ${delay}ms, transform 0.8s cubic-bezier(0.25,1,0.5,1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* ─── Counter animation ─── */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const { ref, seen } = useReveal();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / 1200, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [seen, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ─── Header with scroll behavior ─── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [whatWeDoOpen, setWhatWeDoOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 50); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solutions = [
    { name: "Geothermal energy", href: "#" },
    { name: "New energies", href: "#" },
    { name: "Carbon capture", href: "#" },
    { name: "Oil & gas", href: "#" },
    { name: "Mining", href: "#" },
    { name: "Geological risk", href: "#" },
    { name: "Civil engineering", href: "#" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      boxShadow: scrolled ? "0 1px 10px rgba(0,0,0,0.06)" : "none",
      transition: "all 0.4s ease",
      padding: scrolled ? "0.8rem 2rem" : "1.5rem 2rem",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
            <rect width="42" height="42" rx="8" fill="#2b394c" />
            <text x="8" y="30" fill="#13d8cb" fontWeight="800" fontSize="24" fontFamily="sans-serif">S³</text>
          </svg>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#2b394c", letterSpacing: "0.15em", textTransform: "uppercase" }}>Smart Seismic</span>
            <span style={{ fontSize: "0.6rem", fontWeight: 500, color: "#4e5d73", letterSpacing: "0.15em", textTransform: "uppercase" }}>Solutions</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="s3-desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2rem", fontSize: "0.82rem", fontWeight: 500, color: scrolled ? "#2b394c" : "#fff" }}>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Home</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Who we are</a>
          <div style={{ position: "relative" }}
            onMouseEnter={() => setWhatWeDoOpen(true)} onMouseLeave={() => setWhatWeDoOpen(false)}>
            <a href="#" style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              What we do <span style={{ fontSize: "0.6rem" }}>▾</span>
            </a>
            {whatWeDoOpen && (
              <div style={{
                position: "absolute", top: "100%", left: "-1rem", paddingTop: "0.5rem",
                background: "#fff", borderRadius: 8, boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
                minWidth: 220, overflow: "hidden", zIndex: 10,
              }}>
                {solutions.map((s) => (
                  <a key={s.name} href={s.href} style={{
                    display: "block", padding: "0.65rem 1.2rem", color: "#2b394c", textDecoration: "none",
                    fontSize: "0.82rem", transition: "background 0.15s",
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f0faf9")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >{s.name}</a>
                ))}
              </div>
            )}
          </div>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Our projects</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Videos</a>

          {/* Language */}
          <div style={{ position: "relative" }}
            onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
            <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}>EN <span style={{ fontSize: "0.6rem" }}>▾</span></span>
            {langOpen && (
              <div style={{ position: "absolute", top: "100%", right: 0, paddingTop: "0.5rem", background: "#fff", borderRadius: 8, boxShadow: "0 10px 40px rgba(0,0,0,0.12)", minWidth: 120, overflow: "hidden" }}>
                <a href="#" style={{ display: "block", padding: "0.5rem 1rem", color: "#2b394c", textDecoration: "none", fontSize: "0.8rem" }}>Deutsch</a>
                <a href="#" style={{ display: "block", padding: "0.5rem 1rem", color: "#2b394c", textDecoration: "none", fontSize: "0.8rem" }}>English</a>
                <a href="#" style={{ display: "block", padding: "0.5rem 1rem", color: "#2b394c", textDecoration: "none", fontSize: "0.8rem" }}>Français</a>
              </div>
            )}
          </div>

          {/* CTA */}
          <a href="#contact" style={{
            background: "#13d8cb", color: "#fff", padding: "0.6rem 1.5rem",
            borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: "0.82rem",
            transition: "background 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0fc4b8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#13d8cb")}
          >Contact us</a>
        </nav>
      </div>
    </header>
  );
}

/* ─── Wave Divider SVG ─── */
function WaveDivider({ color = "#f8f9fb", flip = false }: { color?: string; flip?: boolean }) {
  return (
    <div style={{ width: "100%", overflow: "hidden", lineHeight: 0, transform: flip ? "rotate(180deg)" : "none" }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80 }}>
        <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1360,20 1440,40 L1440,80 L0,80 Z" fill={color} />
      </svg>
    </div>
  );
}

/* ═══════════════ PAGE ═══════════════ */
export default function S3ClonePage() {

  const expertises = [
    { num: "01", title: "Geothermal energy", subtitle: "Your Way To Energy Independence", color: "#e74c3c" },
    { num: "02", title: "New energies", subtitle: "Strategical Resources Finally Considered as such", color: "#f39c12" },
    { num: "03", title: "Carbon capture", subtitle: "Capture the Carbon, Release the Future", color: "#27ae60" },
    { num: "04", title: "Oil & gas", subtitle: "The Good the Bad and The Ugly, all at once", color: "#2b394c" },
    { num: "05", title: "Mining", subtitle: "Unearth Your Buried Treasure", color: "#8e44ad" },
    { num: "06", title: "Geological risk", subtitle: "Know Your Faults!", color: "#c0392b" },
    { num: "07", title: "Civil engineering", subtitle: "Mind the Gap: Structural incidence of digging", color: "#2980b9" },
  ];

  const clients = ["ADEME", "Andra", "CERN", "EBN", "EDF", "ENGIE", "TotalEnergies", "Equinor", "Arverne", "Lithium de France", "ASN", "Vulcan Energy"];
  const partners = ["Carbon Cuts", "Harbour", "Fugro", "Petrobras", "Repsol", "Shell", "Exxon", "BRGM", "Sercel", "VIRIDIEN", "SIG Genève", "Sonatrach"];

  const stats = [
    { value: 100, label: "years of worldwide experience", sub: "90 years as CGG LAND / 10 years as S³" },
    { value: 30, label: "countries explored", sub: "" },
    { value: 5, label: "continents visited", sub: "" },
    { value: 120, suffix: "+", label: "projects acquired", sub: "" },
  ];

  const capabilities = [
    { category: "Anywhere", items: ["CITIES", "JUNGLE", "LAND", "DESERT", "MOUNTAINS", "WATERS"] },
    { category: "Anytime", items: ["ALL SEASONS", "NIGHT & DAY", "HOT & COLD"] },
    { category: "With", items: ["THE MOST ACCURATE DATA", "SOCIAL ACCEPTABILITY", "ENVIRONMENTAL AWARENESS"] },
  ];

  return (
    <div className="s3-clone" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: "#2b394c", background: "#fff", overflowX: "hidden" }}>
      <Header />

      {/* ═══ HERO ═══ */}
      <section style={{
        position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", background: "#1a2634",
      }}>
        {/* Background image overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(https://www.s3seismic.com/wp-content/uploads/2024/05/S3-AMSTERDAM-EBN-SHALLOW-AIRGUN-14-2560x1920.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.55, filter: "brightness(0.7)",
        }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "#fff", padding: "2rem", maxWidth: 900 }}>
          <Fade>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 300, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
              Geophysical Intelligence<br />
              <span style={{ fontWeight: 700 }}>made simple</span>
            </h1>
          </Fade>
          <Fade delay={200}>
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2.5rem", fontSize: "0.9rem", fontWeight: 400, opacity: 0.85, flexWrap: "wrap" }}>
              <span>Smart technology</span>
              <span style={{ width: 1, background: "rgba(255,255,255,0.3)" }} />
              <span>High-skilled people</span>
              <span style={{ width: 1, background: "rgba(255,255,255,0.3)" }} />
              <span>High-end solutions</span>
            </div>
          </Fade>
          <Fade delay={400}>
            <div style={{ marginTop: "2.5rem" }}>
              <a href="#expertise" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                border: "2px solid #13d8cb", color: "#13d8cb", padding: "0.8rem 2rem",
                borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: "0.9rem",
                transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#13d8cb"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#13d8cb"; }}
              >Explore our solutions ↓</a>
            </div>
          </Fade>
        </div>
        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", color: "rgba(255,255,255,0.5)",
        }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 30, background: "rgba(255,255,255,0.3)", animation: "scrollPulse 2s ease infinite" }} />
        </div>
      </section>

      <style>{`
        @keyframes scrollPulse { 0%,100% { opacity: 0.3; transform: scaleY(0.6); } 50% { opacity: 1; transform: scaleY(1); } }
        @media (max-width: 768px) {
          .s3-desktop-nav { display: none !important; }
          .s3-clone section { padding-left: 1.25rem !important; padding-right: 1.25rem !important; padding-top: 3rem !important; padding-bottom: 3rem !important; }
          .s3-clone header > div { padding-left: 1rem !important; padding-right: 1rem !important; }
        }
      `}</style>

      {/* ═══ INTRO ═══ */}
      <section style={{ padding: "6rem 2rem", textAlign: "center", background: "#fff" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Fade>
            <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 700, color: "#13d8cb", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              The smart way to geo data
            </h2>
          </Fade>
          <Fade delay={150}>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "#4e5d73" }}>
              Smart Seismic Solutions, called &lsquo;S³&rsquo;, is an agile and adaptable Geoscience Company deploying
              high-end technologies and high-skilled people in any kind of environment. We acquire the best and most
              accurate geophysic data, necessary to highly strategic decisions.
            </p>
          </Fade>
        </div>
      </section>

      <WaveDivider color="#f8f9fb" />

      {/* ═══ EXPERTISES ═══ */}
      <section id="expertise" style={{ padding: "4rem 2rem 6rem", background: "#f8f9fb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade>
            <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, marginBottom: "3rem" }}>
              Our <span style={{ color: "#13d8cb" }}>expertises</span>
            </h2>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {expertises.map((e, i) => (
              <Fade key={e.num} delay={i * 80}>
                <a href="#" style={{
                  display: "block", background: "#fff", borderRadius: 12,
                  overflow: "hidden", textDecoration: "none", color: "inherit",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
                >
                  <div style={{ height: 6, background: e.color }} />
                  <div style={{ padding: "1.8rem" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#13d8cb", letterSpacing: "0.1em" }}>{e.num}</span>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginTop: "0.5rem", color: "#2b394c" }}>{e.title}</h3>
                    <p style={{ fontSize: "0.85rem", color: "#4e5d73", marginTop: "0.4rem", lineHeight: 1.5, fontStyle: "italic" }}>{e.subtitle}</p>
                    <div style={{ marginTop: "1.2rem", fontSize: "0.8rem", fontWeight: 600, color: "#13d8cb", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      Explore →
                    </div>
                  </div>
                </a>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="#fff" flip />

      {/* ═══ REVEAL YOUR POTENTIAL ═══ */}
      <section style={{ padding: "6rem 2rem", background: "#fff" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, marginBottom: "1.5rem" }}>
              Reveal your <span style={{ color: "#13d8cb" }}>geological potential</span>
            </h2>
          </Fade>
          <Fade delay={100}>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#4e5d73", maxWidth: 750, margin: "0 auto 3rem" }}>
              Drawing on its long experience and expertise in geophysics, S³ has developed cutting-edge technologies
              adapted to all types and needs of environments. This technological and operational flexibility makes it
              possible to collect data over a limited period of time, in an acceptable manner to local population and environment.
            </p>
          </Fade>
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
            {capabilities.map((cap, ci) => (
              <Fade key={cap.category} delay={200 + ci * 120}>
                <div style={{ flex: "1 1 250px", maxWidth: 300, textAlign: "center" }}>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#13d8cb", marginBottom: "1rem", textTransform: "uppercase" }}>{cap.category}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
                    {cap.items.map((item) => (
                      <span key={item} style={{
                        padding: "0.4rem 0.9rem", background: "#f0faf9", borderRadius: 100,
                        fontSize: "0.72rem", fontWeight: 600, color: "#2b394c", letterSpacing: "0.05em",
                      }}>{item}</span>
                    ))}
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DATA SYMPHONY ═══ */}
      <section style={{ padding: "6rem 2rem", background: "#2b394c", color: "#fff" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", fontWeight: 300, marginBottom: "1.5rem" }}>
              Data <span style={{ fontWeight: 700, color: "#13d8cb" }}>symphony</span>
            </h2>
          </Fade>
          <Fade delay={150}>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "rgba(255,255,255,0.75)" }}>
              Earth speaks, we listen. We communicate with Earth by sound signals. How? We send acoustic vibrations
              into the subsurface, and we listen to the response given by Earth. We then know the natural structure
              of the subsoil at the area we are operating. We record it as DATA, that can be analyzed to determinate
              the subsoil potential.
            </p>
          </Fade>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section style={{ padding: "6rem 2rem", background: "#f8f9fb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Fade>
            <h2 style={{ textAlign: "center", fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "3.5rem" }}>
              Key <span style={{ color: "#13d8cb" }}>numbers</span>
            </h2>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "2rem", textAlign: "center" }}>
            {stats.map((s, i) => (
              <Fade key={i} delay={i * 100}>
                <div>
                  <div style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 800, color: "#13d8cb", lineHeight: 1 }}>
                    <Counter value={s.value} suffix={s.suffix || ""} />
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#2b394c", marginTop: "0.5rem" }}>{s.label}</div>
                  {s.sub && <div style={{ fontSize: "0.75rem", color: "#4e5d73", marginTop: "0.2rem" }}>{s.sub}</div>}
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WORLDWIDE EXPERIENCE ═══ */}
      <section style={{ padding: "6rem 2rem", background: "#fff", textAlign: "center" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "0.5rem" }}>
              A worldwide <span style={{ color: "#13d8cb" }}>experience</span>
            </h2>
            <p style={{ color: "#4e5d73", fontSize: "1rem", marginBottom: "2rem" }}>Into more than 30 countries</p>
          </Fade>
          <Fade delay={200}>
            {/* Simplified world map representation */}
            <div style={{
              background: "#f8f9fb", borderRadius: 16, padding: "3rem", position: "relative",
              display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300,
            }}>
              <div style={{ fontSize: "5rem", opacity: 0.15 }}>🌍</div>
              <div style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.2rem", fontWeight: 700, color: "#2b394c",
              }}>
                30+ countries across 5 continents
              </div>
            </div>
          </Fade>
          <Fade delay={300}>
            <a href="#" style={{
              display: "inline-block", marginTop: "2rem", color: "#13d8cb", fontWeight: 600,
              textDecoration: "none", fontSize: "0.9rem", borderBottom: "2px solid #13d8cb",
              paddingBottom: "0.2rem", transition: "color 0.2s",
            }}>All Our Projects →</a>
          </Fade>
        </div>
      </section>

      {/* ═══ CLIENTS & PARTNERS ═══ */}
      <section style={{ padding: "6rem 2rem", background: "#f8f9fb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Fade>
            <h2 style={{ textAlign: "center", fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "3rem" }}>
              Clients & <span style={{ color: "#13d8cb" }}>Partners</span>
            </h2>
          </Fade>

          {/* Clients */}
          <Fade delay={100}>
            <h3 style={{ textAlign: "center", fontSize: "0.8rem", fontWeight: 600, color: "#4e5d73", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Clients</h3>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.2rem", marginBottom: "3rem" }}>
              {clients.map((c) => (
                <div key={c} style={{
                  padding: "0.7rem 1.5rem", background: "#fff", borderRadius: 8,
                  fontSize: "0.8rem", fontWeight: 600, color: "#2b394c",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}>{c}</div>
              ))}
            </div>
          </Fade>

          {/* Partners */}
          <Fade delay={200}>
            <h3 style={{ textAlign: "center", fontSize: "0.8rem", fontWeight: 600, color: "#4e5d73", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Partners</h3>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.2rem" }}>
              {partners.map((p) => (
                <div key={p} style={{
                  padding: "0.7rem 1.5rem", background: "#fff", borderRadius: 8,
                  fontSize: "0.8rem", fontWeight: 600, color: "#2b394c",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}>{p}</div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section id="contact" style={{
        padding: "6rem 2rem", background: "linear-gradient(135deg, #2b394c 0%, #1a2634 100%)",
        textAlign: "center", color: "#fff",
      }}>
        <Fade>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 300, marginBottom: "1.5rem" }}>
            Ready for exploration?<br />
            <span style={{ fontWeight: 700, color: "#13d8cb" }}>Get your data</span>
          </h2>
        </Fade>
        <Fade delay={200}>
          <a href="#" style={{
            display: "inline-block", background: "#13d8cb", color: "#fff",
            padding: "0.9rem 2.5rem", borderRadius: 6, textDecoration: "none",
            fontWeight: 700, fontSize: "1rem", transition: "background 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0fc4b8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#13d8cb")}
          >Contact us</a>
        </Fade>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: "4rem 2rem 2rem", background: "#1a2634", color: "rgba(255,255,255,0.7)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2.5rem", marginBottom: "3rem" }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <svg width="32" height="32" viewBox="0 0 42 42" fill="none">
                  <rect width="42" height="42" rx="8" fill="#2b394c" />
                  <text x="8" y="30" fill="#13d8cb" fontWeight="800" fontSize="24" fontFamily="sans-serif">S³</text>
                </svg>
                <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>Smart Seismic Solutions</span>
              </div>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.6, fontStyle: "italic" }}>Geophysical Intelligence made simple</p>
            </div>

            {/* Offices */}
            <div>
              <h4 style={{ color: "#13d8cb", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Offices</h4>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.7 }}>
                <strong style={{ color: "#fff" }}>Main Office</strong><br />
                68 Bd Sebastopol, 75003 PARIS, FRANCE<br />
                contact@s3seismic.com
              </p>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.7, marginTop: "1rem" }}>
                <strong style={{ color: "#fff" }}>Warehouse & Workshop</strong><br />
                10A Route de Porsmin, 22200 GRÂCES, FRANCE
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 style={{ color: "#13d8cb", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Links</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["Who we are", "What we do", "Our videos", "Our projects", "Contact", "Legals"].map((l) => (
                  <a key={l} href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.82rem", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#13d8cb")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                  >{l}</a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 style={{ color: "#13d8cb", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Newsletter</h4>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input type="email" placeholder="Your email" style={{
                  flex: 1, padding: "0.6rem 1rem", borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)",
                  color: "#fff", fontSize: "0.82rem", outline: "none",
                }} />
                <button style={{
                  background: "#13d8cb", color: "#fff", border: "none", padding: "0.6rem 1.2rem",
                  borderRadius: 6, fontWeight: 600, fontSize: "0.82rem", cursor: "pointer",
                }}>Subscribe</button>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ fontSize: "0.75rem" }}>© S³ 2024</span>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="https://www.linkedin.com/company/s3-seismic/about/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.8rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#13d8cb")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >LinkedIn</a>
              <a href="https://vimeo.com/smartseismicsolutions" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.8rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#13d8cb")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >Vimeo</a>
            </div>
            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>Design by Beaucoup</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
