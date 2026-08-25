import { ArrowUpRight, ChevronDown, Download } from 'lucide-react';

export default function Hero({ onOpenConsultation, onNavigateToWork }) {
  const scrollToExplore = () => {
    if (onNavigateToWork) {
      onNavigateToWork();
    } else {
      const el = document.getElementById('studio');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#0e0e0e]">
      {/* Background AI Luxury Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/home_hero_bg.jpg"
          alt="2BHK Interiors Luxury Living Room Architecture"
          className="w-full h-full object-cover object-center hd-image filter brightness-[0.85] contrast-[1.08]"
        />
        {/* Dark contrast gradient overlays for legibility */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0e0e0e] via-black/40 to-black/60 pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full my-auto py-12 sm:py-16">
        <div className="max-w-4xl text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium tracking-widest text-amber-200 uppercase font-syne">
            <span>Residential design, exclusively. Three years, one focus.</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white uppercase font-syne leading-[1.02] drop-shadow-2xl">
            TIMELESS INTERIORS, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-100 via-white to-amber-200">
              DESIGNED AROUND YOU
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-200 leading-relaxed font-light max-w-3xl drop-shadow-md">
            2BHK Interiors is a luxury residential design studio turning apartments and homes in Mumbai into spaces that feel considered, calm, and unmistakably yours. Every project moves through detailed 2D planning, immersive 3D visualization, and a curated mood board, so the look, feel and function of your home are agreed before a single wall is touched.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={onOpenConsultation}
              className="group flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-black px-7 py-4 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02]"
            >
              <span>Book a Design Consultation</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <button
              onClick={scrollToExplore}
              className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-7 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase backdrop-blur-md transition-all duration-300"
            >
              <span>View Our Portfolio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar Cue */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-6 border-t border-white/15">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs tracking-wider text-neutral-300 uppercase font-syne">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>MUMBAI & SURROUNDING AREAS</span>
          </div>

          <button
            onClick={scrollToExplore}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Explore Our Process & Studio</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
