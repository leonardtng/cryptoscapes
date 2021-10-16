import { createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import { ethGasStation as API } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import { GasOracle, GasOracleState } from '../models';
import { cacheWithExpiry, retrieveCache, roundDecimals, toCamelCase } from '../common/helpers';

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

  const cachedData: GasOracle | null = retrieveCache('gasOracle');

  if (cachedData) {
    return cachedData as GasOracle;
  } else {

    const response = await http.request({
      ...config('ethGasStation'),
      url: API.gasOracle,
      cancelToken: canceler.token
    });

    const normalizedResponse = toCamelCase(response.data) as GasOracle;

    normalizedResponse.safeLow = roundDecimals(normalizedResponse.safeLow / 10, 0);
    normalizedResponse.average = roundDecimals(normalizedResponse.average / 10, 0);
    normalizedResponse.fast = roundDecimals(normalizedResponse.fast / 10, 0);
    normalizedResponse.fastest = roundDecimals(normalizedResponse.fastest / 10, 0);

    cacheWithExpiry('gasOracle', normalizedResponse, 300000); // Cache Period: 5 minutes

    return normalizedResponse
  }
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
        state.selectedGasFee = action.payload.average;
      })
      .addCase(fetchGasOracle.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export const { setSelectedGasFee, setGasLimit } = gasOracleSlice.actions;

export default gasOracleSlice.reducer;
