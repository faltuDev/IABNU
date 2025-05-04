import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const GyroBackground: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleGyro = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        // Beta is the front-to-back tilt in degrees
        // Gamma is the left-to-right tilt in degrees
        x.set(event.gamma);
        y.set(event.beta);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate how far mouse is from center
      x.set((event.clientX - centerX) / 10);
      y.set((event.clientY - centerY) / 10);
    };

    // Check if device orientation is available
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleGyro);
    }
    
    // Fallback to mouse for devices without gyro
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('deviceorientation', handleGyro);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y]);

  // Generate bubbles
  const bubbles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15
  }));

  return (
    <div ref={containerRef} className="gyro-background">
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          rotateX,
          rotateY,
          perspective: 1000
        }}
        className="relative bg-gradient-to-b from-blue-200 to-blue-100"
      >
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-gradient-to-br from-blue-300/30 to-blue-400/20 backdrop-blur-sm"
            initial={{
              x: `${bubble.x}%`,
              y: `${bubble.y}%`,
              scale: 0.8,
              opacity: 0.3
            }}
            animate={{
              y: [`${bubble.y}%`, `${(bubble.y - 20) % 100}%`],
              opacity: [0.3, 0.5, 0.3],
              scale: [0.8, 1, 0.8]
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
            style={{
              width: bubble.size,
              height: bubble.size
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default GyroBackground;