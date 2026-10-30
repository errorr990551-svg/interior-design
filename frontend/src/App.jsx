import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ConsultationModal from './components/ConsultationModal';
import ProjectModal from './components/ProjectModal';
import { RobotsMeta } from './robot';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'about' | 'services' | 'portfolio'
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalImageUrl, setModalImageUrl] = useState(null);

  // Trigger consultation popup on first visit on any page
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const forcePopup = searchParams.get('popup') === 'true' || searchParams.get('test') === 'true';

      const hasSeen = localStorage.getItem('twobhk_seen_consultation_popup');
      if (!hasSeen || forcePopup) {
        const timer = setTimeout(() => {
          setIsConsultationOpen(true);
          localStorage.setItem('twobhk_seen_consultation_popup', 'true');
        }, 1500);

        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('LocalStorage access warning:', e);
    }
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      {/* Search Engine Robots & Sitemap Metadata Sync */}
      <RobotsMeta index={true} follow={true} maxImagePreview="large" />

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
