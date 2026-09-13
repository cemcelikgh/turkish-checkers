import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type IsRightModal = null | true | false;

interface ControlsState {
  hasDrawOffer: boolean;
  isRightModal: IsRightModal;
  isDrawGame: boolean;
  showResetGameConfirm: boolean;
}

const initialState: ControlsState = {
  hasDrawOffer: false,
  isRightModal: null,
  isDrawGame: false,
  showResetGameConfirm: false,
}

export const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    setHasDrawOffer: (state, action: PayloadAction<boolean>) => {
      state.hasDrawOffer = action.payload;
    },
    setIsRightModal: (state, action: PayloadAction<IsRightModal>) => {
      state.isRightModal = action.payload;
    },
    setIsDrawGame: (state, action: PayloadAction<boolean>) => {
      state.isDrawGame = action.payload;
    },
    setShowNewGameConfirm: (state, action: PayloadAction<boolean>) => {
      state.showResetGameConfirm = action.payload;
    },
    resetControlsState: () => initialState,
  },
});

export const { setHasDrawOffer, setIsRightModal, setIsDrawGame, setShowNewGameConfirm, resetControlsState } = controlsSlice.actions;
export const selectHasDrawOffer = (state: RootState) => state.controls.hasDrawOffer;
export const selectIsRightModal = (state: RootState) => state.controls.isRightModal;
export const selectIsDrawGame = (state: RootState) => state.controls.isDrawGame;
export const selectShowResetGameConfirm = (state:RootState) => state.controls.showResetGameConfirm;
export default controlsSlice.reducer;
