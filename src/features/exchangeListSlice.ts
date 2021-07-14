import { createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import axios from 'axios';
import { toCamelCase } from '../common/helpers';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import { Exchange, ExchangeListState, ExchangeQueryParams } from '../models';

interface Reducers extends SliceCaseReducers<ExchangeListState> {
  setExchangeQueryParams: (state: ExchangeListState, action: PayloadAction<ExchangeQueryParams>) => void;
}

const initialState: ExchangeListState = {
  value: [],
  status: 'IDLE',
  exchangeQueryParams: {
    page: 1,
    perPage: 52
  },
  hasMore: true
};

interface Params {
  exchangeQueryParams: ExchangeQueryParams;
  append: boolean;
}

export const fetchExchangeList = createAsyncThunk('exchangeList', async (params: Params) => {
  const canceler = axios.CancelToken.source();

  const response = await http.request({
    ...config('coinGecko'),
    url: API.exchanges(params.exchangeQueryParams.page, params.exchangeQueryParams.perPage),
    cancelToken: canceler.token
  });

  const normalizedResponse = toCamelCase(response.data);

  return { data: normalizedResponse, append: params.append } as { data: Exchange[], append: boolean }
});

export const selectExchangeList: (state: RootState) => ExchangeListState = (state: RootState) => state.exchangeList;

const exchangeListSlice: Slice<ExchangeListState, Reducers, 'exchangeList'> = createSlice({
  name: 'exchangeList',
  initialState,
  reducers: {
    setExchangeQueryParams: (state: ExchangeListState, action: PayloadAction<ExchangeQueryParams>) => {
      state.exchangeQueryParams = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeList.pending, (state, action) => {
        state.status = action.meta.arg.append ? 'LOADING MORE' : 'LOADING';
      })
      .addCase(fetchExchangeList.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload.append ? [...state.value, ...action.payload.data] : action.payload.data;
        action.payload.data.length === 0 ? state.hasMore = false : state.hasMore = true;
      })
      .addCase(fetchExchangeList.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export const { setExchangeQueryParams } = exchangeListSlice.actions;

export default exchangeListSlice.reducer;
