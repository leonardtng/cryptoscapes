import { createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import axios from 'axios';
import { toCamelCase } from '../common/helpers/caseTransformer';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import { AvailableDayRanges, CoinMarketChart, CoinMarketChartList, CoinMarketChartListState } from '../models';
import { cacheWithExpiry, retrieveCache } from '../common/helpers/cacheStorageHandler';

interface Reducers extends SliceCaseReducers<CoinMarketChartListState> {
  setSelectedDayRange: (state: CoinMarketChartListState, action: PayloadAction<AvailableDayRanges>) => void;
  setSelectedDataType: (state: CoinMarketChartListState, action: PayloadAction<keyof CoinMarketChart>) => void;
}

const initialState: CoinMarketChartListState = {
  value: {
    1: {},
    7: {},
    30: {},
    90: {},
    365: {},
    730: {},
    'max': {}
  },
  selectedDayRange: 30,
  selectedDataType: 'prices',
  status: 'IDLE'
};

interface Params {
  coinIdList: string[];
  dayRange: AvailableDayRanges;
}

export const fetchCoinMarketChartList = createAsyncThunk(
  'coinMarketChartList',
  async (params: Params, { getState }
  ) => {
    const canceler = axios.CancelToken.source();
    const state = getState() as RootState;

    const cachedData: CoinMarketChartList | null = retrieveCache(`coinMarketChartList-dayRange${params.dayRange}`);

    if (cachedData) {
      return {
        ...state.coinMarketChartList.value,
        [params.dayRange]: cachedData
      } as CoinMarketChartList;
    } else {

      const normalizedResponse = {} as any;

      for (var i = 0; i < params.coinIdList.length; i++) {
        const response = await http.request({
          ...config('coinGecko'),
          url: API.coinMarketChart(params.coinIdList[i], params.dayRange, params.dayRange <= 30 ? 'hourly' : 'daily'),
          cancelToken: canceler.token
        });

        normalizedResponse[params.coinIdList[i]] = toCamelCase(response.data);
      }

      cacheWithExpiry(
        `coinMarketChartList-dayRange${params.dayRange}`,
        normalizedResponse,
        params.dayRange === 1 ? 3600000 : 8.64e+7 // Cache Period: 1 hour or 1 day
      );

      return {
        ...state.coinMarketChartList.value,
        [params.dayRange]: normalizedResponse
      } as CoinMarketChartList
    }
  });

export const selectCoinMarketChartList: (state: RootState) => CoinMarketChartListState
  = (state: RootState) => state.coinMarketChartList;

const coinMarketChartListSlice: Slice<CoinMarketChartListState, Reducers, 'coinMarketChartList'> = createSlice({
  name: 'coinMarketChartList',
  initialState,
  reducers: {
    setSelectedDayRange: (state: CoinMarketChartListState, action: PayloadAction<AvailableDayRanges>) => {
      state.selectedDayRange = action.payload;
    },
    setSelectedDataType: (state: CoinMarketChartListState, action: PayloadAction<keyof CoinMarketChart>) => {
      state.selectedDataType = action.payload;
    }
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

export const { setSelectedDayRange, setSelectedDataType } = coinMarketChartListSlice.actions;

export default coinMarketChartListSlice.reducer
