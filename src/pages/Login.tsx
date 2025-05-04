// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Storage } from '@capacitor/storage';
import { db } from '../firebase';
import { ref, get } from 'firebase/database';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userId || !password) {
      setError('সব ফিল্ড পূরণ করুন');
      return;
    }

    setLoading(true);
    try {
      const userKey = `${userId}`;
      const snapshot = await get(ref(db, `users/${userKey}`));

      if (!snapshot.exists()) {
        setError('ID খুঁজে পাওয়া যায়নি');
      } else {
        const data = snapshot.val() as { id: number; password: string };
        if (data.password !== password) {
          setError('পাসওয়ার্ড সঠিক নয়');
        } else {
          // Success: persist userId
          Cookies.set('userId', userId, { expires: 7 });
          await Storage.set({ key: 'userId', value: userId });
          navigate('/');
        }
      }
    } catch (err) {
      console.error(err);
      setError('লগইন করতে সমস্যা হয়েছে, পরে আবার চেষ্টা করুন');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">লগইন</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">ব্যবহারকারী ID</label>
          <input
            type="number"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="1"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">পাসওয়ার্ড</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'লোড হচ্ছে...' : 'লগইন'}
        </button>
      </form>
    </div>
  );
};

export default Login;
