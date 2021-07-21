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
import { Box, Hidden } from '@material-ui/core';
import CoinDetailsChart from '../molecules/CoinDetailsChart';
import MobileCoinDetailsHeader from '../molecules/MobileCoinDetailsHeader';
import { useWindowSize } from '../../../../common/hooks/useWindowSize';

interface Props {
  coinId: string;
}

const CoinDetailsCard: React.FC<Props> = ({ coinId }) => {
  const dispatch = useAppDispatch();
  const windowSize = useWindowSize();

  const coinDetailsMarketChart = useAppSelector(selectCoinDetailsMarketChart);

  useEffect(() => {
    dispatch(fetchCoinDetails(coinId));
  }, [dispatch, coinId]);

  useEffect(() => {
    dispatch(fetchCoinDetailsMarketChart({ coinId: coinId, dayRange: coinDetailsMarketChart.selectedDayRange }));
  }, [dispatch, coinId, coinDetailsMarketChart.selectedDayRange]);

  return (
    <CardLayout>
      <Hidden xsDown>
        <CoinDetailsHeader />
        {windowSize.height > 820 && <CoinDataCardGroup />}
        <CoinDataTabs />
      </Hidden>
      <Hidden smUp>
        <MobileCoinDetailsHeader />
        <Box flex="1">
          <CoinDetailsChart />
        </Box>
      </Hidden>
    </CardLayout>
  )
}

export default CoinDetailsCard
