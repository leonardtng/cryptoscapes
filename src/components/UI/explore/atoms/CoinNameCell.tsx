import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Avatar, Box, Typography } from '@material-ui/core';
import { Coin } from '../../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  coinNameGroup: {
    '& .MuiAvatar-root': {
      height: theme.spacing(4),
      width: theme.spacing(4),
      marginRight: 16
    },
    '& .MuiTypography-root:last-child': {
      marginLeft: 10
    }
  }
}));

interface Props {
  coin: Coin;
}

const CoinNameCell: React.FC<Props> = ({ coin }) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" className={classes.coinNameGroup} maxWidth={250} >
      <Avatar src={coin.image} alt={coin.id} />
      <Typography variant="subtitle2" noWrap>
        {coin.name}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" noWrap>
        {coin.symbol.toUpperCase()}
      </Typography>
    </Box>
  );
}

export default CoinNameCell