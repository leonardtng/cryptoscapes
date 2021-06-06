import React, { Fragment, useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { CardHeader, Divider, List } from '@material-ui/core';
import { getTodayDate } from '../../../common/helpers/dateHandler';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchCoins, selectCoins } from '../../../features/coinsSlice';
import { Coin } from '../../../models';
import CoinItem from '../molecules/CoinItem';
import { fetchCoinMarketChartList, selectCoinMarketChartList } from '../../../features/coinMarketChartList';
import CardLayout from '../molecules/CardLayout';

const useStyles = makeStyles((theme: Theme) => ({
  coinList: {
    overflow: 'scroll',
    paddingBottom: 8
  }
}));

const TopCoinsCard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const coinMarketChartList = useAppSelector(selectCoinMarketChartList);

  useEffect(() => {
    if (coins.value.length === 0 && coins.status === 'IDLE') {
      dispatch(fetchCoins());
    }
  }, [dispatch, coins.value.length, coins.status]);

  useEffect(() => {
    if (Object.keys(coinMarketChartList.value).length === 0 && coinMarketChartList.status === 'IDLE') {
      dispatch(fetchCoinMarketChartList(
        coins.value.map((coin: Coin) => coin.id)
      ));
    }
  }, [dispatch, coins.value, coinMarketChartList.value, coinMarketChartList.status]);

  return (
    <CardLayout>
      <CardHeader
        title="Top Coins"
        subheader={getTodayDate()}
        titleTypographyProps={{ variant: "h6" }}
        subheaderTypographyProps={{ variant: "caption" }}
      />
      <Divider />
      <List dense disablePadding className={classes.coinList}>
        {coins.status === 'LOADING' ? (
          <span>Loading...</span>
        ) : (
          <>
            {coins.value.map((coin: Coin, index: number) => {
              return <Fragment key={coin.id}>
                <CoinItem coin={coin} />
                {index < coins.value.length - 1 && <Divider />}
              </Fragment>
            })}
          </>
        )}

      </List>
    </CardLayout>
  )
}

export default TopCoinsCard
