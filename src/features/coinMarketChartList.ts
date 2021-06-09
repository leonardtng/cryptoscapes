import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toCamelCase } from '../common/helpers/caseTransformer';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config } from '../common/constants';
import { CoinMarketChartList, GenericState } from '../models';

const initialState: GenericState<CoinMarketChartList> = {
  value: {},
  status: 'IDLE',
  param: 'key'
};

export const fetchCoinMarketChartList = createAsyncThunk('coinMarketChartList', async (coinIdList: string[]) => {
  const canceler = axios.CancelToken.source();

  const normalizedResponse = {} as any;

  for (var i = 0; i < coinIdList.length; i++) {
    const response = await axios.request({
      ...config('coinGecko'),
      url: API.coinMarketChart(coinIdList[i], 1),
      cancelToken: canceler.token
    });

    normalizedResponse[coinIdList[i]] = toCamelCase(response.data)
  }

  return normalizedResponse as CoinMarketChartList
});

export const selectCoinMarketChartList: (state: RootState) => GenericState<CoinMarketChartList>
  = (state: RootState) => state.coinMarketChartList;

const coinMarketChartListSlice: Slice<GenericState<CoinMarketChartList>, {}, 'coinMarketChartList'> = createSlice({
  name: 'coinMarketChartList',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinMarketChartList.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchCoinMarketChartList.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchCoinMarketChartList.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export default coinMarketChartListSlice.reducer
