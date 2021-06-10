import React, { Fragment, useEffect } from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, CardHeader, Divider, List, ListItem } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import CardLayout from '../molecules/CardLayout';
import { WhatshotRounded } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchTrendingCoins, selectTrendingCoins } from '../../../features/trendingCoinsSlice';
import { TrendingCoin } from '../../../models';
import TrendingCoinItem from '../molecules/TrendingCoinItem';

const useStyles = makeStyles((theme: Theme) => ({
  avatarColor: {
    marginRight: 6,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.card.paper,
  },
  coinList: {
    overflow: 'scroll',
    paddingBottom: 8
  },
  listItemSkeleton: {
    height: 60,
    '& .MuiSkeleton-circle': {
      margin: '0 20px'
    }
  },
  listTextSkeleton: {
    width: `calc(100% - 40px - ${theme.spacing(3)}px)`,
    '& .MuiSkeleton-text:first-child': {
      marginBottom: 6
    }
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
        titleTypographyProps={{ variant: 'body1', color: 'textPrimary' }}
        subheader="Top-7 searched on CoinGecko"
        subheaderTypographyProps={{ variant: 'caption', color: 'textSecondary' }}
        avatar={
          <Avatar variant="circle" className={classes.avatarColor}>
            <WhatshotRounded />
          </Avatar>
        }
      />
      <Divider />
      <List dense disablePadding className={classes.coinList}>
      {trendingCoins.value.length === 0 || trendingCoins.status === 'LOADING' ? (
          <>
            {Array.from(Array(7).keys()).map((index: number) =>
              <Fragment key={index}>
                <ListItem className={classes.listItemSkeleton} disableGutters>
                  <Skeleton animation="wave" variant="circle" height={theme.spacing(3)} width={theme.spacing(3)} />
                  <div className={classes.listTextSkeleton}>
                    <Skeleton animation="wave" height={12} width="80%" />
                    <Skeleton animation="wave" height={12} width="40%" />
                  </div>
                </ListItem>
                {index < 6 && <Divider />}
              </Fragment>
            )}
          </>
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
