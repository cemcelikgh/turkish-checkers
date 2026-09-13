'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import HandshakeSolid from './HandshakeSolid';
import { selectHasForcedMove, selectIsWhiteTurn, selectSelectedPieceIndex }
  from '@/lib/features/game-slice/gameSlice';
import { selectIsRightModal, setHasDrawOffer, setIsRightModal }
  from '@/lib/features/controlsSlice';
import styles from './DrawOfferButton.module.css';

function DrawOfferButton() {

  const selectedPieceIndex = useAppSelector(selectSelectedPieceIndex);
  const hasForcedMove = useAppSelector(selectHasForcedMove);
  const isRightModal = useAppSelector(selectIsRightModal);
  const isWhiteTurn = useAppSelector(selectIsWhiteTurn);
  const dispatch = useAppDispatch();

  const oppSide = isWhiteTurn ? 'Siyah' : 'Beyaz';

  function handleDrawOffer() {
    if (!selectedPieceIndex && !hasForcedMove && isRightModal === null) {
      if (isWhiteTurn) {
        dispatch(setHasDrawOffer(true));
        dispatch(setIsRightModal(true));
      } else {
        dispatch(setHasDrawOffer(true));
        dispatch(setIsRightModal(false));
      }
    }
  }

  return (
    <div
      className={styles['circle-bg']}
      title={`${oppSide} tarafa beraberlik teklif et`}
    >
      <HandshakeSolid
        className={styles.handshake}
        onClick={() => { handleDrawOffer() }}
      />
    </div>
  );

}

export default DrawOfferButton;
