import { GenericState } from "..";

export interface BitcoinHashRate {
  x: number;
  y: number;
  bitcoinPrice: number;
}

export interface BitcoinHashRateRootObject {
  status: string;
  name: string;
  unit: string;
  period: string;
  description: string;
  values: BitcoinHashRate[];
}

export interface BitcoinHashRateState extends GenericState<BitcoinHashRate[]> {
  today: BitcoinHashRate | null;
  showBitcoinCorrelation: boolean;
}
