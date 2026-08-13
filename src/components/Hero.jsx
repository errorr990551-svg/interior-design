import { ArrowUpRight } from 'lucide-react';

export default function Hero({ onOpenConsultation }) {
  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#0e0e0e]">
      {/* Crisp Background Image with Dark Contrast Overlay for Maximum Text Visibility */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="2BHK Interiors Japanese Wabi-Sabi Sanctuary Architecture"
          className="w-full h-full object-cover object-center hd-image filter brightness-[0.95] contrast-[1.05] saturate-[1.02] transition-all duration-700"
        />
        {/* Dual gradient overlay to ensure top navbar and bottom text are 100% visible */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/60 pointer-events-none" />
      </div>

      {/* Main Content Area - High-Contrast Luminous Editorial Typography */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full my-auto py-16">
        <div className="max-w-4xl text-left space-y-4">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-[0.25em] text-neutral-300 uppercase font-syne drop-shadow-sm">
            STUDIO & ARCHITECTURAL INTERIORS
          </span>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[92px] font-extrabold tracking-tight text-white uppercase font-syne leading-[0.98] drop-shadow-lg">
            DESIGN THAT <br />
            FEELS LIKE HOME
          </h1>
        </div>
      </div>

      {/* Bottom Bar Overlay with High-Contrast White Text */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-8 border-t border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end text-left">
          {/* About Us label */}
          <div className="md:col-span-3">
            <span className="text-xs font-bold tracking-[0.2em] text-neutral-300 uppercase font-syne block mb-1">
              ABOUT US
            </span>
          </div>

          {/* Description */}
          <div className="md:col-span-5">
            <p className="text-sm sm:text-base text-neutral-100 leading-relaxed font-normal max-w-lg drop-shadow-sm">
              2BHK Interiors creates functional, timeless interiors tailored to the way you live.
            </p>
          </div>

          {/* Action Links on right */}
          <div className="md:col-span-4 flex items-center md:justify-end gap-8 pt-2 md:pt-0">
            <button
              onClick={onOpenConsultation}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-neutral-300 transition-colors border-b border-white/60 hover:border-white pb-1"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={scrollToWork}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-neutral-300 transition-colors border-b border-white/60 hover:border-white pb-1"
            >
              <span>View Projects</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
