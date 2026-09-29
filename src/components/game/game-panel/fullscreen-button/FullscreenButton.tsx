'use client';

import { useEffect, useState } from 'react';
import ExitFullscreen from './icons/ExitFullscreen';
import ScreenshotMonitor from './icons/ScreenshotMonitor';
import styles from './FullscreenButton.module.css';

function FullscreenButton() {

  const [isFullscreen, setIsFullscreen] = useState(false);

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }

  useEffect(() => {

    function fullscreenChangeHandler() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener('fullscreenchange', fullscreenChangeHandler);

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    }

  }, []);

  return (
    <button
      className={styles.btn}
      onClick={toggleFullscreen}
      title={isFullscreen ? 'Normal ekrana geç' : 'Tam ekrana geç'}
    >
      {isFullscreen ? <ExitFullscreen /> : <ScreenshotMonitor />}
    </button>
  );
}

export default FullscreenButton;
