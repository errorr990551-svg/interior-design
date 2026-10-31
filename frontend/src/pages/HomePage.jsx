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
import CompactHomeSection from '../components/CompactHomeSection';
import { homeFaqs } from '../content/faqs';

export default function HomePage({
  onOpenConsultation,
  onSelectProject,
  onOpenGallery,
  onNavigateToAbout,
  onNavigateToServices,
  onNavigateToPortfolio,
}) {

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
        onViewAll={onNavigateToPortfolio || onOpenConsultation}
      />

      {/* 5. 5-Step Design Process */}
      <DesignProcess />

      {/* Planning advice for compact apartments */}
      <CompactHomeSection />

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
