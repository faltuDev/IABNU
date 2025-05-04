import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Building, Home, FileText, Wallet } from 'lucide-react';

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'জেলা', icon: <MapPin size={24} />, path: '/district' },
    { name: 'থানা', icon: <Building size={24} />, path: '/thana' },
    { name: 'ইউনিয়ন', icon: <Home size={24} />, path: '/union' },
    { name: 'প্রতিবেদন', icon: <FileText size={24} />, path: '/report' },
    { name: 'ফান্ড', icon: <Wallet size={24} />, path: '/fund' },
  ];

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 }
  };

  const drawerVariants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    exit: {
      y: '100%',
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    }
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black z-20"
            onClick={onClose}
          />
          
          <motion.div
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-30 shadow-2xl"
            style={{ maxHeight: '80vh', overflowY: 'auto' }}
          >
            <div className="sticky top-0 bg-white rounded-t-3xl px-6 py-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold text-gradient"
                >
                  মেনু
                </motion.h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={24} className="text-primary-600" />
                </motion.button>
              </div>
            </div>
            
            <div className="p-4 space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center w-full px-6 py-4 text-left rounded-2xl hover:bg-primary-50 group transition-colors"
                  onClick={() => handleMenuItemClick(item.path)}
                >
                  <span className="mr-4 p-3 rounded-xl bg-primary-100 text-primary-600 group-hover:bg-primary-200 transition-colors">
                    {item.icon}
                  </span>
                  <span className="text-xl text-gray-700 group-hover:text-primary-700 transition-colors">
                    {item.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MenuDrawer;