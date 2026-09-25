'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import RotateSolid from './RotateSolid';
import { selectHasForcedMove, selectSelectedPieceIndex }
  from '@/lib/features/game-slice/gameSlice';
import { selectIsRightModal, setIsResetConfirmationOpen }
  from '@/lib/features/controlsSlice';
import styles from './ResetGameButton.module.css';

function NewGameButton() {

  const selectedPieceIndex = useAppSelector(selectSelectedPieceIndex);
  const hasForcedMove = useAppSelector(selectHasForcedMove);
  const isRightModal = useAppSelector(selectIsRightModal);
  const dispatch = useAppDispatch();

  function handleResetGame() {
    if(!selectedPieceIndex && !hasForcedMove && isRightModal === null) {
      dispatch(setIsResetConfirmationOpen(true));
    }
  }

  return (
    <div
      className={styles['circle-bg']}
      title='Yeni oyun başlat'
    >
      <RotateSolid
        className={styles.rotate}
        onClick={handleResetGame}
      />
    </div>
  );
}

export default NewGameButton;
