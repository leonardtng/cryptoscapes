import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import coinsReducer from '../features/coinsSlice';
import coinMarketChartListReducer from '../features/coinMarketChartListSlice';
import dominanceChartListReducer from '../features/dominanceChartList';
import gasOracleReducer from '../features/gasOracleSlice';
import trendingCoinsReducer from '../features/trendingCoinsSlice';
import globalCoinDataReducer from '../features/globalCoinDataSlice';
import fearGreedIndexReducer from '../features/fearGreedIndexSlice';

import appState from '../features/appStateSlice';

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    coinMarketChartList: coinMarketChartListReducer,
    dominanceChartList: dominanceChartListReducer,
    gasOracle: gasOracleReducer,
    trendingCoins: trendingCoinsReducer,
    globalCoinData: globalCoinDataReducer,
    fearGreedIndex: fearGreedIndexReducer,
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
