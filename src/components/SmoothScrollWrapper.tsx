import { useEffect, useRef, ReactNode } from 'react';

interface SmoothScrollWrapperProps {
  children: ReactNode;
}

export function SmoothScrollWrapper({ children }: SmoothScrollWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    let smoother: any;

    const initSmoothScroll = async () => {
      if (typeof window !== 'undefined') {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        // Only enable smooth scroll on desktop
        const isMobile = window.innerWidth < 768;
        
        if (!isMobile) {
          // Try to import ScrollSmoother, but gracefully fall back if not available
          try {
            const { ScrollSmoother } = await import('gsap/ScrollSmoother');
            gsap.registerPlugin(ScrollSmoother);
            
            smoother = ScrollSmoother.create({
              wrapper: wrapperRef.current,
              content: contentRef.current,
              smooth: 1.5,
              effects: true,
              smoothTouch: 0.1,
            });
          } catch (error) {
            console.log('ScrollSmoother not available, using regular scroll');
          }
        }

        // Background parallax elements
        const createFloatingElements = () => {
          const colors = [
            'rgba(59, 130, 246, 0.1)', // blue
            'rgba(147, 51, 234, 0.1)', // purple
            'rgba(236, 72, 153, 0.1)', // pink
            'rgba(34, 197, 94, 0.1)',  // green
            'rgba(249, 115, 22, 0.1)', // orange
          ];

          for (let i = 0; i < 8; i++) {
            const element = document.createElement('div');
            element.className = 'fixed pointer-events-none z-0 rounded-full blur-xl';
            element.style.background = colors[i % colors.length];
            element.style.width = Math.random() * 200 + 100 + 'px';
            element.style.height = element.style.width;
            element.style.left = Math.random() * 100 + '%';
            element.style.top = Math.random() * 100 + '%';
            
            document.body.appendChild(element);

            // Animate the floating elements
            gsap.to(element, {
              x: (Math.random() - 0.5) * 400,
              y: (Math.random() - 0.5) * 400,
              rotation: 360,
              duration: 20 + Math.random() * 20,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });

            // Parallax effect on scroll
            gsap.to(element, {
              yPercent: -50,
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            });
          }
        };

        // Create floating elements after a short delay
        setTimeout(createFloatingElements, 1000);

        return () => {
          if (smoother) {
            smoother.kill();
          }
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          
          // Clean up floating elements
          document.querySelectorAll('.fixed.pointer-events-none.z-0').forEach(el => {
            if (el.parentNode) {
              el.parentNode.removeChild(el);
            }
          });
        };
      }
    };

    initSmoothScroll();
  }, []);

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  );
}