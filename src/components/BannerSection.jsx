import { Sparkles, Maximize2 } from 'lucide-react';

export default function BannerSection({ onExpandBanner }) {
  return (
    <section className="relative w-full overflow-hidden bg-[#f9f9f8] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative rounded-sm overflow-hidden border border-neutral-300 group shadow-xl">
          {/* Main Full-width Banner Image using light Image 2 */}
          <div className="relative aspect-4/3 sm:aspect-video md:aspect-21/10 w-full overflow-hidden bg-neutral-100">
            <img
              src="/images/banner.jpg"
              alt="RENOVA Japanese Wabi-Sabi Sanctuary Living Architecture"
              className="w-full h-full object-cover object-center hd-image filter brightness-[1.04] contrast-[1.08] saturate-[1.04] transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Interactive Badge */}
            <div className="absolute top-6 right-6 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-md border border-neutral-200 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-neutral-900 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Signature Space</span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 z-10 bg-linear-to-t from-black/70 via-black/30 to-transparent flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-mono font-medium tracking-widest text-neutral-300 uppercase block mb-1">
                  ARCHITECTURAL DIGEST SHOWCASE
                </span>
                <h3 className="text-2xl sm:text-4xl font-bold font-syne text-white tracking-tight">
                  Harmony Between Form, Light & Nature
                </h3>
                <p className="text-xs sm:text-base text-neutral-200 font-light mt-2 max-w-xl">
                  Framing panoramic landscapes with organic tactile materials and quiet spatial stillness.
                </p>
              </div>

              <button
                onClick={onExpandBanner}
                className="group/btn inline-flex items-center gap-2 bg-white hover:bg-neutral-100 text-black font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-all shadow-xl"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Explore Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
