import { createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import axios from 'axios';
import { toCamelCase } from '../common/helpers';
import { RootState } from '../app/store';
import { alternativeMe as API, coinGecko as coinAPI } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import {
  AvailableDayRanges,
  CoinMarketChart,
  FearGreedIndex,
  FearGreedIndexRootObject,
  FearGreedIndexState
} from '../models';

interface Reducers extends SliceCaseReducers<FearGreedIndexState> {
  setShowBitcoinCorrelation: (state: FearGreedIndexState, action: PayloadAction<boolean>) => void;
}

const initialState: FearGreedIndexState = {
  value: [],
  today: null,
  showBitcoinCorrelation: false,
  status: 'IDLE',
};

export const fetchFearGreedIndex = createAsyncThunk('fearGreedIndex', async () => {
  const canceler = axios.CancelToken.source();

  const dayRange: AvailableDayRanges = 30

  const response = await http.request({
    ...config('alternative.me'),
    url: API.fearGreedIndex(dayRange),
    cancelToken: canceler.token
  });

  const bitcoinMarketChart = await http.request({
    ...config('coinGecko'),
    url: coinAPI.coinMarketChart('bitcoin', dayRange, 'daily'),
    cancelToken: canceler.token
  });

  const normalizedResponse = toCamelCase(response.data) as FearGreedIndexRootObject;
  // Sort here since endpoint returns data in date descending order, which does NOT work for the charts
  normalizedResponse.data.sort((a: FearGreedIndex, b: FearGreedIndex) => Number(a.timestamp) - Number(b.timestamp));

  const normalizedBitcoinMarketChart = toCamelCase(bitcoinMarketChart.data) as CoinMarketChart;
  normalizedResponse.data.forEach((indexData: FearGreedIndex, index: number) => {
    indexData.bitcoinPrice = normalizedBitcoinMarketChart.prices[index][1];
  });

  return normalizedResponse.data as FearGreedIndex[]
});

export const selectFearGreedIndex: (state: RootState) => FearGreedIndexState
  = (state: RootState) => state.fearGreedIndex;

const fearGreedIndexSlice: Slice<FearGreedIndexState, Reducers, 'fearGreedIndex'> = createSlice({
  name: 'fearGreedIndex',
  initialState,
  reducers: {
    setShowBitcoinCorrelation: (state: FearGreedIndexState, action: PayloadAction<boolean>) => {
      state.showBitcoinCorrelation = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFearGreedIndex.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchFearGreedIndex.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
        state.today = action.payload[action.payload.length - 1];
      })
      .addCase(fetchFearGreedIndex.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export const { setShowBitcoinCorrelation } = fearGreedIndexSlice.actions;

export default fearGreedIndexSlice.reducer;
