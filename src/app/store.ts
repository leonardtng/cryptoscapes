import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import coinMarketChartListReducer from '../features/coinMarketChartList';
import coinsReducer from '../features/coinsSlice';
import themeReducer from '../features/themeSlice';

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    coinMarketChartList: coinMarketChartListReducer,
    theme: themeReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
