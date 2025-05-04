import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
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
        <AlertCircle size={80} className="text-primary-600 mb-4" />
      </motion.div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-2">৪০৪</h1>
      <p className="text-xl mb-6 text-gray-600">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
        className="bg-primary-600 text-white px-6 py-3 rounded-lg flex items-center shadow-md hover:bg-primary-700"
      >
        <Home size={20} className="mr-2" />
        হোম পেজে ফিরে যান
      </motion.button>
    </motion.div>
  );
};

export default NotFoundPage;