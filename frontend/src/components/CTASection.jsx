import { ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';

export default function CTASection({
  headline = "Ready to Design Your Home?",
  subtext = "Tell us about your space and we'll get back to you to schedule a consultation, in person or over a call. No commitment, no pressure. Just a conversation about what you want your home to feel like.",
  buttonText = "Book a Design Consultation",
  onOpenConsultation,
}) {
  return (
    <section className="relative bg-[#090909] text-white py-24 sm:py-32 border-t border-white/10 overflow-hidden">
      {/* Background vignette & dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/about_banner.jpg"
          alt="CTA Background Vignette"
          className="w-full h-full object-cover opacity-15 filter brightness-50 contrast-125"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#090909] via-transparent to-[#090909]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-xs font-semibold uppercase tracking-widest text-amber-300 font-syne">
          <span>START YOUR JOURNEY</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-syne tracking-tight leading-tight uppercase">
          {headline}
        </h2>

        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
          {subtext}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="group flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-black px-9 py-4 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-2xl hover:shadow-amber-500/20 hover:scale-105 cursor-pointer"
          >
            <span>{buttonText}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Contact Snapshot line */}
        <div className="pt-12 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs sm:text-sm font-syne tracking-wider text-neutral-400 uppercase">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-400" />
            <span>+91 98200 12345</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-400" />
            <span>hello@2bhkinteriors.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Mumbai, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
