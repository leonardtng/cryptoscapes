export interface Exchange {
  id: string;
  name: string;
  yearEstablished: number;
  country: string;
  description: string;
  url: string;
  image: string;
  hasTradingIncentive: boolean;
  trustScore: number;
  trustScoreRank: number;
  tradeVolume24HBtc: number;
  tradeVolume24HBtcNormalized: number;
}
