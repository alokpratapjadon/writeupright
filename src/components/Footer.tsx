import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const initAnimations = async () => {
      if (typeof window !== 'undefined') {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        // Logo animation
        if (logoRef.current) {
          gsap.fromTo(logoRef.current,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: logoRef.current,
                start: "top 90%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // Footer content animation
        if (footerRef.current) {
          const elements = footerRef.current.querySelectorAll('.footer-item');
          gsap.fromTo(elements,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      }
    };

    initAnimations();

    // Detect theme changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Initial check
    setIsDark(document.documentElement.classList.contains('dark'));

    return () => observer.disconnect();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      ref={footerRef}
      className="bg-black text-white py-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/20"></div>
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)
            `,
            backgroundSize: '400px 400px'
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2 footer-item">
            <motion.div 
              ref={logoRef}
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="/WUR_Logo.png" 
                alt="WUR Logo" 
                className="w-28 h-10 object-contain"
                style={{
                  filter: isDark ? 'brightness(1.5)' : 'brightness(0.5)',
                  transition: 'filter 0.3s ease',
                }}
              />
              {/* Removed extra text from logo */}
              {/* <span className="text-3xl">Technos</span> */}
            </motion.div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              We craft exceptional digital experiences that drive growth and innovation. 
              Partnering with ambitious brands to transform their digital presence.
            </p>
            <div className="flex space-x-4">
              {[
                { name: 'LinkedIn', icon: '💼' },
                { name: 'Twitter', icon: '🐦' },
                { name: 'Instagram', icon: '📷' },
                { name: 'Dribbble', icon: '🏀' }
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span>{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-item">
            <h4 className="text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['About', 'Services', 'Portfolio', 'Contact'].map((link, index) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 block"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-item">
            <h4 className="text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                'Web Development', 
                'UI/UX Design', 
                'Brand Identity', 
                'Digital Strategy'
              ].map((service, index) => (
                <li key={service}>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 block"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {service}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 footer-item">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
              <p className="text-gray-400">
                © {currentYear} Technos. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  whileHover={{ y: -2 }}
                >
                  Privacy Policy
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  whileHover={{ y: -2 }}
                >
                  Terms of Service
                </motion.a>
              </div>
            </div>

            <motion.div 
              className="flex items-center space-x-2 text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-sm">Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                className="text-red-500"
              >
                ❤️
              </motion.span>
              <span className="text-sm">in India</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 right-10 w-2 h-2 bg-blue-500 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-purple-500 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-pink-500 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
    </footer>
  );
}