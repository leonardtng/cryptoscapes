import { createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import { ExchangeVolumeChartDayRanges, ExchangeVolumeChartState } from '../models';
import { toCamelCase } from '../common/helpers';

interface Reducers extends SliceCaseReducers<ExchangeVolumeChartState> {
  setSelectedDayRange: (state: ExchangeVolumeChartState, action: PayloadAction<ExchangeVolumeChartDayRanges>) => void;
}

const initialState: ExchangeVolumeChartState = {
  value: [],
  status: 'IDLE',
  selectedDayRange: 1
};

interface Params {
  exchangeId: string;
  dayRange: ExchangeVolumeChartDayRanges;
}

export const fetchExchangeVolumeChart = createAsyncThunk('exchangeVolumeChart', async (params: Params) => {
  const canceler = axios.CancelToken.source();

  const response = await http.request({
    ...config('coinGecko'),
    url: API.exchangeVolumeChart(params.exchangeId, params.dayRange),
    cancelToken: canceler.token
  });

  const normalizedResponse = toCamelCase(response.data);

  return normalizedResponse as [number, number][]
});

export const selectExchangeVolumeChart: (state: RootState) => ExchangeVolumeChartState
  = (state: RootState) => state.exchangeVolumeChart;

const exchangeVolumeChartSlice: Slice<ExchangeVolumeChartState, Reducers, 'exchangeVolumeChart'> = createSlice({
  name: 'exchangeVolumeChart',
  initialState,
  reducers: {
    setSelectedDayRange: (state: ExchangeVolumeChartState, action: PayloadAction<ExchangeVolumeChartDayRanges>) => {
      state.selectedDayRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeVolumeChart.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchExchangeVolumeChart.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchExchangeVolumeChart.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export const { setSelectedDayRange } = exchangeVolumeChartSlice.actions;

export default exchangeVolumeChartSlice.reducer;
