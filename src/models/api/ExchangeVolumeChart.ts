import { GenericState } from "..";

export type ExchangeVolumeChartDayRanges = 1 | 14 | 30 | 90 | 365;

export interface ExchangeVolumeChartState extends GenericState<[number, string][]> {
  selectedDayRange: ExchangeVolumeChartDayRanges;
}
