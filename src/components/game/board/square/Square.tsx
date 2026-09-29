'use client';

import { moveSelectedPiece, selectPiece, selectSquare } from '@/lib/features/game-slice/gameSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import styles from './Square.module.css';

function Square({ squareIndex, isWhiteSideBoard }: { squareIndex: number; isWhiteSideBoard: boolean; }) {

  const cell = useAppSelector(selectSquare(squareIndex));
  const dispatch = useAppDispatch();

  const title =
      cell.onePiece === 'white-man' ? 'Beyaz Yoz Taş'
    : cell.onePiece === 'black-man' ? 'Siyah Yoz Taş'
    : cell.onePiece === 'white-king' ? 'Beyaz Dama'
    : cell.onePiece === 'black-king' ? 'Siyah Dama'
    : undefined;

  function handleSelectPiece() { dispatch(selectPiece({cell, isWhiteSideBoard})) }
  function handleMoveSelectedPiece() { dispatch(moveSelectedPiece({cell, isWhiteSideBoard})) }

  return (
    <div
      className={cell.squareSituation ? styles[cell.squareSituation] : styles[cell.squareColor]}
      onClick={handleMoveSelectedPiece}
    >
      {cell.onePiece &&
      <div
        className={cell.onePiece ? styles[cell.onePiece] : undefined}
        title={title}
        onClick={handleSelectPiece}
      />}
    </div>
  );

}

export default Square;
