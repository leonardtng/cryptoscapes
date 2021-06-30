import { GenericState } from "..";

export type CoinSortingKey = 'market_cap' | 'volume'

export type CoinSortOrder = 'asc' | 'desc'

export interface CoinQueryParams {
  sortingKey: CoinSortingKey,
  sortingOrder: CoinSortOrder,
  page: number;
  perPage: number;
}

export interface CoinSparkline {
  price: number[];
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  fullyDilutedValuation: number;
  totalVolume: number;
  high24h: number;
  low24h: number;
  priceChange24H: number;
  priceChangePercentage24H: number;
  marketCapChange24H: number;
  marketCapChangePercentage24H: number;
  circulatingSupply: number;
  totalSupply: number | null;
  maxSupply: number | null;
  ath: number;
  athChangePercentage: number;
  athDate: Date;
  atl: number;
  atlChangePercentage: number;
  atlDate: Date;
  roi?: any;
  lastUpdated: Date;
  sparklineIn7D?: CoinSparkline;
  priceChangePercentage24HInCurrency: number;
  priceChangePercentage7DInCurrency: number;
}

export interface CoinListState extends GenericState<Coin[]> {
  coinQueryParams: CoinQueryParams;
}