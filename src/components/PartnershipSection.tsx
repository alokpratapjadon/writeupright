import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

export function PartnershipSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const initAnimations = async () => {
      if (typeof window !== 'undefined') {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        // Main text animation with typing effect
        if (textRef.current) {
          const text = textRef.current;
          const content = text.textContent || '';
          text.textContent = '';
          
          // Split text into characters
          const chars = content.split('').map(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            return span;
          });
          
          chars.forEach(char => text.appendChild(char));

          // Animate characters appearing
          gsap.to(chars, {
            opacity: 1,
            duration: 0.03,
            stagger: 0.02,
            ease: "none",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse"
            }
          });
        }

        // Highlight animation
        if (highlightRef.current) {
          gsap.fromTo(highlightRef.current,
            { 
              backgroundSize: "0% 100%",
              backgroundPosition: "left center"
            },
            {
              backgroundSize: "100% 100%",
              duration: 1.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: highlightRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              },
              delay: 2
            }
          );
        }

        // Section parallax
        if (sectionRef.current) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(sectionRef.current, {
                y: progress * -80,
                duration: 0.3
              });
            }
          });
        }

        // Floating elements
        const createFloatingDots = () => {
          const dots = [];
          for (let i = 0; i < 5; i++) {
            const dot = document.createElement('div');
            dot.className = 'absolute w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full opacity-30';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.top = Math.random() * 100 + '%';
            
            if (sectionRef.current) {
              sectionRef.current.appendChild(dot);
              dots.push(dot);
            }

            // Animate dots
            gsap.to(dot, {
              x: (Math.random() - 0.5) * 200,
              y: (Math.random() - 0.5) * 200,
              duration: 10 + Math.random() * 10,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }

          return dots;
        };

        const dots = createFloatingDots();

        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          dots.forEach(dot => {
            if (dot.parentNode) {
              dot.parentNode.removeChild(dot);
            }
          });
        };
      }
    };

    initAnimations();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-40 bg-gray-100 dark:bg-gray-900 transition-colors duration-500 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(0,0,0,0.1) 1px, transparent 1px),
              radial-gradient(circle at 80% 80%, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 150px 150px'
          }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p 
            ref={textRef}
            className="text-2xl md:text-3xl lg:text-4xl text-gray-800 dark:text-gray-200 leading-relaxed max-w-5xl mx-auto"
          >
            PARTNERING WITH US MEANS COLLABORATING WITH A DEDICATED TEAM THAT IS COMMITTED TO UNDERSTANDING YOUR UNIQUE BUSINESS GOALS AND CRAFTING A{' '}
            <span 
              ref={highlightRef}
              className="relative inline-block"
              style={{
                background: 'linear-gradient(120deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
                backgroundRepeat: 'no-repeat'
              }}
            >
              DIGITAL STRATEGY
            </span>
          </p>
        </motion.div>

        {/* Stats or additional info */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center group">
            <motion.div 
              className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="text-white text-2xl">🎯</span>
            </motion.div>
            <h3 className="text-xl mb-3 text-gray-900 dark:text-white">Strategy First</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Every project begins with understanding your vision and crafting a comprehensive digital strategy.
            </p>
          </div>

          <div className="text-center group">
            <motion.div 
              className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <span className="text-white text-2xl">🚀</span>
            </motion.div>
            <h3 className="text-xl mb-3 text-gray-900 dark:text-white">Innovation Driven</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We leverage cutting-edge technologies and creative solutions to bring your ideas to life.
            </p>
          </div>

          <div className="text-center group">
            <motion.div 
              className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="text-white text-2xl">🤝</span>
            </motion.div>
            <h3 className="text-xl mb-3 text-gray-900 dark:text-white">Long-term Partnership</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We build lasting relationships, providing ongoing support and continuous optimization.
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full text-lg hover:shadow-2xl transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-purple-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-pink-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-green-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '3s' }}></div>
    </section>
  );
}