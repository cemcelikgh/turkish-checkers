'use client';

import {
  selectCapturedBlackPieceCount,
  selectCapturedWhitePieceCount,
  selectLastNineMoves,
  selectNoPieceCanMove,
  selectSelectedPieceIndex,
  selectIsWhiteTurn,
} from '@/lib/features/game-slice/gameSlice';
import { selectIsDrawGame } from '@/lib/features/controlsSlice';
import { useAppSelector } from '@/lib/hooks';
import GameResulModal from './game-over-modal/GameResulModal';

function GameOver({ isWhiteSideBoard }: { isWhiteSideBoard: boolean; }) {

  const capturedBlackPieceCount = useAppSelector(selectCapturedBlackPieceCount);
  const capturedWhitePiecesCount = useAppSelector(selectCapturedWhitePieceCount);
  const noPieceCanMove = useAppSelector(selectNoPieceCanMove);
  const isWhiteTurn = useAppSelector(selectIsWhiteTurn);
  const isDrawGame = useAppSelector(selectIsDrawGame);
  const selectedPieceIndex = useAppSelector(selectSelectedPieceIndex);
  const lastNineMoves = useAppSelector(selectLastNineMoves);

  if (capturedBlackPieceCount === 16) {
    return <GameResulModal
      resultMessage='Siyah tarafın bütün taşlarını alarak oyunu beyaz taraf kazandı.'
      isWhiteSideBoard={isWhiteSideBoard}
    />
  }

  if (capturedWhitePiecesCount === 16) {
    return <GameResulModal
      resultMessage='Beyaz tarafın bütün taşlarını alarak oyunu siyah taraf kazandı.'
      isWhiteSideBoard={isWhiteSideBoard}
    />
  }

  if (noPieceCanMove && !isWhiteTurn && capturedBlackPieceCount !== 16) {
    return <GameResulModal
      resultMessage='Rakibinin bütün siyah taşlarını hareketsiz bırakarak oyunu beyaz taraf kazandı.'
      isWhiteSideBoard={isWhiteSideBoard}
    />
  }

  if (noPieceCanMove && isWhiteTurn && capturedWhitePiecesCount !== 16) {
    return <GameResulModal
      resultMessage='Rakibinin bütün beyaz taşlarını hareketsiz bırakarak oyunu siyah taraf kazandı.'
      isWhiteSideBoard={isWhiteSideBoard}
    />
  }

  if (isDrawGame) {
    const acceptorSide = isWhiteTurn ? 'Siyah' : 'Beyaz';
    const oppSide = isWhiteTurn ? 'beyaz' : 'siyah';
    const drawGameMessage = `${acceptorSide} taraf, ${oppSide} tarafın beraberlik teklifini kabul etti.`;
    return <GameResulModal resultMessage={drawGameMessage} isWhiteSideBoard={isWhiteSideBoard} />;
  }

  if (capturedWhitePiecesCount === 15 && capturedBlackPieceCount === 15 && selectedPieceIndex === null) {
    return <GameResulModal
      resultMessage='Rakiplerin ikisinin de birer taşı kaldığı için oyun berabere sonuçlandı.'
      isWhiteSideBoard={isWhiteSideBoard}
    />
  }

  if (
    lastNineMoves[0].startSquare === lastNineMoves[4].startSquare &&
    lastNineMoves[0].endSquare   === lastNineMoves[4].endSquare   &&
    lastNineMoves[1].startSquare === lastNineMoves[5].startSquare &&
    lastNineMoves[1].endSquare   === lastNineMoves[5].endSquare   &&
    lastNineMoves[2].startSquare === lastNineMoves[6].startSquare &&
    lastNineMoves[2].endSquare   === lastNineMoves[6].endSquare   &&
    lastNineMoves[3].startSquare === lastNineMoves[7].startSquare &&
    lastNineMoves[3].endSquare   === lastNineMoves[7].endSquare   &&
    lastNineMoves[4].startSquare === lastNineMoves[8].startSquare &&
    lastNineMoves[4].endSquare   === lastNineMoves[8].endSquare
  ) {
    return <GameResulModal
      resultMessage='3 kez aynı pozisyon aynı hamleler ile tekrarlandığı için oyun berabere sonuçlandı.'
      isWhiteSideBoard={isWhiteSideBoard}
    />
  }

  return null;

}

export default GameOver;
