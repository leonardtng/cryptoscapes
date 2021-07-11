import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import CardLayout from '../../../templates/CardLayout';
import { fetchCoinDetails } from '../../../../features/coinDetailsSlice';
import CoinDetailsHeader from '../molecules/CoinDetailsHeader';
import CoinDataCardGroup from '../molecules/CoinDataCardGroup';
import CoinDataTabs from './CoinDataTabs';
import {
  fetchCoinDetailsMarketChart,
  selectCoinDetailsMarketChart
} from '../../../../features/coinDetailsMarketChartSlice';

interface Props {
  coinId: string;
}

const CoinDetailsCard: React.FC<Props> = ({ coinId }) => {
  const dispatch = useAppDispatch();

  const coinDetailsMarketChart = useAppSelector(selectCoinDetailsMarketChart);

  useEffect(() => {
    dispatch(fetchCoinDetails(coinId));
  }, [dispatch, coinId]);

  useEffect(() => {
    dispatch(fetchCoinDetailsMarketChart({ coinId: coinId, dayRange: coinDetailsMarketChart.selectedDayRange }));
  }, [dispatch, coinId, coinDetailsMarketChart.selectedDayRange]);

  return (
    <CardLayout>
      <CoinDetailsHeader />
      <CoinDataCardGroup />
      <CoinDataTabs />
    </CardLayout>
  )
}

export default CoinDetailsCard
