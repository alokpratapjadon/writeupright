import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

interface ProjectCardProps {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  category: string;
  index: number;
}

function ProjectCard({ title, subtitle, description, image, category, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initAnimations = async () => {
      if (typeof window !== 'undefined' && cardRef.current) {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        // Card entrance animation
        gsap.fromTo(cardRef.current,
          { 
            y: 150, 
            opacity: 0, 
            scale: 0.9,
            rotationY: index % 2 === 0 ? -10 : 10
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.3
          }
        );

        // Hover effects
        const handleMouseEnter = () => {
          gsap.to(cardRef.current, {
            scale: 1.02,
            y: -20,
            rotationY: 3,
            duration: 0.4,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(cardRef.current, {
            scale: 1,
            y: 0,
            rotationY: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        };

        const element = cardRef.current;
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          element.removeEventListener('mouseenter', handleMouseEnter);
          element.removeEventListener('mouseleave', handleMouseLeave);
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      }
    };

    initAnimations();
  }, [index]);

  return (
    <motion.div 
      ref={cardRef}
      className="group cursor-pointer transform-gpu"
      style={{ perspective: '1000px' }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-2xl">
        {/* Project Image */}
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
          <div className={`w-full h-full ${image} flex items-center justify-center relative`}>
            {/* Content will be rendered based on the image prop */}
          </div>
        </div>

        {/* Project Info */}
        <div className="p-8">
          <div className="mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {category}
            </span>
          </div>
          <h3 className="text-2xl mb-2 text-gray-900 dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-3">
              {subtitle}
            </p>
          )}
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-3xl"></div>
      </div>
    </motion.div>
  );
}

function TravelBuddyProject() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 p-8 flex">
      {/* Left side - App interface */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm">
          <div className="mb-6">
            <h4 className="text-xl font-light text-gray-800 mb-2">Travel Buddy</h4>
            <p className="text-sm text-gray-600">Plan your perfect trip</p>
          </div>
          
          <div className="bg-blue-500 text-white p-4 rounded-2xl mb-4">
            <p className="text-sm">✈️ Ready</p>
            <p className="text-xs opacity-90">Start Planning</p>
          </div>

          <div className="space-y-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-sm text-gray-700">📍 Destination</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-sm text-gray-700">📅 Dates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Team photo and chat */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4">
          <div className="aspect-square bg-white/30 rounded-xl mb-4 flex items-center justify-center">
            <span className="text-4xl">👥</span>
          </div>
          <p className="text-white text-sm">Connect With Travelers Just Like You</p>
        </div>

        <div className="bg-white rounded-2xl p-4 flex-1">
          <p className="text-sm text-gray-600 mb-3">Active Users</p>
          <div className="space-y-2">
            {['Sarah Johnson', 'Mike Chen', 'Alex Rivera', 'Emma Davis'].map((name, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChristianDiorProject() {
  return (
    <div className="w-full h-full bg-black flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <p className="text-sm text-gray-600">PERFUME</p>
                <button className="mt-2 px-4 py-2 bg-black text-white text-xs rounded">DISCOVER</button>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <p className="text-sm text-gray-600">SKINCARE</p>
                <button className="mt-2 px-4 py-2 bg-black text-white text-xs rounded">DISCOVER</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrainwaveProject() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-8">
          <h4 className="text-2xl text-gray-800 mb-2">Event Login</h4>
          <p className="text-gray-600">Welcome back</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Your username / email" 
              className="w-full p-3 border border-gray-200 rounded-lg"
            />
          </div>
          <div className="relative">
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-3 border border-gray-200 rounded-lg"
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-blue-500">Forgot Password?</a>
          </div>

          <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
            🔓 AI Login
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Voor die toekomst van<br />
            <strong>Momentdienst</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

function StyleScapeProject() {
  return (
    <div className="w-full h-full bg-gray-900 p-8 flex items-center justify-center">
      <div className="bg-gray-100 rounded-2xl p-8 max-w-2xl w-full">
        <div className="grid grid-cols-2 gap-8 items-center">
          <div className="text-center">
            <div className="text-8xl font-light text-gray-800 mb-4">004</div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>MINIMAL</p>
              <p>DESIGN</p>
              <p>STUDIO</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-40 bg-gradient-to-b from-orange-200 to-orange-300 rounded-2xl flex items-end justify-center pb-4">
                <span className="text-4xl">🌿</span>
              </div>
              <div className="w-24 h-32 bg-gradient-to-b from-orange-300 to-orange-400 rounded-xl absolute -right-6 top-4 flex items-end justify-center pb-3">
                <span className="text-2xl">🌱</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initAnimations = async () => {
      if (typeof window !== 'undefined') {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        // Header animation
        if (headerRef.current) {
          gsap.fromTo(headerRef.current,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // Marquee animation
        if (marqueeRef.current) {
          const marqueeText = marqueeRef.current;
          gsap.to(marqueeText, {
            x: "-50%",
            duration: 20,
            repeat: -1,
            ease: "none"
          });
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
                y: progress * -100,
                duration: 0.3
              });
            }
          });
        }

        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      }
    };

    initAnimations();
  }, []);

  const projects = [
    {
      title: "TRAVEL BUDDY",
      description: "A comprehensive travel planning and social platform that connects travelers worldwide. Features include trip planning, local recommendations, and traveler networking.",
      category: "Mobile App",
      image: "travel-buddy",
      component: <TravelBuddyProject />
    },
    {
      title: "CHRISTIAN DIOR",
      description: "Luxury e-commerce experience for the iconic fashion house. Elegant product showcases with immersive brand storytelling and premium user experience.",
      category: "E-Commerce",
      image: "christian-dior",
      component: <ChristianDiorProject />
    },
    {
      title: "BRAINWAVE CONSULTANCY",
      description: "Modern authentication system with AI-powered login capabilities. Clean interface design focused on security and user experience.",
      category: "Web Application",
      image: "brainwave",
      component: <BrainwaveProject />
    },
    {
      title: "STYLE SCAPE",
      description: "Minimalist design studio portfolio showcasing clean aesthetics and sophisticated brand identity. Focus on whitespace and elegant typography.",
      category: "Portfolio Website",
      image: "stylescape",
      component: <StyleScapeProject />
    }
  ];

  return (
    <section 
      id="portfolio"
      ref={sectionRef}
      className="py-32 bg-gray-50 dark:bg-gray-800 transition-colors duration-500 overflow-hidden"
    >
      {/* Animated Header */}
      <div className="mb-20 overflow-hidden">
        <div 
          ref={marqueeRef}
          className="flex whitespace-nowrap text-8xl md:text-9xl lg:text-[12rem] font-light text-gray-900 dark:text-white opacity-20"
          style={{ width: '200%' }}
        >
          <span className="mr-16">• Recent works • Recent works • Recent works • Recent works</span>
          <span className="mr-16">• Recent works • Recent works • Recent works • Recent works</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl text-gray-900 dark:text-white mb-8">
            Recent <span className="italic">Works</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore our latest projects showcasing innovative design solutions and cutting-edge technology implementations.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {projects.map((project, index) => (
            <div key={index} className="group">
              <ProjectCard
                title={project.title}
                description={project.description}
                category={project.category}
                image={project.image}
                index={index}
              />
              
              {/* Custom project content */}
              <motion.div 
                className="mt-8 rounded-3xl overflow-hidden shadow-2xl transform-gpu"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -10 }}
              >
                <div className="aspect-video">
                  {project.component}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}