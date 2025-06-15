import { useState } from 'preact/hooks';
import styles from './ComplexPageContent.module.css';

export default function ComplexPageWrapper() {
  const [count, setCount] = useState(0);
  return (
    <div id="complex-page-content" className={styles.container}>
      <p>Complex Page.</p>
      <p>
        Count: <span id="count">{count}</span>
      </p>
      <p>
        <button id="increment-button" onClick={() => setCount(count + 1)}>
          Increment
        </button>
      </p>
    </div>
  );
}
