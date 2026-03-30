"use client";

import Image from "next/image";
import { cn } from "../_utils";

/* ------------------------------------------------------------------ */
/*  Concentric Circles SVG                                            */
/* ------------------------------------------------------------------ */

function ConcentricCircles({ className }: { className?: string }) {
  const rings = Array.from({ length: 10 }, (_, i) => i);

  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden
    >
      {/* Salmon / orange shadow rings behind teal */}
      {rings.map((i) => {
        const r = 40 + i * 28;
        return (
          <circle
            key={`orange-${i}`}
            cx="300"
            cy="300"
            r={r + 3}
            stroke="#ff6006"
            strokeOpacity={0.08 + i * 0.01}
            strokeWidth="1"
            strokeDasharray={i % 2 === 0 ? "6 8" : "3 6"}
            fill="none"
          />
        );
      })}

      {/* Main teal rings */}
      {rings.map((i) => {
        const r = 40 + i * 28;
        return (
          <circle
            key={`teal-${i}`}
            cx="300"
            cy="300"
            r={r}
            stroke="#13d8cb"
            strokeOpacity={0.15 + i * 0.06}
            strokeWidth="1.2"
            strokeDasharray={i % 3 === 0 ? "8 6" : i % 3 === 1 ? "4 8" : "2 4"}
            fill="none"
          />
        );
      })}

      {/* Vertical line from center going downward */}
      <line
        x1="300"
        y1="300"
        x2="300"
        y2="600"
        stroke="#13d8cb"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />

      {/* Center teal dot */}
      <circle cx="300" cy="300" r="5" fill="#13d8cb" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll Indicator (animated double chevron)                         */
/* ------------------------------------------------------------------ */

function ScrollIndicator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-0 animate-[heroChevronBounce_2s_ease-in-out_infinite]",
        className,
      )}
      aria-hidden
    >
      <svg
        width="24"
        height="14"
        viewBox="0 0 24 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2L12 12L22 2"
          stroke="#ff6006"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        width="24"
        height="14"
        viewBox="0 0 24 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="-mt-1.5"
      >
        <path
          d="M2 2L12 12L22 2"
          stroke="#ff6006"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Video Card                                                         */
/* ------------------------------------------------------------------ */

function VideoCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-[340px] rounded-2xl bg-white shadow-[0_4px_30px_rgba(0,0,0,0.08)] overflow-hidden",
        className,
      )}
    >
      {/* Thumbnail with play button overlay */}
      <div className="relative aspect-video">
        <Image
          src="/s3seismic-images/S3-LAND-EDF-CRUAS-1-480x271.jpg"
          alt="S3 Seismic field operations"
          fill
          className="object-cover rounded-t-xl"
          sizes="340px"
        />

        {/* Play button */}
        <button
          type="button"
          className="absolute inset-0 flex items-center justify-center"
          aria-label="Play video"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110">
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 1L17 10L2 19V1Z" fill="#233041" />
            </svg>
          </span>
        </button>
      </div>

      {/* Description */}
      <div className="px-5 py-5">
        <p className="text-sm leading-[1.6] text-[#4e5d73]">
          Smart Seismic Solutions, called &laquo;S&sup3;&raquo;, is an agile and
          adaptable Geoscience Company deploying high-end technologies and
          high-skilled people in any kind of environment. We acquire the best and
          most accurate geophysic data, necessary to highly strategic decisions.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scattered Taglines                                                 */
/* ------------------------------------------------------------------ */

interface TaglineProps {
  text: string;
  className?: string;
}

