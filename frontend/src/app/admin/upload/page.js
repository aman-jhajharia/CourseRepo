'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../components/components.module.css';

export default function AdminUpload() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    year: '',
    semester: '',
    type: 'midterm',
    fileUrl: ''
  });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Uploading...');
    
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setStatus('Error: Not logged in.');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('subject', formData.subject);
    data.append('year', formData.year);
    data.append('semester', formData.semester);
    data.append('type', formData.type);
    
    if (file) {
      data.append('file', file);
    } else if (formData.fileUrl) {
      data.append('fileUrl', formData.fileUrl);
    } else {
      setStatus('Error: Provide a file or file URL');
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/upload-paper`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data,
      });

      if (res.ok) {
        setStatus('Upload successful!');
        setFormData({ title: '', subject: '', year: '', semester: '', type: 'midterm', fileUrl: '' });
        setFile(null);
      } else {
        const errData = await res.json();
        setStatus(errData.error || 'Upload failed. Check backend logs.');
      }
    } catch (err) {
      setStatus('Error connecting to backend.');
      console.error(err);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.adminTitle}>Admin Upload Portal</h1>
      <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
        <form onSubmit={handleSubmit}>
          
          <div>
            <label className={styles.filterLabel}>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="input-field" placeholder="e.g. Data Structures Midterm 2023" />
          </div>

          <div>
            <label className={styles.filterLabel}>Subject</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="input-field" placeholder="e.g. Data Structures" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className={styles.filterLabel}>Year</label>
              <input type="number" name="year" min="1" max="4" value={formData.year} onChange={handleChange} required className="input-field" />
            </div>
            <div>
              <label className={styles.filterLabel}>Semester</label>
              <input type="number" name="semester" min="1" max="8" value={formData.semester} onChange={handleChange} required className="input-field" />
            </div>
          </div>

          <div>
            <label className={styles.filterLabel}>Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className={styles.selectInput} style={{ marginBottom: '1rem' }}>
              <option value="midterm">Midterm</option>
              <option value="endterm">Endterm</option>
              <option value="assignment">Assignment</option>
            </select>
          </div>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '1rem 0' }} />

          <div style={{ marginBottom: '1.5rem' }}>
            <label className={styles.filterLabel}>Upload PDF File (Auto Cloudinary)</label>
            <input type="file" onChange={handleFileChange} className="input-field" accept=".pdf,.jpg,.jpeg,.png" style={{ padding: '0.5rem' }} />
          </div>

          <div style={{ textAlign: 'center', margin: '1rem 0' }}>OR</div>

          <div>
            <label className={styles.filterLabel}>Direct Cloudinary URL</label>
            <input type="text" name="fileUrl" value={formData.fileUrl} onChange={handleChange} className="input-field" placeholder="https://res.cloudinary.com/.../paper.pdf" />
          </div>

          <button type="submit" className="button-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Submit Record
          </button>
          
          {status && <p style={{ marginTop: '1rem', textAlign: 'center', color: status.includes('Error') || status.includes('failed') ? 'var(--accent-magenta)' : 'var(--accent-cyan)' }}>{status}</p>}
        </form>
      </div>
    </div>
  );
}
