import { motion } from 'motion/react';
import { Card } from './ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

export function FeatureCard({ title, description, icon, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 10,
        rotateX: 5,
        z: 50,
      }}
      className="group perspective-1000"
    >
      <Card className="p-8 h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-500 transform-gpu hover:shadow-2xl hover:shadow-purple-500/25">
        <motion.div
          className="text-4xl mb-6 transform-gpu group-hover:scale-110 transition-transform duration-300"
          whileHover={{ rotateZ: 360 }}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </motion.div>
        
        <motion.h3 
          className="text-2xl mb-4 text-white group-hover:text-blue-300 transition-colors duration-300"
          layoutId={`title-${index}`}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"
          layoutId={`description-${index}`}
        >
          {description}
        </motion.p>

        {/* 3D Accent */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-bl-full"
          whileHover={{ scale: 1.2, rotate: 180 }}
          transition={{ duration: 0.4 }}
        />
      </Card>
    </motion.div>
  );
}