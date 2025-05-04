import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

const ComingSoonPage: React.FC = () => {
  // const navigate = useNavigate(); // Removed as it's unused
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set launch date (14 days from now)
  const calculateTimeLeft = () => {
    const difference = +new Date('2024-03-01') - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <Clock size={80} className="text-primary-600 mb-4" />
      </motion.div>

      <h1 className="text-4xl font-bold text-gray-800 mb-4">আমরা শীঘ্রই আসছি!</h1>
      <p className="text-xl mb-8 text-gray-600 max-w-2xl">
        এই পৃষ্ঠাটি বর্তমানে নির্মাণাধীন রয়েছে। আমরা একটি অসাধারণ অভিজ্ঞতা নিয়ে আসতে কাজ করছি!
      </p>
    </motion.div>
  );
};

export default ComingSoonPage;