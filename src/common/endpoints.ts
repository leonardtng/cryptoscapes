import { AvailableDayRanges, AvailableIntervals, CoinSortingKey, CoinSortingOrder } from "../models";

const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY;

export const coinGecko = {
  coins: (sortingKey: CoinSortingKey, sortingOrder: CoinSortingOrder, page: number, perPage: number, sparkline: boolean) =>
    `/coins/markets?vs_currency=usd&order=${sortingKey}_${sortingOrder}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=24h,7d`,
  coinMarketChart: (coinId: string, days: AvailableDayRanges, interval: AvailableIntervals) =>
    `/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`,
  trending:
    `/search/trending`,
  global:
    `/global`,
  supportedCoins: 
    `/coins/list`
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
