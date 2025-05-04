import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Business, LocationCity } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';

interface Thana {
  id: string;
  name: string;
}

const ThanaPage: React.FC = () => {
  const navigate = useNavigate();
  const [thanas, setThanas] = useState<Thana[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const thanasRef = ref(db, 'thana');
    
    try {
      onValue(thanasRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const thanasArray = Object.keys(data).map((key) => ({
            id: key,
            name: data[key].name
          }));
          setThanas(thanasArray);
        }
        setLoading(false);
      });
    } catch (err) {
      setError('ডেটা লোড করতে সমস্যা হয়েছে');
      setLoading(false);
    }
  }, []);

  const handleThanaClick = (thanaId: string) => {
    navigate(`/thana/${thanaId}/person`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 max-w-6xl mx-auto min-h-screen"
    >
      <div className="flex flex-col items-center mb-8 space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="p-4 bg-primary-100 rounded-full"
        >
          <LocationCity className="text-primary-600" style={{ fontSize: '2.5rem' }} />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          থানা তালিকা
        </h1>
        <p className="text-gray-500 text-center">আপনার থানা নির্বাচন করুন</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="h-32 bg-gray-100 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      ) : thanas.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {thanas.map((thana, index) => (
            <motion.div
              key={thana.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative cursor-pointer"
              onClick={() => handleThanaClick(thana.id)}
              role="button"
              tabIndex={0}
            >
              <div className="h-32 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-all flex flex-col items-center justify-center p-4 border border-gray-100">
                <Business className="text-primary-500 mb-2" fontSize="large" />
                <h3 className="text-gray-800 font-medium text-center line-clamp-2">
                  {thana.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4 text-gray-400">
            <Business style={{ fontSize: '3rem' }} />
          </div>
          <p className="text-gray-500">
            কোনো থানা পাওয়া যায়নি
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ThanaPage;