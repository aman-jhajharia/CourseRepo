import Link from 'next/link';
import styles from './components.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`${styles.logo} glitch-hover`} data-text="COURSE_REPO">
        <Link href="/">Course<span>Repo</span></Link>
      </div>
      <div className={styles.navLinks}>
        <Link href="/papers" className={styles.navLink}>[Browse]</Link>
      </div>
    </nav>
  );
}
