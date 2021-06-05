import { AxiosRequestConfig } from 'axios';

export const API_CONFIG: AxiosRequestConfig = {
  baseURL: 'https://api.coingecko.com/api/v3',
  responseType: 'json',
  method: 'GET',
  headers: {
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  },
}
