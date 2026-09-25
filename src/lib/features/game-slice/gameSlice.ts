import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import {
  Board,
  BoardAndTurn,
  CaptureMove,
  CaptureMoves,
  CapturePaths,
  Cell,
  ComputeCaptureMovesParams,
  GenerateCaptureMoveParams,
  LastMove,
  OnePiece,
  State,
} from "./types";

// initial state functions - start

function setInitialBoard() {

  const initialBoard : Board = [];

  let squareIndex = 0;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {

      let onePiece: OnePiece | null = null;

      if (row === 1 || row === 2) onePiece = 'black-man';
      if (row === 5 || row === 6) onePiece = 'white-man';

      initialBoard.push({
        squareIndex,
        squareColor: (row + col) % 2 === 0 ? 'white' : 'black',
        squareSituation: null,
        onePiece,
      });

      squareIndex++;

    }
  }

  return initialBoard;

}

function setInitialLastNineMoves() {
  const initialLastNineMoves : LastMove[] = [];
  for (let i = 0; i < 17; i += 2) {
    initialLastNineMoves.push({
      startSquare: 64 + i,
      endSquare: 65 + i,
    });
  }
  return initialLastNineMoves;
}

// initial state functions - end

const initialState: State = {
  board: setInitialBoard(),
  isWhiteTurn: true,
  capturedBlackPieceCount: 0,
  capturedWhitePieceCount: 0,
  selectedPieceIndex: null,
  hasForcedMove: false,
  noPieceCanMove: false,
  lastNineMoves: setInitialLastNineMoves(),
  lastMove: {startSquare: 82, endSquare: 83},
  movableSquaresOfKing: [],
  validPaths: [],
}

// select and move functions - start

function selectCell(state: State, index: number) {
  state.selectedPieceIndex = index;
  state.board[index].squareSituation = 'selected-piece';
  state.lastMove.startSquare = index;
}

function selectMan(state: State, index: number) {

  const offset = state.board[index].onePiece ===  'white-man' ? -8 : 8;
  if (state.board[index + offset].onePiece === null) {
    selectCell(state, index);
    state.board[index + offset].squareSituation = 'landing';
  }

  if (
    state.board[index + 1].onePiece === null
    && ![15, 23, 31, 39, 47, 55].includes(index)
  ) {
    selectCell(state, index);
    state.board[index + 1].squareSituation = 'landing';
  }

  if (
    state.board[index - 1].onePiece === null
    && ![8, 16, 24, 32, 40, 48].includes(index)
  ) {
    selectCell(state, index);
    state.board[index - 1].squareSituation = 'landing';
  }

}

function moveSelectedMan(state: State, index: number) {

    const selectedPieceIndex = state.selectedPieceIndex!;
    const offset = state.board[selectedPieceIndex].onePiece === 'white-man' ? -8 : 8;

    state.board[index].onePiece = state.board[selectedPieceIndex].onePiece;
    state.board[selectedPieceIndex].onePiece = null;

    state.board[selectedPieceIndex].squareSituation = null;
    state.board[selectedPieceIndex + offset].squareSituation = null;
    state.board[selectedPieceIndex + 1].squareSituation = null;
    state.board[selectedPieceIndex - 1].squareSituation = null;

    if (
      state.board[index].onePiece === 'white-man'
      && [0, 1, 2, 3, 4, 5, 6, 7].includes(index)
    ) state.board[index].onePiece = 'white-king';
    else if (
      state.board[index].onePiece === 'black-man' &&
      [56, 57, 58, 59, 60, 61, 62, 63].includes(index)
    ) state.board[index].onePiece = 'black-king';

    state.selectedPieceIndex = null;
    state.isWhiteTurn = !state.isWhiteTurn;
    updateLastNineMoves(state, index);
    analizeBoard(state);

}

