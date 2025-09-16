// This file ensures GSAP plugins are properly registered
// Import this in your main app to enable all GSAP features

import { useEffect } from 'react';

export function useGSAP() {
  useEffect(() => {
    // Dynamic imports for GSAP plugins to avoid SSR issues
    const loadGSAP = async () => {
      if (typeof window !== 'undefined') {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        const { ScrollSmoother } = await import('gsap/ScrollSmoother');
        const { TextPlugin } = await import('gsap/TextPlugin');
        
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TextPlugin);
        
        // Global GSAP configuration
        gsap.config({
          force3D: true,
          nullTargetWarn: false,
        });

        ScrollTrigger.config({
          ignoreMobileResize: true,
        });
      }
    };

    loadGSAP();
  }, []);
}

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useGSAP();
  return <>{children}</>;
}