'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { resetControlsState, selectIsRightModal, setIsRightModal }
  from '@/lib/features/controlsSlice';
import { resetGameState } from '@/lib/features/game-slice/gameSlice';
import CaretLeft from '../../icons/CaretLeft';
import ChessBoardSolid from '../../icons/ChessBoardSolid';
import CaretRight from '../../icons/CaretRight';
import RotateSolid from '../../icons/RotateSolid';
import styles from './GameResulModal.module.css';

function GameResulModal({
  resultMessage,
  isWhiteSideBoard,
}: {
  resultMessage: string;
  isWhiteSideBoard: boolean;
}) {

  const isRightModal = useAppSelector(selectIsRightModal);
  const dispatch = useAppDispatch();

  function handleShowLeftModal() { dispatch(setIsRightModal(false)) }
  function handleShowRightModal() { dispatch(setIsRightModal(true)) }
  function handleStartNewGame() {
    dispatch(resetGameState());
    dispatch(resetControlsState());
  }

  if(isRightModal) {
    if (isWhiteSideBoard) {
      return <div className={styles.unclickable}></div>;
    } else {
      return (
        <div className={`${styles['game-result']} ${styles['black-side']}`}>
          <div>{resultMessage}</div>
          <div
            className={styles['select-view-side']}
            onClick={handleShowLeftModal}
          >
            Oyun sonu tahtasına beyaz taraftan bak.
            <ChessBoardSolid className={styles['chess-board']} />
            <CaretRight className={styles.caret} />
          </div>
          <div
            className={styles['new-game']}
            onClick={handleStartNewGame}
          >
            <RotateSolid className={styles.rotate} />
            Yeni oyun başlat.
          </div>
        </div>
      );
    }
  } else {
    if (isWhiteSideBoard) {
      return (
        <div className={styles['game-result']}>
          <div>{resultMessage}</div>
          <div
            className={styles['select-view-side']}
            onClick={handleShowRightModal}
          >
            <CaretLeft className={styles.caret} />
            <ChessBoardSolid className={styles['chess-board']} />
            Oyun sonu tahtasına siyah taraftan bak.
          </div>
          <div
            className={styles['new-game']}
            onClick={handleStartNewGame}
          >
            <RotateSolid className={styles.rotate} />
            Yeni oyun başlat.
          </div>
        </div>
      );
    } else {
      return <div className={styles.unclickable}></div>;
    }
  }

}

export default GameResulModal;
