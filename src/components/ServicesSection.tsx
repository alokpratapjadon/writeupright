import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  features: string[];
  index: number;
}

function ServiceCard({ number, title, description, features, index }: ServiceCardProps) {
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
            y: 120, 
            opacity: 0, 
            rotationX: -15,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.2
          }
        );

        // Hover effects
        const handleMouseEnter = () => {
          gsap.to(cardRef.current, {
            y: -15,
            scale: 1.02,
            rotationY: 2,
            duration: 0.4,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(cardRef.current, {
            y: 0,
            scale: 1,
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
      className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform-gpu"
      style={{ perspective: '1000px' }}
    >
      {/* Service Number */}
      <div className="relative mb-8">
        <span className="text-8xl font-light text-gray-100 dark:text-gray-700 absolute -top-4 -left-2">
          {number}
        </span>
        <div className="relative z-10 pt-8">
          <h3 className="text-2xl mb-4 text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {description}
          </p>
        </div>
      </div>

      {/* Features List */}
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <motion.li 
            key={i}
            className="flex items-center text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3 flex-shrink-0"></div>
            {feature}
          </motion.li>
        ))}
      </ul>

      {/* Hover indicator */}
      <motion.div 
        className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        whileHover={{ x: 10 }}
      >
        <span className="text-blue-500 dark:text-blue-400 text-sm font-medium">
          Learn More →
        </span>
      </motion.div>
    </motion.div>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initAnimations = async () => {
      if (typeof window !== 'undefined') {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        // Header animation
        if (headerRef.current) {
          gsap.fromTo(headerRef.current,
            { y: 80, opacity: 0 },
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
                y: progress * -60,
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

  const services = [
    {
      number: "01",
      title: "Web Development",
      description: "Full-stack web applications built with modern technologies, focusing on performance, scalability, and user experience.",
      features: [
        "React & Next.js Development",
        "E-commerce Solutions",
        "Progressive Web Apps",
        "API Integration",
        "Performance Optimization"
      ]
    },
    {
      number: "02",
      title: "UI/UX Design",
      description: "User-centered design solutions that balance aesthetics with functionality, creating memorable digital experiences.",
      features: [
        "User Research & Testing",
        "Wireframing & Prototyping",
        "Visual Design Systems",
        "Mobile-First Design",
        "Accessibility Standards"
      ]
    },
    {
      number: "03",
      title: "Brand Identity",
      description: "Comprehensive brand development from concept to execution, ensuring consistent visual identity across all touchpoints.",
      features: [
        "Logo & Brand Guidelines",
        "Typography & Color Systems",
        "Marketing Materials",
        "Digital Asset Creation",
        "Brand Strategy Consulting"
      ]
    },
    {
      number: "04",
      title: "Digital Strategy",
      description: "Data-driven digital strategies that align with your business goals and drive measurable results in the digital landscape.",
      features: [
        "Market Analysis & Research",
        "Competitive Benchmarking",
        "Growth Strategy Planning",
        "Technology Roadmapping",
        "Performance Analytics"
      ]
    }
  ];

  return (
    <section 
      id="services"
      ref={sectionRef}
      className="py-32 bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl text-gray-900 dark:text-white mb-8">
            Our <span className="italic text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We offer comprehensive digital solutions tailored to elevate your brand and drive business growth through innovative technology and creative excellence.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              number={service.number}
              title={service.title}
              description={service.description}
              features={service.features}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Ready to transform your digital presence?
          </p>
          <motion.button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg hover:shadow-2xl transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}