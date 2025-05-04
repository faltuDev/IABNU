import React from 'react';
import { motion } from 'framer-motion';
import { getSamplePrayerTimes } from '../utils/prayerTimes';

const PrayerTimeGrid: React.FC = () => {
  const prayerTimes = getSamplePrayerTimes();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="space-y-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-primary-800 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800"
      >
        নামাজের সময়সূচী
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {prayerTimes.map((prayer, index) => (
          <motion.div
            key={prayer.name}
            variants={item}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className={`prayer-time-card backdrop-blur-sm ${
              prayer.current 
                ? 'bg-gradient-to-br from-primary-500/90 to-primary-600/90 text-white'
                : 'bg-white/80'
            }`}
          >
            <h3 className={`text-xl font-medium mb-2 ${
              prayer.current ? 'text-white' : 'text-primary-700'
            }`}>
              {prayer.name}
            </h3>
            <p className={`text-2xl font-bold ${
              prayer.current ? 'text-white' : 'text-primary-800'
            }`}>
              {prayer.time}
            </p>
            {prayer.current && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-3 bg-white/20 text-white text-sm px-3 py-1 rounded-full inline-block"
              >
                বর্তমান নামাজ
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PrayerTimeGrid;