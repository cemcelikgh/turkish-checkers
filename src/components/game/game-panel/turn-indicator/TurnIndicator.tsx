'use client';

import { useAppSelector } from '@/lib/hooks';
import { selectIsWhiteTurn }
  from '@/lib/features/game-slice/gameSlice';
import LeftLongSolid from './icons/LeftLongSolid';
import RightLongSolid from './icons/RightLongSolid';
import styles from './TurnIndicator.module.css';

function TurnIndicator() {

  const isWhiteTurn = useAppSelector(selectIsWhiteTurn);

  return (isWhiteTurn ?
    <div
      className={styles['circle-bg']}
      title='Oynama sırası beyaz tarafta'
    >
      <LeftLongSolid className={styles.indicator} />
    </div>
    :
    <div
      className={styles['circle-bg']}
      title='Oynama sırası siyah tarafta'  
    >
      <RightLongSolid className={styles.indicator} />
    </div>
  );

}

export default TurnIndicator;
