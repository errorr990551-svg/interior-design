import Hero from '../components/Hero';
import BehindRenova from '../components/BehindRenova';
import ProjectHighlight from '../components/ProjectHighlight';
import RecentTransformations from '../components/RecentTransformations';
import DesignProcess from '../components/DesignProcess';
import Testimonials from '../components/Testimonials';
import MaterialsSection from '../components/MaterialsSection';
import StatsSection from '../components/StatsSection';
import FAQSection from '../components/FAQSection';
import WhereWeWorkSection from '../components/WhereWeWorkSection';
import FollowAlongSection from '../components/FollowAlongSection';
import CTASection from '../components/CTASection';

export default function HomePage({
  onOpenConsultation,
  onSelectProject,
  onOpenGallery,
  onNavigateToAbout,
  onNavigateToServices,
}) {
  const homeFaqs = [
    {
      q: 'What does 2BHK Interiors do?',
      a: "We're a residential interior design studio offering 2D layout design, 3D visualization, and mood board styling for homes and apartments in Mumbai.",
    },
    {
      q: 'Do you only design residential spaces?',
      a: 'Yes. We work exclusively on residential interiors, apartments, villas and independent homes, so our process and pricing are built specifically around home design.',
    },
    {
      q: 'How do I start a project with 2BHK Interiors?',
      a: "Book a design consultation through our website or contact us directly. We'll discuss your space, budget and style before moving into 2D layouts and mood boards.",
    },
    {
      q: 'How long does a typical project take?',
      a: 'A single room visualization typically takes 1 to 2 weeks, while a comprehensive full-home project (mood board, 2D plan, and 3D renders) ranges from 4 to 8 weeks depending on scope and revision rounds.',
    },
  ];

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero
        onOpenConsultation={onOpenConsultation}
        onNavigateToWork={() => {
          const el = document.getElementById('work');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Studio Introduction & 3 Services */}
      <BehindRenova
        onLearnMore={onNavigateToAbout}
        onSelectService={onNavigateToServices}
      />

      {/* 3. Featured Showcase Project */}
      <ProjectHighlight onOpenGallery={onOpenGallery} />

      {/* 4. Portfolio Projects */}
      <RecentTransformations
        onSelectProject={onSelectProject}
        onViewAll={onOpenConsultation}
      />

      {/* 5. 5-Step Design Process */}
      <DesignProcess />

      {/* 6. Client Testimonials */}
      <Testimonials />

      {/* 7. Materials & Craftsmanship */}
      <MaterialsSection />

      {/* 8. By The Numbers Stats Strip */}
      <StatsSection />

      {/* 9. Frequently Asked Questions */}
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Answers to common questions before starting your home design"
        faqs={homeFaqs}
      />

      {/* 10. Where We Work */}
      <WhereWeWorkSection onOpenConsultation={onOpenConsultation} />

      {/* 11. Follow Along Instagram Feed */}
      <FollowAlongSection />

      {/* 12. Final CTA Section */}
      <CTASection
        headline="Ready to Design Your Home?"
        subtext="Tell us about your space and we'll get back to you to schedule a consultation, in person or over a call. No commitment, no pressure."
        buttonText="Book a Design Consultation"
        onOpenConsultation={onOpenConsultation}
      />
    </div>
  );
}
