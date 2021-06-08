import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toCamelCase } from '../common/helpers/caseTransformer';
import { RootState } from '../app/store';
import { etherscan as API } from '../common/endpoints';
import { API_CONFIG as config } from '../common/constants';
import { GenericState } from '../models';
import { GasOracle } from '../models/api/GasOracle';

const initialState: GenericState<GasOracle> = {
  value: {
    lastBlock: '',
    safeGasPrice: '',
    proposeGasPrice: '',
    fastGasPrice: ''
  },
  status: 'IDLE',

};

export const fetchGasOracle = createAsyncThunk('gasOracle', async () => {
  const canceler = axios.CancelToken.source();

  const response = await axios.request({
    ...config('etherscan'),
    url: API.gasOracle,
    cancelToken: canceler.token
  });

  const normalizedResponse = toCamelCase(response.data.result);

  return normalizedResponse as GasOracle
});

export const selectGasOracle: (state: RootState) => GenericState<GasOracle> = (state: RootState) => state.gasOracle;

const gasOracleSlice: Slice<GenericState<GasOracle>, {}, 'gasOracle'> = createSlice({
  name: 'gasOracle',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGasOracle.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchGasOracle.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchGasOracle.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message
      })
  },
});

export default gasOracleSlice.reducer;
