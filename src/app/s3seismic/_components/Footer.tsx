"use client";

import Link from "next/link";
import { cn } from "../_utils";

function S3LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("shrink-0", className)}
      viewBox="0 0 60 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="S3 Seismic logo"
    >
      <path
        d="M30 0L57.7128 16V48L30 64L2.28719 48V16L30 0Z"
        fill="white"
        fillOpacity={0.1}
      />
      <path
        d="M30 4L54.7128 18V46L30 60L5.28719 46V18L30 4Z"
        stroke="white"
        strokeWidth={1.5}
        fill="none"
      />
      <text
        x="30"
        y="40"
        textAnchor="middle"
        fill="white"
        fontSize="22"
        fontWeight="700"
        fontFamily="Saira, sans-serif"
      >
        S3
      </text>
    </svg>
  );
}

function S3BadgeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("shrink-0", className)}
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 0L23.1 6.5V19.5L12 26L0.9 19.5V6.5L12 0Z"
        fill="#13d8cb"
        fillOpacity={0.2}
      />
      <path
        d="M12 2L21.1 7.5V18.5L12 24L2.9 18.5V7.5L12 2Z"
        stroke="#13d8cb"
        strokeWidth={1}
        fill="none"
      />
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fill="#13d8cb"
        fontSize="10"
        fontWeight="700"
        fontFamily="Saira, sans-serif"
      >
        S3
      </text>
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("shrink-0", className)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
        fill="#13d8cb"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("shrink-0", className)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("shrink-0", className)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 2V10M8 10L5 7M8 10L11 7M3 13H13"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("shrink-0", className)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 1L10.1 5.8L15.3 6.3L11.4 9.8L12.5 14.9L8 12.2L3.5 14.9L4.6 9.8L0.7 6.3L5.9 5.8L8 1Z"
        fill="currentColor"
      />
    </svg>
  );
}

const navLinksLeft = [
  { label: "WHO WE ARE", href: "/who-we-are" },
  { label: "WHAT WE DO", href: "/what-we-do" },
  { label: "OUR VIDEOS", href: "/our-videos" },
  { label: "OUR PROJECTS", href: "/our-projects" },
];

const navLinksRight = [
  { label: "CONTACT", href: "/contact" },
  { label: "LEGALS", href: "/legals" },
  { label: "CREDITS", href: "/credits" },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#233041] text-white">
      <div className="mx-auto max-w-[1400px] px-8 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Logo + Tagline */}
          <div className="flex flex-col justify-between gap-8">
            <div className="flex items-center gap-3">
              <S3LogoIcon className="size-[60px]" />
              <span className="text-[11px] font-bold uppercase leading-tight tracking-wide text-white">
                SMART SEISMIC
                <br />
                SOLUTIONS
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="leading-snug">
                <p className="text-[14px] font-semibold uppercase text-[#13d8cb]">
                  GEOPHYSICAL
                </p>
                <p className="text-[14px] font-semibold uppercase text-[#13d8cb]">
                  INTELLIGENCE
                </p>
                <p className="text-[14px] font-normal lowercase text-white">
                  made simple
                </p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <S3BadgeIcon className="size-5" />
                <span className="text-[12px] text-white">
                  &copy; S&sup3; 2024
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Addresses + Contact */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
              {/* Office */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[1px] text-[#4e5d73]">
                  OFFICE
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] uppercase tracking-[0.5px] text-white">
                    68 BD SEBASTOPOL
                  </span>
                  <span className="text-[13px] uppercase tracking-[0.5px] text-white">
                    75003 PARIS
                  </span>
                  <span className="text-[13px] uppercase tracking-[0.5px] text-white">
                    FRANCE
                  </span>
                </div>
              </div>

              {/* Warehouse */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[1px] text-[#4e5d73]">
                  WAREHOUSE & WORKSHOP
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] uppercase tracking-[0.5px] text-white">
                    10A ROUTE DE PORSMIN
                  </span>
                  <span className="text-[13px] uppercase tracking-[0.5px] text-white">
                    22200 GR&Acirc;CES
                  </span>
                  <span className="text-[13px] uppercase tracking-[0.5px] text-white">
                    FRANCE
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="mailto:contact@s3seismic.com"
                className="text-[13px] uppercase tracking-[0.5px] text-white transition-colors hover:text-[#13d8cb]"
              >
                CONTACT@S3SEISMIC.COM
              </Link>
              <SparkleIcon className="size-3" />
            </div>
          </div>

          {/* Column 3: Nav Links */}
          <div className="flex gap-8 sm:gap-12">
            <nav className="flex flex-col gap-2" aria-label="Footer navigation primary">
              {navLinksLeft.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] uppercase tracking-[0.5px] text-white transition-colors hover:text-[#13d8cb]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation secondary">
              {navLinksRight.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] uppercase tracking-[0.5px] text-white transition-colors hover:text-[#13d8cb]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Newsletter + Social */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-[14px] text-white">
                Subscribe to our newsletter
              </span>
              <div className="relative">
                <input
                  type="email"
                  placeholder="your email"
                  className={cn(
                    "w-full rounded-lg border border-[#364458] bg-[#2b394c] px-4 py-3",
                    "text-[13px] text-white placeholder:text-[#4e5d73]",
                    "outline-none transition-colors focus:border-[#13d8cb]"
                  )}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#13d8cb] transition-opacity hover:opacity-80"
                  aria-label="Submit email"
                >
                  <ArrowRightIcon className="size-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* LinkedIn */}
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#2b394c] p-4",
                  "text-[11px] font-semibold uppercase text-white transition-colors hover:bg-[#364458]"
                )}
              >
                <span className="text-[18px] font-bold">in</span>
                <span>LINKEDIN</span>
              </Link>

              {/* Vimeo */}
              <Link
                href="https://vimeo.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#2b394c] p-4",
                  "text-[11px] font-semibold uppercase text-white transition-colors hover:bg-[#364458]"
                )}
              >
                <span className="text-[18px] font-bold italic">v</span>
                <span>VIMEO</span>
              </Link>

              {/* Mission 404 */}
              <Link
                href="/mission-404"
                className={cn(
                  "flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#2b394c] p-4",
                  "text-[11px] font-semibold uppercase text-white transition-colors hover:bg-[#364458]"
                )}
              >
                <span className="text-[11px] font-bold leading-tight">
                  MISSION
                  <br />
                  404
                </span>
              </Link>

              {/* Mediakit */}
              <Link
                href="/mediakit"
                className={cn(
                  "flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#2b394c] p-4",
                  "text-[11px] font-semibold uppercase text-white transition-colors hover:bg-[#364458]"
                )}
              >
                <DownloadIcon className="size-4" />
                <span>MEDIAKIT</span>
              </Link>

              {/* Join S3 - spans full width on its own row */}
              <Link
                href="/join"
                className={cn(
                  "col-span-2 flex items-center justify-center gap-2 rounded-xl bg-[#2b394c] p-4",
                  "text-[11px] font-semibold uppercase text-white transition-colors hover:bg-[#364458]"
                )}
              >
                <StarIcon className="size-4" />
                <span>JOIN S&sup3;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
