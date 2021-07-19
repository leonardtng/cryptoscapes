import { createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import axios from 'axios';
import { cacheWithExpiry, retrieveCache, roundDecimals, toCamelCase } from '../common/helpers';
import { RootState } from '../app/store';
import { gasNow as API } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import { GasOracle, GasOracleRootObject, GasOracleState } from '../models';

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
      ...config('gasNow'),
      url: API.gasOracle,
      cancelToken: canceler.token
    });

    const normalizedResponse = toCamelCase(response.data) as GasOracleRootObject;

    normalizedResponse.data.slow = roundDecimals(normalizedResponse.data.slow / 10e8, 0);
    normalizedResponse.data.standard = roundDecimals(normalizedResponse.data.standard / 10e8, 0);
    normalizedResponse.data.fast = roundDecimals(normalizedResponse.data.fast / 10e8, 0);
    normalizedResponse.data.rapid = roundDecimals(normalizedResponse.data.rapid / 10e8, 0);

    cacheWithExpiry('gasOracle', normalizedResponse.data, 900000); // Cache Period: 15 minutes

    return normalizedResponse.data as GasOracle
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
