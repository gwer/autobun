import { ComponentChildren } from 'preact';
import styles from './DefaultLayout.module.css';

export default function DefaultLayout({
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
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Footer is here</footer>
    </div>
  );
}
