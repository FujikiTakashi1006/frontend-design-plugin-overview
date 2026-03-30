function Sparkle({
  className,
  color,
}: {
  className?: string;
  color: string;
}) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5 0L5.8 3.5L10 5L5.8 6.5L5 10L4.2 6.5L0 5L4.2 3.5L5 0Z"
        fill={color}
      />
    </svg>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CTASection() {
  return (
    <section className="bg-[#f2f5f8] px-6 pb-16 md:px-8 md:pb-24">
      <div className="relative mx-auto max-w-[1200px] rounded-3xl bg-white px-8 py-20 md:px-10 md:py-24 lg:py-[100px]">
        {/* Sparkle decorations */}
        <Sparkle
          color="#ff6006"
          className="absolute top-8 left-8 md:top-12 md:left-12"
        />
        <Sparkle
          color="#13d8cb"
          className="absolute top-8 right-8 md:top-12 md:right-12"
        />
        <Sparkle
          color="#ff6006"
          className="absolute bottom-8 left-8 md:bottom-12 md:left-12"
        />
        <Sparkle
          color="#13d8cb"
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
        />

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          {/* Teal dot */}
          <div className="mb-6 h-3 w-3 rounded-full bg-[#13d8cb]" />

          {/* Subtitle */}
          <p
            className="text-[14px] md:text-[18px] font-medium uppercase text-[#13d8cb]"
            style={{ letterSpacing: "2px" }}
          >
            READY FOR EXPLORATION?
          </p>

          {/* Heading */}
          <h2
            className="mt-4 text-[36px] md:text-[52px] lg:text-[64px] font-extralight uppercase text-[#233041]/20"
            style={{ letterSpacing: "3px" }}
          >
            GET YOUR DATA
          </h2>

          {/* CTA button */}
          <button
            className="group mt-8 flex items-center gap-2 rounded-lg border border-[#4e5d73] bg-transparent px-7 py-3.5 transition-colors hover:bg-[#233041] hover:text-white"
          >
            <span
              className="text-[13px] font-medium uppercase text-[#233041] group-hover:text-white"
              style={{ letterSpacing: "1.5px" }}
            >
              CONTACT US
            </span>
            <ArrowUpRight className="text-[#233041] group-hover:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
