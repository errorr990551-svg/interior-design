import { useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

export default function BehindRenova({ onLearnMore }) {
  const [activeCard, setActiveCard] = useState(0);

  const services = [
    {
      id: '01',
      title: 'Residential Interiors',
      description:
        'Warm, functional living spaces thoughtfully designed around daily rituals, comfort, and personal moments that make a house truly feel like home.',
      image: '/images/service-01.jpg',
      alt: 'Bespoke Sculptural Lounge Chair Interior',
    },
    {
      id: '02',
      title: 'Commercial Spaces',
      description:
        'Modern, efficient environments carefully crafted to enhance productivity, reflect brand identity, and create meaningful experiences for clients and teams.',
      image: '/images/service-02.jpg',
      alt: 'Terracotta Pink Boutique Coffee Bar Interior',
    },
    {
      id: '03',
      title: 'Renovation & Styling',
      description:
        'End-to-end interior transformations, guiding every stage from concept development through execution, styling, and refined final detailing.',
      image: '/images/service-03.jpg',
      alt: 'Warm Cozy Living Room with Ambient Lighting',
    },
  ];

  const handlePrev = () => {
    setActiveCard((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCard((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="studio" className="bg-[#f9f9f8] text-[#111111] py-24 sm:py-32 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-16">
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-neutral-500 font-syne block">
              BEHIND RENOVA
            </span>
            <div className="overflow-hidden rounded-sm shadow-xl bg-neutral-900 aspect-4/3 md:aspect-3/4 relative group border border-neutral-200">
              <img
                src="/images/process-desk.jpg"
                alt="RENOVA Studio Architecture & Philosophy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity p-4 flex items-end">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white bg-black/70 px-3 py-1.5 backdrop-blur-md rounded border border-white/20">
                  EST. 2018 — TOKYO & MILAN
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-snug font-syne text-neutral-900">
              We're an interior design studio crafting spaces that balance beauty, function, and comfort. Our work blends modern aesthetics with thoughtful storytelling.
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl font-light">
              We're an interior design studio crafting spaces that balance beauty, function, and comfort. Our work blends modern aesthetics with thoughtful storytelling.
            </p>

            <div className="pt-2">
              <button
                onClick={onLearnMore}
                className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-neutral-900 border-b border-neutral-900 pb-1 hover:text-neutral-600 hover:border-neutral-500 transition-all"
              >
                <span>Learn More</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Subhead bar with slider arrows */}
        <div className="flex items-center justify-between py-6 border-t border-b border-neutral-300 mb-12">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-neutral-800 font-syne">
            WE'RE AN INTERIOR DESIGN STUDIO
          </span>

          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all"
              aria-label="Previous Service"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all"
              aria-label="Next Service"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Service Grid Cards with User-Sent Exact Images */}
        <div id="services" className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((item, index) => {
            const isHighlight = activeCard === index;
            return (
              <div
                key={item.id}
                onClick={() => setActiveCard(index)}
                className={`cursor-pointer group bg-[#111111] text-white overflow-hidden rounded-none flex flex-col justify-between min-h-130 transition-all duration-500 hover:scale-[1.01] shadow-2xl ${
                  isHighlight ? 'ring-2 ring-white bg-[#161616]' : ''
                }`}
              >
                {/* Image Container with Exact User Image */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.95]"
                  />
                  <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-mono font-bold text-white border border-white/20">
                    {item.id}
                  </div>
                </div>

                {/* Card Title & Content */}
                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between border-t border-white/10">
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-syne text-white group-hover:text-neutral-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-300 group-hover:text-white">
                    <span>Explore Space</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
