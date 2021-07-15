import rateLimit from 'axios-rate-limit';
import axios, { AxiosRequestConfig } from 'axios';

// Metered APIs: coinGecko, blockchain.com
export const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 1500 });

export const API_CONFIG:
  (server: 'coinGecko' | 'etherscan' | 'alternative.me' | 'blockchain.com') => AxiosRequestConfig =
  (server: 'coinGecko' | 'etherscan' | 'alternative.me' | 'blockchain.com') => {
    switch (server) {
      case 'coinGecko':
        return {
          baseURL: 'https://api.coingecko.com/api/v3',
          responseType: 'json',
          method: 'GET',
          headers: {
            'X-XSS-Protection': '1; mode=block',
            'X-Frame-Options': 'DENY',
            'X-Content-Type-Options': 'nosniff',
            'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
          }
        }
      case 'etherscan':
        return {
          baseURL: 'https://api.etherscan.io',
          responseType: 'json',
          method: 'GET'
        }
      case 'alternative.me':
        return {
          baseURL: ' https://api.alternative.me',
          responseType: 'json',
          method: 'GET'
        }
      case 'blockchain.com':
        return {
          baseURL: 'https://api.blockchain.info',
          responseType: 'json',
          method: 'GET'
        }
    }
  };
