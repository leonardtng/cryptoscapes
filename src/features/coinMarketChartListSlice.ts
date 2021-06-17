import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toCamelCase } from '../common/helpers/caseTransformer';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config } from '../common/constants';
import { AvailableDayRanges, CoinMarketChartList, GenericState } from '../models';
import { cacheWithExpiry, retrieveCache } from '../common/helpers/cacheStorageHandler';

const initialState: GenericState<CoinMarketChartList> = {
  value: {
    1: {},
    14: {},
    30: {},
    'max': {}
  },
  status: 'IDLE',
  param: 'key'
};

interface Params {
  coinIdList: string[];
  dayRange: AvailableDayRanges;
}

export const fetchCoinMarketChartList = createAsyncThunk('coinMarketChartList', async (params: Params, thunk) => {
  const canceler = axios.CancelToken.source();
  const state: any = thunk.getState();

  const cachedData: CoinMarketChartList | null = retrieveCache(`coinMarketChartList-dayRange${params.dayRange}`);

  if (cachedData) {
    return {
      ...state.coinMarketChartList.value,
      [params.dayRange]: cachedData
    } as CoinMarketChartList;
  } else {

    const normalizedResponse = {} as any;

    for (var i = 0; i < params.coinIdList.length; i++) {
      const response = await axios.request({
        ...config('coinGecko'),
        url: API.coinMarketChart(params.coinIdList[i], params.dayRange),
        cancelToken: canceler.token
      });

      normalizedResponse[params.coinIdList[i]] = toCamelCase(response.data);
    }

    cacheWithExpiry(
      `coinMarketChartList-dayRange${params.dayRange}`,
      normalizedResponse,
      params.dayRange > 1 ? 8.64e+7 : 3600000 // Cache Period: 1 day or 1 hour
    );

    return {
      ...state.coinMarketChartList.value,
      [params.dayRange]: normalizedResponse
    } as CoinMarketChartList
  }
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
