import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import { CoinDetails, CoinDetailsState } from '../models';
import { toCamelCase } from '../common/helpers';

const initialState: CoinDetailsState = {
  value: null,
  status: 'IDLE',
};

export const fetchCoinDetails = createAsyncThunk('coinDetails', async (coinId: string) => {
  const canceler = axios.CancelToken.source();

  const response = await http.request({
    ...config('coinGecko'),
    url: API.coinDetails(coinId),
    cancelToken: canceler.token
  });

  const normalizedResponse = toCamelCase(response.data);

  return normalizedResponse as CoinDetails
});

export const selectCoinDetails: (state: RootState) => CoinDetailsState = (state: RootState) => state.coinDetails;

const coinDetailsSlice: Slice<CoinDetailsState, {}, 'coinDetails'> = createSlice({
  name: 'coinDetails',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinDetails.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchCoinDetails.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchCoinDetails.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export default coinDetailsSlice.reducer;
