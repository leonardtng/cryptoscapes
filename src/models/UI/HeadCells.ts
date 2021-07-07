import { Coin } from "..";

export interface CoinListTableHeadCell {
  id: keyof Coin;
  label: string;
  numeric: boolean;
  customisable: boolean;
}
