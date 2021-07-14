import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toCamelCase } from '../common/helpers';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import { Exchange, GenericState } from '../models';

const initialState: GenericState<Exchange[]> = {
  value: [],
  status: 'IDLE',
};

export const fetchExchangeList = createAsyncThunk('exchangeList', async () => {
  const canceler = axios.CancelToken.source();

  const response = await http.request({
    ...config('coinGecko'),
    url: API.exchanges,
    cancelToken: canceler.token
  });

  const normalizedResponse = toCamelCase(response.data);

  return normalizedResponse as Exchange[]
});

export const selectExchangeList: (state: RootState) => GenericState<Exchange[]> =
  (state: RootState) => state.exchangeList;

const exchangeListSlice: Slice<GenericState<Exchange[]>, {}, 'exchangeList'> = createSlice({
  name: 'exchangeList',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeList.pending, (state, action) => {
      })
      .addCase(fetchExchangeList.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchExchangeList.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export default exchangeListSlice.reducer;
