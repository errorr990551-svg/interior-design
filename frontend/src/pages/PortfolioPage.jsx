import { useState } from 'react';
import { Download, ExternalLink, FileText, Sparkles, ArrowUpRight, Eye, Calendar, Maximize2, ShieldCheck } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';

export default function PortfolioPage({ onOpenConsultation, onNavigateHome, onSelectProject }) {
  const [fullscreenMode, setFullscreenMode] = useState(false);

  const projects = [
    {
      id: 'linden-house',
      title: 'The Linden House',
      dates: '06.2024 – 09.2024',
      type: 'Private Residence',
      focus: 'Natural light, soft material layering, balanced proportions and calm spatial silence.',
      image: '/images/linden-house.jpg',
    },
    {
      id: 'urban-dwelling',
      title: 'Urban Dwelling',
      dates: '02.2024 – 05.2024',
      type: 'Contemporary Apartment',
      focus: 'Dark material palettes enhancing warmth, depth, and rich visual textures.',
      image: '/images/urban-dwelling.jpg',
    },
    {
      id: 'casa-serene',
      title: 'Casa Serene',
      dates: '03.2024 – 07.2024',
      type: 'Residential Renovation',
      focus: 'Thoughtful seating layouts balancing comfort, privacy, and architectural elegance.',
      image: '/images/casa-serene.jpg',
    },
  ];

  const portfolioFaqs = [
    {
      q: 'What is included in the Master Portfolio Presentation PDF?',
      a: 'Our digital portfolio deck contains 17 high-resolution pages of completed 2BHK Interiors projects, detailed 2D CAD floor plans, photorealistic 3D visualisations, mood boards, and material specifications.',
    },
    {
      q: 'Can I download the presentation deck for offline viewing?',
      a: 'Yes! You can download the complete 34.8 MB presentation PDF directly to your desktop or mobile device using the "Download PDF" button above.',
    },
    {
      q: 'Do you offer custom walkthrough presentations for specific home layouts?',
      a: 'Absolutely. During your initial design consultation, we prepare a personalized 2D spatial layout and mood board tailored specifically to your home floor plan.',
    },
  ];

  return (
    <div className="space-y-0 pt-24 bg-[#0e0e0e] text-white selection:bg-amber-400 selection:text-black">
      {/* 1. Page Header & Hero Section */}
      <section className="relative py-16 sm:py-24 bg-[#0e0e0e] border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-300 uppercase">
            <button onClick={onNavigateHome} className="hover:underline cursor-pointer bg-transparent border-0 text-amber-300">
              HOME
            </button>
            <span>/</span>
            <span className="text-white font-bold">FULL PORTFOLIO DECK & PROJECTS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-amber-300 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20 uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>STUDIO WORK & PRESENTATION DECK (17 SLIDES)</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-syne tracking-tight uppercase leading-tight text-white">
                2BHK Interiors Master Portfolio Presentation
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-light max-w-3xl leading-relaxed">
                Scroll through our full 2026 digital presentation below or download the high-resolution PDF deck. Includes full residential design case studies, photorealistic 3D visualisations, and complete floor plan specifications.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href="/pptt.pdf"
                download="2BHK_Interiors_Portfolio_Presentation.pdf"
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-full transition-all shadow-lg cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Deck (34.8 MB)</span>
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

      {/* 2. Full Size Interactive PDF Viewer Section */}
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
                  2BHK_Interiors_Master_Portfolio_2026.pdf
                </h3>
                <span className="text-xs font-mono text-neutral-400">
                  17 Pages • Full Resolution PDF Document • Scroll down to view all slides
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
            <iframe
              src="/pptt.pdf#toolbar=1&navpanes=0&view=FitH"
              title="2BHK Interiors Master Portfolio Presentation"
              className="w-full h-full border-0 bg-neutral-900"
            />
          </div>

          {/* Direct Download & Help Strip */}
          <div className="mt-4 p-4 rounded-xl bg-neutral-900/80 border border-white/10 text-center text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Full presentation document verified • High-resolution 3D renders & floor plans</span>
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

      {/* 3. Featured Architectural Projects Showcase */}
      <section className="py-24 sm:py-32 bg-[#0e0e0e] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="pb-12 border-b border-white/10 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-amber-300 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20 uppercase">
              <Eye className="w-3.5 h-3.5" />
              <span>FEATURED RESIDENTIAL CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight uppercase text-white">
              Signature Project Gallery
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light max-w-2xl">
              Click on any signature project below to explore high-resolution spatial photos and design details.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer rounded-2xl bg-[#141414] border border-white/10 hover:border-amber-400/50 overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                <div className="aspect-16/10 overflow-hidden relative bg-neutral-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-amber-300 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{project.dates}</span>
                      </span>
                      <span className="text-[11px] font-mono uppercase bg-white/5 border border-white/10 px-2 py-0.5 rounded text-neutral-300">
                        {project.type}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-syne text-white group-hover:text-amber-200 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      {project.focus}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-amber-300">
                    <span>Explore Project</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Portfolio FAQ Section */}
      <FAQSection
        title="Portfolio & Presentation FAQ"
        subtitle="Common questions about our digital design deck, project renders, and consultations"
        faqs={portfolioFaqs}
      />

      {/* 5. Call To Action Section */}
      <CTASection
        headline="Ready to Transform Your Home Space?"
        subtext="Book a design consultation with our principal team to discuss 2D space planning, 3D visualization, or material selections for your residence."
        buttonText="Book a Design Consultation"
        onOpenConsultation={onOpenConsultation}
      />
    </div>
  );
}
