import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenConsultation }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Studio', href: '#studio' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0e0e0e]/85 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl'
          : 'bg-transparent py-6 border-b border-white/15'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="text-2xl font-bold tracking-[0.18em] text-white font-syne hover:opacity-80 transition-opacity"
        >
          RENOVA
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-white transition-colors duration-200 py-1 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Action CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={onOpenConsultation}
            className="group flex items-center gap-2 text-xs font-semibold tracking-widest uppercase border border-white/30 px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-neutral-200 hover:text-white focus:outline-none p-2"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-18.25 bg-[#0e0e0e]/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 shadow-2xl animate-fadeIn">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-neutral-200 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase bg-white text-black py-3 rounded-full hover:bg-neutral-200 transition-colors"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
