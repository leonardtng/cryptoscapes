import { createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import axios from 'axios';
import { toCamelCase } from '../common/helpers';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import { StatusUpdate, StatusUpdateListState, StatusUpdateQueryParams, StatusUpdateRootObject, } from '../models';

interface Reducers extends SliceCaseReducers<StatusUpdateListState> {
  setStatusUpdateQueryParams: (state: StatusUpdateListState, action: PayloadAction<StatusUpdateQueryParams>) => void;
  clearStatusUpdateListValue: (state: StatusUpdateListState) => void;
}

const initialState: StatusUpdateListState = {
  value: [],
  status: 'IDLE',
  statusUpdateQueryParams: {
    page: 1,
    perPage: 50,
    category: 'general'
  },
  hasMore: true
};

interface Params {
  statusUpdateQueryParams: StatusUpdateQueryParams;
  append: boolean;
}

export const fetchStatusUpdateList = createAsyncThunk('statusUpdateList', async (params: Params) => {
  const canceler = axios.CancelToken.source();

  const response = await http.request({
    ...config('coinGecko'),
    url: API.statusUpdates(
      params.statusUpdateQueryParams.page,
      params.statusUpdateQueryParams.perPage,
      params.statusUpdateQueryParams.category
    ),
    cancelToken: canceler.token
  });

  const normalizedResponse = toCamelCase(response.data) as StatusUpdateRootObject;

  return { data: normalizedResponse.statusUpdates, append: params.append } as { data: StatusUpdate[], append: boolean }
});

export const selectStatusUpdateList: (state: RootState) => StatusUpdateListState
  = (state: RootState) => state.statusUpdateList;

const statusUpdateListSlice: Slice<StatusUpdateListState, Reducers, 'statusUpdateList'> = createSlice({
  name: 'statusUpdateList',
  initialState,
  reducers: {
    setStatusUpdateQueryParams: (state: StatusUpdateListState, action: PayloadAction<StatusUpdateQueryParams>) => {
      state.statusUpdateQueryParams = action.payload;
    },
    clearStatusUpdateListValue: (state: StatusUpdateListState) => {
      state.value = state.value.slice(0, state.statusUpdateQueryParams.perPage);
      state.statusUpdateQueryParams.page = 1;
      state.hasMore = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatusUpdateList.pending, (state, action) => {
        state.status = action.meta.arg.append ? 'LOADING MORE' : 'LOADING';
      })
      .addCase(fetchStatusUpdateList.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload.append ? [...state.value, ...action.payload.data] : action.payload.data;
        action.payload.data.length === 0 ? state.hasMore = false : state.hasMore = true;
      })
      .addCase(fetchStatusUpdateList.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export const { setStatusUpdateQueryParams, clearStatusUpdateListValue } = statusUpdateListSlice.actions;

export default statusUpdateListSlice.reducer;
