import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ConsultationModal from './components/ConsultationModal';
import ProjectModal from './components/ProjectModal';
import NotFoundPage from './pages/NotFoundPage';
import { routeForPath, routeForPage, applyHead } from './site';

const currentPath = () => (typeof window === 'undefined' ? '/' : window.location.pathname);

export default function App({ initialPath }) {
  // 'home' | 'about' | 'services' | 'portfolio' | 'notfound', derived from the URL
  const [currentPage, setCurrentPage] = useState(() => routeForPath(initialPath ?? currentPath()).page);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalImageUrl, setModalImageUrl] = useState(null);

  // Consultation popup for first-time visitors, shown only once they've engaged with the page
  // (scrolled 40% of it or stayed 30 seconds), not as an interstitial on arrival.
  useEffect(() => {
    if (currentPage === 'notfound') return;
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const forcePopup = searchParams.get('popup') === 'true' || searchParams.get('test') === 'true';
      if (localStorage.getItem('twobhk_seen_consultation_popup') && !forcePopup) return;

      let done = false;
      const open = () => {
        if (done) return;
        done = true;
        setIsConsultationOpen(true);
        try {
          localStorage.setItem('twobhk_seen_consultation_popup', 'true');
        } catch (_) {}
        cleanup();
      };
      const onScroll = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollable > 0 && window.scrollY / scrollable >= 0.4) open();
      };
      const timer = setTimeout(open, forcePopup ? 1500 : 30000);
      const cleanup = () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', onScroll);
      };
      if (!forcePopup) window.addEventListener('scroll', onScroll, { passive: true });
      return cleanup;
    } catch (e) {
      console.warn('LocalStorage access warning:', e);
    }
  }, []);

  // Back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      const route = routeForPath(currentPath());
      setCurrentPage(route.page);
      applyHead(route);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = (page, hash) => {
    const route = routeForPage(page);
    const url = route.path + (hash ? `#${hash}` : '');
    if (window.location.pathname + window.location.hash !== url) {
      window.history.pushState({}, '', url);
    }
    setCurrentPage(route.page);
    applyHead(route);
    if (hash) {
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenConsultation = () => setIsConsultationOpen(true);
  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
    try {
      localStorage.setItem('twobhk_seen_consultation_popup', 'true');
    } catch (_) {}
  };

  const handleSelectProject = (project) => {
    if (project?.isPdf) {
      handleNavigate('portfolio');
      return;
    }
    setSelectedProject(project);
    setModalImageUrl(null);
  };

  const handleOpenGallery = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setSelectedProject(null);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setModalImageUrl(null);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#f5f5f5] selection:bg-amber-400 selection:text-black">
      {/* 1. Global Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* 2. Active Page Renderer */}
      <main>
        {currentPage === 'home' && (
          <HomePage
            onOpenConsultation={handleOpenConsultation}
            onSelectProject={handleSelectProject}
            onOpenGallery={handleOpenGallery}
            onNavigateToAbout={() => handleNavigate('about')}
            onNavigateToServices={() => handleNavigate('services')}
            onNavigateToPortfolio={() => handleNavigate('portfolio')}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onOpenConsultation={handleOpenConsultation}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onOpenConsultation={handleOpenConsultation}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'portfolio' && (
          <PortfolioPage
            onOpenConsultation={handleOpenConsultation}
            onNavigateHome={() => handleNavigate('home')}
            onSelectProject={handleSelectProject}
          />
        )}

        {currentPage === 'notfound' && <NotFoundPage onNavigate={handleNavigate} />}
      </main>

      {/* 3. Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Interactive Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={handleCloseConsultation}
      />

      {/* Interactive Project / Gallery Modal */}
      <ProjectModal
        project={selectedProject}
        imageUrl={modalImageUrl}
        onClose={handleCloseModal}
        onBookConsultation={handleOpenConsultation}
      />
    </div>
  );
}
