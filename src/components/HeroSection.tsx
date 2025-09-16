import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSectionProps {
  scrollY: number;
}

export function HeroSection({ scrollY }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1643483189749-7b4cbfb7f8f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHNoYXBlc3xlbnwxfHx8fDE3NTc5MzQ5MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="City skyline"
          className="w-full h-full object-cover opacity-30"
        />
      </motion.div>

      {/* Floating 3D Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"
        style={{
          transform: `translateY(${scrollY * -0.3}px) rotateX(45deg) rotateY(45deg)`,
        }}
        animate={{
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"
        style={{
          transform: `translateY(${scrollY * -0.2}px) translateX(${Math.sin(scrollY * 0.01) * 20}px)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500"
        style={{
          transform: `translateY(${scrollY * -0.4}px) rotateX(${scrollY * 0.1}deg)`,
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-8"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent"
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
            }}
          >
            Unlock Your Brain
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            style={{
              transform: `translateY(${scrollY * -0.05}px)`,
            }}
          >
            Experience the future of technology with cutting-edge solutions that transform your digital landscape
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              transform: `translateY(${scrollY * -0.02}px)`,
            }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}