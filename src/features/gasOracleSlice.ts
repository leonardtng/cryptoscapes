import { createAction, createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import axios from 'axios';
import { toCamelCase } from '../common/helpers/caseTransformer';
import { RootState } from '../app/store';
import { etherscan as API } from '../common/endpoints';
import { API_CONFIG as config } from '../common/constants';
import { GasOracle, GasOracleRootObject, GasOracleState } from '../models';

interface Reducers extends SliceCaseReducers<GasOracleState> {
  setSelectedGasFee: (state: GasOracleState, action: PayloadAction<string>) => void;
  setGasLimit: (state: GasOracleState, action: PayloadAction<number>) => void;
}

const initialState: GasOracleState = {
  value: {
    lastBlock: '',
    safeGasPrice: '',
    proposeGasPrice: '',
    fastGasPrice: ''
  },
  status: 'IDLE',
  selectedGasFee: null,
  gasLimit: 21000
};

export const fetchGasOracle = createAsyncThunk('gasOracle', async () => {
  const canceler = axios.CancelToken.source();

  const response = await axios.request({
    ...config('etherscan'),
    url: API.gasOracle,
    cancelToken: canceler.token
  });

  const normalizedResponse = toCamelCase(response.data) as GasOracleRootObject;

  return normalizedResponse.result as GasOracle
});

export const selectGasOracle: (state: RootState) => GasOracleState = (state: RootState) => state.gasOracle;

const gasOracleSlice: Slice<GasOracleState, Reducers, 'gasOracle'> = createSlice({
    name: 'gasOracle',
    initialState,
    reducers: {
      setSelectedGasFee: (state: GasOracleState, action: PayloadAction<string>) => {
        state.selectedGasFee = action.payload;
      },
      setGasLimit: (state: GasOracleState, action: PayloadAction<number>) => {
        state.gasLimit = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchGasOracle.pending, (state) => {
          state.status = 'LOADING';
        })
        .addCase(fetchGasOracle.fulfilled, (state, action) => {
          state.status = 'IDLE';
          state.value = action.payload;

          const getSelectedGasFee = createAction<string>('gasOracle/getSelectedGasFee');

          gasOracleSlice.caseReducers.setSelectedGasFee(
            state,
            getSelectedGasFee(action.payload.proposeGasPrice)
          );
        })
        .addCase(fetchGasOracle.rejected, (state, action) => {
          state.status = 'FAILED';
          state.error = action.error.message;
        })
    },
  });

export const { setSelectedGasFee, setGasLimit } = gasOracleSlice.actions;

export default gasOracleSlice.reducer;
