import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toCamelCase } from '../common/helpers/caseTransformer';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config } from '../common/constants';
import { GenericState, Coin } from '../models';

const initialState: GenericState<Coin[]> = {
  value: [],
  status: 'IDLE',

};

export const fetchCoins = createAsyncThunk('coins', async () => {
  const canceler = axios.CancelToken.source();

  const response = await axios.request({
    ...config('coinGecko'),
    url: API.coins,
    cancelToken: canceler.token
  });

  const normalizedResponse = toCamelCase(response.data);

  return normalizedResponse as Coin[]
});

export const selectCoins: (state: RootState) => GenericState<Coin[]> = (state: RootState) => state.coins;

const coinsSlice: Slice<GenericState<Coin[]>, {}, 'coins'> = createSlice({
  name: 'coins',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export default coinsSlice.reducer;
