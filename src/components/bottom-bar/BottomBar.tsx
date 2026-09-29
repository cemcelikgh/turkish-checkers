import DarkThemeSelector
  from "./dark-theme-selector/DarkThemeSelector";
import LeftFileLabels
  from "./left-file-labels/LeftFileLabels";
import LightThemeSelector
  from "./light-theme-selector/LightThemeSelector";
import RightFileLabels
  from "./right-file-labels/RightFileLabels";
import SystemThemeSelector
  from "./system-theme-selector/SystemThemeSelector";
import styles from "./BottomBar.module.css";

function BottomBar() {
  return (
    <div className={styles['bottom-bar']}>
      <LightThemeSelector />
      <LeftFileLabels />
      <SystemThemeSelector />
      <RightFileLabels />
      <DarkThemeSelector />
    </div>
  );
}

export default BottomBar;
