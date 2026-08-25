import { X, Calendar, Tag, Sparkles, Download, ExternalLink, FileText } from 'lucide-react';

export default function ProjectModal({ project, imageUrl, onClose, onBookConsultation }) {
  if (!project && !imageUrl) return null;

  const isPdf = project?.isPdf || project?.pdfUrl;
  const pdfPath = project?.pdfUrl || '/pptt.pdf';
  const displayImage = project ? project.image : imageUrl;
  const displayTitle = project ? project.title : 'Signature Architectural Highlight';
  const displayType = project ? project.type : 'Luxury Interior Space';
  const displayFocus = project
    ? project.focus
    : 'A balance of natural daylight, organic timber, and spatial silence.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-lg animate-fadeIn">
      <div className={`relative w-full ${isPdf ? 'max-w-5xl' : 'max-w-4xl'} bg-[#111111] border border-white/20 text-white rounded-none shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 text-white bg-black/70 hover:bg-black border border-white/30 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isPdf ? (
          /* PDF Interactive Preview Mode */
          <div className="flex flex-col">
            {/* PDF Header Controls */}
            <div className="bg-neutral-900 p-6 sm:p-8 border-b border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pr-12">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-bold uppercase tracking-widest mb-1">
                    <FileText className="w-4 h-4" />
                    <span>2BHK INTERIORS DIGITAL PORTFOLIO DECK</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-syne tracking-tight text-white">
                    {displayTitle}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-neutral-800 hover:bg-neutral-700 text-white border border-white/20 px-4 py-2.5 rounded-full transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in New Tab</span>
                  </a>

                  <a
                    href={pdfPath}
                    download="2BHK_Interiors_Portfolio_Presentation.pdf"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-black px-5 py-2.5 rounded-full transition-all shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF (34.8 MB)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded PDF iframe */}
            <div className="w-full bg-neutral-950 relative h-[60vh] sm:h-[68vh]">
              <iframe
                src={`${pdfPath}#toolbar=1&navpanes=0`}
                title={displayTitle}
                className="w-full h-full border-0 bg-neutral-900"
              />
              <div className="p-3 bg-neutral-900/90 text-center text-xs text-neutral-400 border-t border-white/10 flex items-center justify-center gap-4">
                <span>Trouble viewing the document inline?</span>
                <a
                  href={pdfPath}
                  download="2BHK_Interiors_Portfolio_Presentation.pdf"
                  className="text-amber-300 hover:underline font-semibold"
                >
                  Click here to download pptt.pdf directly
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Standard Image Preview Mode */
          <div className="relative aspect-16/10 w-full bg-neutral-900 overflow-hidden">
            <img
              src={displayImage}
              alt={displayTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#111111] via-transparent to-transparent" />
          </div>
        )}

        {/* Project Metadata Footer Details */}
        <div className="p-6 sm:p-10 space-y-6">
          {!isPdf && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase block mb-1">
                  2BHK INTERIORS PORTFOLIO SELECTION
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold font-syne tracking-tight">
                  {displayTitle}
                </h2>
              </div>

              {project?.dates && (
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900 border border-white/10 px-4 py-2 rounded">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{project.dates}</span>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-syne flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                <span>Scope & Format</span>
              </span>
              <p className="text-sm font-medium text-neutral-200">{displayType}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-syne flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Presentation Overview</span>
              </span>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                {displayFocus}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-400 font-light">
              Interested in scheduling a personalized design walk-through or consultation?
            </p>

            <button
              onClick={() => {
                onClose();
                onBookConsultation();
              }}
              className="bg-amber-400 text-black font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-amber-300 transition-all w-full sm:w-auto cursor-pointer"
            >
              Request Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

