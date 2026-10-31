import { useState } from 'react';
import { Download, ExternalLink, FileText, Sparkles, ArrowUpRight, Eye, Maximize2, ShieldCheck } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import { portfolioFaqs } from '../content/faqs';
import { PORTFOLIO_ROOMS } from '../content/portfolio';

export default function PortfolioPage({ onOpenConsultation, onNavigateHome, onSelectProject }) {
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [showDeck, setShowDeck] = useState(false);

  return (
    <div className="space-y-0 pt-24 bg-[#0e0e0e] text-white selection:bg-amber-400 selection:text-black">
      {/* 1. Page Header & Hero Section */}
      <section className="relative py-16 sm:py-24 bg-[#0e0e0e] border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-300 uppercase">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:underline cursor-pointer text-amber-300">
              HOME
            </a>
            <span>/</span>
            <span className="text-white font-bold">PORTFOLIO</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-amber-300 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20 uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{PORTFOLIO_ROOMS.length} ROOMS • 3D VISUALISATIONS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-syne tracking-tight uppercase leading-tight text-white">
                Residential Interior Design Portfolio
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-light max-w-3xl leading-relaxed">
                Bedrooms, living rooms, a dining room and a study from our design work, shown as the 3D visualisations clients review and approve before anything is built. Each room below notes the design decisions worth looking at, from storage and seating to ceilings and finishes. The same renders are collected in the downloadable PDF deck.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href="/pptt.pdf"
                download="2BHK_Interiors_Portfolio_Presentation.pdf"
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-full transition-all shadow-lg cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Deck (2.6 MB)</span>
              </a>

              <a
                href="/pptt.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full transition-all"
              >
                <ExternalLink className="w-4 h-4 text-amber-300" />
                <span>Open PDF in New Window</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Room-by-room gallery of the portfolio renders */}
      <section className="py-20 sm:py-28 bg-[#0e0e0e] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24">
          {PORTFOLIO_ROOMS.map((room, roomIdx) => (
            <article key={room.id} id={room.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10 scroll-mt-28">
              <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-28 self-start">
                <span className="text-xs font-mono tracking-widest text-amber-300 uppercase">
                  {String(roomIdx + 1).padStart(2, '0')} • {room.room}
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold font-syne tracking-tight text-white">{room.title}</h2>
                <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">{room.summary}</p>
                <div>
                  <h3 className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-3">Details to notice</h3>
                  <ul className="space-y-2">
                    {room.notes.map((note) => (
                      <li key={note} className="flex gap-3 text-sm text-neutral-300 font-light leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {room.images.map((image, imgIdx) => (
                  <figure key={image.src} className={imgIdx === 0 ? 'sm:col-span-2' : ''}>
                    <button
                      type="button"
                      onClick={() => onSelectProject({ title: room.title, image: image.src, type: `${room.room} • 3D visualisation`, focus: image.alt })}
                      className="group block w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-900 cursor-zoom-in"
                      aria-label={`Enlarge: ${image.alt}`}
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        alt={image.alt}
                        className="w-full h-auto aspect-video object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    </button>
                    <figcaption className="mt-2 text-xs text-neutral-500 font-light">{image.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Full PDF deck */}
      <section className="py-12 bg-[#0a0a0a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          {/* Controls Bar above Viewer */}
          <div className="bg-[#141414] border border-white/15 rounded-t-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold font-syne text-white">
                  Portfolio deck (PDF)
                </h3>
                <span className="text-xs font-mono text-neutral-400">
                  17 pages • the renders above, in presentation form
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => setFullscreenMode(!fullscreenMode)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/15 px-4 py-2.5 rounded-full transition-all cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                <span>{fullscreenMode ? 'Exit Full View' : 'Expand Height'}</span>
              </button>

              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-black px-5 py-2.5 rounded-full transition-all shadow-md cursor-pointer"
              >
                <span>Request Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Full Page PDF Viewer Frame Container */}
          <div
            className={`w-full bg-[#080808] border-x border-b border-white/15 rounded-b-2xl shadow-2xl relative transition-all duration-500 overflow-hidden ${
              fullscreenMode ? 'h-[92vh]' : 'h-[75vh] sm:h-[85vh]'
            }`}
          >
            {/* The deck is a large PDF, so it only loads when the visitor asks for it. */}
            {showDeck ? (
              <iframe
                src="/pptt.pdf#toolbar=1&navpanes=0&view=FitH"
                title="2BHK Interiors portfolio presentation"
                className="w-full h-full border-0 bg-neutral-900"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-5 text-center px-6">
                <FileText className="w-12 h-12 text-amber-300" />
                <p className="text-sm text-neutral-300 max-w-md">
                  View the full portfolio deck here, or download the PDF to read it offline.
                </p>
                <button
                  type="button"
                  onClick={() => setShowDeck(true)}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-black px-6 py-3 rounded-full transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Load presentation</span>
                </button>
              </div>
            )}
          </div>

          {/* Direct Download & Help Strip */}
          <div className="mt-4 p-4 rounded-xl bg-neutral-900/80 border border-white/10 text-center text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>17 pages of 3D renders</span>
            </span>
            <div className="flex items-center gap-4">
              <span>Having trouble displaying inline?</span>
              <a
                href="/pptt.pdf"
                download="2BHK_Interiors_Portfolio_Presentation.pdf"
                className="text-amber-300 hover:underline font-bold"
              >
                Direct Download (pptt.pdf)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Portfolio FAQ Section */}
      <FAQSection
        title="Portfolio FAQ"
        subtitle="What you're looking at, and how it relates to your own home"
        faqs={portfolioFaqs}
      />

      {/* 5. Call To Action Section */}
      <CTASection
        headline="Want to See Your Own Home Like This?"
        subtext="Share your floor plan and what isn't working in your home today. We'll talk through layout options and what a mood board, 2D plan and 3D visualisation would cover for your space."
        buttonText="Book a Design Consultation"
        onOpenConsultation={onOpenConsultation}
      />
    </div>
  );
}
