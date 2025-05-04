import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import DistrictPage from './pages/DistrictPage';
import ThanaPage from './pages/Thana/ThanaPage';
import UnionPage from './pages/Union/UnionPage';
import ReportPage from './pages/ReportPage';
import FundPage from './pages/FundPage';
import MessagesPage from './pages/MessagesPage';
import SettingsPage from './pages/SettingsPage';
import UnionPersonPage from './pages/Union/Person';
import ThanaPersonPage from './pages/Thana/Person';
import Login from './pages/Login';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="district" element={<DistrictPage />} />
        <Route path="thana" element={<ThanaPage />} />
        <Route path="/thana/:thanaId/person" element={<ThanaPersonPage />} />
        <Route path="union" element={<UnionPage />} />
        <Route path='union/:unionId/person' element={<UnionPersonPage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path='login' element={<Login />} />
        <Route path="fund" element={<FundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;