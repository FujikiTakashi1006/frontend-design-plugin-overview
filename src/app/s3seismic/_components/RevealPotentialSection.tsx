import { cn } from "../_utils";

function MountainIcon() {
  return (
    <svg
      width="40"
      height="32"
      viewBox="0 0 40 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 30L14 6L22 20L28 12L38 30"
        stroke="#13d8cb"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
      <path
        d="M10 30L18 14L24 24"
        stroke="#13d8cb"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 2L22 12L16 30L10 12L16 2Z"
        stroke="#13d8cb"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.5"
      />
      <path
        d="M2 16L12 10L30 16L12 22L2 16Z"
        stroke="#13d8cb"
        strokeWidth="1"
        strokeLinejoin="round"
        opacity="0.3"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="#13d8cb"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="8"
        ry="14"
        stroke="#13d8cb"
        strokeWidth="1"
        opacity="0.3"
      />
      <path
        d="M2 16H30"
        stroke="#13d8cb"
        strokeWidth="1"
        opacity="0.3"
      />
      <path
        d="M4 8H28"
        stroke="#13d8cb"
        strokeWidth="0.75"
        opacity="0.2"
      />
      <path
        d="M4 24H28"
        stroke="#13d8cb"
        strokeWidth="0.75"
        opacity="0.2"
      />
    </svg>
  );
}

interface CardData {
  title: string;
  icon: React.ReactNode;
  items: Array<{ text: string; bracket?: string }>;
}

const cards: CardData[] = [
  {
    title: "ANYWHERE",
    icon: <MountainIcon />,
    items: [
      { text: "CITIES" },
      { text: "JUNGLE" },
      { text: "LAND" },
      { text: "DESERT" },
      { text: "MOUNTAINS" },
      { text: "WATERS" },
    ],
  },
  {
    title: "ANYTIME",
    icon: <CompassIcon />,
    items: [
      { text: "ALL SEASONS" },
      { text: "NIGHT & DAY" },
      { text: "HOT & COLD" },
    ],
  },
  {
    title: "WITH",
    icon: <GlobeIcon />,
    items: [
      {
        text: "THE MOST ACCURATE DATA",
        bracket: "no compromise on quality",
      },
      {
        text: "SOCIAL ACCEPTABILITY",
        bracket: "fast & smooth",
      },
      {
        text: "ENVIRONMENTAL AWARENESS",
        bracket: "integrated to the area",
      },
    ],
  },
];

function InfoCard({ card }: { card: CardData }) {
  return (
    <div className="rounded-2xl bg-[#2b394c] p-7">
      <div className="flex items-start justify-between mb-5">
        <h3
          className="text-[22px] font-semibold text-[#13d8cb]"
        >
          {card.title}
        </h3>
        <div className="shrink-0 opacity-80">{card.icon}</div>
      </div>
      <ul className="space-y-0">
        {card.items.map((item) => (
          <li
            key={item.text}
            className="text-[13px] font-normal uppercase text-white leading-[2]"
            style={{ letterSpacing: "1.5px" }}
          >
            {item.text}
            {item.bracket && (
              <span className="ml-2 normal-case text-white/40">
                [{item.bracket}]
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RevealPotentialSection() {
  return (
    <section className="bg-[#233041] py-24 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          {/* Left column — heading and description */}
          <div className="flex-1">
            <h2
              className={cn(
                "text-[40px] md:text-[52px] lg:text-[64px] font-extralight uppercase text-[#4e5d73]"
              )}
              style={{ letterSpacing: "12px", lineHeight: 1.15 }}
            >
              REVEAL
              <br />
              YOUR
              <br />
              POTENTIAL
            </h2>

            <p
              className="mt-10 max-w-[520px] text-[15px] leading-[1.7] text-white/70"
            >
              Drawing on its long experience and expertise in geophysics, S&sup3;
              has developed cutting-edge technologies adapted to all types and
              needs of environments. This technological and operational
              flexibility makes it possible to collect data over a limited period
              of time, in an acceptable manner to local population and
              environment.
            </p>
          </div>

          {/* Right column — info cards */}
          <div className="w-full lg:w-[420px] shrink-0 flex flex-col gap-5">
            {cards.map((card) => (
              <InfoCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
