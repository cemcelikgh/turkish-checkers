import styles from './RightRankLabels.module.css';

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];

function RightRankLabels() {
  return (
    <div className={styles.numbers}>
    {numbers.map(number =>
      <div key={number}>{number}</div>)}
    </div>
  );
}

export default RightRankLabels;
