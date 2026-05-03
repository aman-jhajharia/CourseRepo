import Link from 'next/link';
import styles from './components.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>© {new Date().getFullYear()} CourseRepo. Best viewed in Netscape Navigator.</div>
      <Link href="/admin/login" className={styles.adminLink}>
        [Admin Login]
      </Link>
    </footer>
  );
}
