'use client';

import { selectCapturedWhitePieceCount } from '@/lib/features/game-slice/gameSlice';
import { useAppSelector } from '@/lib/hooks';
import styles from './CapturedWhitePieces.module.css';

function CapturedWhitePieces() {

  const capturedWhitePieceCount = useAppSelector(selectCapturedWhitePieceCount);

  return (
    <div
      className={styles['circle-bg']}
      title={`Siyah taraf ${capturedWhitePieceCount} beyaz taş aldı`}
    >
      {capturedWhitePieceCount > 0 &&
      <div className={styles['captured-white-pieces']}>
        {capturedWhitePieceCount}
      </div>}
    </div>
  );

}

export default CapturedWhitePieces;
