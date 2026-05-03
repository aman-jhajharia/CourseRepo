'use client';

import { useState, useEffect } from 'react';
import styles from '../../components/components.module.css';
import FilterSidebar from '../../components/FilterSidebar';
import PaperCard from '../../components/PaperCard';
import { motion } from 'framer-motion';

export default function PapersPage() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    year: '',
    semester: '',
    type: '',
    subject: ''
  });

  useEffect(() => {
    fetchPapers();
  }, [filters]);

  const fetchPapers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.year) params.append('year', filters.year);
      if (filters.semester) params.append('semester', filters.semester);
      if (filters.type) params.append('type', filters.type);
      if (filters.subject) params.append('subject', filters.subject);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/papers?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPapers(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch papers', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="main-container">
      <div className={styles.papersContainer}>
        <FilterSidebar filters={filters} setFilters={setFilters} />
        
        <div className={styles.papersContent}>
          <h2 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-retro)', fontSize: '2.5rem', textTransform: 'uppercase' }}>
            Database_Results
          </h2>
          
          {loading ? (
            <div style={{ fontFamily: 'var(--font-retro)', fontSize: '1.5rem', color: 'var(--accent-pink)' }}>
              Loading.exe ...
            </div>
          ) : papers.length > 0 ? (
            <motion.div 
              className={styles.papersGrid}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {papers.map(paper => (
                <motion.div key={paper._id} variants={itemVariants}>
                  <PaperCard paper={paper} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-retro)', fontSize: '2rem', color: 'red' }}>404_NOT_FOUND</h3>
              <p style={{ fontWeight: 'bold' }}>Adjust your parameters and try again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
