'use client';

import { useState } from 'react';
import styles from './components.module.css';
import { motion } from 'framer-motion';

export default function PaperCard({ paper }) {
  const [isInstalling, setIsInstalling] = useState(false);

  const getBadgeClass = (type) => {
    switch (type) {
      case 'endterm': return `${styles.badge} ${styles.endterm}`;
      case 'assignment': return `${styles.badge} ${styles.assignment}`;
      default: return styles.badge; // midterm
    }
  };

  const handleDownloadClick = (e) => {
    if (isInstalling) {
      e.preventDefault();
      return;
    }
    
    // Show installing animation briefly before letting the default link action happen
    setIsInstalling(true);
    e.preventDefault();
    
    setTimeout(() => {
      setIsInstalling(false);
      window.open(paper.fileUrl, '_blank');
    }, 1500); // 1.5 seconds of "Installing knowledge..."
  };

  return (
    <motion.div 
      className={`${styles.paperCard} glitch-hover`}
      data-text="FILE.PDF"
      whileTap={{ scale: 0.98, rotate: -1, filter: 'hue-rotate(90deg)' }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.paperTitle}>{paper.title}</h3>
          <p className={styles.paperSubject}>{paper.subject}</p>
        </div>
        <span className={getBadgeClass(paper.type)}>
          {paper.type}
        </span>
      </div>
      
      <div className={styles.cardFooter}>
        <div className={styles.metaInfo}>
          <span>YR_{paper.year}</span>
          <span>SEM_{paper.semester}</span>
        </div>
        
        {isInstalling ? (
          <span className={styles.installingText}>
            Installing knowledge...
          </span>
        ) : (
          <a 
            href={paper.fileUrl} 
            onClick={handleDownloadClick}
            className={styles.downloadBtn}
          >
            [ GET_IT ]
          </a>
        )}
      </div>
    </motion.div>
  );
}
