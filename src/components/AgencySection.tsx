import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

export function AgencySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const initAnimations = async () => {
      if (typeof window !== 'undefined') {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        // Text reveal animation
        gsap.fromTo(textRef.current, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Video container animation
        gsap.fromTo(videoRef.current,
          { scale: 0.8, opacity: 0, rotationY: -15 },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: videoRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Quote animation
        gsap.fromTo(quoteRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Parallax effect for the entire section
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(sectionRef.current, {
              y: progress * -50,
              duration: 0.3
            });
          }
        });

        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      }
    };

    initAnimations();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-white dark:bg-gray-900 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Text */}
        <motion.div 
          ref={textRef}
          className="text-center mb-20"
        >
          <h2 className="text-lg text-gray-600 dark:text-gray-400 mb-8 tracking-wide">
            The leading India web design and development agency, for ambitious Indian brands.
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Whether you need a new website or wish to enhance an existing one, we approach every project with a 
              fervent passion for innovation and creativity. Our commitment is to craft high-quality, high-performing 
              digital experiences that transform your website into a powerful marketing machine, delivering long-lasting 
              and tangible results for your business.
            </p>
          </div>
        </motion.div>

        {/* Video Section */}
        <div 
          ref={videoRef}
          className="relative max-w-4xl mx-auto mb-16"
          style={{ perspective: '1000px' }}
        >
          <motion.div 
            className="relative bg-black rounded-2xl overflow-hidden shadow-2xl"
            whileHover={{ 
              scale: 1.02,
              rotateY: 2,
              rotateX: 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Video Placeholder */}
            <div className="aspect-video bg-black flex items-center justify-center relative">
              {/* Brand showcase mockup */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-pink-200 to-pink-100 rounded-2xl flex items-center justify-center shadow-lg">
                    <div className="w-16 h-20 bg-gradient-to-b from-pink-400 to-pink-500 rounded-lg shadow-inner"></div>
                  </div>
                  <h3 className="text-2xl font-light text-gray-800 mb-2 tracking-wide">CHANEL</h3>
                  <p className="text-sm text-gray-600 mb-8">LA COLLECTION PRIVÉE CHRISTIAN DIOR</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>HOMME FEMME</p>
                    <p>BOUTIQUE</p>
                    <p>MAISON DE</p>
                    <p>PARFUM</p>
                    <p>SKINCARE</p>
                  </div>
                </div>
              </div>

              {/* Quote overlay */}
              <div 
                ref={quoteRef}
                className="absolute bottom-8 left-8 right-8 text-center"
              >
                <blockquote className="text-xl md:text-2xl font-light text-gray-800 leading-relaxed">
                  "TIME WILL PASS, AND YOU WILL FORGET WHAT THE WOMAN WAS WEARING, BUT THE SMELL OF HER PERFUME WILL REMAIN"
                </blockquote>
                <cite className="block mt-4 text-sm text-gray-600">— CHRISTIAN DIOR</cite>
              </div>

              {/* Play button */}
              <motion.button 
                className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-0 h-0 border-l-[12px] border-l-gray-800 border-y-[8px] border-y-transparent ml-1"></div>
                </div>
              </motion.button>
            </div>

            {/* Video controls mockup */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="text-white hover:text-gray-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <div className="text-white text-sm">0:24</div>
              </div>
              <div className="flex-1 mx-4">
                <div className="h-1 bg-gray-600 rounded-full">
                  <div className="h-1 bg-white rounded-full w-1/4"></div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-white hover:text-gray-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                  </svg>
                </button>
                <button className="text-white hover:text-gray-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                  </svg>
                </button>
                <span className="text-white text-sm">vimeo</span>
              </div>
            </div>
          </motion.div>

          {/* Project Info */}
          <div className="absolute -left-8 top-8 text-sm text-gray-500 dark:text-gray-400">
            <div>BERNARD ARNAULT</div>
            <div className="text-xs mt-1">LUXURY BRAND</div>
          </div>
          <div className="absolute -right-8 top-8 text-sm text-gray-500 dark:text-gray-400 text-right">
            <div>16TH DEC, 1946</div>
          </div>
        </div>

        {/* Bottom Text */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Digital experiences that inspire and engage your customers, moving hearts – and the needle.
          </p>
        </motion.div>
      </div>
    </section>
  );
}