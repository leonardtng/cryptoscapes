import {
  AvailableDayRanges,
  AvailableIntervals,
  CoinSortingKey,
  CoinSortingOrder,
  ExchangeVolumeChartDayRanges
} from "../models";

const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY;

export const coinGecko = {
  coins: (sortingKey: CoinSortingKey, sortingOrder: CoinSortingOrder, page: number, perPage: number, sparkline: boolean, category: string) =>
    `/coins/markets?vs_currency=usd&order=${sortingKey}_${sortingOrder}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=24h,7d${category ? `&category=${category}` : ''}`,
  coinMarketChart: (coinId: string, days: AvailableDayRanges, interval: AvailableIntervals) =>
    `/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`,
  trending:
    `/search/trending`,
  global:
    `/global`,
  coinDetails: (coinId: string) =>
    `/coins/${coinId}`,
  supportedCoins:
    `/coins/list`,
  categories:
    `/coins/categories/list`,
  exchanges: (page: number, perPage: number) =>
    `/exchanges?per_page=${perPage}&page=${page}`,
  exchangeVolumeChart: (exchangeId: string, days: ExchangeVolumeChartDayRanges) =>
    `/exchanges/${exchangeId}/volume_chart?days=${days}`,
  companies: (coinId: 'bitcoin' | 'ethereum') =>
    `/companies/public_treasury/${coinId}`
};

export const etherscan = {
  gasOracle:
    `/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`
};

export const alternativeMe = {
  fearGreedIndex: (days: AvailableDayRanges) =>
    `/fng/?limit=${days}`
};

export const blockchainCom = {
  bitcoinHashRate:
    `/charts/hash-rate?daysAverageString=7D&timespan=1year&sampled=true&metadata=false&cors=true&format=json`
};
