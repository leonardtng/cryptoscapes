export interface TrendingCoin {
  id: string;
  coinId: number;
  name: string;
  symbol: string;
  marketCapRank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  priceBtc: number;
  score: number;
}

export interface TrendingCoinItem {
  item: TrendingCoin
}

export interface TrendingRootObject {
  coins: TrendingCoinItem[];
  exchanges: unknown;
}