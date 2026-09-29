'use client';

import { selectCapturedBlackPieceCount } from '@/lib/features/game-slice/gameSlice';
import { useAppSelector } from '@/lib/hooks';
import styles from './CapturedBlackPieces.module.css';

function CapturedBlackPieces() {

  const capturedBlackPieceCount = useAppSelector(selectCapturedBlackPieceCount);

  return (
    <div
      className={styles['circle-bg']}
      title={`Beyaz taraf ${capturedBlackPieceCount} siyah taş aldı`}
    >
      {capturedBlackPieceCount > 0 &&
      <div className={styles['captured-black-pieces']}>
        {capturedBlackPieceCount}
      </div>}
    </div>
  );

}

export default CapturedBlackPieces;
