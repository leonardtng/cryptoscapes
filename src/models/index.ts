import { AppState as AppStateInterface } from './globals/AppState';
import { GenericState as GenericStateInterface } from './common/GenericState';
import { Coin as CoinInterface } from './api/Coin';
import {
  CoinMarketChart as CoinMarketChartInterface,
  CoinMarketChartList as CoinMarketChartListInterface
} from './api/CoinMarketChart';
import {
  TrendingCoin as TrendingCoinInterface,
  TrendingCoinItem as TrendingCoinItemInterface,
  Trending as TrendingInterface
} from './api/TrendingCoin';

export type AppState = AppStateInterface;
export type GenericState<T> = GenericStateInterface<T>;
export type Coin = CoinInterface;
export type CoinMarketChart = CoinMarketChartInterface;
export type CoinMarketChartList = CoinMarketChartListInterface;
export type TrendingCoin = TrendingCoinInterface;
export type TrendingCoinItem = TrendingCoinItemInterface;
export type Trending = TrendingInterface;
