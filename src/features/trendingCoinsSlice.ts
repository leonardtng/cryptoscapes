import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toCamelCase } from '../common/helpers/caseTransformer';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import { GenericState, TrendingRootObject, TrendingCoin, TrendingCoinItem } from '../models';
import { cacheWithExpiry, retrieveCache } from '../common/helpers/cacheStorageHandler';

const initialState: GenericState<TrendingCoin[]> = {
  value: [],
  status: 'IDLE'
};

export const fetchTrendingCoins = createAsyncThunk('trendingCoins', async () => {
  const canceler = axios.CancelToken.source();

  const cachedData: TrendingRootObject | null = retrieveCache('trendingCoins');

  if (cachedData) {
    return cachedData.coins.map((trendingCoinItem: TrendingCoinItem) => trendingCoinItem.item) as TrendingCoin[];
  } else {

    const response = await http.request({
      ...config('coinGecko'),
      url: API.trending,
      cancelToken: canceler.token
    });

    const normalizedResponse = toCamelCase(response.data) as TrendingRootObject;
    cacheWithExpiry('trendingCoins', normalizedResponse, 1200000);  // Cache Period: 20 minutes

    return normalizedResponse.coins.map((trendingCoinItem: TrendingCoinItem) => trendingCoinItem.item) as TrendingCoin[]
  }
});

export const selectTrendingCoins: (state: RootState) => GenericState<TrendingCoin[]>
  = (state: RootState) => state.trendingCoins;

const trendingCoinsSlice: Slice<GenericState<TrendingCoin[]>, {}, 'trendingCoins'> = createSlice({
  name: 'trendingCoins',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingCoins.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchTrendingCoins.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchTrendingCoins.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export default trendingCoinsSlice.reducer;