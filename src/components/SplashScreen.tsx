import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SplashScreen } from '@capacitor/splash-screen';

const SplashScreenComponent: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Fallback hide in case animations don't trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide().catch(() => {});
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#d3f0fe] flex flex-col items-center justify-center p-4"
    >
      <motion.div
        className="text-center backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="flex justify-center mb-8 relative"
          whileHover={{ scale: 1.1 }}
        >
          <img src="/logo.jpg" alt="App Logo" className='rounded-full w-32'/>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-5xl font-bold text-[#50acd3] mb-4 tracking-wider"
        >
          IABNU
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-2xl text-[#50acd3] mb-6 font-medium"
        >
          ইসলামিক অ্যাপ্লিকেশন বাংলাদেশ নিউ ইউনিটি
        </motion.p>
        
        <motion.p
          variants={itemVariants}
          className="text-xl text-[#50acd3] max-w-md mx-auto leading-relaxed"
        >
          সঠিক সময়ে নামাজ পড়ুন, আপনার বিশ্বাসকে শক্তিশালী করুন
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          onAnimationComplete={() => SplashScreen.hide()}
        >
          <div className="w-16 h-1 bg-white/30 rounded-full mx-auto" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreenComponent;