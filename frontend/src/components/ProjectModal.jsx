import { X, Calendar, Tag, Sparkles } from 'lucide-react';

export default function ProjectModal({ project, imageUrl, onClose, onBookConsultation }) {
  if (!project && !imageUrl) return null;

  const displayImage = project ? project.image : imageUrl;
  const displayTitle = project ? project.title : 'Signature Architectural Highlight';
  const displayType = project ? project.type : 'Luxury Interior Space';
  const displayFocus = project
    ? project.focus
    : 'A balance of natural daylight, organic timber, and spatial silence.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#111111] border border-white/20 text-white rounded-none shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 text-white bg-black/50 hover:bg-black border border-white/20 rounded-full backdrop-blur-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Image Preview */}
        <div className="relative aspect-16/10 w-full bg-neutral-900 overflow-hidden">
          <img
            src={displayImage}
            alt={displayTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#111111] via-transparent to-transparent" />
        </div>

        {/* Project Details */}
        <div className="p-8 sm:p-12 space-y-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-syne flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                <span>Project Scope</span>
              </span>
              <p className="text-sm font-medium text-neutral-200">{displayType}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-syne flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Design Focus & Materials</span>
              </span>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                {displayFocus}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-400 font-light">
              Interested in achieving a similar aesthetic for your property?
            </p>

            <button
              onClick={() => {
                onClose();
                onBookConsultation();
              }}
              className="bg-white text-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-neutral-200 transition-all w-full sm:w-auto"
            >
              Request Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
