import { useState } from 'react';
import { Plus, Minus, Layers } from 'lucide-react';

export default function DesignProcess() {
  // Default active step index 0 (Consultation) or 1
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: '01',
      title: 'Consultation',
      content:
        'In-depth initial consultation to understand your vision, lifestyle rituals, architectural scope, timeline, and investment roadmap.',
      image: '/images/process-01.jpg',
      alt: 'Executive Consultation Studio & Office Architecture',
    },
    {
      id: '02',
      title: 'Concepting',
      content:
        'Ideas evolve into moodboards, layouts, and color directions shaping atmosphere, function, and spatial identity.',
      image: '/images/process-02.jpg',
      alt: 'Interior Design Concept Moodboard & Palette Collage',
    },
    {
      id: '03',
      title: 'Material Selection',
      content:
        'Sourcing sustainable luxury materials, tactile stone, bespoke joinery finishes, and curated architectural lighting.',
      image: '/images/process-03.jpg',
      alt: 'Luxury Architectural Material Flatlay Sample Board',
    },
    {
      id: '04',
      title: 'Execution',
      content:
        'Turn-key project management overseeing craftsman installation, custom fabrication, interior styling, and final handover.',
      image: '/images/process-04.jpg',
      alt: 'Completed Luxury Interior Spatial Execution',
    },
  ];

  // Helper to ensure an image is always displayed even if accordion is toggled
  const currentStepIndex = activeStep !== null ? activeStep : 0;

  return (
    <section id="process" className="bg-[#f9f9f8] text-[#111111] py-24 sm:py-32 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Dynamic Showcase Image with Smooth Crossfade Transition */}
          <div className="lg:col-span-6 overflow-hidden rounded-sm shadow-2xl bg-neutral-900 aspect-4/5 relative group border border-neutral-200">
            {steps.map((step, index) => {
              const isActive = currentStepIndex === index;
              return (
                <div
                  key={step.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
                  }`}
                >
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="w-full h-full object-cover hd-image"
                  />
                  {/* Subtle Gradient & Atmosphere Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />
                </div>
              );
            })}

            {/* Floating Step Indicator Badge */}
            <div className="absolute bottom-6 left-6 z-20 bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20 text-white flex items-center gap-2 shadow-lg">
              <Layers className="w-3.5 h-3.5 text-neutral-300" />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest">
                Phase {steps[currentStepIndex].id}: {steps[currentStepIndex].title}
              </span>
            </div>
          </div>

          {/* Right Content & Accordion List */}
          <div className="lg:col-span-6 space-y-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-snug font-syne text-neutral-900">
              Our thoughtful design process transforms ideas into timeless spaces through clarity, craft, collaboration, and careful execution.
            </h2>

            {/* Accordion List */}
            <div className="divide-y divide-neutral-300 pt-4">
              {steps.map((step, index) => {
                const isOpen = activeStep === index;
                return (
                  <div
                    key={step.id}
                    className={`transition-all duration-300 ${
                      isOpen ? 'bg-[#111111] text-white p-6 my-3 rounded-none shadow-xl' : 'py-5 text-neutral-900'
                    }`}
                  >
                    <button
                      onClick={() => setActiveStep(index)}
                      className="w-full flex items-center justify-between text-left group focus:outline-none cursor-pointer"
                    >
                      <div className="flex items-center space-x-6">
                        <span
                          className={`text-sm font-mono font-medium ${
                            isOpen ? 'text-neutral-400' : 'text-neutral-500'
                          }`}
                        >
                          {step.id}
                        </span>
                        <h3
                          className={`text-lg sm:text-xl font-semibold tracking-tight font-syne ${
                            isOpen ? 'text-white' : 'text-neutral-900 group-hover:text-neutral-600'
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>

                      <div className="p-1">
                        {isOpen ? (
                          <Minus className="w-5 h-5 text-white" />
                        ) : (
                          <Plus className="w-5 h-5 text-neutral-700 group-hover:text-neutral-900" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="pt-4 pl-12 pr-6 animate-fadeIn">
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                          {step.content}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

