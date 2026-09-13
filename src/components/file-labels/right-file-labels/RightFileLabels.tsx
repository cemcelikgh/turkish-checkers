import styles from './RightFileLabels.module.css';

const letters = ['H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];

function RightFileLabels() {
  return (<>
    <div className={styles.labels}>
      {letters.map(letter =>
      <div key={letter}>{letter}</div>)}
    </div>
    <div className={styles.corner} />
  </>);
}

export default RightFileLabels;
