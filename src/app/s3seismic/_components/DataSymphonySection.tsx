function SeismicWaveform() {
  return (
    <svg
      width="48"
      height="40"
      viewBox="0 0 48 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-4"
    >
      <rect x="4" y="12" width="3" height="16" rx="1.5" fill="white" opacity="0.6" />
      <rect x="12" y="6" width="3" height="28" rx="1.5" fill="white" opacity="0.8" />
      <rect x="20" y="2" width="3" height="36" rx="1.5" fill="white" />
      <rect x="28" y="8" width="3" height="24" rx="1.5" fill="white" opacity="0.7" />
      <rect x="36" y="14" width="3" height="12" rx="1.5" fill="white" opacity="0.5" />
      <rect x="44" y="16" width="3" height="8" rx="1.5" fill="white" opacity="0.3" />
    </svg>
  );
}

export function DataSymphonySection() {
  return (
    <section className="bg-[#f2f5f8] py-16 md:py-24 px-6 md:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="rounded-3xl bg-[#233041] px-8 py-12 md:px-16 md:py-16">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            {/* Left side — DATA SYMPHONY + waveform */}
            <div className="shrink-0 lg:w-[340px]">
              <h2
                className="text-[32px] md:text-[42px] lg:text-[52px] font-light uppercase text-[#13d8cb]/30"
                style={{ letterSpacing: "10px", lineHeight: 1.15 }}
              >
                DATA
                <br />
                SYMPHONY
              </h2>
              <SeismicWaveform />
            </div>

            {/* Right side — heading and paragraph */}
            <div className="flex-1">
              <h3 className="text-[24px] md:text-[30px] lg:text-[36px] font-normal text-white">
                Earth speaks, we listen.
              </h3>
              <p className="mt-6 text-[15px] leading-[1.7] text-white/70">
                We communicate with Earth by sound signals. How ? We send
                acoustic vibrations into the subsurface, and we listen to the
                response given by Earth. We then know the natural structure of
                the subsoil at the area we are operating. We record it as DATA,
                that can be analyzed to determinate the subsoil potential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
