export type OnePiece = 'white-man' | 'black-man' | 'white-king' | 'black-king';

interface Square {
  squareIndex: number;
  squareColor: 'white' | 'black';
  squareSituation: null | 'selected-piece' | 'landing' | 'capturable-piece' | 'forced-piece';
}

export interface Cell extends Square {
  onePiece: OnePiece | null;
}

export type Board = Cell[];

export interface LastMove {
  startSquare: number;
  endSquare: number;
}

export interface State {
  board: Board;
  isWhiteTurn: boolean;
  capturedBlackPieceCount: number;
  capturedWhitePieceCount: number;
  selectedPieceIndex: null | number;
  hasForcedMove: boolean;
  noPieceCanMove: boolean;
  lastNineMoves: LastMove[];
  lastMove: LastMove;
  movableSquaresOfKing: Cell[];
  validPaths: CapturePaths;
}

type KingMoveDirection = 'forward' | 'right' | 'backward' | 'left';

export interface BoardAndTurn {
  board: Board;
  isWhiteTurn: boolean;
}

export interface CaptureMove extends BoardAndTurn {
  currentPiece: OnePiece;
  currentPieceIndex: number;
  opponentPieceIndex: number;
  landingSquareIndex: number;
  lastKingMoveDirection: KingMoveDirection | undefined;
}

export type CaptureMoves = CaptureMove[];

export type CapturePaths = CaptureMoves[];

export interface GenerateCaptureMoveParams {
  currentPiece: OnePiece;
  currentPieceIndex: number;
  opponentPieceIndex: number;
  landingSquareIndex: number;
  board: Board;
  isWhiteTurn: boolean;
  lastKingMoveDirection?: KingMoveDirection;
}

export interface ComputeCaptureMovesParams {
  board: Board;
  isWhiteTurn: boolean;
  currentPieceIndex: number;
  lastKingMoveDirection?: KingMoveDirection;
}
