import styles from './LeftFileLabels.module.css';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function LeftFileLabels() {
  return (<>
    <div className={styles.corner} />
    <div className={styles.labels}>
      {letters.map(letter =>
      <div key={letter}>{letter}</div>)}
    </div>
  </>);
}

export default LeftFileLabels;
