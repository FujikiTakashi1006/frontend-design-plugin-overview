"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ════════════════════════════════════════════════════════
   Aether Intelligence — Hero Page
   ════════════════════════════════════════════════════════ */

/* ─── Staggered text reveal (blur → clear, per-character) ─── */
function TextReveal({
  text,
  delay = 0,
  className = "",
  as: Tag = "span",
}: {
  text: string;
  delay?: number;
  className?: string;
  as?: "span" | "h1" | "p" | "div";
}) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const chars = text.split("");

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: "inline-block",
            opacity: revealed ? 1 : 0,
            filter: revealed ? "blur(0px)" : "blur(12px)",
            transform: revealed ? "translateY(0)" : "translateY(8px)",
            transition: `all 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${i * 30}ms`,
            whiteSpace: ch === " " ? "pre" : undefined,
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </Tag>
  );
}

/* ─── Fade-up element ─── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: show ? 1 : 0,
        filter: show ? "blur(0px)" : "blur(6px)",
        transform: show ? "translateY(0)" : "translateY(24px)",
        transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Mesh gradient blobs (CSS animated) ─── */
function MeshGradient() {
  return (
    <>
      <style>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(80px, -60px) scale(1.15); }
          50% { transform: translate(-40px, 80px) scale(0.9); }
          75% { transform: translate(60px, 40px) scale(1.08); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-100px, 50px) scale(1.1); }
          50% { transform: translate(60px, -80px) scale(0.95); }
          75% { transform: translate(-30px, -40px) scale(1.12); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, 70px) scale(0.92); }
          50% { transform: translate(-80px, -30px) scale(1.18); }
          75% { transform: translate(40px, -60px) scale(0.97); }
        }
        @keyframes blob4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(-60px, -80px) scale(1.1); }
          60% { transform: translate(70px, 50px) scale(0.88); }
          80% { transform: translate(-20px, 60px) scale(1.05); }
        }
        @keyframes shimmer {
          0% { opacity: 0.4; }
          50% { opacity: 0.7; }
          100% { opacity: 0.4; }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        {/* Blob 1 — Purple, top-right */}
        <div
          style={{
            position: "absolute",
            width: "min(55vw, 700px)",
            height: "min(55vw, 700px)",
            top: "-8%",
            right: "-5%",
            background:
              "radial-gradient(circle, rgba(124, 58, 237, 0.22) 0%, rgba(124, 58, 237, 0.04) 50%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)",
            animation: "blob1 20s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        {/* Blob 2 — Blue, bottom-left */}
        <div
          style={{
            position: "absolute",
            width: "min(50vw, 650px)",
            height: "min(50vw, 650px)",
            bottom: "-12%",
            left: "-8%",
            background:
              "radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, rgba(37, 99, 235, 0.03) 50%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(50px)",
            animation: "blob2 25s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        {/* Blob 3 — Cyan, center */}
        <div
          style={{
            position: "absolute",
            width: "min(40vw, 500px)",
            height: "min(40vw, 500px)",
            top: "30%",
            left: "35%",
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(6, 182, 212, 0.02) 50%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(45px)",
            animation: "blob3 18s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        {/* Blob 4 — Violet, bottom-right */}
        <div
          style={{
            position: "absolute",
            width: "min(35vw, 450px)",
            height: "min(35vw, 450px)",
            bottom: "5%",
            right: "15%",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.14) 0%, rgba(139, 92, 246, 0.02) 50%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(55px)",
            animation: "blob4 22s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        {/* Subtle shimmer overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, transparent 30%, rgba(124, 58, 237, 0.03) 50%, transparent 70%)",
            animation: "shimmer 8s ease-in-out infinite",
          }}
        />
      </div>
    </>
  );
}

/* ─── Mouse-reactive light spot ─── */
function MouseLight() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    ref.current.style.left = `${e.clientX}px`;
    ref.current.style.top = `${e.clientY}px`;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [handleMove]);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 60%)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 1,
        transition: "left 0.3s ease-out, top 0.3s ease-out",
      }}
    />
  );
}

