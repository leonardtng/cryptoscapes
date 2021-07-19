import { GenericState } from "..";

export interface GasOracle {
  timestamp: number;
  slow: number;
  standard: number;
  fast: number;
  rapid: number;
}

export interface GasOracleRootObject {
  code: number;
  data: GasOracle
}

export interface GasOracleState extends GenericState<GasOracle | null> {
  selectedGasFee: number | null;
  gasLimit: number;
}
