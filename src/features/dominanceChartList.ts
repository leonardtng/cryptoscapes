import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import { DominanceChartList, GenericState } from '../models';
import { cacheWithExpiry, retrieveCache, toCamelCase } from '../common/helpers';

const initialState: GenericState<DominanceChartList> = {
  value: {},
  status: 'IDLE',
  param: 'key'
};

export const fetchDominanceChartList = createAsyncThunk('dominanceChartList', async (coinIdList: string[]) => {
  const canceler = axios.CancelToken.source();

  const cachedData: DominanceChartList | null = retrieveCache('dominanceChart');

  if (cachedData) {
    return cachedData as DominanceChartList;
  } else {

    const normalizedResponse = {} as any;

    for (var i = 0; i < coinIdList.length; i++) {
      const response = await http.request({
        ...config('coinGecko'),
        url: API.coinMarketChart(coinIdList[i], 90, 'daily'),
        cancelToken: canceler.token
      });

      normalizedResponse[coinIdList[i]] = toCamelCase(response.data);
    }

    cacheWithExpiry('dominanceChart', normalizedResponse, 900000); // Cache Period: 15 minutes

    return normalizedResponse as DominanceChartList
  }
});

export const selectDominanceChartList: (state: RootState) => GenericState<DominanceChartList>
  = (state: RootState) => state.dominanceChartList;

const dominanceChartListSlice: Slice<GenericState<DominanceChartList>, {}, 'dominanceChartList'> = createSlice({
  name: 'dominanceChartList',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDominanceChartList.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchDominanceChartList.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchDominanceChartList.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export default dominanceChartListSlice.reducer
