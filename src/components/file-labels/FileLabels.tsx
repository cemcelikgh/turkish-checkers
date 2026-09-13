import LeftFileLabels
  from "./left-file-labels/LeftFileLabels";
import RightFileLabels
  from "./right-file-labels/RightFileLabels";
import styles from "./FileLabels.module.css";

function FileLabels() {
  return (
    <div className={styles.labels}>
      <LeftFileLabels />
      <div className={styles.space} />
      <RightFileLabels />
    </div>
  );
}

export default FileLabels;
