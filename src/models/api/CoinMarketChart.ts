export type AvailableDayRanges = 1 | 14 | 30 | 'max'

export interface CoinMarketChart {
  marketCaps: [number, number][];
  prices: [number, number][];
  totalVolumes: [number, number][];
}

export type CoinMarketChartList = {
  [key in AvailableDayRanges]: {
    [key: string]: CoinMarketChart;
  };
}

export interface DominanceChartList {
  [key: string]: CoinMarketChart;
}