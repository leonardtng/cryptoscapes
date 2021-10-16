import { GenericState } from "..";

export interface GasOracle {
  blockNum: number;
  safeLow: number;
  average: number;
  fast: number;
  fastest: number;
}

export interface GasOracleState extends GenericState<GasOracle | null> {
  selectedGasFee: number | null;
  gasLimit: number;
}
