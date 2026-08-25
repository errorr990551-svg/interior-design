import { ArrowUpRight, Download, FileText, Eye, Sparkles, ExternalLink } from 'lucide-react';

export default function RecentTransformations({ onSelectProject, onViewAll }) {
  const portfolioPdfItem = {
    id: 'studio-portfolio-presentation-pdf',
    title: '2BHK Interiors Master Portfolio Presentation',
    dates: '2026 Edition (PDF)',
    type: 'Complete Digital Design Deck',
    focus: 'Comprehensive collection of 2D floor plans, 3D photorealistic renderings, spatial walkthroughs, and material specification sheets.',
    image: '/images/home_hero_bg.jpg',
    pdfUrl: '/pptt.pdf',
    isPdf: true,
    fileSize: '34.8 MB',
  };

  const projects = [
    portfolioPdfItem,
    {
      id: 'linden-house',
      title: 'The Linden House',
      dates: '06.2024 – 09.2024',
      type: 'Private Residence',
      focus: 'Natural light, soft material layering, balanced proportions and calm',
      image: '/images/linden-house.jpg',
    },
    {
      id: 'urban-dwelling',
      title: 'Urban Dwelling',
      dates: '02.2024 – 05.2024',
      type: 'Contemporary Restaurant',
      focus: 'Dark material palettes enhancing warmth, depth, and visual.',
      image: '/images/urban-dwelling.jpg',
    },
    {
      id: 'casa-serene',
      title: 'Casa Serene',
      dates: '03.2024 – 07.2024',
      type: 'Residential Renovation',
      focus: 'Thoughtful seating layouts balancing comfort, privacy.',
      image: '/images/casa-serene.jpg',
    },
  ];

  return (
    <section id="work" className="bg-[#f9f9f8] text-[#111111] py-24 sm:py-32 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-16 border-b border-neutral-300">
          <div className="md:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full mb-3 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STUDIO WORK & PRESENTATION DECK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase font-syne text-neutral-900">
              RECENT TRANSFORMATIONS
            </h2>
          </div>

          <div className="md:col-span-6 md:text-right">
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light max-w-xl md:ml-auto">
              A curated selection of our latest interior projects, featuring full residential design case studies, photorealistic 3D visualisations, and our complete downloadable studio portfolio presentation (PDF).
            </p>
          </div>
        </div>

        {/* Featured PDF Presentation Highlight Banner */}
        <div className="my-12 p-8 sm:p-10 rounded-2xl bg-neutral-900 text-white shadow-2xl border border-neutral-800 relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-700 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-semibold">
                  <FileText className="w-3.5 h-3.5" />
                  PDF PORTFOLIO DECK (34.8 MB)
                </span>
                <span className="text-xs font-mono text-neutral-400">pptt.pdf</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-syne tracking-tight text-white">
                Download Complete Studio Portfolio & Presentation
              </h3>

              <p className="text-sm text-neutral-300 font-light leading-relaxed max-w-2xl">
                Explore our full 2026 design deck including high-resolution 3D renders, 2D floor plans, spatial transformations, and complete project specs in a single presentation document.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:items-end">
              <button
                onClick={() => onSelectProject(portfolioPdfItem)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full transition-all cursor-pointer shadow-lg"
              >
                <Eye className="w-4 h-4" />
                <span>Preview PDF Deck</span>
              </button>

              <a
                href="/pptt.pdf"
                download="2BHK_Interiors_Portfolio_Presentation.pdf"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full transition-all"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </div>

        {/* Project Items List */}
        <div className="divide-y divide-neutral-300">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:bg-neutral-100/60 transition-colors px-4 -mx-4 rounded-lg"
            >
              {/* Project Image */}
              <div className="lg:col-span-6 overflow-hidden rounded-sm bg-neutral-200 aspect-16/10 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {project.isPdf && (
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-amber-300 text-xs font-mono font-bold px-3 py-1.5 rounded-md flex items-center gap-2 border border-white/20">
                    <FileText className="w-3.5 h-3.5" />
                    <span>PDF PRESENTATION</span>
                  </div>
                )}
              </div>

              {/* Project Metadata */}
              <div className="lg:col-span-6 lg:pl-8 space-y-8">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight font-syne text-neutral-900 group-hover:text-neutral-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-neutral-500 mt-2 flex items-center gap-2">
                    <span>{project.dates}</span>
                    {project.fileSize && (
                      <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[11px] font-bold">
                        {project.fileSize}
                      </span>
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-syne block mb-1">
                      Project Type
                    </span>
                    <span className="text-sm font-medium text-neutral-800">
                      {project.type}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-syne block mb-1">
                      Design Focus
                    </span>
                    <span className="text-sm text-neutral-700 leading-relaxed font-light block">
                      {project.focus}
                    </span>
                  </div>
                </div>

                {project.isPdf && (
                  <div className="pt-2 flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-neutral-900 text-white px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-300" />
                      <span>View PDF Presentation</span>
                    </button>
                    <a
                      href="/pptt.pdf"
                      download="2BHK_Interiors_Portfolio_Presentation.pdf"
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider border border-neutral-400 text-neutral-800 px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA button */}
        <div className="pt-16 text-center border-t border-neutral-300 flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={onViewAll}
            className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-neutral-900 border-b border-neutral-900 pb-1 hover:text-neutral-600 hover:border-neutral-500 transition-all"
          >
            <span>View Projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <a
            href="/pptt.pdf"
            download="2BHK_Interiors_Portfolio_Presentation.pdf"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-amber-800 bg-amber-100 hover:bg-amber-200 px-5 py-2 rounded-full transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Portfolio PDF (pptt.pdf)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

