'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { resetControlsState, selectShowResetGameConfirm, setShowNewGameConfirm }
  from '@/lib/features/controlsSlice';
import { resetGameState } from '@/lib/features/game-slice/gameSlice';
import styles from './ResetGameConfirmModal.module.css';

function ResetGameConfirmModal() {

  const showResetGameConfirm = useAppSelector(selectShowResetGameConfirm);
  const dispatch = useAppDispatch();

  function handleCloseModal() { dispatch(setShowNewGameConfirm(false)) }
  function handleResetGame() {
    dispatch(resetGameState());
    dispatch(resetControlsState());
    dispatch(setShowNewGameConfirm(false));
  }

  return (showResetGameConfirm &&
    <div className={styles.select}>
      <div
        className={styles['new-game']}
        onClick={handleResetGame}
      >
        Yeni oyun kur.
      </div>
      <div
        className={styles.continue}
        onClick={handleCloseModal}
      >
        Mevcut oyuna devam et.
      </div>
    </div>
  );

}

export default ResetGameConfirmModal;
