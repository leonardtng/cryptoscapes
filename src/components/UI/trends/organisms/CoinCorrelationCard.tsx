import React, { useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { CardHeader, Divider } from '@material-ui/core';
import { getTodayDate } from '../../../../common/helpers';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectCoins } from '../../../../features/coinsSlice';
import { Coin } from '../../../../models';
import { fetchCoinMarketChartList, selectCoinMarketChartList } from '../../../../features/coinMarketChartListSlice';
import CardLayout from '../../../templates/CardLayout';
import CorrelationHeatmap from '../molecules/CorrelationHeatmap';
import HeatmapOptionToggleGroup from '../atoms/HeatmapOptionToggleGroup';
import CorrelationHeatmapSkeleton from '../../../skeletons/CorrelationHeatmapSkeleton';

const useStyles = makeStyles((theme: Theme) => ({
  chartWrapper: {
    flex: 1,
    width: '100%'
  }
}));

const CoinCorrelationCard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const coinMarketChartList = useAppSelector(selectCoinMarketChartList);

  const top15: Coin[] = coins.value.slice(0, 15);

  useEffect(() => {
    if (
      top15.length === 15 &&
      Object.keys(coinMarketChartList.value[coinMarketChartList.selectedDayRange]).length === 0 &&
      coinMarketChartList.status === 'IDLE'
    ) {
      dispatch(fetchCoinMarketChartList({
        coinIdList: top15.map((coin: Coin) => coin.id),
        dayRange: coinMarketChartList.selectedDayRange
      }));
    }
  }, [dispatch, top15, coinMarketChartList.value, coinMarketChartList.status, coinMarketChartList.selectedDayRange]);

  return (
    <CardLayout>
      <CardHeader
        title="Trend Correlations"
        subheader={`Last Updated: ${getTodayDate()}`}
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'caption' }}
        action={<HeatmapOptionToggleGroup />}
      />
      <Divider />
      <div className={classes.chartWrapper}>
        {top15.length === 0 ||
          coins.status === 'LOADING' ||
          Object.keys(coinMarketChartList.value[coinMarketChartList.selectedDayRange]).length === 0 ? (
          <CorrelationHeatmapSkeleton />
        ) : (
          <CorrelationHeatmap />
        )}
      </div>
    </CardLayout>
  )
}

export default CoinCorrelationCard