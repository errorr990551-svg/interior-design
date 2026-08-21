import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Sun, Moon, Layers, Layout, Eye, Clock, FileCheck, ShieldAlert } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';

export default function ServicesPage({ onOpenConsultation, onNavigateHome }) {
  const [lightingMode, setLightingMode] = useState('day'); // 'day' | 'evening'

  const servicesFaqs = [
    {
      q: 'What is a mood board in interior design?',
      a: 'A mood board is a curated collection of colours, textures, materials and reference images that defines the visual direction of a space before detailed design work begins. It helps you agree on style early, avoiding costly changes later.',
    },
    {
      q: 'How long does 3D interior design take?',
      a: 'For a single room, 3D visualization typically takes about a week. A full home can take a few weeks depending on the number of rooms and revision rounds. Exact timelines are confirmed during consultation.',
    },
    {
      q: 'Do I need a 2D plan before 3D visualization?',
      a: 'Yes. The 2D layout locks in furniture placement, flow and electrical points. This is what the 3D visualization is built on, so getting the plan right first avoids rework at the render stage.',
    },
    {
      q: 'Do you design only residential spaces?',
      a: 'Yes, 2BHK Interiors works exclusively on residential interiors, apartments, villas and independent homes, and does not take on commercial or retail projects.',
    },
    {
      q: 'Can I book just one service, like only a mood board?',
      a: 'Yes. Each service can be booked on its own, though most clients move through mood board, 2D layout, and 3D visualization together for the most complete result.',
    },
  ];

  return (
    <div className="space-y-0 pt-24 bg-[#0e0e0e] text-white">
      {/* 1. Page Intro Banner */}
      <section className="relative min-h-[60vh] flex flex-col justify-center py-20 bg-[#0e0e0e] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/service_3d_render.jpg"
            alt="2BHK Interiors Services Showcase"
            className="w-full h-full object-cover filter brightness-[0.65] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0e0e0e] via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-300 uppercase">
            <button onClick={onNavigateHome} className="hover:underline cursor-pointer">
              HOME
            </button>
            <span>/</span>
            <span className="text-white font-bold">OUR SERVICES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-syne tracking-tight uppercase max-w-4xl leading-tight">
            Our Services
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-200 font-light max-w-3xl leading-relaxed">
            From the first floor plan to the final render, every 2BHK Interiors project moves through three connected stages designed to remove guesswork from your home's design, so what you approve on screen is what you get in your space.
          </p>
        </div>
      </section>

      {/* 2. Deep Dive: 2D Space Planning */}
      <section id="service-2d" className="py-24 sm:py-32 border-b border-white/10 bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold uppercase tracking-widest text-amber-300 font-syne">
                <Layout className="w-3.5 h-3.5" />
                <span>STAGE 01 • SPATIAL FOUNDATION</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight">
                2D Interior Design & Space Planning
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                Every project starts on paper, literally. We create detailed, to-scale 2D floor plans that map furniture placement, traffic flow, storage, electrical and lighting points, and spatial proportions before any styling decisions are made. This is the stage that decides whether a home works.
              </p>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                A good 2D layout answers questions most people don't think to ask until living with the wrong answer: where does the sofa actually fit without blocking the walkway, is there enough clearance to open the wardrobe fully, does the kitchen counter get natural light. Getting these right on paper is far cheaper than discovering them after execution.
              </p>

              <div className="pt-4 space-y-3 border-t border-white/10">
                <span className="text-xs font-bold font-syne uppercase tracking-wider text-amber-300">What's Included:</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Measured floor plans of existing space</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Furniture layout & zoning options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Electrical & switch-point planning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Storage & utility optimization</span>
                  </li>
                  <li className="flex items-center gap-2 sm:col-span-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Multiple layout iterations before final sign-off</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#141414] p-4">
                <img
                  src="/images/service_2d_plan.jpg"
                  alt="Scaled Architectural 2D Floor Plan Layout"
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive: 3D Interior Design & Visualization */}
      <section id="service-3d" className="py-24 sm:py-32 border-b border-white/10 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#0e0e0e] p-4 space-y-4">
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  <img
                    src="/images/service_3d_render.jpg"
                    alt="Photorealistic 3D Master Bedroom Visualization"
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      lightingMode === 'evening' ? 'brightness-75 contrast-125 saturate-110' : 'brightness-100'
                    }`}
                  />
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-3">
                    <button
                      onClick={() => setLightingMode('day')}
                      className={`flex items-center gap-1.5 text-xs font-bold font-syne uppercase tracking-wider px-3 py-1 rounded-full transition-all ${
                        lightingMode === 'day' ? 'bg-amber-400 text-black' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5" />
                      <span>Daylight</span>
                    </button>
                    <button
                      onClick={() => setLightingMode('evening')}
                      className={`flex items-center gap-1.5 text-xs font-bold font-syne uppercase tracking-wider px-3 py-1 rounded-full transition-all ${
                        lightingMode === 'evening' ? 'bg-amber-400 text-black' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5" />
                      <span>Evening Ambient</span>
                    </button>
                  </div>
                </div>
                <div className="p-2 text-center">
                  <span className="text-xs font-mono text-amber-300 uppercase tracking-widest">
                    Interactive Preview: Toggle Lighting Study (Daylight vs Evening Ambient)
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold uppercase tracking-widest text-amber-300 font-syne">
                <Eye className="w-3.5 h-3.5" />
                <span>STAGE 02 • IMMERSIVE VISUALIZATION</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight">
                3D Interior Design & Visualization
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                Once the layout is locked, we build your space in 3D: photorealistic renders and walkthroughs that show true-to-life materials, finishes, lighting and furniture, room by room. This is where the mood board and floor plan come together into something you can actually walk through before committing.
              </p>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                3D visualization removes the single biggest source of anxiety in any home renovation: not knowing what you're going to get. Instead of imagining how a material looks from a swatch, you see it rendered in your own room.
              </p>

              <div className="pt-4 space-y-3 border-t border-white/10">
                <span className="text-xs font-bold font-syne uppercase tracking-wider text-amber-300">What's Included:</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>High-resolution 3D renders per room</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Walkthrough visualization for full homes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Exact material & furniture matching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Day vs Evening lighting studies</span>
                  </li>
                  <li className="flex items-center gap-2 sm:col-span-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Dedicated revision rounds based on your feedback</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Deep Dive: Mood Boards & Concept Styling */}
      <section id="service-moodboard" className="py-24 sm:py-32 border-b border-white/10 bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold uppercase tracking-widest text-amber-300 font-syne">
                <Layers className="w-3.5 h-3.5" />
                <span>STAGE 03 • VISUAL DIRECTION</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight">
                Mood Boards & Concept Styling
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                Before we render a single wall, we define the visual language of your home: palette, textures, material references, and furniture direction, collated into a mood board you review and approve. It's the fastest, most affordable way to get design direction right before time is spent on layouts and renders.
              </p>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                A mood board isn't just a scrapbook of pretty pictures. It's a working document. Every material and colour choice in it is something we can actually source and specify later.
              </p>

              <div className="pt-4 space-y-3 border-t border-white/10">
                <span className="text-xs font-bold font-syne uppercase tracking-wider text-amber-300">What's Included:</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Colour palette & material direction</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Curated reference imagery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Texture boards (flooring, upholstery, metals)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Style alignment sign-off before design</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#141414] p-4">
                <img
                  src="/images/service_moodboard.jpg"
                  alt="Tactile Physical Mood Board Flat-Lay"
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How the 3 Services Work Together */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-16">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-300 font-syne block">
              CONNECTED WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight">
              How the Three Services Work Together
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light">
              Each service can stand alone, but together they remove every risk from your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#0e0e0e] border border-white/10 relative space-y-4">
              <span className="w-10 h-10 rounded-full bg-amber-400 text-black font-extrabold font-syne flex items-center justify-center mx-auto text-lg">
                1
              </span>
              <h3 className="text-xl font-bold font-syne text-white">Mood Board</h3>
              <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider">Agrees the Look</p>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Locks in colour palettes, wood grains, metal finishes, and textile direction before any spatial drawing begins.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0e0e0e] border border-white/10 relative space-y-4">
              <span className="w-10 h-10 rounded-full bg-amber-400 text-black font-extrabold font-syne flex items-center justify-center mx-auto text-lg">
                2
              </span>
              <h3 className="text-xl font-bold font-syne text-white">2D Layout</h3>
              <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider">Agrees the Function</p>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Solves floor space, furniture clearances, traffic movement, electrical switches, and storage planning to scale.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0e0e0e] border border-white/10 relative space-y-4">
              <span className="w-10 h-10 rounded-full bg-amber-400 text-black font-extrabold font-syne flex items-center justify-center mx-auto text-lg">
                3
              </span>
              <h3 className="text-xl font-bold font-syne text-white">3D Visualization</h3>
              <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider">Agrees the Final Result</p>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Combines look and layout into photorealistic 3D renders so you experience your home before touching site execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Scope & Timelines Breakdown */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-20">
          {/* Scope shapes */}
          <div className="space-y-12">
            <div className="text-center space-y-4 max-w-xl mx-auto">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-300 font-syne block">
                PROJECT SHAPES
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight">
                Get a Sense of Scope
              </h2>
              <p className="text-sm text-neutral-400 font-light">
                Every home is unique. Most enquiries fall into one of three common shapes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-[#141414] border border-white/10 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-300">Shape 01</span>
                <h3 className="text-xl font-bold font-syne text-white">Single Room Refresh</h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  Usually a mood board plus 3D visualization for one space, such as a master bedroom, living room, or home office, without full 2D re-layout if existing layout already works.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#141414] border border-white/10 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-300">Shape 02</span>
                <h3 className="text-xl font-bold font-syne text-white">Partial Home Update</h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  2D layout, mood board and 3D visualization for a few connected spaces, such as a living and dining area, or a kitchen and adjoining utility space.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#141414] border border-white/10 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-300">Shape 03</span>
                <h3 className="text-xl font-bold font-syne text-white">Full Home Project</h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  The complete process across every room, typically the longest engagement where mood board and layout planning save the most time and cost during execution.
                </p>
              </div>
            </div>
          </div>

          {/* Timelines Table */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#141414] border border-white/10 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider font-syne">
                  <Clock className="w-4 h-4" />
                  <span>TRANSPARENT ESTIMATES</span>
                </div>
                <h3 className="text-2xl font-bold font-syne text-white mt-1">
                  Timelines & What to Expect
                </h3>
              </div>
              <span className="text-xs text-neutral-400 font-mono">Honest ranges build trust</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/5 space-y-2">
                <span className="text-xs text-neutral-400 font-syne uppercase">Mood Board</span>
                <div className="text-2xl font-bold font-syne text-amber-300">3 – 5 Days</div>
                <p className="text-[11px] text-neutral-400">Single room to small space</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/5 space-y-2">
                <span className="text-xs text-neutral-400 font-syne uppercase">2D Layout</span>
                <div className="text-2xl font-bold font-syne text-amber-300">1 – 2 Weeks</div>
                <p className="text-[11px] text-neutral-400">Depending on scope & iterations</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/5 space-y-2">
                <span className="text-xs text-neutral-400 font-syne uppercase">3D Visualization</span>
                <div className="text-2xl font-bold font-syne text-amber-300">1 Week / Room</div>
                <p className="text-[11px] text-neutral-400">High-res photorealistic renders</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/5 space-y-2">
                <span className="text-xs text-neutral-400 font-syne uppercase">Full Process</span>
                <div className="text-2xl font-bold font-syne text-amber-300">4 – 8 Weeks</div>
                <p className="text-[11px] text-neutral-400">Mood board through handover</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Deliverables at Handover */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold uppercase tracking-widest text-amber-300 font-syne">
              <FileCheck className="w-3.5 h-3.5" />
              <span>CONCRETE OUTCOMES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight">
              What You Receive at Handover
            </h2>
            <p className="text-sm text-neutral-400 font-light">
              Execution-ready file packages that contractors and builders can actually work from without guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-[#141414] border border-white/10 space-y-4">
              <span className="text-xs font-mono uppercase text-amber-300">From Mood Board</span>
              <h3 className="text-lg font-bold font-syne text-white">Palette & Material Board</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Finalized color codes, flooring swatches, wall finishes, upholstery references and accent metal tones.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#141414] border border-white/10 space-y-4">
              <span className="text-xs font-mono uppercase text-amber-300">From 2D Layout</span>
              <h3 className="text-lg font-bold font-syne text-white">Scaled Floor Plans</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Dimensioned CAD/PDF floor plans including furniture zoning, electrical switch points, and plumbing positions.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#141414] border border-white/10 space-y-4">
              <span className="text-xs font-mono uppercase text-amber-300">From 3D Render</span>
              <h3 className="text-lg font-bold font-syne text-white">High-Res Render Set</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                High-resolution room renders, lighting studies, and walkthrough render files for whole-home projects.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#141414] border border-white/10 space-y-4">
              <span className="text-xs font-mono uppercase text-amber-300">Final Handover</span>
              <h3 className="text-lg font-bold font-syne text-white">Material Spec Sheet</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Complete vendor specification sheet listing exact finish codes, wood species, paint shades, and hardware models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQs */}
      <FAQSection
        title="Services FAQ"
        subtitle="Frequently asked questions regarding our 3-stage design offerings"
        faqs={servicesFaqs}
      />

      {/* 9. Final CTA */}
      <CTASection
        headline="Ready to Start Designing?"
        subtext="Tell us about your space and which service you're interested in, and we'll get back to you to schedule a consultation."
        buttonText="Book a Design Consultation"
        onOpenConsultation={onOpenConsultation}
      />
    </div>
  );
}
