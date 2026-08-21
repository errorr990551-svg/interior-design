import { MapPin, Globe } from 'lucide-react';

export default function WhereWeWorkSection({ onOpenConsultation }) {
  const localities = [
    'South Mumbai',
    'Bandra & Khar',
    'Juhu & Vile Parle',
    'Worli & Lower Parel',
    'Powai & Hiranandani',
    'Thane & Navi Mumbai',
  ];

  return (
    <section className="bg-[#0b0b0b] text-white py-24 sm:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold uppercase tracking-widest text-amber-300 font-syne">
              <MapPin className="w-3.5 h-3.5" />
              <span>SERVICE COVERAGE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight leading-tight">
              Where We Work
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              2BHK Interiors currently designs homes in <strong className="text-white font-semibold">Mumbai and surrounding areas</strong>, working with apartment owners, villa owners and independent homeowners who want a design-first approach to their space.
            </p>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              If you're outside our immediate service area, get in touch anyway. A good portion of our process (consultation, mood boards, 2D layouts, and 3D visualization) can be run remotely, with only final execution needing to be local.
            </p>

            <div className="pt-4 flex items-center gap-3">
              <Globe className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-xs font-semibold tracking-wider text-neutral-300 uppercase">
                Remote & On-Site Consultation Available
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#141414] border border-white/10 space-y-8">
              <h3 className="text-xl font-bold font-syne uppercase tracking-wider text-amber-300">
                Key Localities & Neighbourhoods
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {localities.map((loc, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-neutral-200">{loc}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-neutral-400">Planning a project outside Mumbai?</span>
                <button
                  onClick={onOpenConsultation}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-400 text-black text-xs font-bold uppercase tracking-widest hover:bg-amber-300 transition-all cursor-pointer"
                >
                  Check Remote Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
