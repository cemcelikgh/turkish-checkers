'use client';

import { selectThemePreference, setTheme, setThemePreference }
  from "@/lib/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import SunSolid from "./SunSolid";
import styles from "./LightThemeSelector.module.css";

function LightThemeSelector() {

  const themePreference = useAppSelector(selectThemePreference);
  const isLightTheme = themePreference === 'light';
  const dispatch = useAppDispatch();
  
  function handleSetLightTheme() {
    dispatch(setTheme('light'));
    dispatch(setThemePreference('light'));
  }

  return (
    <div className={styles.selector}>
      <button
        className={`${styles.btn}${isLightTheme ? ` ${styles.selected}` : ''}`}
        onClick={handleSetLightTheme}
        title="Açık temaya geç"
      >
        <SunSolid />
      </button>
    </div>
  );

}

export default LightThemeSelector;
