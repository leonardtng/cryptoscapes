import { GenericState as GenericStateInterface } from './common/GenericState';
import { Coin as CoinInterface } from './api/Coin';
import {
  CoinMarketChart as CoinMarketChartInterface,
  CoinMarketChartList as CoinMarketChartListInterface
} from './api/CoinMarketChart';

export type GenericState<T> = GenericStateInterface<T>;
export type Coin = CoinInterface;
export type CoinMarketChart = CoinMarketChartInterface;
export type CoinMarketChartList = CoinMarketChartListInterface;