function selectKing(state: State, index: number) {

  selectCell(state, index);

  for (let forward = 1; forward < 8; forward++) {
    const nextIndex = index - (forward * 8);
    const nextSquare = state.board[nextIndex];
    if (nextSquare?.onePiece === null) {
      state.movableSquaresOfKing.push({...nextSquare});
      state.board[nextIndex].squareSituation = 'landing';
    } else break;
  }

  for (let right = 1; right < 8; right++) {
    const nextIndex = index + right;
    if ([8, 16, 24, 32, 40, 48, 56].includes(nextIndex)) break;
    const nextSquare = state.board[nextIndex];
    if (nextSquare?.onePiece === null) {
      state.movableSquaresOfKing.push({...nextSquare});
      state.board[nextIndex].squareSituation = 'landing';
    } else break;
  }

  for (let backward = 1; backward < 8; backward++) {
    const nextIndex = index + (backward * 8);
    const nextSquare = state.board[nextIndex];
    if (nextSquare?.onePiece === null) {
      state.movableSquaresOfKing.push({...nextSquare});
      state.board[nextIndex].squareSituation = 'landing';
    } else break;
  }

  for (let left = 1; left < 8; left++) {
    const nextIndex = index - left;
    if ([7, 15, 23, 31, 39, 47, 55].includes(nextIndex)) break;
    const nextSquare = state.board[nextIndex];
    if (nextSquare?.onePiece === null) {
      state.movableSquaresOfKing.push({...nextSquare});
      state.board[nextIndex].squareSituation = 'landing';
    } else break;
  }

  if (state.movableSquaresOfKing.length === 0) {
    state.selectedPieceIndex = null;
    state.board[index].squareSituation = null;
  }

}

function moveSelectedKing(state: State, index: number) {

    const selectedPieceIndex = state.selectedPieceIndex!;

    state.board[index].onePiece = state.board[selectedPieceIndex].onePiece;
    state.board[selectedPieceIndex].onePiece = null;

    state.board[selectedPieceIndex].squareSituation = null;
    state.movableSquaresOfKing.forEach(cell => { state.board[cell.squareIndex].squareSituation = null });

    state.movableSquaresOfKing = [];
    state.selectedPieceIndex = null;
    state.isWhiteTurn = !state.isWhiteTurn;
    updateLastNineMoves(state, index);
    analizeBoard(state);

}

function updateLastNineMoves(state: State, index: number) {
  state.lastMove.endSquare = index;
  state.lastNineMoves.shift();
  state.lastNineMoves.push(state.lastMove);
}

// select and move functions - end

// select and move functions for forced moves - start

function generateCaptureMove({
  currentPiece,
  currentPieceIndex,
  opponentPieceIndex,
  landingSquareIndex,
  board,
  isWhiteTurn,
  lastKingMoveDirection,
}: GenerateCaptureMoveParams) {

  const nextBoard = board.map(cell => ({...cell}));

  nextBoard[currentPieceIndex].onePiece = null;
  nextBoard[opponentPieceIndex].onePiece = null;
  nextBoard[landingSquareIndex].onePiece = currentPiece;

  return {
    currentPiece,
    currentPieceIndex,
    opponentPieceIndex,
    landingSquareIndex,
    board: nextBoard,
    isWhiteTurn,
    lastKingMoveDirection,
  }

}

