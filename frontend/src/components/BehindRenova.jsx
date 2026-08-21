import { useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight, Quote } from 'lucide-react';

export default function BehindRenova({ onLearnMore, onSelectService }) {
  const [activeCard, setActiveCard] = useState(0);

  const services = [
    {
      id: '01',
      title: '2D Interior Design & Space Planning',
      description:
        'Precise, scaled floor plans and layouts that solve for flow, storage, and function first. This is the foundation every good interior is built on, ensuring clearance and lighting work seamlessly before any styling.',
      image: '/images/service_2d_plan.jpg',
      alt: '2D Scaled Floor Plan Blueprint',
      tag: 'Layout & Function',
    },
    {
      id: '02',
      title: '3D Interior Design & Visualization',
      description:
        'Photorealistic 3D renders and walkthroughs of your space, so you can see your home before it is built. Lighting, materials, furniture placement, all visualized room by room with revision rounds.',
      image: '/images/service_3d_render.jpg',
      alt: 'Photorealistic 3D Master Bedroom Render',
      tag: 'Immersive Renders',
    },
    {
      id: '03',
      title: 'Mood Boards & Concept Styling',
      description:
        'A curated visual language for your home: palette, textures, materials and references, collated and agreed before design work begins. The fastest, most affordable way to lock direction.',
      image: '/images/service_moodboard.jpg',
      alt: 'Tactile Physical Mood Board Flat-Lay',
      tag: 'Palette & Textures',
    },
  ];

  const handlePrev = () => {
    setActiveCard((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCard((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="studio" className="bg-[#0e0e0e] text-[#f5f5f5] py-24 sm:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-20 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-300 font-syne block">
              STUDIO INTRODUCTION
            </span>
            <div className="overflow-hidden rounded-2xl shadow-2xl bg-neutral-900 aspect-4/3 relative group border border-white/15">
              <img
                src="/images/home_studio_desk.jpg"
                alt="2BHK Interiors Design Studio Workspace"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <span className="text-[11px] font-mono tracking-widest uppercase text-amber-200 bg-black/70 px-3.5 py-1.5 backdrop-blur-md rounded-full border border-amber-300/30 w-fit">
                  3 YEARS • 100% RESIDENTIAL FOCUS
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-snug font-syne text-white">
              At 2BHK Interiors, we believe luxury isn't about excess. It's about restraint, proportion, and detail done properly.
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              For three years, we've worked exclusively on residential interiors, which means every layout we draw, every material we suggest, and every mood board we build is built around how people actually live at home, not how a showroom looks for a day.
            </p>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              Whether you're designing a single room or reimagining an entire home, our process moves from concept to a fully visualized space, so you know exactly what you're getting before execution begins. We don't believe in surprises at the end of a project. We believe in agreeing the vision at the start, and holding to it.
            </p>

            {/* Founder Quote */}
            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 relative flex items-start gap-4">
              <Quote className="w-8 h-8 text-amber-400 shrink-0 opacity-80" />
              <div>
                <p className="text-lg text-amber-100 italic font-cormorant">
                  "Restraint and proportion over trend chasing — every home should be designed for how a family lives at 7am as much as how it looks at golden hour."
                </p>
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-syne font-semibold mt-2 block">
                  — Founder & Principal Designer, 2BHK Interiors
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onLearnMore}
                className="group inline-flex items-center gap-3 text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-300 border-b border-amber-400/40 pb-1 hover:text-amber-200 hover:border-amber-300 transition-all cursor-pointer"
              >
                <span>Learn More About Our Story & Team</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Subhead bar with slider arrows */}
        <div id="services" className="flex items-center justify-between py-6 border-t border-b border-white/15 mb-12">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-300 font-syne block mb-1">
              CORE OFFERINGS
            </span>
            <h3 className="text-lg sm:text-2xl font-bold tracking-tight uppercase font-syne text-white">
              Our 3-Stage Design System
            </h3>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/20 hover:border-amber-400 hover:bg-amber-400 hover:text-black transition-all cursor-pointer"
              aria-label="Previous Service"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/20 hover:border-amber-400 hover:bg-amber-400 hover:text-black transition-all cursor-pointer"
              aria-label="Next Service"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Service Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((item, index) => {
            const isHighlight = activeCard === index;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveCard(index);
                  if (onSelectService) onSelectService(item);
                }}
                className={`cursor-pointer group bg-[#141414] text-white overflow-hidden rounded-2xl flex flex-col justify-between transition-all duration-500 border border-white/10 hover:border-amber-400/40 hover:scale-[1.01] shadow-2xl ${
                  isHighlight ? 'ring-2 ring-amber-400/80 bg-[#1a1a1a]' : ''
                }`}
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md px-3 py-1 text-xs font-mono font-bold text-amber-300 border border-amber-400/30 rounded-full">
                    {item.id} • {item.tag}
                  </div>
                </div>

                {/* Card Title & Content */}
                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-syne text-white group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-amber-300 group-hover:text-amber-200">
                    <span>View Service Details</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-neutral-400 mt-10 tracking-wider">
          Each service can stand alone or come together as one connected process; most clients move through all three, in that order.
        </p>
      </div>
    </section>
  );
}
