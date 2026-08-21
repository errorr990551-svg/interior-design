import { useState } from 'react';
import { ArrowUpRight, ArrowUp, Send, CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({ onNavigate, onOpenConsultation }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (page, sectionId = null) => {
    if (onNavigate) onNavigate(page);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const locations = [
    { area: 'SOUTH MUMBAI', detail: 'Colaba & Worli Residences' },
    { area: 'BANDRA & KHAR', detail: 'Apartment & Villa Interiors' },
    { area: 'JUHU & VILE PARLE', detail: 'Private Residential Estates' },
    { area: 'POWAI & THANE', detail: 'Modern Penthouse Redesigns' },
  ];

  const socialLinks = [
    { name: 'Instagram (@2bhkinteriors)', href: 'https://instagram.com' },
    { name: 'Pinterest Journal', href: 'https://pinterest.com' },
    { name: 'LinkedIn Professional', href: 'https://linkedin.com' },
    { name: 'Houzz Portfolio', href: 'https://houzz.com' },
  ];

  return (
    <footer id="contact" className="bg-[#080808] text-white pt-24 pb-12 border-t border-white/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Call to Action & Newsletter Box */}
        <div className="pb-20 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-300 font-syne">
              DESIGN CONSULTATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight text-white leading-tight">
              Ready to design <br />
              your home?
            </h2>
            <p className="text-sm text-neutral-400 font-light max-w-md">
              Receive curated material insights, spatial walkthrough releases, and direct consultation availability.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="bg-neutral-900 border border-amber-400/40 rounded-2xl p-6 flex items-center gap-4 text-amber-300 animate-fadeIn">
                <CheckCircle2 className="w-6 h-6 shrink-0 text-amber-400" />
                <div>
                  <p className="font-semibold text-sm">Welcome to 2BHK Interiors Studio Journal</p>
                  <p className="text-xs text-neutral-400">We've reserved your priority consultation access.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-neutral-900/90 border border-white/20 rounded-full px-6 py-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors flex-1"
                />
                <button
                  type="submit"
                  className="bg-amber-400 text-black font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-amber-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Navigation & Studio Details */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10">
          {/* Brand Logo & Statement */}
          <div className="md:col-span-4 space-y-6">
            <button
              onClick={() => handleNavClick('home')}
              className="text-3xl font-syne text-white block hover:opacity-80 transition-opacity bg-transparent border-0 text-left cursor-pointer"
            >
              <span className="font-extrabold tracking-tight text-amber-300">2BHK</span>
              <span className="font-light tracking-[0.25em] text-neutral-200 text-2xl uppercase ml-2.5">INTERIORS</span>
            </button>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light max-w-sm">
              A specialized residential interior design studio in Mumbai. 2D space planning, photorealistic 3D visualization, and tactile mood boards for apartments and homes.
            </p>

            <div className="space-y-2 text-xs text-neutral-300 font-syne">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+91 98200 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>hello@2bhkinteriors.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenConsultation}
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest bg-amber-400 text-black px-6 py-3 rounded-full hover:bg-amber-300 transition-all cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Active Localities */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-300 font-syne block">
              PRIMARY SERVICE AREAS
            </span>
            <div className="grid grid-cols-2 gap-6 pt-2">
              {locations.map((loc) => (
                <div key={loc.area} className="space-y-1">
                  <span className="text-xs font-bold font-syne text-white tracking-wider block">
                    {loc.area}
                  </span>
                  <span className="text-xs text-neutral-400 font-light block leading-normal">
                    {loc.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Page Links */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-300 font-syne block">
              NAVIGATION
            </span>
            <ul className="space-y-3 pt-2">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-xs text-neutral-300 hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="text-xs text-neutral-300 hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer"
                >
                  About Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('services')}
                  className="text-xs text-neutral-300 hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer"
                >
                  Our 3 Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('home', 'work')}
                  className="text-xs text-neutral-300 hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer"
                >
                  Featured Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('home', 'process')}
                  className="text-xs text-neutral-300 hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer"
                >
                  5-Step Process
                </button>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-300 font-syne block">
              CONNECT
            </span>
            <ul className="space-y-3 pt-2">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-amber-300 transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 2BHK Interiors Studio. All rights reserved. Exclusively Residential Design.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors py-2 px-4 rounded-full border border-white/10 hover:border-amber-400/40 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