function computeCaptureMoves({
  board,
  isWhiteTurn,
  currentPieceIndex,
  lastKingMoveDirection,
}: ComputeCaptureMovesParams) {

  const captureMoves: CaptureMoves = [];

  const currentPiece = board[currentPieceIndex]?.onePiece;
  const isWhitePiece = currentPiece?.slice(0, 5) === 'white';

  if (currentPiece?.slice(-3) === 'man') {

    const offset = currentPiece === 'white-man' ? -8 : 8;
    const forwardOpponentPieceIndex = currentPieceIndex + offset;
    const forwardOpponentPieceSide = board[forwardOpponentPieceIndex]?.onePiece?.slice(0, 5);
    const forwardLandingSquareIndex = forwardOpponentPieceIndex + offset;
    if (board[forwardLandingSquareIndex]?.onePiece === null) {
      const forwardCaptureMoveParams = {
        currentPiece,
        currentPieceIndex,
        opponentPieceIndex: forwardOpponentPieceIndex,
        landingSquareIndex: forwardLandingSquareIndex,
        board,
        isWhiteTurn,
      }
      if (
        isWhiteTurn
        && isWhitePiece
        && forwardOpponentPieceSide === 'black'
      ) captureMoves.push(generateCaptureMove(forwardCaptureMoveParams));
      else if (
        !isWhiteTurn
        && !isWhitePiece
        && forwardOpponentPieceSide === 'white'
      ) captureMoves.push(generateCaptureMove(forwardCaptureMoveParams));
    }

    const rightOpponentPieceIndex = currentPieceIndex + 1;
    const rightOpponentPieceSide = board[rightOpponentPieceIndex]?.onePiece?.slice(0, 5);
    const rightLandingSquareIndex = rightOpponentPieceIndex + 1;
    if (
      board[rightLandingSquareIndex]?.onePiece === null &&
      ![14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55].includes(currentPieceIndex)
    ) {
      const rightCaptureMoveParams = {
        currentPiece,
        currentPieceIndex,
        opponentPieceIndex: rightOpponentPieceIndex,
        landingSquareIndex: rightLandingSquareIndex,
        board,
        isWhiteTurn,
      }
      if (
        isWhiteTurn
        && isWhitePiece
        && rightOpponentPieceSide === 'black'
      ) captureMoves.push(generateCaptureMove(rightCaptureMoveParams));
      else if (
        !isWhiteTurn
        && !isWhitePiece
        && rightOpponentPieceSide === 'white'
      ) captureMoves.push(generateCaptureMove(rightCaptureMoveParams));
    }

    const leftOpponentPieceIndex = currentPieceIndex - 1;
    const leftOpponentPieceSide = board[leftOpponentPieceIndex]?.onePiece?.slice(0, 5);
    const leftLandingSquareIndex = leftOpponentPieceIndex - 1;
    if (
      board[leftLandingSquareIndex]?.onePiece === null &&
      ![8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49].includes(currentPieceIndex)
    ) {
      const leftCaptureMoveParams = {
        currentPiece,
        currentPieceIndex,
        opponentPieceIndex: leftOpponentPieceIndex,
        landingSquareIndex: leftLandingSquareIndex,
        board,
        isWhiteTurn,
      }
      if (
        isWhiteTurn
        && isWhitePiece
        && leftOpponentPieceSide === 'black'
      ) captureMoves.push(generateCaptureMove(leftCaptureMoveParams));
      else if (
        !isWhiteTurn
        && !isWhitePiece
        && leftOpponentPieceSide === 'white'
      ) captureMoves.push(generateCaptureMove(leftCaptureMoveParams));
    }

  }

  if (currentPiece?.slice(-4) === 'king') {

    for (let forward = 1; forward < 7; forward++) {
      const opponentPieceIndex = currentPieceIndex - (forward * 8);
      const opponentPieceSide = board[opponentPieceIndex]?.onePiece?.slice(0, 5);
      if (opponentPieceSide) {
        for (let landing = 1; landing < 7; landing++) {
          const landingSquareIndex = opponentPieceIndex - (landing * 8);
          if (board[landingSquareIndex]?.onePiece === null) {
            const captureMoveParams = {
              currentPiece,
              currentPieceIndex,
              opponentPieceIndex,
              landingSquareIndex,
              board,
              isWhiteTurn,
              lastKingMoveDirection: 'forward',
            } satisfies GenerateCaptureMoveParams;
            if (
              isWhiteTurn
              && isWhitePiece
              && opponentPieceSide === 'black'
              && lastKingMoveDirection !== 'backward'
            ) captureMoves.push(generateCaptureMove(captureMoveParams));
            else if (
              !isWhiteTurn
              && !isWhitePiece
              && opponentPieceSide === 'white'
              && lastKingMoveDirection !== 'backward'
            ) captureMoves.push(generateCaptureMove(captureMoveParams));
          } else break;
        }
        break;
      }
    }

    for (let right = 1; right < 7; right++) {
      const opponentPieceIndex = currentPieceIndex + right;
      if([8, 16, 24, 32, 40, 48, 56].includes(opponentPieceIndex)) break;
      const opponentPieceSide = board[opponentPieceIndex]?.onePiece?.slice(0, 5);
      if (opponentPieceSide) {
        for (let landing = 1; landing < 7; landing++) {
          const landingSquareIndex = opponentPieceIndex + landing;
          if([8, 16, 24, 32, 40, 48, 56].includes(landingSquareIndex)) break;
          if (board[landingSquareIndex]?.onePiece === null) {
            const captureMoveParams = {
              currentPiece,
              currentPieceIndex,
              opponentPieceIndex,
              landingSquareIndex,
              board,
              isWhiteTurn,
              lastKingMoveDirection: 'right',
            } satisfies GenerateCaptureMoveParams;
            if (
              isWhiteTurn
              && isWhitePiece
              && opponentPieceSide === 'black'
              && lastKingMoveDirection !== 'left'
            ) captureMoves.push(generateCaptureMove(captureMoveParams));
            else if (
              !isWhiteTurn
              && !isWhitePiece
              && opponentPieceSide === 'white'
              && lastKingMoveDirection !== 'left'
            ) captureMoves.push(generateCaptureMove(captureMoveParams));
          } else break;
        }
        break;
      }
    }

    for (let backward = 1; backward < 7; backward++) {
      const opponentPieceIndex = currentPieceIndex + (backward * 8);
      const opponentPieceSide = board[opponentPieceIndex]?.onePiece?.slice(0, 5);
      if (opponentPieceSide) {
        for (let landing = 1; landing < 7; landing++) {
          const landingSquareIndex = opponentPieceIndex + (landing * 8);
          if (board[landingSquareIndex]?.onePiece === null) {
            const captureMoveParams = {
              currentPiece,
              currentPieceIndex,
              opponentPieceIndex,
              landingSquareIndex,
              board,
              isWhiteTurn,
              lastKingMoveDirection: 'backward',
            } satisfies GenerateCaptureMoveParams;
            if (
              isWhiteTurn
              && isWhitePiece
              && opponentPieceSide === 'black'
              && lastKingMoveDirection !== 'forward'
            ) captureMoves.push(generateCaptureMove(captureMoveParams));
            else if (
              !isWhiteTurn
              && !isWhitePiece
              && opponentPieceSide === 'white'
              && lastKingMoveDirection !== 'forward'
            ) captureMoves.push(generateCaptureMove(captureMoveParams));
          } else break;
        }
        break;
      }
    }

    for (let left = 1; left < 7; left++) {
      const opponentPieceIndex = currentPieceIndex - left;
      if([7, 15, 23, 31, 39, 47, 55].includes(opponentPieceIndex)) break;
      const opponentPieceSide = board[opponentPieceIndex]?.onePiece?.slice(0, 5);
      if (opponentPieceSide) {
        for (let landing = 1; landing < 7; landing++) {
          const landingSquareIndex = opponentPieceIndex - landing;
          if([7, 15, 23, 31, 39, 47, 55].includes(landingSquareIndex)) break;
          if (board[landingSquareIndex]?.onePiece === null) {
            const captureMoveParams = {
              currentPiece,
              currentPieceIndex,
              opponentPieceIndex,
              landingSquareIndex,
              board,
              isWhiteTurn,
              lastKingMoveDirection: 'left',
            } satisfies GenerateCaptureMoveParams;
            if (
              isWhiteTurn
              && isWhitePiece
              && opponentPieceSide === 'black'
              && lastKingMoveDirection !== 'right'
            ) captureMoves.push(generateCaptureMove(captureMoveParams));
            else if (
              !isWhiteTurn
              && !isWhitePiece
              && opponentPieceSide === 'white'
              && lastKingMoveDirection !== 'right'
            ) captureMoves.push(generateCaptureMove(captureMoveParams));
          } else break;
        }
        break;
      }
    }

  }

  return captureMoves;

}

