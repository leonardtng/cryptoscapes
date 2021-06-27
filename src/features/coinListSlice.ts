import { createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import axios from 'axios';
import { toCamelCase } from '../common/helpers/caseTransformer';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import { Coin, CoinListState, CoinQueryParams } from '../models';

interface Reducers extends SliceCaseReducers<CoinListState> {
  setCoinQueryParams: (state: CoinListState, action: PayloadAction<CoinQueryParams>) => void;
}

const initialState: CoinListState = {
  value: [],
  status: 'IDLE',
  coinQueryParams: {
    sortingKey: 'market_cap',
    sortingOrder: 'desc',
    page: 1,
    perPage: 30
  }
};

export const fetchCoinList = createAsyncThunk('coinList', async (coinQueryParams: CoinQueryParams) => {
  const canceler = axios.CancelToken.source();

  const response = await http.request({
    ...config('coinGecko'),
    url: API.coins(
      coinQueryParams.sortingKey,
      coinQueryParams.sortingOrder,
      coinQueryParams.page,
      coinQueryParams.perPage,
      true
    ),
    cancelToken: canceler.token
  });

  const normalizedResponse = toCamelCase(response.data);

  return normalizedResponse as Coin[]
});

export const selectCoinList: (state: RootState) => CoinListState = (state: RootState) => state.coinList;

const coinListSlice: Slice<CoinListState, Reducers, 'coinList'> = createSlice({
  name: 'coinList',
  initialState,
  reducers: {
    setCoinQueryParams: (state: CoinListState, action: PayloadAction<CoinQueryParams>) => {
      state.coinQueryParams = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinList.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchCoinList.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchCoinList.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export const { setCoinQueryParams } = coinListSlice.actions;

export default coinListSlice.reducer;
