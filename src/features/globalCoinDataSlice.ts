import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toCamelCase } from '../common/helpers/caseTransformer';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config } from '../common/constants';
import { GenericState, GlobalCoinData, GlobalCoinDataRootObject } from '../models';


const initialState: GenericState<GlobalCoinData | null> = {
  value: null,
  status: 'IDLE'
};

export const fetchGlobalCoinData = createAsyncThunk('globalCoinData', async () => {
  const canceler = axios.CancelToken.source();

  const response = await axios.request({
    ...config('coinGecko'),
    url: API.global,
    cancelToken: canceler.token
  });

  const normalizedResponse = toCamelCase(response.data) as GlobalCoinDataRootObject;

  return normalizedResponse.data
});

export const selectGlobalCoinData: (state: RootState) => GenericState<GlobalCoinData | null>
  = (state: RootState) => state.globalCoinData;

const globalCoinDataSlice: Slice<GenericState<GlobalCoinData | null>, {}, 'globalCoinData'> = createSlice({
  name: 'globalCoinData',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalCoinData.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchGlobalCoinData.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchGlobalCoinData.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export default globalCoinDataSlice.reducer;