// Depth First Search Algorithm
function computeCapturePaths(currentCaptureMove: CaptureMove | BoardAndTurn, currentCaptureMoves: CaptureMoves) {

  const nextCaptureMoves = (function() {

    if ('landingSquareIndex' in currentCaptureMove) { // if currentCaptureMove's type is CaptureMove
      return computeCaptureMoves({
        board: currentCaptureMove.board,
        isWhiteTurn: currentCaptureMove.isWhiteTurn,
        currentPieceIndex: currentCaptureMove.landingSquareIndex,
        lastKingMoveDirection: currentCaptureMove.lastKingMoveDirection,
      });
    } else {

      const allBoardInitialCaptureMoves = [];

      for (let currentIndex = 0; currentIndex < 64; currentIndex++) {
        allBoardInitialCaptureMoves.push(...computeCaptureMoves({
          board: currentCaptureMove.board,
          isWhiteTurn: currentCaptureMove.isWhiteTurn,
          currentPieceIndex: currentIndex,
        }));
      }

      return allBoardInitialCaptureMoves;

    };

  })();

  if (nextCaptureMoves.length === 0) return currentCaptureMoves.length > 0 ? [currentCaptureMoves] : [];

  const capturePaths: CapturePaths = [];

  for (const nextCaptureMove of nextCaptureMoves) {
    capturePaths.push(...computeCapturePaths(nextCaptureMove, [...currentCaptureMoves, nextCaptureMove]));
  }

  return capturePaths;

}