/* ─── Floating particles ─── */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }[] = [];

    const colors = [
      "124, 58, 237",
      "37, 99, 235",
      "6, 182, 212",
      "139, 92, 246",
    ];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx!.fill();

        // Glow
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color}, ${p.alpha * 0.15})`;
        ctx!.fill();
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(124, 58, 237, ${0.06 * (1 - dist / 150)})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      frame = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}

/* ─── Navigation ─── */
function Nav({ visible }: { visible: boolean }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.25rem 3rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
        backdropFilter: "blur(12px)",
        background: "rgba(248, 250, 252, 0.7)",
        borderBottom: "1px solid rgba(124, 58, 237, 0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {/* Logo mark */}
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #7c3aed, #2563eb)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 12px rgba(124, 58, 237, 0.25)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
            <line x1="12" y1="22" x2="12" y2="15.5" />
            <polyline points="22 8.5 12 15.5 2 8.5" />
            <polyline points="2 15.5 12 8.5 22 15.5" />
            <line x1="12" y1="2" x2="12" y2="8.5" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "1.2rem",
            fontWeight: 400,
            color: "#0f172a",
            letterSpacing: "-0.02em",
          }}
        >
          Aether
        </span>
      </div>

      <div
        className="aether-nav-links"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
          fontSize: "0.85rem",
          fontWeight: 400,
          color: "#475569",
        }}
      >
        {["Products", "Solutions", "Research", "Company"].map((item) => (
          <a
            key={item}
            href="#"
            style={{
              color: "inherit",
              textDecoration: "none",
              transition: "color 0.2s",
              position: "relative",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#7c3aed")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "#475569")
            }
          >
            {item}
          </a>
        ))}
        <a
          href="#"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #2563eb)",
            color: "white",
            padding: "0.5rem 1.25rem",
            borderRadius: "9px",
            fontSize: "0.82rem",
            fontWeight: 500,
            textDecoration: "none",
            boxShadow:
              "0 2px 12px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 4px 20px rgba(124, 58, 237, 0.45), inset 0 1px 0 rgba(255,255,255,0.15)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 2px 12px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}

/* ─── Main Page ─── */
export default function AetherHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        .aether-hero {
          --purple: #7c3aed;
          --blue: #2563eb;
          --cyan: #06b6d4;
          --bg: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 40%, #ede9fe 100%);
          --text: #0f172a;
          --text2: #475569;
          --text3: #94a3b8;

          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          background: var(--bg);
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .aether-hero *, .aether-hero *::before, .aether-hero *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .aether-headline {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(2.8rem, 7vw, 6rem);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--text);
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .aether-headline-gradient {
          background: linear-gradient(135deg, var(--purple), var(--blue), var(--cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .aether-sub {
          font-size: clamp(0.95rem, 1.5vw, 1.15rem);
          color: var(--text2);
          text-align: center;
          line-height: 1.8;
          max-width: 560px;
          font-weight: 300;
          letter-spacing: 0.01em;
          position: relative;
          z-index: 2;
        }

        .aether-cta-row {
          display: flex;
          gap: 1rem;
          position: relative;
          z-index: 2;
        }

        .aether-btn-primary {
          background: linear-gradient(135deg, var(--purple), var(--blue));
          color: white;
          padding: 0.85rem 2.2rem;
          border-radius: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.92rem;
          font-weight: 500;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.35), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .aether-btn-primary:hover {
          box-shadow: 0 8px 32px rgba(124, 58, 237, 0.5), inset 0 1px 0 rgba(255,255,255,0.15);
          transform: translateY(-2px);
        }

        .aether-btn-secondary {
          background: rgba(255, 255, 255, 0.6);
          color: var(--purple);
          padding: 0.85rem 2.2rem;
          border-radius: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.92rem;
          font-weight: 500;
          border: 1px solid rgba(124, 58, 237, 0.2);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          backdrop-filter: blur(8px);
        }
        .aether-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.85);
          border-color: rgba(124, 58, 237, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(124, 58, 237, 0.12);
        }

        .aether-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 1rem;
          border-radius: 100px;
          background: rgba(124, 58, 237, 0.06);
          border: 1px solid rgba(124, 58, 237, 0.12);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--purple);
          letter-spacing: 0.02em;
          position: relative;
          z-index: 2;
        }
        .aether-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--purple);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }

        .aether-trust {
          display: flex;
          align-items: center;
          gap: 2rem;
          font-size: 0.72rem;
          color: var(--text3);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-weight: 500;
          position: relative;
          z-index: 2;
        }
        .aether-trust-divider {
          width: 1px;
          height: 16px;
          background: rgba(148, 163, 184, 0.3);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .aether-hero {
            padding: 0 1.5rem;
          }
          .aether-nav-links {
            display: none !important;
          }
          .aether-cta-row {
            flex-direction: column;
            width: 100%;
            max-width: 320px;
          }
          .aether-btn-primary,
          .aether-btn-secondary {
            justify-content: center;
          }
          .aether-trust {
            flex-direction: column;
            gap: 0.75rem;
          }
          .aether-trust-divider {
            display: none;
          }
        }
      `}</style>

      <div className="aether-hero" suppressHydrationWarning>
        <MeshGradient />
        <Particles />
        <MouseLight />
        <Nav visible={mounted} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.75rem",
            padding: "0 2rem",
            maxWidth: "900px",
          }}
        >
          {/* Badge */}
          <FadeUp delay={300}>
            <div className="aether-badge">
              <span className="aether-badge-dot" />
              Trusted by Fortune 500 enterprises
            </div>
          </FadeUp>

          {/* Headline */}
          <div className="aether-headline" style={{ marginTop: "0.5rem" }}>
            <TextReveal
              text="Intelligence that"
              delay={500}
              as="div"
            />
            <div>
              <TextReveal
                text="transforms "
                delay={800}
                className="aether-headline-gradient"
              />
              <TextReveal text="your world" delay={1000} />
            </div>
          </div>

          {/* Subtitle */}
          <FadeUp delay={1600}>
            <p className="aether-sub">
              Enterprise-grade AI infrastructure that scales from prototype to
              production. Build, deploy, and manage intelligent systems with
              confidence.
            </p>
          </FadeUp>

          {/* CTAs */}
          <FadeUp delay={2000}>
            <div className="aether-cta-row">
              <a href="#" className="aether-btn-primary">
                Start Building
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="#" className="aether-btn-secondary">
                View Documentation
              </a>
            </div>
          </FadeUp>

          {/* Trust indicators */}
          <FadeUp delay={2400}>
            <div className="aether-trust">
              <span>SOC 2 Certified</span>
              <span className="aether-trust-divider" />
              <span>99.99% Uptime</span>
              <span className="aether-trust-divider" />
              <span>500+ Enterprise Clients</span>
            </div>
          </FadeUp>
        </div>
      </div>
    </>
  );
}
