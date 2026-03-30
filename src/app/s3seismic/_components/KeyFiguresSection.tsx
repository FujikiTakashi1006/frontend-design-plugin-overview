"use client";

import Image from "next/image";
import { cn } from "../_utils";

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4", className)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function S3Badge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex size-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm",
        className
      )}
    >
      <span className="text-[10px] font-bold tracking-tight text-white">
        S<sup className="text-[7px]">3</sup>
      </span>
      <SparkleIcon className="absolute -right-1 -top-1 size-2.5 text-white/60" />
      <SparkleIcon className="absolute -bottom-0.5 -left-1 size-2 text-white/40" />
    </div>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  sublabel?: string;
  sublabel2?: string;
  variant: "teal" | "dark";
  className?: string;
  showWave?: boolean;
  showBadge?: boolean;
}

function StatCard({
  value,
  label,
  sublabel,
  sublabel2,
  variant,
  className,
  showWave = false,
  showBadge = true,
}: StatCardProps) {
  const isTeal = variant === "teal";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-8",
        isTeal ? "bg-[#13d8cb]" : "bg-[#2b394c]",
        className
      )}
    >
      {showBadge && <S3Badge className="absolute right-4 top-4" />}

      <div className="relative z-10">
        <p
          className={cn(
            "font-extralight leading-none",
            isTeal ? "text-white" : "text-white/50"
          )}
          style={{ fontSize: value.length > 3 ? "80px" : "110px" }}
        >
          {value}
        </p>
        <p className="mt-3 text-[13px] uppercase tracking-wider text-white">
          {label}
        </p>
        {sublabel && (
          <p className="mt-1 text-[11px] uppercase tracking-wide text-white/70">
            {sublabel}
          </p>
        )}
        {sublabel2 && (
          <p className="mt-0.5 text-[11px] uppercase tracking-wide text-white/70">
            {sublabel2}
          </p>
        )}
      </div>

      <SparkleIcon className="absolute bottom-4 right-4 size-5 text-white/30" />

      {showWave && (
        <div className="absolute inset-x-0 bottom-0 h-24 opacity-20">
          <svg
            viewBox="0 0 400 100"
            preserveAspectRatio="none"
            className="h-full w-full"
            fill="none"
          >
            <path
              d="M0 60 Q50 30 100 50 T200 40 T300 55 T400 35 L400 100 L0 100 Z"
              fill="white"
              opacity="0.3"
            />
            <path
              d="M0 70 Q60 45 120 60 T240 50 T360 65 T400 45 L400 100 L0 100 Z"
              fill="white"
              opacity="0.2"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

function PhotoCard({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

function BracketLink({
  label,
  href = "#",
}: {
  label: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-2 text-[13px] uppercase tracking-wider text-[#4e5d73] transition-colors hover:text-[#13d8cb]"
    >
      {/* Top-left bracket corner */}
      <span className="absolute -left-3 -top-2 h-3 w-3 border-l-2 border-t-2 border-[#13d8cb] opacity-0 transition-opacity group-hover:opacity-100" />
      {/* Bottom-right bracket corner */}
      <span className="absolute -bottom-2 -right-3 h-3 w-3 border-b-2 border-r-2 border-[#13d8cb] opacity-0 transition-opacity group-hover:opacity-100" />
      {label}
      <span className="transition-transform group-hover:translate-x-1">
        &rarr;
      </span>
    </a>
  );
}

export function KeyFiguresSection() {
  return (
    <section className="relative bg-[#f2f5f8] px-4 py-20 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        {/* Section Title */}
        <h2
          className="mb-12 text-center font-extralight uppercase tracking-[8px]"
          style={{
            fontSize: "48px",
            color: "rgba(19, 216, 203, 0.3)",
          }}
        >
          KEY FIGURES
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Row 1: 100 card (spans 2 rows), 30 card, 5 card */}
          <StatCard
            value="100"
            label="YEARS OF WORLDWIDE EXPERIENCE"
            sublabel="(90 YEARS AS CGG LAND / 10 YEARS AS S3)"
            sublabel2="THE BEST OF BOTH WORLD: EXPERIENCE X YOUTH"
            variant="teal"
            showWave
            showBadge
            className="row-span-2 min-h-[280px]"
          />
          <StatCard
            value="30"
            label="COUNTRIES EXPLORED"
            variant="dark"
            showBadge
            className="min-h-[130px]"
          />
          <StatCard
            value="5"
            label="CONTINENTS VISITED"
            variant="dark"
            showBadge
            className="min-h-[130px]"
          />

          {/* Row 2: 100-card continued, photo-1 spanning 2 cols */}
          <PhotoCard
            src="/s3seismic-images/S3-AMSTERDAM-EBN-VIBRO-T65-NIGHT-10-480x270.jpg"
            alt="Night scene with vibration truck"
            className="min-h-[200px] md:col-span-2"
          />

          {/* Row 3: photo-2, wireframe-card, photo-3 (spans 2 rows) */}
          <PhotoCard
            src="/s3seismic-images/S3-ADEME-MARSEILLE-cover-480x320.jpg"
            alt="Team and equipment"
            className="min-h-[200px]"
          />
          <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-[#2b394c] p-6">
            <Image
              src="/s3seismic-images/B1-C3-S3_SOLUTIONS_MINING_GIF_400px_01.gif"
              alt="S3 Solutions wireframe"
              width={200}
              height={200}
              className="object-contain"
              unoptimized
            />
          </div>
          <PhotoCard
            src="/s3seismic-images/S3-SHALLOW-EDF-CRUAS-47-480x720.jpg"
            alt="Portrait field work"
            className="row-span-2 min-h-[420px]"
          />

          {/* Row 4: teal square, 120+ card (span 2 cols), photo-3 continued */}
          <div className="flex items-center justify-center">
            <div className="size-20 rounded-2xl bg-[#13d8cb]" />
          </div>
          <StatCard
            value="120+"
            label="PROJECTS ACQUIRED"
            variant="dark"
            showWave
            showBadge
            className="min-h-[130px]"
          />

          {/* Row 5: orange square, photo-4 (span 2 cols), photo-5 */}
          <div className="flex items-center justify-center">
            <div className="size-20 rounded-2xl bg-[#ff6006]" />
          </div>
          <PhotoCard
            src="/s3seismic-images/S3-LAND-DK-STRYDE-LAY-OUT-44-480x320.jpg"
            alt="Field workers laying out equipment"
            className="min-h-[200px] md:col-span-2"
          />

          {/* Row 6: 365 card, photo-6 (span 2 cols) */}
          <StatCard
            value="365"
            label="DAYS A YEAR"
            variant="teal"
            showBadge
            className="min-h-[130px]"
          />
          <PhotoCard
            src="/s3seismic-images/S3-AMSTERDAM-EBN-SHALLOW-AIRGUN-18-480x270.jpg"
            alt="Airgun equipment"
            className="min-h-[200px] md:col-span-2"
          />
        </div>

        {/* Discover More */}
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-sm uppercase tracking-wider text-[#4e5d73]">
            DISCOVER MORE ABOUT US
          </p>
          <BracketLink label="WHO WE ARE" href="/who-we-are" />
        </div>
      </div>
    </section>
  );
}
