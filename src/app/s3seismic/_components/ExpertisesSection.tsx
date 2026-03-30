"use client";

import { useState } from "react";
import { cn } from "../_utils";

interface ExpertiseItem {
  title: string;
  subtitle: string;
}

const expertises: ExpertiseItem[] = [
  { title: "GEOTHERMAL ENERGY", subtitle: "Your Way To Energy Independence" },
  {
    title: "NEW ENERGIES",
    subtitle: "Strategical Resources Finally Considered as such",
  },
  {
    title: "CARBON CAPTURE",
    subtitle: "Capture the Carbon, Release the Future",
  },
  {
    title: "OIL & GAS",
    subtitle: "The Good the Bad and The Ugly, all at once",
  },
  { title: "MINING", subtitle: "Unearth Your Buried Treasure" },
  { title: "GEOLOGICAL RISK", subtitle: "Know Your Faults !" },
  {
    title: "CIVIL ENGINEERING",
    subtitle: "Mind the Gap : Structural incidence of digging",
  },
];

function SeismicDot() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="4" fill="#13d8cb" />
      <circle cx="12" cy="12" r="8" stroke="#13d8cb" strokeWidth="1" opacity="0.4" />
      <circle cx="12" cy="12" r="11" stroke="#13d8cb" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CornerBrackets({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block px-1">
      {/* Top-left corner */}
      <span className="absolute top-0 left-0 h-[6px] w-[6px] border-t border-l border-[#4e5d73]" />
      {/* Top-right corner */}
      <span className="absolute top-0 right-0 h-[6px] w-[6px] border-t border-r border-[#4e5d73]" />
      {/* Bottom-left corner */}
      <span className="absolute bottom-0 left-0 h-[6px] w-[6px] border-b border-l border-[#4e5d73]" />
      {/* Bottom-right corner */}
      <span className="absolute bottom-0 right-0 h-[6px] w-[6px] border-b border-r border-[#4e5d73]" />
      {children}
    </span>
  );
}

export function ExpertisesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-[#f2f5f8] py-24 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left column */}
          <div className="flex flex-col justify-between lg:w-[280px] shrink-0">
            <p
              className="text-[13px] font-semibold uppercase text-[#13d8cb]"
              style={{ letterSpacing: "2px" }}
            >
              OUR EXPERTISES
            </p>

            <button
              className="group mt-12 lg:mt-0 flex items-center gap-3 self-start rounded-lg border border-[#4e5d73] bg-transparent px-6 py-3 transition-colors hover:bg-[#233041] hover:text-white"
            >
              <CornerBrackets>
                <span
                  className="text-[13px] font-medium uppercase text-[#233041] group-hover:text-white"
                  style={{ letterSpacing: "1px" }}
                >
                  CONTACT US
                </span>
              </CornerBrackets>
              <ArrowIcon className="text-[#233041] group-hover:text-white" />
            </button>
          </div>

          {/* Right column — expertise items */}
          <div className="flex-1">
            {expertises.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.title}
                  className={cn(
                    "border-b border-[rgba(78,93,115,0.2)] transition-all duration-300",
                    index === 0 && "border-t"
                  )}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div
                    className={cn(
                      "flex items-center justify-between gap-6 py-5 px-0 transition-all duration-300",
                      isActive &&
                        "bg-[#233041] rounded-[20px] px-6 py-6 my-1 -mx-2"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <h3
                        className={cn(
                          "text-[24px] md:text-[36px] font-light uppercase transition-all duration-300",
                          isActive
                            ? "text-[#13d8cb] opacity-100"
                            : "text-[#233041] opacity-50"
                        )}
                        style={{ letterSpacing: "2px" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-1 text-[13px] transition-colors duration-300",
                          isActive ? "text-white" : "text-[#4e5d73]"
                        )}
                      >
                        {item.subtitle}
                      </p>
                      {isActive && (
                        <div className="mt-3 flex items-center gap-2">
                          <SeismicDot />
                          <span
                            className="text-[12px] font-semibold uppercase text-[#13d8cb]"
                            style={{ letterSpacing: "1.5px" }}
                          >
                            EXPLORE
                          </span>
                        </div>
                      )}
                    </div>
                    <ArrowIcon
                      className={cn(
                        "shrink-0 transition-colors duration-300",
                        isActive ? "text-white" : "text-[#233041] opacity-50"
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
