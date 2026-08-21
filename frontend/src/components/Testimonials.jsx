import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote:
        '“2BHK Interiors completely changed the atmosphere of our home, blending beauty and function effortlessly.”',
      author: 'SARAH',
      role: 'RESIDENTIAL CLIENT',
    },
    {
      quote:
        '“Their architectural approach to natural lighting and custom joinery turned our penthouse into a serene sanctuary.”',
      author: 'MARCUS VANCE',
      role: 'CREATIVE DIRECTOR',
    },
    {
      quote:
        '“The team’s meticulous material selection and execution exceeded every expectation we had for our Flagship space.”',
      author: 'ELENA ROSTOVA',
      role: 'BOUTIQUE HOTEL OWNER',
    },
    {
      quote:
        '“Working with 2BHK Interiors felt like a true partnership. Every detail was crafted with spatial intelligence and warmth.”',
      author: 'DAVID K.',
      role: 'ARCHITECT & RESIDENT',
    },
    {
      quote:
        '“Timeless, functional, and deeply inspiring. 2BHK Interiors delivered a home that reflects exactly how we love to live.”',
      author: 'CLARA & HANS',
      role: 'PRIVATE VILLA CLIENT',
    },
  ];

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative bg-neutral-950 text-white py-28 lg:py-36 overflow-hidden border-t border-white/10">
      {/* Dark warm wood texture background overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/process-desk.jpg"
          alt="Testimonial Atmosphere"
          className="w-full h-full object-cover filter brightness-[0.18] contrast-125"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/80 to-black/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end min-h-80">
          {/* Left Column: TESTIMONIALS Tag & Counter */}
          <div className="md:col-span-3 flex flex-col justify-between h-full space-y-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400 font-syne">
              TESTIMONIALS
            </span>

            <div className="text-3xl font-light font-mono text-neutral-300">
              0{activeTestimonial + 1}/0{testimonials.length}
            </div>
          </div>

          {/* Right Column: Quote & Author & Slider Arrows */}
          <div className="md:col-span-9 space-y-12">
            <blockquote className="text-2xl sm:text-4xl md:text-5xl font-light font-syne leading-tight text-neutral-100 max-w-4xl">
              {testimonials[activeTestimonial].quote}
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/15">
              <div>
                <span className="text-sm font-bold tracking-widest uppercase font-syne text-white block">
                  {testimonials[activeTestimonial].author}
                </span>
                <span className="text-xs tracking-wider uppercase text-neutral-400">
                  {testimonials[activeTestimonial].role}
                </span>
              </div>

              {/* Prev / Next arrows matching Screenshot 3 (Prompt 2) */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all"
                  aria-label="Previous Testimonial"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all"
                  aria-label="Next Testimonial"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
