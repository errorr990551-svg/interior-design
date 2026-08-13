import { useState } from 'react';
import { ArrowLeft, ArrowRight, Expand } from 'lucide-react';

export default function ProjectHighlight({ onOpenGallery }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Komorebi Kitchen & Bar',
      image: '/images/project-highlight.jpg',
      subtitle: 'Material balance & custom timber joinery',
    },
    {
      title: 'The Linden Lounge',
      image: '/images/linden-house.jpg',
      subtitle: 'Atmospheric light sculptures & warm textures',
    },
    {
      title: 'Casa Serene Suite',
      image: '/images/casa-serene.jpg',
      subtitle: 'Curved bouclé forms and architectural acoustic paneling',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="relative bg-[#0e0e0e] text-white py-24 lg:py-32 overflow-hidden border-t border-white/10">
      {/* Background Dimmed Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={slides[currentSlide].image}
          alt="Project Background"
          className="w-full h-full object-cover filter brightness-[0.25] blur-sm transition-all duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0e0e0e] via-black/60 to-[#0e0e0e]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Header & Slider Arrows */}
        <div className="flex items-center justify-between pb-8 border-b border-white/15 mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400 font-syne">
            PROJECT HIGHLIGHT
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all"
              aria-label="Previous Highlight"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all"
              aria-label="Next Highlight"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Highlight Main Section matching Screenshot 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-4 space-y-6">
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              A focused selection of interior projects highlighting our approach to clarity, material balance, spatial comfort, and thoughtful design solutions
            </p>

            <div className="pt-2">
              <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase block mb-1">
                FEATURED WORK 0{currentSlide + 1} / 0{slides.length}
              </span>
              <h3 className="text-xl font-bold font-syne text-white">
                {slides[currentSlide].title}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            <button
              onClick={() => onOpenGallery(slides[currentSlide].image)}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-300 hover:text-white border-b border-white/30 pb-1 pt-2 transition-all"
            >
              <Expand className="w-3.5 h-3.5" />
              <span>Full Screen View</span>
            </button>
          </div>

          {/* Center Showcase Floating Frame */}
          <div className="lg:col-span-8">
            <div className="relative group overflow-hidden rounded-sm border border-white/15 shadow-2xl bg-neutral-900 aspect-16/10">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <span className="text-xs font-mono tracking-widest uppercase text-white bg-black/60 px-4 py-2 backdrop-blur-md rounded border border-white/20">
                  2BHK INTERIORS STUDIO SELECTION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
