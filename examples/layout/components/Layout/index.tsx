import { type ComponentChildren } from 'preact';
import styles from './Layout.module.css';

export default function Layout({ children }: { children: ComponentChildren }) {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Footer is here</footer>
    </div>
  );
}
