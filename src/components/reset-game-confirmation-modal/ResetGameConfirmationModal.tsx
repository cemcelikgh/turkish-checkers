'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { resetControlsState, selectIsResetConfirmationOpen, setIsResetConfirmationOpen }
  from '@/lib/features/controlsSlice';
import { resetGame } from '@/lib/features/game-slice/gameSlice';
import styles from './ResetGameConfirmationModal.module.css';

function ResetGameConfirmationModal() {

  const hasResetGameConfirmation = useAppSelector(selectIsResetConfirmationOpen);
  const dispatch = useAppDispatch();

  function handleResetGame() {
    dispatch(resetGame());
    dispatch(resetControlsState());
    dispatch(setIsResetConfirmationOpen(false));
  }

  return (hasResetGameConfirmation &&
    <div className={styles.select}>
      <div
        className={styles['new-game']}
        onClick={handleResetGame}
      >
        Yeni oyun kur.
      </div>
      <div
        className={styles.continue}
        onClick={ () => { dispatch(setIsResetConfirmationOpen(false)) } }
      >
        Mevcut oyuna devam et.
      </div>
    </div>
  );

}

export default ResetGameConfirmationModal;
