import React, { Fragment, useEffect } from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { CardHeader, Divider, List } from '@material-ui/core';
import CardLayout from '../../../templates/CardLayout';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchTrendingCoins, selectTrendingCoins } from '../../../../features/trendingCoinsSlice';
import { TrendingCoin } from '../../../../models';
import TrendingCoinItem from '../molecules/TrendingCoinItem';
import ListItemSkeleton from '../../../skeletons/ListItemSkeleton';
import FireIcon from '../atoms/FireIcon';

const useStyles = makeStyles((theme: Theme) => ({
  trendingCoinList: {
    overflow: 'scroll',
    paddingBottom: 8
  }
}));

const TrendingCoinsCard: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const trendingCoins = useAppSelector(selectTrendingCoins);

  useEffect(() => {
    if (trendingCoins.value.length === 0 && trendingCoins.status === 'IDLE') {
      dispatch(fetchTrendingCoins());
    }
  }, [dispatch, trendingCoins.value.length, trendingCoins.status]);

  return (
    <CardLayout>
      <CardHeader
        title="Trending"
        titleTypographyProps={{ variant: 'body1' }}
        subheader="Top-7 searched on CoinGecko"
        subheaderTypographyProps={{ variant: 'caption' }}
        avatar={<FireIcon />}
      />
      <Divider />
      <List dense disablePadding className={classes.trendingCoinList}>
        {trendingCoins.value.length === 0 || trendingCoins.status === 'LOADING' ? (
          <ListItemSkeleton count={7} height={60} iconDimensions={theme.spacing(3)} />
        ) : (
          <>
            {trendingCoins.value.map((trendingCoin: TrendingCoin, index: number) => {
              return <Fragment key={trendingCoin.id}>
                <TrendingCoinItem trendingCoin={trendingCoin} />
                {index < trendingCoins.value.length - 1 && <Divider />}
              </Fragment>
            })}
          </>
        )}
      </List>
    </CardLayout>
  )
}

export default TrendingCoinsCard
