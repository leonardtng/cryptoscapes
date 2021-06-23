import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toCamelCase } from '../common/helpers/caseTransformer';
import { RootState } from '../app/store';
import { alternativeMe as API } from '../common/endpoints';
import { API_CONFIG as config } from '../common/constants';
import { GenericState, FearGreedIndex, FearGreedIndexRootObject } from '../models';

const initialState: GenericState<FearGreedIndex[]> = {
  value: [],
  status: 'IDLE',
};

export const fetchFearGreedIndex = createAsyncThunk('fearGreedIndex', async () => {
  const canceler = axios.CancelToken.source();

  const response = await axios.request({
    ...config('alternative.me'),
    url: API.fearGreedIndex(7),
    cancelToken: canceler.token
  });

  const normalizedResponse = toCamelCase(response.data) as FearGreedIndexRootObject;

  return normalizedResponse.data as FearGreedIndex[]
});

export const selectFearGreedIndex: (state: RootState) => GenericState<FearGreedIndex[]>
 = (state: RootState) => state.fearGreedIndex;

const fearGreedIndexSlice: Slice<GenericState<FearGreedIndex[]>, {}, 'fearGreedIndex'> = createSlice({
  name: 'fearGreedIndex',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFearGreedIndex.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchFearGreedIndex.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchFearGreedIndex.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export default fearGreedIndexSlice.reducer;
