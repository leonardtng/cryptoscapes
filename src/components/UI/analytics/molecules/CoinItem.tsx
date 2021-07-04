import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { Coin } from '../../../../models';
import SmallCoinChart from '../atoms/SmallCoinChart';
import { roundDecimals } from '../../../../common/helpers';
import { useHistory } from 'react-router';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  ranking: {
    textAlign: 'center',
    width: 30
  },
  listItemAvatar: {
    minWidth: 46,
  },
  avatarSmall: {
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
  coinLabelText: {
    width: 80,
  },
  coinPrice: {
    width: 100,
    textAlign: 'right',
    paddingRight: 12,
    '& .MuiTypography-subtitle2': {
      color: (styleProps: StyleProps) =>
        styleProps.change >= 0 ?
          theme.palette.success.main :
          theme.palette.error.main
    }
  },
  chartWrapper: {
    height: 60,
    maxWidth: 160,
    minWidth: 100,
    width: 'calc(100% - 30px - 46px - 80px - 100px)',
    padding: '0 8px'
  }
}));

interface StyleProps {
  change: number;
}

interface Props {
  coin: Coin;
}

const CoinItem: React.FC<Props> = ({ coin }) => {
  const classes = useStyles({ change: coin.priceChangePercentage24H });
  const history = useHistory();

  return (
    <ListItem disableGutters button onClick={() => history.push(`/coins/${coin.id}`)}>
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
      <div className={classes.chartWrapper}>
        <SmallCoinChart coin={coin} dataKey={'prices'} />
      </div>
      <ListItemText
        className={classes.coinPrice}
        primary={`US$${roundDecimals(coin.currentPrice, 3)}`}
        secondary={
          `${coin.priceChangePercentage24H >= 0 ? '+' : ''}${roundDecimals(coin.priceChangePercentage24H)}%`
        }
        primaryTypographyProps={{ variant: 'subtitle1', noWrap: true }}
        secondaryTypographyProps={{ variant: 'subtitle2' }}
      />
    </ListItem>
  )
}

export default CoinItem
