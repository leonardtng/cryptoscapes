import { GenericState } from "..";

export interface GasOracle {
  safeLow: number;
  standard: number;
  fast: number;
  fastest: number;
}

export interface GasOracleState extends GenericState<GasOracle | null> {
  selectedGasFee: number | null;
  gasLimit: number;
}
