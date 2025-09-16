import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface StatItemProps {
  number: number;
  label: string;
  suffix?: string;
  index: number;
}

function StatItem({ number, label, suffix = "", index }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const increment = number / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          setCount(number);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, number]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1, 
        rotateY: 0,
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => setIsVisible(true)}
      whileHover={{ 
        scale: 1.1, 
        rotateX: 10,
        rotateY: 10,
      }}
      className="text-center group perspective-1000"
    >
      <motion.div 
        className="text-5xl md:text-7xl text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text mb-2 group-hover:from-pink-500 group-hover:to-blue-400 transition-all duration-500"
        whileHover={{ scale: 1.2 }}
      >
        {count}{suffix}
      </motion.div>
      <motion.div 
        className="text-lg text-gray-300 group-hover:text-white transition-colors duration-300"
        layoutId={`label-${index}`}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

export function StatsSection() {
  const stats = [
    { number: 500, label: "Projects Completed", suffix: "+" },
    { number: 50, label: "Happy Clients", suffix: "K+" },
    { number: 99, label: "Success Rate", suffix: "%" },
    { number: 24, label: "Support Available", suffix: "/7" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl text-white mb-6">
          Proven <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">Results</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Our track record speaks for itself with impressive metrics across all dimensions
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            number={stat.number}
            label={stat.label}
            suffix={stat.suffix}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}