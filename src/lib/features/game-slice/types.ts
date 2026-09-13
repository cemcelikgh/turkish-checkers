export type SquareColor = 'white' | 'black';

export type SquareSituation = null | 'selected-piece' | 'landing' | 'capturable-piece' | 'forced-piece';

export type OnePiece = 'white-man' | 'black-man' | 'white-king' | 'black-king';

export interface Square {
  squareIndex: number;
  squareColor: SquareColor;
  squareSituation: SquareSituation;
}

export interface Cell extends Square {
  onePiece: OnePiece | null;
}

export type Board = Cell[];

export interface LastMove {
    startSquare: number;
    endSquare: number;
}

export type LastNineMoves = LastMove[];

export interface State {
  board: Board;
  isWhiteTurn: boolean;
  capturedBlackPieceCount: number;
  capturedWhitePieceCount: number;
  selectedPieceIndex: null | number;
  hasForcedMove: boolean;
  noPieceCanMove: boolean;
  lastNineMoves: LastNineMoves;
  lastMove: LastMove;
  movableSquaresOfKing: Cell[];
  validPaths: CapturePaths;
}

export type KingMoveDirection = 'forward' | 'right' | 'backward' | 'left';

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
