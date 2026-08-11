import { useState } from 'react';
import { ArrowUpRight, ArrowUp, Send, CheckCircle2 } from 'lucide-react';

export default function Footer({ onOpenConsultation }) {
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

  const studios = [
    { city: 'TOKYO', address: 'Ginza 4-Chome, Chuo-ku' },
    { city: 'MILAN', address: 'Via Solferino 12, Brera' },
    { city: 'NEW YORK', address: 'Mercer Street 88, SoHo' },
    { city: 'LONDON', address: 'Mount Street 34, Mayfair' },
  ];

  const socialLinks = [
    { name: 'Instagram', href: '#' },
    { name: 'Pinterest', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'Behance', href: '#' },
    { name: 'ArchDaily', href: '#' },
  ];

  const navLinks = [
    { name: 'About Studio', href: '#studio' },
    { name: 'Our Services', href: '#services' },
    { name: 'Recent Work', href: '#work' },
    { name: 'Design Process', href: '#process' },
    { name: 'Press & Awards', href: '#' },
    { name: 'Careers', href: '#' },
  ];

  return (
    <footer id="contact" className="bg-[#0a0a0a] text-white pt-24 pb-12 border-t border-white/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Call to Action & Newsletter Subscription Box */}
        <div className="pb-20 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400 font-syne">
              START A CONVERSATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight text-white leading-tight">
              Ready to craft your <br />
              dream space?
            </h2>
            <p className="text-sm text-neutral-400 font-light max-w-md">
              Receive curated spatial insights, architectural updates, and private studio collection releases.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="bg-neutral-900 border border-white/20 rounded-lg p-6 flex items-center gap-4 text-emerald-400 animate-fadeIn">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Welcome to RENOVA Private Journal</p>
                  <p className="text-xs text-neutral-400">We've sent a confirmation to your email.</p>
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
                  className="bg-neutral-900/90 border border-white/20 rounded-full px-6 py-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors flex-1"
                />
                <button
                  type="submit"
                  className="bg-white text-black font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Navigation & Studio Addresses */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10">
          {/* Brand Logo & Statement */}
          <div className="md:col-span-4 space-y-6">
            <a href="#" className="text-3xl font-bold tracking-[0.2em] font-syne text-white block">
              RENOVA
            </a>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light max-w-sm">
              An international interior design and architecture studio dedicated to timeless beauty, acoustic harmony, and spatial craftsmanship.
            </p>

            <button
              onClick={onOpenConsultation}
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest bg-white/10 hover:bg-white hover:text-black border border-white/20 px-6 py-3 rounded-full transition-all"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Global Studios */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400 font-syne block">
              GLOBAL STUDIOS
            </span>
            <div className="grid grid-cols-2 gap-6 pt-2">
              {studios.map((studio) => (
                <div key={studio.city} className="space-y-1">
                  <span className="text-xs font-bold font-syne text-white tracking-wider block">
                    {studio.city}
                  </span>
                  <span className="text-xs text-neutral-400 font-light block leading-normal">
                    {studio.address}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400 font-syne block">
              NAVIGATION
            </span>
            <ul className="space-y-2.5 pt-2">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-xs text-neutral-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400 font-syne block">
              CONNECT
            </span>
            <ul className="space-y-2.5 pt-2">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    className="text-xs text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 RENOVA Interior Design Studio. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors py-2 px-4 rounded-full border border-white/10 hover:border-white/30"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
