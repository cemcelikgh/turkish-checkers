'use client';

import { useAppSelector } from '@/lib/hooks';
import { selectCapturedWhitePieceCount } from '@/lib/features/game-slice/gameSlice';
import styles from './CapturedWhitePieces.module.css';

function CapturedWhitePieces() {

  const capturedWhitePieceCount = useAppSelector(selectCapturedWhitePieceCount);

  return (
    <div
      className={styles['circle-bg']}
      title='Alınan beyaz taş sayısı'  
    >
      {(capturedWhitePieceCount > 0) &&
      <div className={styles['captured-white-pieces']}>
        {capturedWhitePieceCount}
      </div>}
    </div>
  );
}

export default CapturedWhitePieces;
