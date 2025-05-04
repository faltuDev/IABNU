import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PrayerTimeGrid from '../components/PrayerTimeGrid';
import CurrentDateTime from '../components/CurrentDateTime';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold text-primary-800 text-center mt-4">
        ইসলামিক অ্যাপ্লিকেশন
      </h1>
      
      <CurrentDateTime />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <PrayerTimeGrid />
      )}
    </motion.div>
  );
};

export default HomePage;