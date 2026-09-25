'use client';

import {
  selectHasDrawOffer, selectIsRightModal, setHasDrawOffer, setIsDrawGame, setIsRightModal,
} from '@/lib/features/controlsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectIsWhiteTurn } from '@/lib/features/game-slice/gameSlice';
import CaretLeft from '../icons/CaretLeft';
import ChessBoardSolid from '../icons/ChessBoardSolid';
import CaretRight from '../icons/CaretRight';
import CheckSolid from '../icons/CheckSolid';
import XmarkSolid from '../icons/XmarkSolid';
import styles from './DrawOfferModal.module.css';

function DrawOfferModal({ isWhiteSideBoard }: { isWhiteSideBoard: boolean; }) {

  const hasDrawOffer = useAppSelector(selectHasDrawOffer);
  const isRightModal = useAppSelector(selectIsRightModal);
  const isWhiteTurn = useAppSelector(selectIsWhiteTurn);
  const dispatch = useAppDispatch();

  if (!hasDrawOffer) return null;

  const offerSide = isWhiteTurn ? 'Beyaz' : 'Siyah';
  const oppSide = isWhiteTurn ? 'siyah' : 'beyaz';
  const drawOfferMessage = `${offerSide} taraf, ${oppSide} tarafa beraberlik teklif etti.`;

  function handleAcceptTheOffer() {
    dispatch(setHasDrawOffer(false));
    dispatch(setIsDrawGame(true));
  }
  function handleRejectTheOffer() {
    dispatch(setHasDrawOffer(false));
    dispatch(setIsRightModal(null));
  }

  if (isRightModal) {
    if (isWhiteSideBoard) {
      return <div className={styles.unclickable} />;
    } else {
      return (
        <div className={`${styles['draw-offer']} ${styles['black-side']}`}>
          <div>{drawOfferMessage}</div>
          <div
            className={styles['select-view-side']}
            onClick={ () => { dispatch(setIsRightModal(false)) } }
          >
            Oyuna siyah taraftan bak.
            <ChessBoardSolid className={styles['chess-board']} />
            <CaretRight className={styles.caret} />
          </div>
          <div className={styles.approval}>
            <div onClick={handleAcceptTheOffer}>
              <CheckSolid className={styles.check} />
              Kabul Et
            </div>
            <div onClick={handleRejectTheOffer}>
              <XmarkSolid className={styles.xmark} />
              Reddet
            </div>
          </div>
        </div>
      );
    }
  } else {
    if (isWhiteSideBoard) {
      return (
        <div className={styles['draw-offer']}>
          <div>{drawOfferMessage}</div>
          <div
            className={styles['select-view-side']}
            onClick={ () => { dispatch(setIsRightModal(true)) } }
          >
            <CaretLeft className={styles.caret} />
            <ChessBoardSolid className={styles['chess-board']} />
            Oyuna beyaz taraftan bak.
          </div>
          <div className={styles.approval}>
            <div onClick={handleAcceptTheOffer}>
              <CheckSolid className={styles.check} />
              Kabul Et
            </div>
            <div onClick={handleRejectTheOffer}>
              <XmarkSolid className={styles.xmark} />
              Reddet
            </div>
          </div>
        </div>
      );
    } else {
      return <div className={styles.unclickable} />;
    }
  }

}

export default DrawOfferModal;
