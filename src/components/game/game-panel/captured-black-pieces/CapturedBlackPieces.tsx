'use client';

import { useAppSelector } from '@/lib/hooks';
import { selectCapturedBlackPieceCount } from '@/lib/features/game-slice/gameSlice';
import styles from './CapturedBlackPieces.module.css';

function CapturedBlackPieces() {

  const capturedBlackPieceCount = useAppSelector(selectCapturedBlackPieceCount);

  return (
    <div
      className={styles['circle-bg']}
      title='Alınan siyah taş sayısı'  
    >
      {(capturedBlackPieceCount > 0) &&
      <div className={styles['captured-black-pieces']}>
        {capturedBlackPieceCount}
      </div>}
    </div>
  );

}

export default CapturedBlackPieces;
