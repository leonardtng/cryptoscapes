import { createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import { blockchainCom as API, coinGecko as coinAPI } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import { BitcoinHashRate, BitcoinHashRateRootObject, BitcoinHashRateState, CoinMarketChart } from '../models';
import { cacheWithExpiry, retrieveCache, toCamelCase } from '../common/helpers';

interface Reducers extends SliceCaseReducers<BitcoinHashRateState> {
  setShowBitcoinCorrelation: (state: BitcoinHashRateState, action: PayloadAction<boolean>) => void;
}

const initialState: BitcoinHashRateState = {
  value: [],
  today: null,
  showBitcoinCorrelation: false,
  status: 'IDLE'
};

export const fetchBitcoinHashRate = createAsyncThunk('bitcoinHashRate', async () => {
  const canceler = axios.CancelToken.source();

  const cachedData: BitcoinHashRate[] | null = retrieveCache('bitcoinHashRate');

  if (cachedData) {
    return cachedData as BitcoinHashRate[];
  } else {
    const response = await http.request({
      ...config('blockchain.com'),
      url: API.bitcoinHashRate,
      cancelToken: canceler.token
    });

    const bitcoinMarketChart = await http.request({
      ...config('coinGecko'),
      url: coinAPI.coinMarketChart('bitcoin', 365, 'daily'),
      cancelToken: canceler.token
    });

    const normalizedResponse = toCamelCase(response.data) as BitcoinHashRateRootObject;
    
    const normalizedBitcoinMarketChart = toCamelCase(bitcoinMarketChart.data) as CoinMarketChart;
    normalizedResponse.values.forEach((hashRateData: BitcoinHashRate, index: number) => {
      hashRateData.bitcoinPrice = normalizedBitcoinMarketChart.prices[index][1];
    });

    cacheWithExpiry('bitcoinHashRate', normalizedResponse.values, 3600000);  // Cache Period: 1 hour

    return normalizedResponse.values as BitcoinHashRate[]
  }
});

export const selectBitcoinHashRate: (state: RootState) => BitcoinHashRateState
  = (state: RootState) => state.bitcoinHashRate;

const bitcoinHashRateSlice: Slice<BitcoinHashRateState, Reducers, 'bitcoinHashRate'> = createSlice({
  name: 'bitcoinHashRate',
  initialState,
  reducers: {
    setShowBitcoinCorrelation: (state: BitcoinHashRateState, action: PayloadAction<boolean>) => {
      state.showBitcoinCorrelation = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBitcoinHashRate.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchBitcoinHashRate.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
        state.today = action.payload[action.payload.length - 1];
      })
      .addCase(fetchBitcoinHashRate.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export const { setShowBitcoinCorrelation } = bitcoinHashRateSlice.actions;

export default bitcoinHashRateSlice.reducer;
