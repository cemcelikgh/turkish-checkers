'use client';

import { useEffect, useState } from 'react';
import MaximizeSolidFull from './icons/MaximizeSolidFull';
import MinimizeSolidFull from './icons/MinimizeSolidFull';
import styles from './FullscreenButton.module.css';

function FullscreenButton() {

  const [isFullscreen, setIsFullscreen] = useState(false);

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }

  useEffect(() => {

    function handleFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }

  }, []);

  return (
    <button 
      className={styles.btn}
      onClick={toggleFullscreen}
    >
      {isFullscreen ? <MinimizeSolidFull /> : <MaximizeSolidFull />}
    </button>
  );
}

export default FullscreenButton;
