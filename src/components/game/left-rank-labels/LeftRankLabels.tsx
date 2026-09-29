import styles from './LeftRankLabels.module.css';

const numbers = ['8', '7', '6', '5', '4', '3', '2', '1'];

function LeftRankLabels() {
  return (
    <div className={styles.numbers}>
      {numbers.map(number =>
      <div className={styles.number} key={number}>
        {number}
      </div>)}
    </div>
  );
}

export default LeftRankLabels;
