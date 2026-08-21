import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ currentPage = 'home', onNavigate, onOpenConsultation }) {
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

  const handleNavClick = (page, sectionId = null) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(page);
    }
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', page: 'home', sectionId: null },
    { name: 'About Studio', page: 'about', sectionId: null },
    { name: 'Services', page: 'services', sectionId: null },
    { name: 'Portfolio', page: 'home', sectionId: 'work' },
    { name: 'Process', page: 'home', sectionId: 'process' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0e0e0e]/90 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl'
          : 'bg-transparent py-6 border-b border-white/15'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        <button
          onClick={() => handleNavClick('home')}
          className="text-2xl font-syne text-white hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer bg-transparent border-0"
        >
          <span className="font-extrabold tracking-tight text-amber-300">2BHK</span>
          <span className="font-light tracking-[0.25em] text-neutral-200 text-lg uppercase">INTERIORS</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-neutral-300">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page && !link.sectionId;
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.page, link.sectionId)}
                className={`transition-colors duration-200 py-1 relative group cursor-pointer border-0 bg-transparent text-sm font-medium ${
                  isActive ? 'text-amber-300 font-bold' : 'hover:text-white text-neutral-300'
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-amber-400 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </button>
            );
          })}
        </nav>

        {/* Action CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={onOpenConsultation}
            className="group flex items-center gap-2 text-xs font-semibold tracking-widest uppercase border border-amber-400/40 text-amber-200 px-5 py-2.5 rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 shadow-md cursor-pointer"
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
        <div className="md:hidden fixed inset-x-0 top-18 bg-[#0e0e0e]/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 shadow-2xl animate-fadeIn">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.page, link.sectionId)}
                className={`text-left text-lg font-medium transition-colors border-0 bg-transparent ${
                  currentPage === link.page && !link.sectionId ? 'text-amber-300 font-bold' : 'text-neutral-200 hover:text-white'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase bg-amber-400 text-black py-3 rounded-full hover:bg-amber-300 transition-colors"
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
