import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import coinsReducer from '../features/coinsSlice';
import coinListReducer from '../features/coinListSlice';
import coinCategoriesReducer from '../features/coinCategoriesSlice';
import coinMarketChartListReducer from '../features/coinMarketChartListSlice';
import coinDetailsReducer from '../features/coinDetailsSlice';
import coinDetailsMarketChartReducer from '../features/coinDetailsMarketChartSlice';
import supportedCoinsReducer from '../features/supportedCoinsSlice';
import dominanceChartListReducer from '../features/dominanceChartList';
import gasOracleReducer from '../features/gasOracleSlice';
import trendingCoinsReducer from '../features/trendingCoinsSlice';
import globalCoinDataReducer from '../features/globalCoinDataSlice';
import exchangeListReducer from '../features/exchangeListSlice';
import exchangeVolumeChartReducer from '../features/exchangeVolumeChartSlice';
import companiesReducer from '../features/companiesSlice';
import fearGreedIndexReducer from '../features/fearGreedIndexSlice';
import bitcoinHashRateReducer from '../features/bitcoinHashRateSlice';
import statusUpdateListReducer from '../features/statusUpdateListSlice';
import appState from '../features/appStateSlice';

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    coinList: coinListReducer,
    coinCategories: coinCategoriesReducer,
    coinMarketChartList: coinMarketChartListReducer,
    coinDetails: coinDetailsReducer,
    coinDetailsMarketChart: coinDetailsMarketChartReducer, 
    supportedCoins: supportedCoinsReducer,
    dominanceChartList: dominanceChartListReducer,
    gasOracle: gasOracleReducer,
    trendingCoins: trendingCoinsReducer,
    globalCoinData: globalCoinDataReducer,
    exchangeList: exchangeListReducer,
    exchangeVolumeChart: exchangeVolumeChartReducer,
    companies: companiesReducer,
    fearGreedIndex: fearGreedIndexReducer,
    bitcoinHashRate: bitcoinHashRateReducer,
    statusUpdateList: statusUpdateListReducer,
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
