const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY

export const coinGecko = {
  coins:
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false`,
  coinMarketChart: (coinId: string, days: number) =>
    `/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
  trending: `/search/trending`,
};

export const etherscan = {
  gasOracle:
    `/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`
}
