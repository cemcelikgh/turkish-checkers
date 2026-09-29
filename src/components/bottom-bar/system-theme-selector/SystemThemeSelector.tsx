'use client';

import { selectThemePreference, setTheme, setThemePreference }
  from "@/lib/features/themeSlice";
import { Theme } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useRef } from "react";
import DisplaySolid from "./DisplaySolid";
import styles from "./SystemThemeSelector.module.css";

function SystemThemeSelector() {

  const themePreference = useAppSelector(selectThemePreference);
  const isSystemTheme = themePreference === 'system';
  const prefersColorSchemeRef = useRef<Theme>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: light)');
    prefersColorSchemeRef.current = mediaQueryList.matches ? 'light' : 'dark';

    function changeHandler(event: MediaQueryListEvent) {
      const theme = event.matches ? 'light' : 'dark';
      prefersColorSchemeRef.current = theme;
      if (isSystemTheme) dispatch(setTheme(theme));
    }

    mediaQueryList.addEventListener('change', changeHandler);

    return () => { mediaQueryList.removeEventListener('change', changeHandler) };

  }, [isSystemTheme, dispatch]);

  function handleSetSystemTheme() {
    if (prefersColorSchemeRef.current === null) return;
    dispatch(setTheme(prefersColorSchemeRef.current));
    dispatch(setThemePreference('system'));
  }

  return (
    <div className={styles.selector}>
      <button
        className={`${styles.btn}${isSystemTheme ? ` ${styles.selected}` : ''}`}
        onClick={handleSetSystemTheme}
        title="Sistem temasını kullan"
      >
        <DisplaySolid />
      </button>
    </div>
  );

}

export default SystemThemeSelector;
