import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const CurrentDateTime: React.FC = () => {
  const [dateTime, setDateTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatDateInBengali = (date: Date) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const day = date.getDate().toString().split('').map(d => bengaliDigits[parseInt(d)]).join('');
    const month = (date.getMonth() + 1).toString().split('').map(d => bengaliDigits[parseInt(d)]).join('');
    const year = date.getFullYear().toString().split('').map(d => bengaliDigits[parseInt(d)]).join('');
    
    const bengaliMonths = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    
    return `${day} ${bengaliMonths[date.getMonth()]} ${year}`;
  };
  
  const formatTimeInBengali = (date: Date) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'অপরাহ্ন' : 'পূর্বাহ্ন';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    const hourStr = hours.toString().split('').map(d => bengaliDigits[parseInt(d)]).join('');
    const minuteStr = minutes.split('').map(d => bengaliDigits[parseInt(d)]).join('');
    const secondStr = seconds.split('').map(d => bengaliDigits[parseInt(d)]).join('');
    
    return `${hourStr}:${minuteStr}:${secondStr} ${ampm}`;
  };

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-primary-700 mb-2">আজকের তারিখ</h2>
          <p className="text-xl text-primary-600">{formatDateInBengali(dateTime)}</p>
        </motion.div>
        
        <motion.div 
          className="flex items-center bg-primary-50 rounded-xl px-4 py-2"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Clock className="w-6 h-6 text-primary-600 mr-3" />
          <p className="text-xl font-medium text-primary-700">{formatTimeInBengali(dateTime)}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CurrentDateTime;