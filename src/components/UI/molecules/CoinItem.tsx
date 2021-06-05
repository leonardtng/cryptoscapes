import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { Coin } from '../../../models';
import SmallCoinChart from '../atoms/SmallCoinChart';

const useStyles = makeStyles<Theme, Coin>((theme: Theme) => ({
  ranking: {
    textAlign: 'center',
    width: 30
  },
  listItemAvatar: {
    minWidth: 46,
  },
  avatarSmall: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  coinLabelText: {
    width: 100,
  },
  coinPrice: (props) => ({
    width: 80,
    textAlign: 'right',
    paddingRight: 12,
    '& .MuiTypography-subtitle2': {
      color: (coin: Coin) =>
        coin.priceChangePercentage24H > 0 ?
          theme.palette.success.main :
          theme.palette.error.main
    }
  })
}));

interface Props {
  coin: Coin;
}

const CoinItem: React.FC<Props> = ({ coin }) => {
  const classes = useStyles(coin);

  return (
    <ListItem disableGutters>
      <div className={classes.ranking}>
        <Typography variant="body2">{coin.marketCapRank}</Typography>
      </div>
      <ListItemAvatar className={classes.listItemAvatar}>
        <Avatar src={coin.image} alt={coin.id} className={classes.avatarSmall} />
      </ListItemAvatar>
      <ListItemText
        className={classes.coinLabelText}
        primary={coin.name}
        secondary={`${coin.symbol.toUpperCase()}/USD`}
        primaryTypographyProps={{ variant: 'subtitle1', noWrap: true }}
        secondaryTypographyProps={{ variant: 'subtitle2' }}
      />
      <SmallCoinChart coin={coin} dataKey={'prices'} />
      <ListItemText
        className={classes.coinPrice}
        primary={`US$${Math.round(coin.currentPrice * 1000) / 1000}`}
        secondary={
          `${coin.priceChangePercentage24H > 0 ? '+' : ''}${Math.round(coin.priceChangePercentage24H * 10) / 10}%`
        }
        primaryTypographyProps={{ variant: 'subtitle1', noWrap: true }}
        secondaryTypographyProps={{ variant: 'subtitle2' }}
      />
    </ListItem>
  )
}

export default CoinItem
