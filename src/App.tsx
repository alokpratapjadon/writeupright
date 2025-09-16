import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { TechnosHero } from './components/TechnosHero';
import { AgencySection } from './components/AgencySection';
import { FeatureCardsSection } from './components/FeatureCardsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ServicesSection } from './components/ServicesSection';
import { PartnershipSection } from './components/PartnershipSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SmoothScrollWrapper } from './components/SmoothScrollWrapper';
import { GSAPProvider } from './components/GSAPProvider';

export default function App() {
  useEffect(() => {
    // Import GSAP dynamically to avoid SSR issues
    const initGSAP = async () => {
      if (typeof window !== 'undefined') {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Global scroll effects and page setup
        gsap.set("body", { overflow: "visible" });
        
        // Custom cursor effect
        const cursor = document.createElement('div');
        cursor.className = 'fixed w-4 h-4 bg-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150';
        cursor.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(cursor);

        const handleMouseMove = (e: MouseEvent) => {
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
          });
        };

        const handleMouseEnter = () => {
          gsap.to(cursor, { scale: 1.5, duration: 0.2 });
        };

        const handleMouseLeave = () => {
          gsap.to(cursor, { scale: 1, duration: 0.2 });
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.querySelectorAll('a, button, [role="button"]').forEach(el => {
          el.addEventListener('mouseenter', handleMouseEnter);
          el.addEventListener('mouseleave', handleMouseLeave);
        });

        // Page transition effect
        gsap.fromTo("body", 
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" }
        );

        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.querySelectorAll('a, button, [role="button"]').forEach(el => {
            el.removeEventListener('mouseenter', handleMouseEnter);
            el.removeEventListener('mouseleave', handleMouseLeave);
          });
          if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
          }
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      }
    };

    initGSAP();
  }, []);

  return (
    <GSAPProvider>
      <SmoothScrollWrapper>
        <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
          <Navigation />
          <TechnosHero />
          <AgencySection />
          <FeatureCardsSection />
          <PortfolioSection />
          <ServicesSection />
          <PartnershipSection />
          <ContactSection />
          <Footer />
        </div>
      </SmoothScrollWrapper>
    </GSAPProvider>
  );
}