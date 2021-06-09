import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import coinsReducer from '../features/coinsSlice';
import coinMarketChartListReducer from '../features/coinMarketChartList';
import dominanceChartListReducer from '../features/dominanceChartList';
import gasOracleReducer from '../features/gasOracleSlice';
import appState from '../features/appStateSlice';

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    coinMarketChartList: coinMarketChartListReducer,
    dominanceChartList: dominanceChartListReducer,
    gasOracle: gasOracleReducer,
    appState: appState
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
