import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

export function Navigation() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'HOME', id: 'hero', prefix: '—' },
    { name: 'PROJECTS', id: 'portfolio', prefix: '' },
    { name: 'ABOUT', id: 'about', prefix: '' },
    { name: 'SERVICES', id: 'services', prefix: '' },
    { name: 'CONTACT', id: 'contact', prefix: '—', suffix: '●' }
  ];

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled && !isMenuOpen ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="/src/components/Assets/WUR_Logo.png" 
                alt="WUR Logo" 
                className="w-25 h-10 object-contain"
                style={{
                  filter: isDark ? 'brightness(1.5)' : 'brightness(0.5)',
                  transition: 'filter 0.3s ease',
                }}
              />
              {/* Removed extra text from logo */}
              {/* <span className="text-2xl font-bold text-gray-900 dark:text-white">WUR</span> */}
            </motion.div>

            {/* Tagline */}
            <motion.div 
              className="hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-gray-600 dark:text-gray-300 text-sm">Creativity meets functionality.</p>
            </motion.div>

            {/* Theme Toggle and Menu Button */}
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                <button
                  onClick={toggleTheme}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    !isDark 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  LIGHT
                </button>
                <button
                  onClick={toggleTheme}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    isDark 
                      ? 'bg-gray-700 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  DARK
                </button>
              </div>

              {/* Menu Button - Always visible */}
              <motion.button 
                className="ml-4 p-2 text-gray-900 dark:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <motion.div 
                    className="w-full h-0.5 bg-current"
                    animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                  ></motion.div>
                  <motion.div 
                    className="w-full h-0.5 bg-current"
                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  ></motion.div>
                  <motion.div 
                    className="w-full h-0.5 bg-current"
                    animate={isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  ></motion.div>
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-gray-100 dark:bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10">
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  {/* Logo */}
                  <motion.div 
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">T</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">Technos</span>
                  </motion.div>

                  {/* Tagline */}
                  <motion.div 
                    className="hidden md:block"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Creativity meets functionality.</p>
                  </motion.div>

                  <div className="flex items-center space-x-2">
                    {/* Theme Toggle */}
                    <motion.div 
                      className="flex items-center bg-gray-200 dark:bg-gray-800 rounded-full p-1"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <button
                        onClick={toggleTheme}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                          !isDark 
                            ? 'bg-white text-gray-900 shadow-sm' 
                            : 'text-gray-400 hover:text-gray-300'
                        }`}
                      >
                        LIGHT
                      </button>
                      <button
                        onClick={toggleTheme}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                          isDark 
                            ? 'bg-gray-700 text-white shadow-sm' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        DARK
                      </button>
                    </motion.div>

                    {/* Close Button */}
                    <motion.button 
                      className="ml-4 p-2 text-gray-900 dark:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="w-6 h-6 relative">
                        <div className="absolute inset-0 w-full h-0.5 bg-current top-1/2 transform -translate-y-1/2 rotate-45"></div>
                        <div className="absolute inset-0 w-full h-0.5 bg-current top-1/2 transform -translate-y-1/2 -rotate-45"></div>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Content */}
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                {/* Navigation Items */}
                <div className="space-y-8 mb-16">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="cursor-pointer group"
                      onClick={() => scrollToSection(item.id)}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.2 + index * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{ scale: 1.05, x: 10 }}
                    >
                      <div className="flex items-center justify-center space-x-4">
                        {item.prefix && (
                          <span className="text-4xl md:text-5xl lg:text-6xl text-gray-600 dark:text-gray-400">
                            {item.prefix}
                          </span>
                        )}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {item.name}
                        </h2>
                        {item.suffix && (
                          <span className="text-4xl md:text-5xl lg:text-6xl text-blue-500">
                            {item.suffix}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end space-y-8 md:space-y-0">
                  {/* Contact Info */}
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div>
                      <h4 className="text-gray-900 dark:text-white mb-2">Contact Us</h4>
                      <a 
                        href="mailto:info@njtechnos.com" 
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                      >
                        info@njtechnos.com
                      </a>
                    </div>
                    <div>
                      <h4 className="text-gray-900 dark:text-white mb-2">Follow</h4>
                      <a 
                        href="#" 
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                      >
                        Instagram
                      </a>
                    </div>
                  </motion.div>

                  {/* Center Email */}
                  <motion.div 
                    className="flex-1 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <a 
                      href="mailto:info@njtechnos.com" 
                      className="text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 border-b border-current pb-1"
                    >
                      info@njtechnos.com →
                    </a>
                  </motion.div>

                  {/* Right side spacer */}
                  <div className="hidden md:block w-48"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}