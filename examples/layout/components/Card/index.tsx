import { type ComponentChildren } from 'preact';
import styles from './Card.module.css';

export default function Card({ children }: { children: ComponentChildren }) {
  return <div className={styles.card}>{children}</div>;
}