function analizeBoard(state: State) {

  const capturePaths = computeCapturePaths({ board: state.board, isWhiteTurn: state.isWhiteTurn }, []);

  // filter valid paths - start
  let maxCapturePathLength = 0;

  for (const capturePath of capturePaths) {

    if (capturePath.length > maxCapturePathLength) {
      maxCapturePathLength = capturePath.length;
      state.validPaths.length = 0;
    }

    if (capturePath.length === maxCapturePathLength) state.validPaths.push(capturePath);

  }
  // filter valid paths - end

  if (state.validPaths.length > 0) {

    // highlight squares of forced pieces - start
    for (const validPath of state.validPaths) {
      state.board[validPath[0].currentPieceIndex].squareSituation = 'forced-piece';
    }

    state.hasForcedMove = true;
    // highlight squares of forced pieces - end

  } else {

    let anyPieceCanMove = false;

    for (let index = 0; index < 64; index++) {
      if (state.isWhiteTurn && state.board[index].onePiece === 'white-man') {
        if (canPieceMove(state, index, true, false)) { anyPieceCanMove = true; break; }
      } else if (!state.isWhiteTurn && state.board[index].onePiece === 'black-man') {
        if (canPieceMove(state, index, false, true)) { anyPieceCanMove = true; break; }
      } else if (state.isWhiteTurn && state.board[index].onePiece === 'white-king') {
        if (canPieceMove(state, index, true, true)) { anyPieceCanMove = true; break; }
      } else if (!state.isWhiteTurn && state.board[index].onePiece === 'black-king') {
        if (canPieceMove(state, index, true, true)) { anyPieceCanMove = true; break; }
      }

    }

    if (!anyPieceCanMove) state.noPieceCanMove = true;

  }

}

function canPieceMove(state: State, index: number, forward: boolean, backward: boolean) {

  if (
    forward &&
    state.board[index -  8]?.onePiece === null
  ) return true;

  if (
    state.board[index + 1]?.onePiece === null &&
    ![7, 15, 23, 31, 39, 47, 55].includes(index)
  ) return true;

  if (
    backward &&
    state.board[index + 8]?.onePiece === null
  ) return true;

  if (
    state.board[index - 1]?.onePiece === null &&
    ![8, 16, 24, 32, 40, 48, 56].includes(index)
  ) return true;

  return false;

}

function selectCaptureMove(state: State, index: number, hasSelectedPiece: boolean) {
  state.selectedPieceIndex = index;
  if (!hasSelectedPiece) state.lastMove.startSquare = index;
  for (let i = state.validPaths.length - 1; i >= 0; i--) {
    if (index === state.validPaths[i][0].currentPieceIndex) {
      state.board[state.validPaths[i][0].currentPieceIndex].squareSituation = 'selected-piece';
      state.board[state.validPaths[i][0].opponentPieceIndex].squareSituation = 'capturable-piece';
      state.board[state.validPaths[i][0].landingSquareIndex].squareSituation = 'landing';
    } else {
      if (!hasSelectedPiece) state.board[state.validPaths[i][0].currentPieceIndex].squareSituation = null;
      state.validPaths.splice(i, 1);
    }
  }
}

function selectCapturingPiece(state: State, index: number) { selectCaptureMove(state, index, false) }

