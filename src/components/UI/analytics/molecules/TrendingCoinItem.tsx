import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { Coin, TrendingCoin } from '../../../../models';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoins } from '../../../../features/coinsSlice';
import { roundDecimals } from '../../../../common/helpers/roundDecimals';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  ranking: {
    textAlign: 'center',
    width: 20
  },
  listItemAvatar: {
    minWidth: 46,
    display: 'flex',
    justifyContent: 'center'
  },
  avatarSmall: {
    height: theme.spacing(3),
    width: theme.spacing(3),
  },
  coinLabelText: {
    width: 80,
  },
  coinPrice: {
    width: 80,
    textAlign: 'right',
    paddingRight: 12
  }
}));

interface Props {
  trendingCoin: TrendingCoin;
}

const TrendingCoinItem: React.FC<Props> = ({ trendingCoin }) => {
  const classes = useStyles();

  const coins = useAppSelector(selectCoins);

  const bitcoin: Coin | undefined = coins.value.find((coin: Coin) => {
    return coin.id === 'bitcoin'
  });

  return (
    <ListItem>
      <div className={classes.ranking}>
        <Typography variant="body2">{trendingCoin.marketCapRank}</Typography>
      </div>
      <ListItemAvatar className={classes.listItemAvatar}>
        <Avatar src={trendingCoin.large} alt={trendingCoin.id} className={classes.avatarSmall} />
      </ListItemAvatar>
      <ListItemText
        className={classes.coinLabelText}
        primary={trendingCoin.name}
        secondary={`${trendingCoin.symbol.toUpperCase()}/USD`}
        primaryTypographyProps={{ variant: 'subtitle2', noWrap: true }}
        secondaryTypographyProps={{ variant: 'caption' }}
      />
      <ListItemText
        className={classes.coinPrice}
        primary={bitcoin &&
          `US$${roundDecimals(trendingCoin.priceBtc * bitcoin?.currentPrice)
          || roundDecimals(trendingCoin.priceBtc * bitcoin?.currentPrice, 8)}`}
        primaryTypographyProps={{ variant: 'subtitle2', noWrap: true }}
      />
    </ListItem>
  )
}

export default TrendingCoinItem
