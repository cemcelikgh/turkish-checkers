import FullscreenButton
  from "./fullscreen-button/FullscreenButton";
import LeftFileLabels
  from "./left-file-labels/LeftFileLabels";
import RightFileLabels
  from "./right-file-labels/RightFileLabels";
import styles from "./FileLabels.module.css";

function FileLabels() {
  return (
    <div className={styles.labels}>
      <LeftFileLabels />
      <FullscreenButton />
      <RightFileLabels />
    </div>
  );
}

export default FileLabels;
