import { AppState as AppStateInterface } from './globals/AppState';
import { 
  Status as StatusInterface,
  GenericState as GenericStateInterface
 } from './common/GenericState';
import {
  Subpage as SubpageInterface,
  Page as PageInterface,
  RootModule as RootModuleInterface
} from './common/RootModule';
import { 
  CoinSortingKey as CoinSortingKeyInterface,
  CoinSortOrder as CoinSortingOrderInterface,
  CoinSparkline as CoinSparklineInterface,
  CoinQueryParams as CoinQueryParamsInterface,
  Coin as CoinInterface,
  CoinListState as CoinListStateInterface
 } from './api/Coin';
import {
  CoinCategory as CoinCategoryInterface
} from './api/CoinCategory';
import {
  AvailableDayRanges as AvailableDayRangesInterface,
  AvailableIntervals as AvailableIntervalsInterface,
  CoinMarketChart as CoinMarketChartInterface,
  CoinMarketChartList as CoinMarketChartListInterface,
  DominanceChartList as DominanceChartListInterface,
  CoinMarketChartListState as CoinMarketChartListStateInterface,
  CoinDetailsMarketChartState as CoinDetailsMarketChartStateInterface
} from './api/CoinMarketChart';
import {
  CoinDetails as CoinDetailsInterface,
  CoinDetailsState as CoinDetailsStateInterface
} from './api/CoinDetails';
import {
  SupportedCoin as SupportedCoinInterface
} from './api/SupportedCoin';
import {
  GasOracle as GasOracleInterface,
  GasOracleRootObject as GasOracleRootObjectInterface,
  GasOracleState as GasOracleStateInterface
} from './api/GasOracle';
import {
  TrendingCoin as TrendingCoinInterface,
  TrendingCoinItem as TrendingCoinItemInterface,
  TrendingRootObject as TrendingRootObjectInterface
} from './api/TrendingCoin';
import {
  TotalMarketCap as TotalMarketCapInterface,
  TotalVolume as TotalVolumeInterface,
  MarketCapPercentage as MarketCapPercentageInterface,
  GlobalCoinData as GlobalCoinDataInterface,
  GlobalCoinDataRootObject as GlobalCoinDataRootObjectInterface
} from './api/GlobalCoinData';
import {
  Exchange as ExchangeInterface,
  ExchangeQueryParams as ExchangeQueryParamsInterface,
  ExchangeListState as ExchangeListStateInterface
} from './api/Exchange';
import {
  SupportedExchange as SupportedExchangeInterface
} from './api/SupportedExchange';
import {
  FearGreedIndex as FearGreedIndexInterface,
  FearGreedIndexMetadata as FearGreedIndexMetadataInterface,
  FearGreedIndexRootObject as FearGreedIndexRootObjectInterface,
  FearGreedIndexState as FearGreedIndexStateInterface
} from './api/FearGreedIndex';
import {
  BitcoinHashRate as BitcoinHashRateInterface,
  BitcoinHashRateRootObject as BitcoinHashRateRootObjectInterface,
  BitcoinHashRateState as BitcoinHashRateStateInterface
} from './api/BitcoinHashRate';
import {
  CoinDetailsTabValues as CoinDetailsTabValuesInterface
} from './UI/TabValues';
import {
  CoinListTableHeadCell as CoinListTableHeadCellInterface
} from './UI/HeadCells';

export type AppState = AppStateInterface;
export type Status = StatusInterface;
export type GenericState<T> = GenericStateInterface<T>;
export type Subpage = SubpageInterface;
export type Page = PageInterface;
export type RootModule = RootModuleInterface;
export type CoinSortingKey = CoinSortingKeyInterface;
export type CoinSortingOrder = CoinSortingOrderInterface;
export type CoinSparkline = CoinSparklineInterface;
export type CoinQueryParams = CoinQueryParamsInterface;
export type Coin = CoinInterface;
export type CoinListState = CoinListStateInterface;
export type AvailableDayRanges = AvailableDayRangesInterface;
export type AvailableIntervals = AvailableIntervalsInterface;
export type CoinCategory = CoinCategoryInterface;
export type CoinMarketChart = CoinMarketChartInterface;
export type CoinMarketChartList = CoinMarketChartListInterface;
export type DominanceChartList = DominanceChartListInterface;
export type CoinMarketChartListState = CoinMarketChartListStateInterface;
export type CoinDetailsMarketChartState = CoinDetailsMarketChartStateInterface;
export type CoinDetails = CoinDetailsInterface;
export type CoinDetailsState = CoinDetailsStateInterface;
export type SupportedCoin = SupportedCoinInterface;
export type GasOracle = GasOracleInterface;
export type GasOracleState = GasOracleStateInterface;
export type GasOracleRootObject = GasOracleRootObjectInterface;
export type TrendingCoin = TrendingCoinInterface;
export type TrendingCoinItem = TrendingCoinItemInterface;
export type TrendingRootObject = TrendingRootObjectInterface;
export type TotalMarketCap = TotalMarketCapInterface;
export type TotalVolume = TotalVolumeInterface;
export type MarketCapPercentage = MarketCapPercentageInterface;
export type GlobalCoinData = GlobalCoinDataInterface;
export type GlobalCoinDataRootObject = GlobalCoinDataRootObjectInterface;
export type ExchangeQueryParams = ExchangeQueryParamsInterface;
export type Exchange = ExchangeInterface;
export type ExchangeListState = ExchangeListStateInterface;
export type SupportedExchange = SupportedExchangeInterface;
export type FearGreedIndex = FearGreedIndexInterface;
export type FearGreedIndexMetadata = FearGreedIndexMetadataInterface;
export type FearGreedIndexRootObject = FearGreedIndexRootObjectInterface;
export type FearGreedIndexState = FearGreedIndexStateInterface;
export type BitcoinHashRate = BitcoinHashRateInterface;
export type BitcoinHashRateRootObject = BitcoinHashRateRootObjectInterface;
export type BitcoinHashRateState = BitcoinHashRateStateInterface;
export type CoinDetailsTabValues = CoinDetailsTabValuesInterface;
export type CoinListTableHeadCell = CoinListTableHeadCellInterface;
