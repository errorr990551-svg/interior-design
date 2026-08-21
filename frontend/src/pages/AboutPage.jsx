import { ArrowUpRight, ShieldCheck, Clock, Home, Compass, Leaf, Award } from 'lucide-react';
import StatsSection from '../components/StatsSection';
import MaterialsSection from '../components/MaterialsSection';
import FAQSection from '../components/FAQSection';
import WhereWeWorkSection from '../components/WhereWeWorkSection';
import CTASection from '../components/CTASection';

export default function AboutPage({ onOpenConsultation, onNavigateHome }) {
  const philosophies = [
    {
      icon: Clock,
      title: 'Timeless over trendy',
      desc: "We design for how a space will feel in ten years, not how it photographs this season. Materials, proportions and layouts are chosen to age well, not to chase social media trends.",
    },
    {
      icon: Compass,
      title: 'Plan before you style',
      desc: 'Every project starts with function: layout, flow, storage, before a single material or colour is chosen. A beautiful room that does not work for daily life is an unfinished one.',
    },
    {
      icon: ShieldCheck,
      title: 'See it before you build it',
      desc: '3D visualization exists so nothing is a surprise once execution starts. You approve the design on screen with real materials and lighting before site execution begins.',
    },
    {
      icon: Home,
      title: 'Residential, exclusively',
      desc: 'We do not split focus across commercial or retail work. Homes are the only thing we design, and that focus shows up in the small decisions most general studios miss.',
    },
  ];

  const aboutFaqs = [
    {
      q: 'How long has 2BHK Interiors been in business?',
      a: '2BHK Interiors was founded three years ago and has worked exclusively on residential interior design projects since.',
    },
    {
      q: 'What areas does 2BHK Interiors serve?',
      a: 'We currently design homes in Mumbai and surrounding areas. We also offer remote design services for clients outside our immediate region.',
    },
    {
      q: 'What makes 2BHK Interiors different from other design studios?',
      a: 'We work only on residential projects, and every design goes through 2D planning, mood boarding and 3D visualization before execution, so clients see their finished home before committing to it.',
    },
    {
      q: 'Does 2BHK Interiors handle execution, or only design?',
      a: 'We provide execution-ready design files, floor plans, material spec sheets, and full 3D renders. We also collaborate with trusted execution contractors to ensure the final build matches sign-off exactly.',
    },
  ];

  return (
    <div className="space-y-0 pt-24 bg-[#0e0e0e] text-white">
      {/* 1. Page Intro Banner */}
      <section className="relative min-h-[70vh] flex flex-col justify-center py-20 bg-[#0e0e0e] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about_banner.jpg"
            alt="2BHK Interiors Studio Interior"
            className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0e0e0e] via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-300 uppercase">
            <button onClick={onNavigateHome} className="hover:underline cursor-pointer">
              HOME
            </button>
            <span>/</span>
            <span className="text-white font-bold">ABOUT THE STUDIO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-syne tracking-tight uppercase max-w-4xl leading-tight">
            Designed Around How You Live
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-200 font-light max-w-3xl leading-relaxed">
            2BHK Interiors is a residential interior design studio built on a simple idea: good design should feel considered, not decorated. For three years, we've worked exclusively on homes, bringing detailed 2D planning, honest 3D visualization, and thoughtful mood boards to every project we take on.
          </p>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-300 font-syne block">
                OUR JOURNEY & FOCUS
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight leading-tight">
                Our Story
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                2BHK Interiors was founded three years ago on a simple idea: that residential design deserves the same rigor as any other design discipline. Detailed planning, honest visualization, and a point of view that doesn't chase trends. What started as a small studio focused purely on homes has stayed exactly that. We design apartments, villas, and independent houses, and nothing else.
              </p>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                That focus is deliberate. Residential spaces have their own logic: how a family moves through a kitchen at 8am, where the light falls in a living room by evening, how much storage a home actually needs versus how much a brief says it needs. Staying specialized lets us get that logic right, every time.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
                <img
                  src="/images/about_story.jpg"
                  alt="Designer reviewing floor plans at 2BHK Interiors studio"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent p-6 flex items-end">
                  <span className="text-xs font-syne uppercase tracking-wider text-amber-300 bg-black/70 px-4 py-2 rounded-full border border-amber-300/30 backdrop-blur-md">
                    Candid Studio Planning Session
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Philosophy */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-300 font-syne block">
              CORE PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight">
              Our Philosophy
            </h2>
            <p className="text-sm text-neutral-400 font-light">
              Four guiding principles that govern every layout, material selection, and 3D visualization we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophies.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-[#0e0e0e] border border-white/10 hover:border-amber-400/50 space-y-4 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-syne text-white group-hover:text-amber-200">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Why Residential Only */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-300 font-syne block">
                SPECIALIZATION
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight leading-tight">
                Why Residential Only
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                A lot of design studios take on whatever project comes through the door: a home this month, a retail fit-out next, an office after that. We made a different choice early on, and three years later we're glad we did.
              </p>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                Homes are lived in, not just visited. A living room has to work at 7am with family getting ready for the day and at 9pm when winding down. That's a different design problem than a commercial showroom where the goal is a fleeting first impression.
              </p>
              <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-2">
                <div className="text-amber-300 font-bold font-syne text-sm uppercase">
                  100% Home Design Focus
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Our timelines, material recommendations, and initial briefing questions are all built exclusively around residential daily life.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-8 sm:p-12 rounded-3xl bg-[#141414] border border-white/10 space-y-6">
                <h3 className="text-2xl font-bold font-syne text-white border-b border-white/10 pb-4">
                  The Residential Difference
                </h3>
                <ul className="space-y-4 text-xs sm:text-sm text-neutral-300 font-light">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span><strong>Daily Flow:</strong> Furniture layouts built around real movement, clearance, and traffic paths.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span><strong>Living Storage:</strong> Custom wardrobes and storage engineered for actual household volume.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span><strong>Lighting Ergonomics:</strong> Multi-layered lighting studies for morning task work and evening relaxation.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span><strong>Material Longevity:</strong> High-use residential finishes that resist wear and age beautifully.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Meet the Team / Leadership */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="aspect-square relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
                <img
                  src="/images/about_founder.jpg"
                  alt="2BHK Interiors Lead Designer Portrait"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                  <span className="text-lg font-bold font-syne text-white">Ananya Sharma</span>
                  <span className="text-xs text-amber-300 font-mono uppercase tracking-widest">Founder & Principal Designer</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-300 font-syne block">
                STUDIO LEADERSHIP
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight">
                Meet the Team
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                With over a decade of architectural and interior experience across premium residential developments, Ananya founded 2BHK Interiors to give homeowners an intentional, transparent design practice where nothing is left to chance.
              </p>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                "Our promise to every client is simplicity and precision. You sign off on exact 2D floor plans, exact material boards, and photorealistic 3D renders so you can step into your finished home with total confidence."
              </p>
              <div className="pt-4">
                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-3 bg-amber-400 text-black px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-amber-300 transition-all cursor-pointer"
                >
                  <span>Book Consultation With Designer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. A Note on Growth & Sustainability */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0e0e0e] border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold font-syne text-white">
                A Note on Growth
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                Three years in, 2BHK Interiors is still a small studio by design. We take on a limited number of residential projects at a time, which is what lets every layout be reviewed carefully, every mood board be genuinely tailored, and every 3D visualization go through real revision rounds. Fewer projects, done properly, over more projects done quickly.
              </p>
            </div>

            <div className="p-8 sm:p-12 rounded-3xl bg-[#0e0e0e] border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold font-syne text-white">
                Sustainability & Responsible Sourcing
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                Interior design has an environmental footprint that's easy to overlook. At 2BHK Interiors, material choices in every mood board and 2D layout consider durability and local sourcing, favouring honest natural materials that last for decades rather than ones needing replacement within a few years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Stats & Materials */}
      <StatsSection />
      <MaterialsSection />

      {/* 8. FAQs & Location Coverage */}
      <FAQSection
        title="About Studio FAQs"
        subtitle="Learn more about our practice, timelines, and design philosophy"
        faqs={aboutFaqs}
      />
      <WhereWeWorkSection onOpenConsultation={onOpenConsultation} />

      {/* 9. CTA */}
      <CTASection
        headline="Let's Talk About Your Home"
        subtext="If our approach sounds like the way you want your home designed, we'd like to hear about your space."
        buttonText="Book a Design Consultation"
        onOpenConsultation={onOpenConsultation}
      />
    </div>
  );
}
