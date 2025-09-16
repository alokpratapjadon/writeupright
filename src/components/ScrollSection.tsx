import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  backgroundImage?: string;
  parallaxSpeed?: number;
  scrollY?: number;
}

export function ScrollSection({ 
  children, 
  className = "", 
  backgroundImage, 
  parallaxSpeed = 0.5,
  scrollY = 0 
}: ScrollSectionProps) {
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {backgroundImage && (
        <motion.div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * parallaxSpeed}px) scale(1.1)`,
          }}
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-fixed opacity-20"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        </motion.div>
      )}
      
      <div className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
}