'use client';

import Link from 'next/link';
import styles from '../components/components.module.css';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="main-container">
      <section className={styles.homeHero}>
        <motion.h1 
          className={`${styles.heroTitle} glitch-hover`} 
          data-text="C:\COURSE\REPO"
          initial={{ scale: 0.8, y: -50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 100 }}
        >
          C:\COURSE\<span>REPO</span>
        </motion.h1>
        
        <motion.p 
          className={styles.heroSubtitle}
          initial={{ rotate: 10, scale: 0 }}
          animate={{ rotate: -2, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          Programming II (C) & Managing Business Functions Paper are live!
        </motion.p>
        
        <motion.div 
          className={styles.heroActions}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/papers" className="button-primary glitch-hover" data-text="OPEN_DIR">
            OPEN_DIR
          </Link>
          <Link href="https://jklujaipur-my.sharepoint.com/:f:/g/personal/amanjhajharia_jklu_edu_in/IgCssnNqhWRjRLhCxGoYZu0MAXDKB548nVOlKtXiXxRjYs4?e=JcRiXy" target="_blank" className="button-secondary">
            SHARE_CACHE
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
