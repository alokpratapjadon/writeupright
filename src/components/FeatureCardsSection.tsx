import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

function FeatureCard({ title, description, icon, index }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const initAnimations = async () => {
      if (typeof window !== 'undefined') {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        // Card entrance animation
        gsap.fromTo(cardRef.current,
          { 
            y: 100, 
            opacity: 0, 
            rotationY: -15,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            rotationY: 0,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.2
          }
        );

        // Hover effects with GSAP
        const handleMouseEnter = () => {
          gsap.to(cardRef.current, {
            y: -10,
            rotationY: 5,
            rotationX: 5,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(cardRef.current, {
            y: 0,
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.3,
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
    <div 
      ref={cardRef}
      className="bg-gray-900 dark:bg-gray-800 p-8 rounded-2xl h-80 flex flex-col justify-between transform-gpu cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      <div>
        <div className="text-white text-3xl mb-6">{icon}</div>
        <h3 className="text-2xl text-white mb-4 leading-tight">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export function FeatureCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const initAnimations = async () => {
      if (typeof window !== 'undefined') {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        // Header animation
        gsap.fromTo(headerRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Right text animation
        gsap.fromTo(rightTextRef.current,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rightTextRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Section parallax
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(sectionRef.current, {
              y: progress * -30,
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

  const features = [
    {
      title: "Innovation and Creativity",
      description: "Our team continually investigates new technologies, concepts, and strategies to deliver innovative solutions that give you a competitive advantage.",
      icon: "☀️"
    },
    {
      title: "Commitment to Quality",
      description: "Your satisfaction is our ultimate goal. We go above and beyond to ensure our clients are pleased with the results. We are dedicated to delivering exceptional service.",
      icon: "✓"
    },
    {
      title: "Tailored Solutions",
      description: "We believe in understanding your unique needs and tailoring our solutions accordingly. Our approach is highly flexible, ensuring.",
      icon: "💡"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div ref={headerRef}>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Digital experiences that inspire and engage your customers, moving hearts – and the needle.
            </p>
          </div>
          <div ref={rightTextRef}>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We create + develop premium user experiences for web + mobile. As a leading Capital digital agency, we 
              mix art, technology and analytics to create an outcome that builds strong relationships between 
              your brand and your customers, helping your business get more online leads and sales.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}