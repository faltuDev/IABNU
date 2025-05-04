import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Menu, MessageCircle, Settings, LogIn } from 'lucide-react';
import Cookies from 'js-cookie';
import { Storage } from '@capacitor/storage';
import MenuDrawer from './MenuDrawer';
import { db } from '../firebase';
import { ref, get } from 'firebase/database';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Defines and immediately runs auth check, then repeats every second
    const checkAuth = async () => {
      try {
        let userId = Cookies.get('userId');
        if (!userId) {
          const { value } = await Storage.get({ key: 'userId' });
          userId = value || undefined;
        }

        if (!userId) {
          setIsLoggedIn(false);
          return;
        }

        const snapshot = await get(ref(db, `users/${userId}/id`));
        if (!snapshot.exists()) {
          Cookies.remove('userId');
          await Storage.remove({ key: 'userId' });
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        Cookies.remove('userId');
        await Storage.remove({ key: 'userId' });
        setIsLoggedIn(false);
      }
    };

    checkAuth();
    const intervalId = setInterval(checkAuth, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const baseItems: { name: string; icon: JSX.Element; path: string; action?: () => void }[] = [
    { name: 'হোম', icon: <Home size={24} />, path: '/' },
  ];

  const authItems: { name: string; icon: JSX.Element; path: string; action?: () => void }[] = isLoggedIn
    ? [
        { name: 'মেনু', icon: <Menu size={24} />, path: '/menu', action: () => setMenuOpen(true) },
        { name: 'বার্তা', icon: <MessageCircle size={24} />, path: '/messages' },
        { name: 'সেটিংস', icon: <Settings size={24} />, path: '/settings' },
      ]
    : [
        { name: 'লগইন', icon: <LogIn size={24} />, path: '/login' },
      ];

  const navItems = [...baseItems, ...authItems];

  const handleNavigation = (path: string, action?: () => void) => {
    if (action) action();
    else navigate(path);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10">
        <div className="flex justify-around items-center h-16">
          {navItems.map(item => (
            <button
              key={item.name}
              className={`bottom-nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path, item.action)}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default BottomNavigation;
