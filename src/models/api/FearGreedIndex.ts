import { GenericState } from "..";

export interface FearGreedIndex {
  value: string;
  valueClassification: string;
  timestamp: string;
  timeUntilUpdate: string;
  bitcoinPrice: number;
}

export interface FearGreedIndexMetadata {
  error?: any;
}

export interface FearGreedIndexRootObject {
  name: string;
  data: FearGreedIndex[];
  metadata: FearGreedIndexMetadata;
}

export interface FearGreedIndexState extends GenericState<FearGreedIndex[]> {
  today: FearGreedIndex | null;
  showBitcoinCorrelation: boolean;
}