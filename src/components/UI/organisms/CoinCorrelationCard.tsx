import React, { useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { CardHeader, Divider } from '@material-ui/core';
import { getTodayDate } from '../../../common/helpers/dateHandler';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchCoins, selectCoins } from '../../../features/coinsSlice';
import { Coin } from '../../../models';
import { fetchCoinMarketChartList, selectCoinMarketChartList } from '../../../features/coinMarketChartListSlice';
import CardLayout from '../molecules/CardLayout';
import CorrelationHeatmap from '../molecules/CorrelationHeatmap';

const useStyles = makeStyles((theme: Theme) => ({
  chartWrapper: {
    height: 'calc(100% - 83px)',
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
    if (coins.value.length === 0 && coins.status === 'IDLE') {
      dispatch(fetchCoins());
    }
  }, [dispatch, coins.value.length, coins.status]);

  useEffect(() => {
    if (
      top15.length === 15 &&
      Object.keys(coinMarketChartList.value[30]).length === 0 &&
      coinMarketChartList.status === 'IDLE'
    ) {
      dispatch(fetchCoinMarketChartList({
        coinIdList: top15.map((coin: Coin) => coin.id),
        dayRange: 30
      }));
    }
  }, [dispatch, top15, coinMarketChartList.value, coinMarketChartList.status]);

  return (
    <CardLayout>
      <CardHeader
        title="Coin Correlation Heatmap"
        subheader={`Last Updated: ${getTodayDate()}`}
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'caption' }}
      />
      <Divider />
      <div className={classes.chartWrapper}>
        {top15.length === 0 || coins.status === 'LOADING' || Object.keys(coinMarketChartList.value[30]).length === 0 ? (
          <span>Loading...</span>
        ) : (
          <CorrelationHeatmap />
        )}
      </div>
    </CardLayout>
  )
}

export default CoinCorrelationCard