function capturePiece(state: State, index: number) {

  state.selectedPieceIndex = index;

  for (const validPath of state.validPaths) {
    if (index === validPath[0].landingSquareIndex) {
      state.board[validPath[0].currentPieceIndex].onePiece = null;
      state.board[validPath[0].opponentPieceIndex].onePiece = null;
      state.board[validPath[0].landingSquareIndex].onePiece = validPath[0].currentPiece;
      state.board[validPath[0].currentPieceIndex].squareSituation = null;
      state.board[validPath[0].opponentPieceIndex].squareSituation = null;
    }
    else {
      state.board[validPath[0].opponentPieceIndex].squareSituation = null;
      state.board[validPath[0].landingSquareIndex].squareSituation = null;
    }
    validPath.splice(0, 1);
  }

  if (state.board[index].onePiece!.slice(0, 5) === 'white') {
    state.capturedBlackPieceCount++;
  } else state.capturedWhitePieceCount++;

  if (state.validPaths[0].length > 0) selectCaptureMove(state, index, true);
  else {

    if (
      state.board[index].onePiece === 'white-man'
      && [0, 1, 2, 3, 4, 5, 6, 7].includes(index)
    ) state.board[index].onePiece = 'white-king';
    else if (
      state.board[index].onePiece === 'black-man' &&
      [56, 57, 58, 59, 60, 61, 62, 63].includes(index)
    ) state.board[index].onePiece = 'black-king';

    state.board[index].squareSituation = null;
    state.selectedPieceIndex = null;
    state.validPaths = [];
    state.hasForcedMove = false;
    state.isWhiteTurn = !state.isWhiteTurn;
    updateLastNineMoves(state, index);
    analizeBoard(state);

  }

}

// select and move functions for forced moves - end

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    selectPiece: (state, action: PayloadAction<{ cell: Cell; isWhiteSideBoard: boolean; }>) => {
      const cell = action.payload.cell;
      const index = cell.squareIndex;
      if (state.selectedPieceIndex === null && state.isWhiteTurn && action.payload.isWhiteSideBoard) {
        if (state.hasForcedMove) { if (cell.squareSituation === 'forced-piece') selectCapturingPiece(state, index) }
        else {
          if (cell.onePiece === 'white-man') selectMan(state, index);
          else if (cell.onePiece === 'white-king') selectKing(state, index);
        }
      } else if (state.selectedPieceIndex === null && !state.isWhiteTurn && !action.payload.isWhiteSideBoard) {
        if (state.hasForcedMove) { if (cell.squareSituation === 'forced-piece') selectCapturingPiece(state, index) }
        else {
          if (cell.onePiece === 'black-man') selectMan(state, index);
          else if (cell.onePiece === 'black-king') selectKing(state, index);
        }
      }
    },
    moveSelectedPiece: (state, action: PayloadAction<{ cell: Cell; isWhiteSideBoard: boolean; }>) => {
      const cell = action.payload.cell;
      const index = cell.squareIndex;
      if (state.selectedPieceIndex !== null && cell.squareSituation === 'landing') {
        const selectedPiece = state.board[state.selectedPieceIndex].onePiece;
        if (state.isWhiteTurn && action.payload.isWhiteSideBoard) {
          if (state.hasForcedMove) capturePiece(state, index);
          else {
            if (selectedPiece === 'white-man') moveSelectedMan(state, index);
            else if (selectedPiece === 'white-king') moveSelectedKing(state, index);
          }
        } else if (!state.isWhiteTurn && !action.payload.isWhiteSideBoard) {
          if (state.hasForcedMove) capturePiece(state, index);
          else {
            if (selectedPiece === 'black-man') moveSelectedMan(state, index);
            else if (selectedPiece === 'black-king') moveSelectedKing(state, index);
          }
        }
      }
    },
    resetGame: () => initialState,
  },
});

export const { selectPiece, moveSelectedPiece, resetGame } = gameSlice.actions;

export const selectSquare = (index: number) => ( (state: RootState) => state.game.board[index] );
export const selectIsWhiteTurn = (state: RootState) => state.game.isWhiteTurn;
export const selectCapturedWhitePieceCount = (state: RootState) => state.game.capturedWhitePieceCount;
export const selectCapturedBlackPieceCount = (state: RootState) => state.game.capturedBlackPieceCount;
export const selectSelectedPieceIndex = (state: RootState) => state.game.selectedPieceIndex;
export const selectHasForcedMove = (state: RootState) => state.game.hasForcedMove;
export const selectLastNineMoves = (state: RootState) => state.game.lastNineMoves;
export const selectNoPieceCanMove = (state: RootState) => state.game.noPieceCanMove;

export default gameSlice.reducer;
