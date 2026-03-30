"use client";

import { cn } from "../_utils";

/**
 * Dot-matrix world map data.
 * Each continent is represented as an array of [col, row] coordinates on a ~80x40 grid.
 * Gray dots form the landmass shapes; teal dots highlight project locations.
 */

const MAP_COLS = 80;
const MAP_ROWS = 40;

// Simplified continent shapes as [col, row] coordinate arrays
const continentDots: Array<[number, number]> = [
  // North America
  ...[
    [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5],
    [10, 6], [11, 6], [12, 6], [13, 6], [14, 6], [15, 6], [16, 6], [17, 6], [18, 6],
    [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [16, 7], [17, 7], [18, 7], [19, 7],
    [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [15, 8], [16, 8], [17, 8], [18, 8], [19, 8],
    [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [15, 9], [16, 9], [17, 9], [18, 9],
    [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10], [15, 10], [16, 10], [17, 10],
    [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11], [16, 11], [17, 11],
    [11, 12], [12, 12], [13, 12], [14, 12], [15, 12], [16, 12],
    [12, 13], [13, 13], [14, 13], [15, 13],
    [13, 14], [14, 14], [15, 14],
    [14, 15], [15, 15],
  ] as Array<[number, number]>,

  // Central America
  ...[
    [14, 16], [15, 16],
    [15, 17],
    [15, 18], [16, 18],
  ] as Array<[number, number]>,

  // South America
  ...[
    [17, 19], [18, 19], [19, 19], [20, 19],
    [17, 20], [18, 20], [19, 20], [20, 20], [21, 20],
    [17, 21], [18, 21], [19, 21], [20, 21], [21, 21], [22, 21],
    [17, 22], [18, 22], [19, 22], [20, 22], [21, 22], [22, 22],
    [18, 23], [19, 23], [20, 23], [21, 23], [22, 23],
    [18, 24], [19, 24], [20, 24], [21, 24], [22, 24],
    [19, 25], [20, 25], [21, 25], [22, 25],
    [19, 26], [20, 26], [21, 26],
    [19, 27], [20, 27], [21, 27],
    [20, 28], [21, 28],
    [20, 29], [21, 29],
    [20, 30],
    [20, 31],
  ] as Array<[number, number]>,

  // Europe
  ...[
    [35, 5], [36, 5], [37, 5], [38, 5], [39, 5], [40, 5],
    [34, 6], [35, 6], [36, 6], [37, 6], [38, 6], [39, 6], [40, 6], [41, 6],
    [34, 7], [35, 7], [36, 7], [37, 7], [38, 7], [39, 7], [40, 7], [41, 7],
    [33, 8], [34, 8], [35, 8], [36, 8], [37, 8], [38, 8], [39, 8], [40, 8], [41, 8],
    [34, 9], [35, 9], [36, 9], [37, 9], [38, 9], [39, 9], [40, 9], [41, 9],
    [34, 10], [35, 10], [36, 10], [37, 10], [38, 10], [39, 10], [40, 10],
    [35, 11], [36, 11], [37, 11], [38, 11], [39, 11],
    [35, 12], [36, 12], [37, 12], [38, 12],
    [36, 13], [37, 13],
  ] as Array<[number, number]>,

  // Africa
  ...[
    [35, 14], [36, 14], [37, 14], [38, 14], [39, 14], [40, 14],
    [34, 15], [35, 15], [36, 15], [37, 15], [38, 15], [39, 15], [40, 15], [41, 15],
    [34, 16], [35, 16], [36, 16], [37, 16], [38, 16], [39, 16], [40, 16], [41, 16], [42, 16],
    [34, 17], [35, 17], [36, 17], [37, 17], [38, 17], [39, 17], [40, 17], [41, 17], [42, 17],
    [34, 18], [35, 18], [36, 18], [37, 18], [38, 18], [39, 18], [40, 18], [41, 18], [42, 18],
    [35, 19], [36, 19], [37, 19], [38, 19], [39, 19], [40, 19], [41, 19], [42, 19],
    [35, 20], [36, 20], [37, 20], [38, 20], [39, 20], [40, 20], [41, 20],
    [36, 21], [37, 21], [38, 21], [39, 21], [40, 21],
    [37, 22], [38, 22], [39, 22], [40, 22],
    [37, 23], [38, 23], [39, 23],
    [38, 24], [39, 24],
    [38, 25],
  ] as Array<[number, number]>,

  // Middle East / Arabian Peninsula
  ...[
    [42, 11], [43, 11], [44, 11], [45, 11],
    [42, 12], [43, 12], [44, 12], [45, 12], [46, 12],
    [43, 13], [44, 13], [45, 13], [46, 13],
    [44, 14], [45, 14], [46, 14],
    [44, 15], [45, 15],
  ] as Array<[number, number]>,

  // Russia / Central Asia
  ...[
    [42, 5], [43, 5], [44, 5], [45, 5], [46, 5], [47, 5], [48, 5], [49, 5], [50, 5], [51, 5], [52, 5], [53, 5], [54, 5], [55, 5], [56, 5], [57, 5], [58, 5], [59, 5], [60, 5],
    [42, 6], [43, 6], [44, 6], [45, 6], [46, 6], [47, 6], [48, 6], [49, 6], [50, 6], [51, 6], [52, 6], [53, 6], [54, 6], [55, 6], [56, 6], [57, 6], [58, 6], [59, 6], [60, 6], [61, 6],
    [42, 7], [43, 7], [44, 7], [45, 7], [46, 7], [47, 7], [48, 7], [49, 7], [50, 7], [51, 7], [52, 7], [53, 7], [54, 7], [55, 7], [56, 7], [57, 7], [58, 7], [59, 7], [60, 7], [61, 7], [62, 7],
    [43, 8], [44, 8], [45, 8], [46, 8], [47, 8], [48, 8], [49, 8], [50, 8], [51, 8], [52, 8], [53, 8], [54, 8], [55, 8], [56, 8], [57, 8], [58, 8], [59, 8], [60, 8],
    [44, 9], [45, 9], [46, 9], [47, 9], [48, 9], [49, 9], [50, 9], [51, 9], [52, 9], [53, 9],
    [45, 10], [46, 10], [47, 10], [48, 10], [49, 10], [50, 10],
  ] as Array<[number, number]>,

  // South / Southeast Asia
  ...[
    [50, 11], [51, 11], [52, 11], [53, 11], [54, 11],
    [50, 12], [51, 12], [52, 12], [53, 12], [54, 12], [55, 12],
    [51, 13], [52, 13], [53, 13], [54, 13], [55, 13],
    [52, 14], [53, 14], [54, 14], [55, 14],
    [53, 15], [54, 15],
    [54, 16], [55, 16], [56, 16],
    [55, 17], [56, 17], [57, 17],
    [56, 18], [57, 18],
  ] as Array<[number, number]>,

  // Japan / East Asia
  ...[
    [59, 9], [60, 9], [61, 9],
    [59, 10], [60, 10], [61, 10], [62, 10],
    [60, 11], [61, 11], [62, 11],
    [61, 12], [62, 12],
  ] as Array<[number, number]>,

  // Indonesia / Philippines
  ...[
    [57, 19], [58, 19], [59, 19], [60, 19],
    [58, 20], [59, 20], [60, 20], [61, 20],
    [59, 21], [60, 21], [61, 21],
  ] as Array<[number, number]>,

  // Australia
  ...[
    [58, 24], [59, 24], [60, 24], [61, 24], [62, 24], [63, 24],
    [57, 25], [58, 25], [59, 25], [60, 25], [61, 25], [62, 25], [63, 25], [64, 25],
    [57, 26], [58, 26], [59, 26], [60, 26], [61, 26], [62, 26], [63, 26], [64, 26],
    [57, 27], [58, 27], [59, 27], [60, 27], [61, 27], [62, 27], [63, 27], [64, 27],
    [58, 28], [59, 28], [60, 28], [61, 28], [62, 28], [63, 28],
    [59, 29], [60, 29], [61, 29], [62, 29],
    [60, 30], [61, 30],
  ] as Array<[number, number]>,
];

// Project location highlights (approximate positions)
const projectDots: Array<[number, number]> = [
  // Northern Europe cluster (Netherlands, Denmark, etc.)
  [35, 7], [36, 7], [37, 8], [36, 8], [35, 9],
  // France
  [35, 10], [34, 11],
  // North Africa
  [36, 15], [37, 15],
  // East Africa
  [41, 19], [42, 18],
  // Middle East
  [44, 12], [45, 13],
  // South America
  [19, 22], [20, 23],
  // Southeast Asia
  [55, 16], [56, 17],
  // Australia
  [60, 26], [61, 25],
];

// Create a Set of coordinate keys for fast lookup
const continentSet = new Set(continentDots.map(([c, r]) => `${c},${r}`));
const projectSet = new Set(projectDots.map(([c, r]) => `${c},${r}`));

function BracketLink({
  label,
  href = "#",
  className,
}: {
  label: string;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-2 text-[13px] uppercase tracking-wider text-white transition-colors hover:text-[#13d8cb]",
        className
      )}
    >
      {/* Top-left bracket corner */}
      <span className="absolute -left-3 -top-2 h-3 w-3 border-l-2 border-t-2 border-[#13d8cb]" />
      {/* Bottom-right bracket corner */}
      <span className="absolute -bottom-2 -right-3 h-3 w-3 border-b-2 border-r-2 border-[#13d8cb]" />
      {label}
      <span className="transition-transform group-hover:translate-x-1">
        &rarr;
      </span>
    </a>
  );
}

export function WorldMapSection() {
  // Generate all dots for the map
  const dots: Array<{
    col: number;
    row: number;
    type: "project" | "land" | "empty";
  }> = [];

  for (let row = 0; row < MAP_ROWS; row++) {
    for (let col = 0; col < MAP_COLS; col++) {
      const key = `${col},${row}`;
      if (projectSet.has(key)) {
        dots.push({ col, row, type: "project" });
      } else if (continentSet.has(key)) {
        dots.push({ col, row, type: "land" });
      }
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#2b394c] px-4 py-20 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="mb-12">
          <p className="mb-2 text-[13px] uppercase tracking-[2px] text-[#13d8cb]">
            INTERNATIONAL
          </p>
          <h2 className="text-[32px] font-light uppercase text-white sm:text-[40px]">
            A WORLDWIDE EXPERIENCE
          </h2>
        </div>

        {/* Dot-matrix world map */}
        <div className="relative mx-auto w-full overflow-hidden">
          <svg
            viewBox={`0 0 ${MAP_COLS * 10} ${MAP_ROWS * 10}`}
            className="h-auto w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {dots.map((dot) => (
              <circle
                key={`${dot.col}-${dot.row}`}
                cx={dot.col * 10 + 5}
                cy={dot.row * 10 + 5}
                r={dot.type === "project" ? 4 : 3}
                fill={
                  dot.type === "project"
                    ? "#13d8cb"
                    : "rgba(255, 255, 255, 0.2)"
                }
                className={cn(
                  dot.type === "project" && "animate-pulse"
                )}
              />
            ))}
          </svg>
        </div>

        {/* Bottom link */}
        <div className="mt-12 flex justify-end">
          <BracketLink label="ALL OUR PROJECTS" href="/projects" />
        </div>
      </div>
    </section>
  );
}
