export interface GasOracle {
  lastBlock: string;
  safeGasPrice: string;
  proposeGasPrice: string;
  fastGasPrice: string;
}
