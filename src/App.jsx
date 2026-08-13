import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BehindRenova from './components/BehindRenova';
import ProjectHighlight from './components/ProjectHighlight';
import RecentTransformations from './components/RecentTransformations';
import DesignProcess from './components/DesignProcess';
import Testimonials from './components/Testimonials';
import BannerSection from './components/BannerSection';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';
import ProjectModal from './components/ProjectModal';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalImageUrl, setModalImageUrl] = useState(null);

  const handleOpenConsultation = () => setIsConsultationOpen(true);
  const handleCloseConsultation = () => setIsConsultationOpen(false);

  const handleSelectProject = (project) => {
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
    <div className="min-h-screen bg-[#0e0e0e] text-[#f5f5f5] selection:bg-white selection:text-black">
      {/* 1. Navbar */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* 2. Hero Section */}
      <Hero onOpenConsultation={handleOpenConsultation} />

      {/* 3. Behind 2BHK Interiors (Studio & 3 Grid Service Cards) */}
      <BehindRenova onLearnMore={handleOpenConsultation} />

      {/* 4. Project Highlight Showcase */}
      <ProjectHighlight onOpenGallery={handleOpenGallery} />

      {/* 5. Recent Transformations (Portfolio List) */}
      <RecentTransformations
        onSelectProject={handleSelectProject}
        onViewAll={handleOpenConsultation}
      />

      {/* 6. Design Process Accordion */}
      <DesignProcess />

      {/* 7. Testimonials Carousel */}
      <Testimonials />

      {/* 8. Signature Banner Image Section */}
      <BannerSection
        onExpandBanner={() => handleOpenGallery('/images/banner.jpg')}
      />

      {/* 9. Theme-aligned Luxury Footer */}
      <Footer onOpenConsultation={handleOpenConsultation} />

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
