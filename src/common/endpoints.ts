import { AvailableDayRanges, AvailableIntervals } from "../models";

const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY

export const coinGecko = {
  coins:
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
  coinMarketChart: (coinId: string, days: AvailableDayRanges, interval: AvailableIntervals) =>
    `/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`,
  trending: `/search/trending`,
  global: `/global`
};

export const etherscan = {
  gasOracle:
    `/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`
}

export const alternativeMe = {
  fearGreedIndex: (days: AvailableDayRanges) =>
    `/fng/?limit=${days}`
}

export const blockchain = {

}
