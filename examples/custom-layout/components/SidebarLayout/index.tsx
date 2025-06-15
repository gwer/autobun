import { ComponentChildren } from 'preact';
import styles from './SidebarLayout.module.css';

export default function SidebarLayout({
  children,
}: {
  children: ComponentChildren;
}) {
  return (
    <div className={styles.container}>
      <nav id="header" className={styles.nav}>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
      <nav id="sidebar" className={styles.sidebar}>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Footer is here</footer>
    </div>
  );
}