function Tagline({ text, className }: TaglineProps) {
  return (
    <span
      className={cn(
        "absolute text-[11px] font-semibold uppercase tracking-[0.15em] text-[#4e5d73] whitespace-nowrap",
        className,
      )}
    >
      {text}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main HeroSection Component                                         */
/* ------------------------------------------------------------------ */

export function HeroSection() {
  return (
    <section
      className="relative min-h-svh overflow-hidden bg-[#f2f5f8] px-8 max-md:px-5"
      aria-label="Hero"
    >
      {/* ---- Keyframe injection (scoped) ---- */}
      <style>{`
        @keyframes heroChevronBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>

      {/* ========== Large watermark display text ========== */}

      {/* "THE SMART WAY" — top-left */}
      <div
        className={cn(
          "pointer-events-none absolute font-[Saira] uppercase",
          "left-8 top-[12%] max-md:top-[8%]",
          "text-[clamp(40px,8.3vw,120px)] font-extralight leading-[0.95] tracking-[0.04em]",
          "text-[#233041]/[0.15]",
          "w-[50%] max-md:w-[85%]",
        )}
        aria-hidden
      >
        THE SMART WAY
      </div>

      {/* "TO" — right side, large */}
      <div
        className={cn(
          "pointer-events-none absolute font-[Saira] uppercase",
          "right-8 top-[32%] max-md:top-[22%]",
          "text-[clamp(50px,10vw,160px)] font-extralight leading-[0.95] tracking-[0.04em]",
          "text-[#233041]/[0.15] text-right",
        )}
        aria-hidden
      >
        TO
      </div>

      {/* "GEO DATA" — right side, below "TO" */}
      <div
        className={cn(
          "pointer-events-none absolute font-[Saira] uppercase",
          "right-8 top-[46%] max-md:top-[30%]",
          "text-[clamp(40px,8.3vw,120px)] font-extralight leading-[0.95] tracking-[0.04em]",
          "text-[#233041]/[0.15] text-right",
        )}
        aria-hidden
      >
        GEO DATA
      </div>

      {/* ========== Scattered taglines ========== */}
      <div className="pointer-events-none absolute inset-0 max-md:hidden" aria-hidden>
        <Tagline
          text="GEOPHYSICAL INTELLIGENCE MADE SIMPLE"
          className="left-[18%] top-[26%]"
        />
        <Tagline
          text="SMART TECHNOLOGY"
          className="left-[22%] top-[42%]"
        />
        <Tagline
          text="HIGH-SKILLED PEOPLE"
          className="left-[44%] top-[42%]"
        />
        <Tagline
          text="HIGH-END SOLUTIONS"
          className="left-[28%] top-[52%]"
        />
        <Tagline
          text="BEST EQUIPMENT FOR BETTER OPERATIONS"
          className="left-[20%] top-[62%]"
        />
      </div>

      {/* Mobile taglines (stacked) */}
      <div className="pointer-events-none absolute left-5 top-[40%] flex flex-col gap-3 md:hidden" aria-hidden>
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4e5d73]">
          GEOPHYSICAL INTELLIGENCE MADE SIMPLE
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4e5d73]">
          SMART TECHNOLOGY
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4e5d73]">
          HIGH-SKILLED PEOPLE
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4e5d73]">
          HIGH-END SOLUTIONS
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4e5d73]">
          BEST EQUIPMENT FOR BETTER OPERATIONS
        </span>
      </div>

      {/* ========== Concentric circles ========== */}
      <ConcentricCircles className="absolute bottom-[8%] left-1/2 h-[420px] w-[420px] -translate-x-1/2 max-md:h-[260px] max-md:w-[260px] max-md:bottom-[20%]" />

      {/* ========== Scroll indicator ========== */}
      <ScrollIndicator className="absolute bottom-[42%] left-1/2 z-10 -translate-x-1/2 max-md:bottom-[52%]" />

      {/* ========== Video card (bottom right) ========== */}
      <div className="absolute bottom-12 right-8 z-20 max-md:static max-md:mx-auto max-md:mt-auto max-md:pb-24 max-md:pt-[65vh]">
        <VideoCard />
      </div>

      {/* ========== Wave pattern images (bottom layer) ========== */}
      <div className="pointer-events-none absolute -left-[18%] bottom-0 z-0 w-[140%]" aria-hidden>
        <Image
          src="/s3seismic-images/wave-4.png"
          alt=""
          width={2016}
          height={400}
          className="h-auto w-full object-cover"
          priority
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-[1] w-full" aria-hidden>
        <Image
          src="/s3seismic-images/wave-2.png"
          alt=""
          width={1440}
          height={300}
          className="h-auto w-full object-cover"
          priority
        />
      </div>
    </section>
  );
}
