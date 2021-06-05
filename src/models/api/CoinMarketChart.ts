export interface CoinMarketChart {
  marketCaps: [number, number][];
  prices: [number, number][];
  totalVolumes: [number, number][];
}

export interface CoinMarketChartList {
  [key: string]: CoinMarketChart;
}