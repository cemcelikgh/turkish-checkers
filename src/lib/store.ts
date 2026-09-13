import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './features/game-slice/gameSlice';
import controlsReducer from './features/controlsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      game: gameReducer,
      controls: controlsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
