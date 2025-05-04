import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import GyroBackground from '../components/GyroBackground';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-50 text-gray-900 font-bengali pb-16">
      <GyroBackground />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default MainLayout;