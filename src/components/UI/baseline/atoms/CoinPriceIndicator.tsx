import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Typography } from '@material-ui/core';
import { Coin } from '../../../../models';
import { formatNumber, roundDecimals } from '../../../../common/helpers';

const useStyles = makeStyles((theme: Theme) => ({
  avatarSmall: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    marginRight: 8
  },
}));

interface Props {
  coin: Coin;
}

const CoinPriceIndicator: React.FC<Props> = ({ coin }) => {
  const classes = useStyles();

  return (
    <Box width="50%" display="flex" alignItems="center" justifyContent="center">
      <Avatar src={coin.image} alt={coin.name} className={classes.avatarSmall} />
      <Typography variant="body2">US${formatNumber(roundDecimals(coin.currentPrice, 0))}</Typography>
    </Box>
  )
}

export default CoinPriceIndicator
