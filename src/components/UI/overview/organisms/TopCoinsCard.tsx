import React, { Fragment, useEffect } from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, CardHeader, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { ArrowForwardIosRounded } from '@material-ui/icons';
import { getTodayDate } from '../../../../common/helpers';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectCoins } from '../../../../features/coinsSlice';
import { Coin } from '../../../../models';
import CoinItem from '../molecules/CoinItem';
import { fetchCoinMarketChartList, selectCoinMarketChartList } from '../../../../features/coinMarketChartListSlice';
import CardLayout from '../../../templates/CardLayout';
import ListItemSkeleton from '../../../skeletons/ListItemSkeleton';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) => ({
  coinList: {
    overflow: 'scroll',
  },
  viewMore: {
    padding: 8,
    color: theme.palette.text.secondary,
    '& .MuiSvgIcon-root': {
    fontSize: '1em',
      marginLeft: 4
    }
  }
}));

const TopCoinsCard: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory();
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const coinMarketChartList = useAppSelector(selectCoinMarketChartList);

  const top15: Coin[] = coins.value.slice(0, 15);

  useEffect(() => {
    if (
      top15.length === 15 &&
      Object.keys(coinMarketChartList.value[1]).length === 0 &&
      coinMarketChartList.status === 'IDLE'
    ) {
      dispatch(fetchCoinMarketChartList({
        coinIdList: top15.map((coin: Coin) => coin.id),
        dayRange: 1
      }));
    }
  }, [dispatch, top15, coinMarketChartList.value, coinMarketChartList.status]);

  return (
    <CardLayout>
      <CardHeader
        title="Top Coins"
        subheader={`Last Updated: ${getTodayDate()}`}
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'caption' }}
      />
      <Divider />
      <List dense disablePadding className={classes.coinList}>
        {top15.length === 0 || coins.status === 'LOADING' ? (
          <ListItemSkeleton count={15} height={69} iconDimensions={theme.spacing(4)} />
        ) : (
          <>
            {top15.map((coin: Coin, index: number) => {
              return <Fragment key={coin.id}>
                <CoinItem coin={coin} />
                {index < coins.value.length - 1 && <Divider />}
              </Fragment>
            })}
          </>
        )}
        <ListItem button onClick={() => history.push('/coins')}>
          <ListItemText
            className={classes.viewMore}
            primary={
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="subtitle2">View All</Typography>
                <ArrowForwardIosRounded />
              </Box>
            }
          />
        </ListItem>
      </List>
    </CardLayout>
  )
}

export default TopCoinsCard
