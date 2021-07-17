import { createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import axios from 'axios';
import { toCamelCase } from '../common/helpers';
import { RootState } from '../app/store';
import { etherchain as API } from '../common/endpoints';
import { API_CONFIG as config } from '../common/constants';
import { GasOracle, GasOracleState } from '../models';

interface Reducers extends SliceCaseReducers<GasOracleState> {
  setSelectedGasFee: (state: GasOracleState, action: PayloadAction<number>) => void;
  setGasLimit: (state: GasOracleState, action: PayloadAction<number>) => void;
}

const initialState: GasOracleState = {
  value: null,
  status: 'IDLE',
  selectedGasFee: null,
  gasLimit: 21000
};

export const fetchGasOracle = createAsyncThunk('gasOracle', async () => {
  const canceler = axios.CancelToken.source();

  const response = await axios.request({
    ...config('etherchain'),
    url: API.gasOracle,
    cancelToken: canceler.token
  });

  const normalizedResponse = toCamelCase(response.data);

  return normalizedResponse as GasOracle
});

export const selectGasOracle: (state: RootState) => GasOracleState = (state: RootState) => state.gasOracle;

const gasOracleSlice: Slice<GasOracleState, Reducers, 'gasOracle'> = createSlice({
    name: 'gasOracle',
    initialState,
    reducers: {
      setSelectedGasFee: (state: GasOracleState, action: PayloadAction<number>) => {
        state.selectedGasFee = action.payload;
      },
      setGasLimit: (state: GasOracleState, action: PayloadAction<number>) => {
        state.gasLimit = action.payload;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchGasOracle.pending, (state) => {
          state.status = 'LOADING';
        })
        .addCase(fetchGasOracle.fulfilled, (state, action) => {
          state.status = 'IDLE';
          state.value = action.payload;
          state.selectedGasFee = action.payload.standard;
        })
        .addCase(fetchGasOracle.rejected, (state, action) => {
          state.status = 'FAILED';
          state.error = action.error.message;
        })
    },
  });

export const { setSelectedGasFee, setGasLimit } = gasOracleSlice.actions;

export default gasOracleSlice.reducer;
