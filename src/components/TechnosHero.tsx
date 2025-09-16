import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

export function TechnosHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sphereRef.current || !textRef.current) return;

    const initAnimations = async () => {
      if (typeof window !== 'undefined') {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        // GSAP Timeline for entrance animations
        const tl = gsap.timeline();
        
        // Set initial states
        gsap.set(sphereRef.current, { 
          scale: 0, 
          rotationY: -180, 
          rotationX: 20,
          opacity: 0 
        });
        gsap.set(textRef.current, { y: 100, opacity: 0 });
        gsap.set(scrollIndicatorRef.current, { y: 50, opacity: 0 });

        // Entrance animations
        tl.to(sphereRef.current, {
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          opacity: 1,
          duration: 2,
          ease: "back.out(1.7)",
          delay: 0.5
        })
        .to(textRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out"
        }, "-=1")
        .to(scrollIndicatorRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.5");

        // Continuous rotation animation for sphere
        gsap.to(sphereRef.current, {
          rotationY: 360,
          duration: 20,
          repeat: -1,
          ease: "none"
        });

        // Parallax effect on scroll
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(sphereRef.current, {
              y: progress * -200,
              rotationX: progress * 30,
              scale: 1 - progress * 0.3,
              duration: 0.3
            });
            gsap.to(textRef.current, {
              y: progress * -100,
              opacity: 1 - progress * 1.5,
              duration: 0.3
            });
          }
        });

        // Mouse move effect
        const handleMouseMove = (e: MouseEvent) => {
          if (!sphereRef.current) return;
          
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          
          const x = (clientX / innerWidth - 0.5) * 20;
          const y = (clientY / innerHeight - 0.5) * 20;
          
          gsap.to(sphereRef.current, {
            rotationY: x,
            rotationX: -y,
            duration: 0.5,
            ease: "power2.out"
          });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      }
    };

    initAnimations();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Text */}
        <motion.div 
          ref={textRef}
          className="mb-20"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-gray-900 dark:text-white tracking-tight">
            Unlock Your Brain
          </h1>
        </motion.div>

        {/* 3D Sphere */}
        <div 
          ref={sphereRef}
          className="relative mx-auto w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]"
          style={{ perspective: '1000px' }}
        >
          <div className="relative w-full h-full transform-gpu">
            {/* Main sphere with iridescent effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-90 blur-sm"></div>
            <div 
              className="absolute inset-2 rounded-full"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 50%),
                  conic-gradient(from 0deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%),
                  linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.1) 100%)
                `,
                filter: 'blur(1px)',
                animation: 'shimmer 3s ease-in-out infinite alternate'
              }}
            ></div>
            
            {/* Inner reflections */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
            <div className="absolute top-12 left-16 w-20 h-20 rounded-full bg-white/40 blur-md"></div>
            <div className="absolute bottom-20 right-20 w-12 h-12 rounded-full bg-blue-300/50 blur-sm"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicators */}
      <motion.div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-8"
      >
        <motion.div 
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 cursor-pointer group"
          whileHover={{ x: 10 }}
        >
          <span className="text-sm font-medium border-b border-current pb-1">Scroll To Discover</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-8 right-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div 
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 cursor-pointer group"
          whileHover={{ x: -10 }}
        >
          <motion.div
            animate={{ x: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ←
          </motion.div>
          <span className="text-sm font-medium border-b border-current pb-1">Works</span>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes shimmer {
          0% { filter: hue-rotate(0deg) saturate(1) brightness(1); }
          100% { filter: hue-rotate(90deg) saturate(1.2) brightness(1.1); }
        }
      `}</style>
    </section>
  );
}