'use client';

import { selectThemePreference, setTheme, setThemePreference }
  from "@/lib/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import MoonSolid from "./MoonSolid";
import styles from "./DarkThemeSelector.module.css";

function DarkThemeSelector() {

  const themePreference = useAppSelector(selectThemePreference);
  const isDarkTheme = themePreference === 'dark';
  const dispatch = useAppDispatch();
  
  function handleSetLightTheme() {
    dispatch(setTheme('dark'));
    dispatch(setThemePreference('dark'));
  }

  return (
    <div className={styles.selector}>
      <button
        className={`${styles.btn}${isDarkTheme ? ` ${styles.selected}` : ''}`}
        onClick={handleSetLightTheme}
        title="Koyu temaya geç"
      >
        <MoonSolid />
      </button>
    </div>
  );

}

export default DarkThemeSelector;
