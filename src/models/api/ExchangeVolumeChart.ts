import { GenericState } from "..";

export type ExchangeVolumeChartDayRanges = 1 | 14 | 30;

export interface ExchangeVolumeChartState extends GenericState<[number, number][]> {
  selectedDayRange: ExchangeVolumeChartDayRanges;
}
