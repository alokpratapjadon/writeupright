import { motion } from 'motion/react';

interface FloatingShapeProps {
  scrollY: number;
  size: number;
  color: string;
  initialX: number;
  initialY: number;
  speed: number;
  shape?: 'circle' | 'square' | 'triangle';
}

export function FloatingShape({ 
  scrollY, 
  size, 
  color, 
  initialX, 
  initialY, 
  speed,
  shape = 'circle' 
}: FloatingShapeProps) {
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    triangle: '',
  };

  const shapeStyles = {
    circle: {},
    square: {},
    triangle: { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
  };

  return (
    <motion.div
      className={`absolute ${shapeClasses[shape]} ${color} opacity-70`}
      style={{
        width: size,
        height: size,
        left: `${initialX}%`,
        top: `${initialY}%`,
        transform: `translateY(${scrollY * speed}px) translateX(${Math.sin(scrollY * 0.01 + initialX) * 30}px)`,
        ...shapeStyles[shape],
      }}
      animate={{
        rotateZ: [0, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotateZ: { duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" },
        scale: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}