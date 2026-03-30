"use client";

import Link from "next/link";
import { cn } from "../_utils";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  isActive?: boolean;
}

const navItems: NavItem[] = [
  { label: "HOME", href: "/", isActive: true },
  { label: "WHO WE ARE", href: "/who-we-are" },
  { label: "WHAT WE DO", href: "/what-we-do", hasDropdown: true },
  { label: "OUR PROJECTS", href: "/our-projects" },
  { label: "VIDEOS", href: "/videos" },
  { label: "EN", href: "#", hasDropdown: true },
];

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 6H21M3 12H21M3 18H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function S3Logo() {
  return (
    <svg
      width="44"
      height="50"
      viewBox="0 0 44 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="S3 Seismic Logo"
    >
      {/* Hexagonal shape */}
      <path
        d="M22 0L42.5 12.5V37.5L22 50L1.5 37.5V12.5L22 0Z"
        fill="#13d8cb"
      />
      {/* Letter S */}
      <text
        x="16"
        y="34"
        fontFamily="Saira, sans-serif"
        fontSize="26"
        fontWeight="700"
        fill="white"
        textAnchor="middle"
      >
        S
      </text>
      {/* Superscript 3 */}
      <text
        x="30"
        y="22"
        fontFamily="Saira, sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="white"
        textAnchor="middle"
      >
        3
      </text>
    </svg>
  );
}

/**
 * Decorative corner brackets around the active nav item.
 * Renders 4 small L-shaped corners using CSS borders.
 */
function ActiveBrackets({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block px-[12px] py-[6px]">
      {/* Top-left corner */}
      <span
        className="pointer-events-none absolute top-0 left-0 h-[7px] w-[7px]"
        style={{
          borderTop: "2px solid #13d8cb",
          borderLeft: "2px solid #13d8cb",
        }}
      />
      {/* Top-right corner */}
      <span
        className="pointer-events-none absolute top-0 right-0 h-[7px] w-[7px]"
        style={{
          borderTop: "2px solid #13d8cb",
          borderRight: "2px solid #13d8cb",
        }}
      />
      {/* Bottom-left corner */}
      <span
        className="pointer-events-none absolute bottom-0 left-0 h-[7px] w-[7px]"
        style={{
          borderBottom: "2px solid #13d8cb",
          borderLeft: "2px solid #13d8cb",
        }}
      />
      {/* Bottom-right corner */}
      <span
        className="pointer-events-none absolute bottom-0 right-0 h-[7px] w-[7px]"
        style={{
          borderBottom: "2px solid #13d8cb",
          borderRight: "2px solid #13d8cb",
        }}
      />
      {children}
    </span>
  );
}

export function Header() {
  return (
    <header
      className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-8 py-5"
      style={{ background: "transparent" }}
    >
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-3">
        <S3Logo />
        <div
          className="flex flex-col leading-tight"
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "1px",
            color: "#233041",
            textTransform: "uppercase",
            lineHeight: "1.3",
          }}
        >
          <span>SMART</span>
          <span>SEISMIC</span>
          <span>SOLUTIONS</span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-8 lg:flex">
        {navItems.map((item) => {
          const linkContent = (
            <span className="flex items-center gap-1">
              {item.label}
              {item.hasDropdown && (
                <ChevronDown className="ml-0.5" />
              )}
            </span>
          );

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "transition-colors duration-200 hover:text-[#13d8cb]",
                item.label === "CONTACT" && "hidden"
              )}
              style={{
                fontSize: "13px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: "#4e5d73",
              }}
            >
              {item.isActive ? (
                <ActiveBrackets>{linkContent}</ActiveBrackets>
              ) : (
                linkContent
              )}
            </Link>
          );
        })}

        {/* CONTACT Button */}
        <Link
          href="/contact"
          className="transition-colors duration-200 hover:bg-[#10c4b8]"
          style={{
            backgroundColor: "#13d8cb",
            color: "white",
            borderRadius: "999px",
            padding: "10px 24px",
            fontSize: "13px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            display: "inline-block",
          }}
        >
          CONTACT
        </Link>
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="flex items-center justify-center lg:hidden"
        style={{ color: "#233041" }}
        aria-label="Open menu"
        type="button"
      >
        <HamburgerIcon />
      </button>
    </header>
  );
}
