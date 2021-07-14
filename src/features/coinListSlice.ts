import { createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import axios from 'axios';
import { cacheWithExpiry, retrieveCache, toCamelCase } from '../common/helpers';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import { Coin, CoinListState, CoinQueryParams } from '../models';

interface Reducers extends SliceCaseReducers<CoinListState> {
  setCoinQueryParams: (state: CoinListState, action: PayloadAction<CoinQueryParams>) => void;
  addCoinListTableColumn: (state: CoinListState, action: PayloadAction<keyof Coin>) => void;
  removeCoinListTableColumn: (state: CoinListState, action: PayloadAction<keyof Coin>) => void;
  clearCoinListValue: (state: CoinListState) => void;
}

const initialState: CoinListState = {
  value: [],
  status: 'IDLE',
  coinQueryParams: {
    sortingKey: 'market_cap',
    sortingOrder: 'desc',
    page: 1,
    perPage: 30,
    category: ''
  },
  coinListTableColumns: retrieveCache('coinListTableColumns') || [
    'priceChangePercentage24HInCurrency',
    'priceChangePercentage7DInCurrency',
    'marketCap',
    'totalVolume',
    'circulatingSupply',
    'sparklineIn7D'
  ],
  hasMore: true
};

interface Params {
  coinQueryParams: CoinQueryParams;
  append: boolean;
}

export const fetchCoinList = createAsyncThunk('coinList', async (params: Params) => {
  const canceler = axios.CancelToken.source();

  const response = await http.request({
    ...config('coinGecko'),
    url: API.coins(
      params.coinQueryParams.sortingKey,
      params.coinQueryParams.sortingOrder,
      params.coinQueryParams.page,
      params.coinQueryParams.perPage,
      true,
      params.coinQueryParams.category
    ),
    cancelToken: canceler.token
  });

  const normalizedResponse = toCamelCase(response.data);

  return { data: normalizedResponse, append: params.append } as { data: Coin[], append: boolean }
});

export const selectCoinList: (state: RootState) => CoinListState = (state: RootState) => state.coinList;

const coinListSlice: Slice<CoinListState, Reducers, 'coinList'> = createSlice({
  name: 'coinList',
  initialState,
  reducers: {
    setCoinQueryParams: (state: CoinListState, action: PayloadAction<CoinQueryParams>) => {
      state.coinQueryParams = action.payload;
    },
    addCoinListTableColumn: (state: CoinListState, action: PayloadAction<keyof Coin>) => {
      state.coinListTableColumns.push(action.payload);
      cacheWithExpiry('coinListTableColumns', state.coinListTableColumns, 10e+11)
    },
    removeCoinListTableColumn: (state: CoinListState, action: PayloadAction<keyof Coin>) => {
      state.coinListTableColumns = state.coinListTableColumns.filter((item: keyof Coin) => {
        return item !== action.payload
      })
      cacheWithExpiry('coinListTableColumns', state.coinListTableColumns, 10e+11)
    },
    clearCoinListValue: (state: CoinListState) => {
      state.value = state.value.slice(0, state.coinQueryParams.perPage);
      state.coinQueryParams.page = 1;
      state.hasMore = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinList.pending, (state, action) => {
        state.status = action.meta.arg.append ? 'LOADING MORE' : 'LOADING';
      })
      .addCase(fetchCoinList.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload.append ? [...state.value, ...action.payload.data] : action.payload.data;
        action.payload.data.length === 0 ? state.hasMore = false : state.hasMore = true;
      })
      .addCase(fetchCoinList.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export const { 
  setCoinQueryParams, 
  addCoinListTableColumn, 
  removeCoinListTableColumn, 
  clearCoinListValue 
} = coinListSlice.actions;

export default coinListSlice.reducer;
