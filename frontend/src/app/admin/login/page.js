'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../components/components.module.css';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        router.push('/admin/upload');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  return (
    <div className="main-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <motion.div 
        className="glass" 
        style={{ padding: '2rem', maxWidth: '400px', width: '100%', marginTop: '4rem' }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <h2 style={{ fontFamily: 'var(--font-retro)', fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--accent-pink)' }}>
          SYSTEM.LOGIN
        </h2>
        
        {error && <div style={{ background: 'var(--accent-yellow)', color: 'red', padding: '0.5rem', marginBottom: '1rem', border: 'var(--border-hard)', fontFamily: 'var(--font-retro)' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontFamily: 'var(--font-retro)', fontSize: '1.2rem', display: 'block', marginBottom: '0.5rem' }}>Username:</label>
            <input 
              type="text" 
              className="input-field" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontFamily: 'var(--font-retro)', fontSize: '1.2rem', display: 'block', marginBottom: '0.5rem' }}>Password:</label>
            <input 
              type="password" 
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button-primary" style={{ width: '100%' }}>
            ACCESS
          </button>
        </form>
      </motion.div>
    </div>
  );
}
