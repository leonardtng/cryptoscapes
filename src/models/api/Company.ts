export interface Company {
  name: string;
  symbol: string;
  country: string;
  totalHoldings: number;
  totalEntryValueUsd: number;
  totalCurrentValueUsd: number;
  percentageOfTotalSupply: number;
}

export interface CompanyRootObject {
  totalHoldings: number;
  totalValueUsd: number;
  marketCapDominance: number;
  companies: Company[];
}

export interface CompanyFullData {
  bitcoin: CompanyRootObject;
  ethereum: CompanyRootObject;
}
