import { GenericState } from "..";

export interface GasOracle {
  lastBlock: string;
  safeGasPrice: string;
  proposeGasPrice: string;
  fastGasPrice: string;
}

export interface GasOracleState extends GenericState<GasOracle> {
  selectedGasFee: string | null;
  gasLimit: number;
}
