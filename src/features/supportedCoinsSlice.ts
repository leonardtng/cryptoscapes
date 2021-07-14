import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios from 'axios';
import { cacheWithExpiry, retrieveCache, toCamelCase } from '../common/helpers';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import { GenericState, SupportedCoin } from '../models';

const initialState: GenericState<SupportedCoin[]> = {
  value: [],
  status: 'IDLE',
};

export const fetchSupportedCoins = createAsyncThunk('supportedCoins', async () => {
  const canceler = axios.CancelToken.source();

  const cachedData: SupportedCoin[] | null = retrieveCache('supportedCoins');

  if (cachedData) {
    return cachedData as SupportedCoin[];
  } else {
    const response = await http.request({
      ...config('coinGecko'),
      url: API.supportedCoins,
      cancelToken: canceler.token
    });

    const normalizedResponse = toCamelCase(response.data);
    cacheWithExpiry('supportedCoins', normalizedResponse, 8.64e+7);  // Cache Period: 1 day

    return normalizedResponse as SupportedCoin[]
  }
});

export const selectSupportedCoins: (state: RootState) => GenericState<SupportedCoin[]>
  = (state: RootState) => state.supportedCoins;

const supportedCoinsSlice: Slice<GenericState<SupportedCoin[]>, {}, 'supportedCoins'> = createSlice({
  name: 'supportedCoins',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupportedCoins.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchSupportedCoins.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchSupportedCoins.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export default supportedCoinsSlice.reducer;
