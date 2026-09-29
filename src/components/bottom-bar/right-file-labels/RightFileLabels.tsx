import styles from './RightFileLabels.module.css';

const letters = ['H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];

function RightFileLabels() {
  return (
    <div className={styles.labels}>
      {letters.map(letter =>
      <div
        className={styles.label}
        key={letter}
      >
        {letter}
      </div>)}
    </div>
  );
}

export default RightFileLabels;
