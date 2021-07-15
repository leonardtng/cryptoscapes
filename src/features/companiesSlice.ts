import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import { CompanyFullData, CompanyRootObject, GenericState } from '../models';
import { cacheWithExpiry, retrieveCache, toCamelCase } from '../common/helpers';

const initialState: GenericState<CompanyFullData | null> = {
  value: null,
  status: 'IDLE'
};

export const fetchCompanies = createAsyncThunk('companies', async () => {
  const canceler = axios.CancelToken.source();

  const cachedData: CompanyFullData | null = retrieveCache('companies');

  if (cachedData) {
    return cachedData as CompanyFullData;
  } else {
    const responseBitcoin = await http.request({
      ...config('coinGecko'),
      url: API.companies('bitcoin'),
      cancelToken: canceler.token
    });

    const responseEthereum = await http.request({
      ...config('coinGecko'),
      url: API.companies('ethereum'),
      cancelToken: canceler.token
    });

    const normalizedResponse = {
      bitcoin: toCamelCase(responseBitcoin.data) as CompanyRootObject,
      ethereum: toCamelCase(responseEthereum.data) as CompanyRootObject
    };

    cacheWithExpiry('companies', normalizedResponse, 8.64e+7);  // Cache Period: 1 day

    return normalizedResponse as CompanyFullData
  }
});

export const selectCompanies: (state: RootState) => GenericState<CompanyFullData | null>
  = (state: RootState) => state.companies;

const companiesSlice: Slice<GenericState<CompanyFullData | null>, {}, 'companies'> = createSlice({
  name: 'companies',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export default companiesSlice.reducer;
